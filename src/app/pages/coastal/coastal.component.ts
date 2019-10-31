import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';
import { loadModules } from 'esri-loader';
import * as echarts from 'echarts';
import { Observable, forkJoin } from 'rxjs';
import { format, addDays } from 'date-fns';
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
export interface VirtualDataInterface {
  index: number,
  time: string;
  speed: string;
  label: string;
}
@Component({
  selector: 'app-coastal',
  templateUrl: './coastal.component.html',
  styleUrls: ['./coastal.component.less']
})
export class CoastalComponent implements OnInit {
  public api_productpublishtime = "/jx/seaforecastpic/";//大面
  public api_chart = "/jx/seaforecast/";//曲线
  public api_MapServer = "http://xxs.dhybzx.org:6086/arcgis/rest/services/";//地图服务
  public isSpinning = true;
  public listOfData = [];
  public chartData: any = null;
  public publishtime;
  public isLoading = false;
  public isLoadingRegionalList = false; 
  public selectedPoly = {
    id:1,
    name:"平湖",
  };
  public regionalList = [];//综合数据列表
  //弹框样式对象
  public showPop = false;//是否显示曲线框
  public popoverStyle = {
  };
  public activePoint = {};
  public selectedType: any = this.server.elements[0];
  constructor(public server: ServersService) { }

