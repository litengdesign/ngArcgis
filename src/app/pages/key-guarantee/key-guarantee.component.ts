import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';
import { loadModules } from 'esri-loader';
import * as echarts from 'echarts';
var markerImgActive = {
  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
  url: "../../assets/images/setionMakerActive.svg",
  width: "237px",
  height: "242px"
};
var markerImg = {
  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
  url: "../../assets/images/setionMarker.svg",
  width: "32px",
  height: "39px"
};
let dims = {
  DATATIME: 0,
  POWER: 1,
  DIR_EN: 2,
  DIR: 3
};
let arrowSize = 18;
let directionMap = {};
echarts.util.each(
  ['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'],
  function (name, index) {
    directionMap[name] = Math.PI / 8 * index;
  }
);
@Component({
  selector: 'app-key-guarantee',
  templateUrl: './key-guarantee.component.html',
  styleUrls: ['./key-guarantee.component.less']
})
export class KeyGuaranteeComponent implements OnInit {

  public api_chart = "/jx/keypoint/";//曲线
  public api_keypointinfo = "/jx/keypointinfo";//地图服务
  public api_tide = '/jx/keypointTIDEhl/';//未来3天潮位
  public isSpinning = true;
  public listOfData = [];
  public tideList = [];
  public barList = []; //时间轴
  public preIndex = 0; //上一个时刻
  public intervalPlay = null; //播放定时器
  public activePlay = false;  //播放按钮状态
  public playKey = 0; //当前播放时刻
  public chartData: any = {};
  public publishtime;
  public isLoading = false;
  public loading = false;
  public markerList = [];
  public pointGraphics = [];
  public textSymList = [];
  public selectedPoly:any={};
  //弹框样式对象
  public showPop = false;//是否显示曲线框
  public popoverStyle = {
  };
  public activePoint = {};
  public selectedType: any = this.server.elements[0];
  constructor(public server: ServersService) { }
  ngOnInit() {
  }
  getPublishtime() {
    //刷新图层
    loadModules([
      "esri/Graphic",
      "esri/symbols/TextSymbol"
    ]).then(([Graphic, TextSymbol]) => {
      let options = {
        api: this.api_keypointinfo
      }
      this.server.getRxjsData(options).subscribe((data) => {
        //绘制点
        data.forEach(element=>{
          var point = {
            type: "point",
            longitude: element.XCORD,
            latitude: element.YCORD,
          };
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerImg,
            attributes: {
              name: element.NAME,
              value: element.ENAME,
            },
            type: 'icon'
          });
          var textGraphic = new Graphic({
            geometry: point,
            symbol: {
              type: "text", // autocasts as new TextSymbol()
              color: "#fff",
              haloColor: "#000",
              haloSize: "1px",
              text: element.NAME, // esri-icon-map-pin
              font: {
                size: 12,
              },
              yoffset: -20,
            },
            attributes: {
              name: element.NAME,
              value: element.ENAME,
            },
            type: 'text'
          });
          this.pointGraphics.push(pointGraphic)
          this.textSymList.push(textGraphic);
        });
        this.server.view.graphics.addMany(this.pointGraphics);
        this.server.view.graphics.addMany(this.textSymList);
        //绑定点击事件
        this.server.view.on("click", ($event) => {
          this.server.view.hitTest($event).then((response) => {
            if (response.results[0]) {
              const centerPoint = this.server.view.toScreen(this.server.view.center);
              const screenPoint = this.server.view.toScreen($event.mapPoint);
              let poorX = 0;
              let poorY = 0;
              if (screenPoint.x + 710 > document.body.clientWidth) {
                poorX = screenPoint.x + 750 - document.body.clientWidth
              }
              if (screenPoint.y < 305) {
                poorY = 305 - screenPoint.y;
              } else if (screenPoint.y + 198 > document.body.clientHeight) {
                poorY = document.body.clientHeight - screenPoint.y - 198;
              }
              const point = this.server.view.toMap({
                x: centerPoint.x + poorX,
                y: centerPoint.y - poorY
              });
              if (poorX || poorY) {
                this.server.view.goTo({
                  center: [point.longitude, point.latitude],
                  // target: new Point({
                  //   latitude: point.latitude,
                  //   longitude: point.longitude,
                  // }),
                }, {
                  duration: 1000  // Duration of animation will be 5 seconds
                });
              }
              this.pointGraphics.forEach((element,index) => {
                if (response.results[0].graphic.attributes.name == element.attributes.name){
                  this.pointGraphics[index].symbol = markerImgActive;
                }else{
                  element.symbol = markerImg;
                }
              })
              this.activePoint = $event.mapPoint;
              this.selectedPoly = {
                name: response.results[0].graphic.attributes.name,
                value: response.results[0].graphic.attributes.value
              };
              this.dealStyle(this.server.view.toScreen($event.mapPoint))
              this.getChartData()
              //获取表格
              if (this.selectedType.name == "潮位") {
                this.getTideTable()
              }
            }
          })
        })
        this.server.view.on("pointer-move", ($event) => {
          if (this.showPop) {
            this.dealStyle(this.server.view.toScreen(this.activePoint))
          }
        });
      })
    })
  }
  //改变图层类型
  changeLayer(item) {
    this.server.elements.forEach(element => {
      element.active = false;
    })
    this.selectedType = item;
    item.active = !item.active;
    this.getChartData();
    //获取表格
    if (this.selectedType.name == "潮位") {
      this.getTideTable()
    }
  }
  //处理坐标
  dealStyle(screenPoint) {
    this.popoverStyle = {
      left: (screenPoint.x + 30) + 'px',
      top: (screenPoint.y - 185) + 'px',
    }
    this.showPop = true;
  }
  //获取曲线数据
  getChartData() {
    this.server.elements.forEach(element => {
      element.active = false;
      if (element.name == this.selectedType.name) {
        element.active = true;
      }
    })
    this.isLoading = true;
    let options = {
      api: this.api_chart + this.selectedPoly.value+"/" + this.selectedType.chartName
    }
    this.server.getRxjsData(options).subscribe((data) => {
      var windData = echarts.util.map(data, function (entry) {
        return [entry.DATATIME, entry.POWER, entry.DIR_EN, entry.DIR];
      });
      this.listOfData = data;
      let seriesLists = []
      let categorieList = []; //x轴
      let dirAngleList = []; //角度
      let speedList = []; //曲线
      this.listOfData.forEach((element: any) => {
        if (element.DIR) {
          dirAngleList.push(parseInt(element.DIR))
        }
        speedList.push(element.POWER);
        categorieList.push(element.DATATIME);
      })
      //默认插入曲线数据
      seriesLists.push({
        name: this.selectedType.name,
        data: speedList,
        type: 'line',
        areaStyle: {},
        smooth: true,
        symbol: 'none'
      })
      if (this.selectedType.name == '海面风' || this.selectedType.name == '海浪' || this.selectedType.name == '海流') {
        seriesLists.push(
          {
            name: this.selectedType.name,
            type: 'custom',
            renderItem: this.renderArrow,
            encode: {
              x: dims.DATATIME,
              y: dims.POWER
            },
            data: windData,
            z: 10
          }
        )
      }
      let obj = {
        height: "186px",
        width: "680px",
        top:0,
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            return params.length > 1 ?
              [
                this.selectedType.seriesRightName + '：' + params[0].value + this.selectedType.unit,
                this.selectedType.seriesLeftName + '：' + params[1].value[dims.DIR_EN],
                '时间：' + params[1].value[dims.DATATIME],
              ].join('<br>')
              : [this.selectedType.seriesRightName + '：' + params[0].value + this.selectedType.unit , '时间：' + params[0].name].join('<br>');
          }
        },
        dataZoom: [{
          type: 'inside',
          xAxisIndex: 0,
          dataZoomIndex: 10,
          minSpan: 5,
          start: 0,
          end: 100,
        }, {
          type: 'slider',
          xAxisIndex: 0,
          minSpan: 5,
          height: 20,
          bottom: 10,
          handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '120%'
        }],
        grid: [{
          top: 30,
          left: 35,
          right: 35,
        }],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: categorieList,
          axisLabel: {
            interval: 12,
            formatter: function (value, index) {
              return value.substring(8, 10).replace(/\s*/g, "") + '日' + value.substring(10, value.length)
            }
          }
        },
        yAxis: {
          // max: this.selectedType.max,
          // name: this.selectedType.name + "(" + this.selectedType.unit + ")",
          type: 'value',
        },
        visualMap: [
          {
            top: 0,
            right: 0,
            pieces: this.selectedType.pieces,
            outOfRange: {
              color: '#E20909'
            },
            show: false,
            seriesIndex: 0,
          },
          {
            type: 'piecewise',
            show: false,
            orient: 'horizontal',
            pieces: this.selectedType.pieces,
            seriesIndex: 1,
            dimension: 1
          }
        ],
        series: seriesLists
      }
      this.chartData = obj;
      this.isLoading = false;
    })

  }
  //箭头格式化
  renderArrow(param, api) {
    var point = api.coord([
      api.value(dims.DATATIME),
      api.value(dims.POWER)
    ]);
    return {
      type: 'path',
      shape: {
        pathData: 'M4 2,L6 0,M6 0,L4 -2,M6 0,L0 0 ,Z',
        x: -arrowSize / 2,
        y: -arrowSize / 2,
        width: 12,
        height: 18
      },
      // rotation: directionMap[api.value(dims.DIR_EN)],
      rotation: api.value(dims.DIR) * Math.PI / 180,
      position: point,
      style: api.style({
        stroke: '#222D65',
        lineWidth: 1
      })
    };
  }
  //未来3天潮位
  getTideTable(){
    this.loading  =true;
    let options = {
      api: this.api_tide + this.selectedPoly.value
    }
    this.server.getRxjsData(options).subscribe((data) => {
      this.tideList = data;
      this.loading = false;
    })
  }
  closePop(){
    this.showPop = false;
    this.pointGraphics.forEach(element => {
      element.symbol = markerImg;
    })
  }
}