  ngOnInit() {
    // 获取综合预报数据
    this.getRegional();
  }
  //获取综合数据
  getRegional(){
    this.isLoadingRegionalList = true;
    this.regionalList = [];
    let selectedValue = this.selectedPoly.name == '平湖' ? 'pinghu' : 'haiyan'
    let wind = this.server.getCoastaRegional('/jx/regionalwindforecast/' + selectedValue);
    let wave = this.server.getCoastaRegional('/jx/regionalwaveforecast/' + selectedValue);
    forkJoin([wind, wave]).subscribe((result: any) => {
      let publishtime = new Date(result[0][0].publishtime.substring(0, 4) + "-" + result[0][0].publishtime.substring(5, 7) + "-" + result[0][0].publishtime.substring(8, 10));
      result[0].forEach((element,index) => {
          this.regionalList.push({
            wind: result[0][index],
            wave: result[1][index],
            date: format(addDays(new Date(publishtime), index), 'MM月dd日')
          })
        });
      this.isLoadingRegionalList = false;
    })
  }
  getPublishtime() {
    //刷新图层
    loadModules([
      "esri/Graphic"
    ]).then(([Graphic]) => {
      //绘制区域图
      var polygonPinghu = {
        type: "polygon", 
        rings: [[121.516729837212324, 30.646134003381576],
        [121.504832532295609, 30.491469038565356],
        [121.512327834761777, 30.260145770810709],
        [121.457124339516668, 30.317252834950409],
        [121.422860101212791, 30.353420642148990],
        [121.382885156225029, 30.393395587136695],
        [121.327681660979920, 30.425756256546038],
        [121.262960321261858, 30.450502651276395],
        [121.228696082957867, 30.450502651276395],
        [121.194431844653991, 30.435274101018990],
        [121.154456899666229, 30.429563394335219],
        [121.040242771386829, 30.593270312075276],
        [121.059278459433472, 30.598981017859728],
        [121.097349835526529, 30.597077448965138],
        [121.139228349408882, 30.608498862332681],
        [121.144939055193277, 30.618016705906314],
        [121.156360468560820, 30.638955962847433],
        [121.183010431286448, 30.659895219788609],
        [121.209660394911339, 30.675123770046014],
        [121.266767459051039, 30.705580871460086],
        [121.287706715992158, 30.661005635201946],
        [121.326372956746582, 30.655056982293956],
        [121.385859482229421, 30.652082656289622],
        [121.516729837212324, 30.646134003381576]]
      };
      var polygonHaiyan = {
        type: "polygon", 
        rings: [[121.040242771386829, 30.593270312075276],
        [121.154456899666229, 30.429563394335219],
        [121.122492806997457, 30.401485754264172],
        [121.076093316653328, 30.372932222644010],
        [121.052298706819897, 30.344378690124529],
        [121.027314366764699, 30.327722463421026],
        [120.958309996809021, 30.297979200679606],
        [120.882167244622678, 30.263477016151398],
        [120.838147216520838, 30.344378690124529],
        [120.822624243514042, 30.365041900163590],
        [120.847076628283844, 30.385898345732130],
        [120.880878454976823, 30.398124538116974],
        [120.888070332479970, 30.424015298567213],
        [120.893104647361611, 30.447748495496739],
        [120.898138961344102, 30.470762505485311],
        [120.909645965888672, 30.519667275024801],
        [120.970057740872107, 30.567852856724016],
        [121.001702004044319, 30.593024430233299],
        [121.040242771386829, 30.593270312075276]]
      };
      var fillSymbol = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [54, 184, 254, 0.2],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [32, 156, 254],
          width: 1
        }
      };
      var fillSymbolHover = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [54, 184, 254, 0.8],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [54, 184, 254],
          width: 1
        }
      };
      let polygonGraphic = [
        new Graphic({
          geometry: polygonPinghu,
          symbol: fillSymbolHover,
          label: "平湖",
          attributes: {
            id: 1,
            name: "平湖",
            active: true
          }
        }),
        new Graphic({
          geometry: polygonHaiyan,
          symbol: fillSymbol,
          label: "海盐",
          attributes: {
            id: 2,
            name: "海盐",
            active:false
          }
        })
      ];
      let textGraphic = [
        new Graphic({
          geometry: {
            type: "point",
            longitude: 120.977,
            latitude: 30.420,
          },
          symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#fff",
            haloColor: "#000",
            haloSize: "1px",
            text: "海盐", // esri-icon-map-pin
            font: {
              size: 12,
            }
          }
        }),
        new Graphic({
          geometry: {
            type: "point",
            longitude: 121.286,
            latitude: 30.555,
          },
          symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#fff",
            haloColor: "#000",
            haloSize: "1px",
            text: "平湖", // esri-icon-map-pin
            font: {
              size: 12,
            }
          }
        })
      ]
      this.server.view.graphics.addMany(polygonGraphic);
      this.server.view.graphics.addMany(textGraphic);
      //绑定点击事件
      this.server.view.on("click", ($event) => {
        this.server.view.hitTest($event).then( (response) =>{
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
            } else if (screenPoint.y + 210 > document.body.clientHeight) {
              poorY = document.body.clientHeight - screenPoint.y - 210;
            }
            const point = this.server.view.toMap({
              x: centerPoint.x + poorX,
              y: centerPoint.y - poorY
            });
            if (poorX || poorY) {
              this.server.view.goTo({
                center: [point.longitude, point.latitude],
              }, {
                duration: 1000  // Duration of animation will be 5 seconds
              });
            }
            this.activePoint = $event.mapPoint;
            this.dealStyle(this.server.view.toScreen(this.activePoint))
            if (response.results[0]) {
              polygonGraphic.forEach(element => {
                element.symbol = fillSymbol;
                element.attributes.active = false;
              })
              polygonGraphic[response.results[0].graphic.attributes.id - 1].symbol = fillSymbolHover;
              polygonGraphic[response.results[0].graphic.attributes.id - 1].attributes.active = true;
            }
            if (this.selectedPoly.name != response.results[0].graphic.attributes.name || !this.chartData){
              this.selectedPoly = {
                id: response.results[0].graphic.attributes.id,
                name: response.results[0].graphic.attributes.name
              };
              //获取未来三天综合数据
              this.getRegional();
              //设置默认选中海面风
              this.server.resetElementActive();
              //获取曲线图
              this.getChartData();
            }
          }
        })
      })
      this.server.view.on("pointer-move", ($event) => {
        this.server.view.hitTest($event).then((response) => {
          if (response.results[0]) {
            if (polygonGraphic[response.results[0].graphic.attributes.id - 1].attributes.active){
              polygonGraphic.forEach(element => {
                if (!element.attributes.active) {
                  element.symbol = fillSymbol;
                }
              })
            }
            polygonGraphic[response.results[0].graphic.attributes.id - 1].symbol = fillSymbolHover;
          }else{
            polygonGraphic.forEach(element => {
              if (!element.attributes.active){
                element.symbol = fillSymbol;
              }
            })
          }

        })
        if (this.showPop) {
          const screenPoint = this.server.view.toScreen(this.activePoint);
          this.dealStyle(screenPoint)
        }
      });
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
  }
  //处理坐标
  dealStyle(screenPoint) {
    this.popoverStyle = {
      left: (screenPoint.x + 30) + 'px',
      top: (screenPoint.y - 185) + 'px',
    }
    this.showPop = true;
  }
  //获取曲线数据watertemp
  getChartData() {
    this.server.elements.forEach(element=>{
      if (element.active){
        this.selectedType = element;
      }
    })
    this.isLoading = true;
    let options = {
      api: this.api_chart + "id=" + this.selectedPoly.id + "&element=" + (this.selectedType.chartName == 'sst' ? 'watertemp' : this.selectedType.chartName)
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
        symbol: 'none',
        z: 2
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
          },
          {
            type: 'line',
            symbol: 'none',
            encode: {
              x: dims.DATATIME,
              y: dims.POWER
            },
            lineStyle: {
              normal: {
                color: '#aaa',
                type: 'dotted'
              }
            },
            data: windData,
            z: 1
          }
        )
      }
      let obj = {
        height: "186px",
        width:"680px",
        left: 0,
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            return params.length > 1 ?
              [
                this.selectedType.seriesRightName + '：' + params[0].value + this.selectedType.unit,
                this.selectedType.seriesLeftName + '：' + params[1].value[dims.DIR_EN],
                // '角度：' + params[1].value[dims.DIR],
                '时间：' + params[1].value[dims.DATATIME],
              ].join('<br>')
              : [this.selectedType.seriesRightName + '：' + params[0].value + this.selectedType.unit, '时间：' + params[0].name].join('<br>');
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
        }],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: categorieList,
          axisLabel: {
            color:'#222D65',
            interval: 12,
            formatter: function (value, index) {
              return value.substring(8, value.length)
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
}
