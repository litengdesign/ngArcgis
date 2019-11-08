import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Pipe, ElementRef, } from '@angular/core';
import { ServersService } from '../../servers.service';
import { format, addHours } from 'date-fns';
import { loadModules } from 'esri-loader';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Subject } from 'rxjs';
import * as echarts from 'echarts';
let dims = {
  time: 0,
  speed: 1,
  lable: 2,
  dirAngle:3
};
let arrowSize = 18;
let directionMap = {};
echarts.util.each(
  // ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
  ['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'],
   (name, index)=> {
    directionMap[name] = Math.PI / 8 * index;
  }
);
export interface VirtualDataInterface {
  index: number,
  time: string;
  speed: string;
  label: string;
}
@Pipe({ name: 'pointerFloor' })
@Component({
  selector: 'app-data-forecast',
  templateUrl: './data-forecast.component.html',
  styleUrls: ['./data-forecast.component.less']
})

export class DataForecastComponent implements OnInit, AfterViewInit, OnDestroy {
  //设置曲线table虚拟滚动
  @ViewChild('virtualTable', { static: false })
  //子组件
  @ViewChild('mapElement', { static: true }) public mapElement: ElementRef; //接收map dom

  nzTableComponent: NzTableComponent;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }
  public api_productpublishtime = "/jx/productpublishtime/";//大面
  public api_chart = "/jx/ncData/";//曲线
  public api_MapServer = "http://xxs.dhybzx.org:6086/arcgis/rest/services/";//地图服务
  public isSpinning = true;
  public barList = []; //时间轴
  public preIndex = 0; //上一个时刻
  public intervalPlay = null; //播放定时器
  public activePlay = false;  //播放按钮状态
  public playKey = 1; //当前播放时刻
  public chartData: any = {};
  public publishtime;
  public playTime;
  public isLoading = false;
  //弹框样式对象
  public showPop = false;//是否显示曲线框
  public popoverStyle = {
  };
  public activePoint = {};

  public selectedType: any = this.server.elements[0];

  constructor(public server: ServersService) { }
  ngOnInit() {
    //设置默认选中海面风
    this.server.resetElementActive();
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //获取地图服务发布时间
  getPublishtime() {
    if (this.showPop) {
      this.showPop = false;
    }
    this.isSpinning = true;
    let options = {
      api: this.api_productpublishtime + this.selectedType.type,
    }
    this.server.getRxjsData(options).subscribe((data) => {
      this.publishtime = data[0].PUBLISHTIME;
      this.playTime = data[0].PUBLISHTIME;
      this.barList = [];
      // this.server.sublayerList = [];
      for (var i = 0; i < 72; i++) {
        this.barList.push({
          active: i === 0 ? true : false,
          name: format(addHours(new Date(this.publishtime), i), 'dd日HH时'),
          date: addHours(new Date(this.publishtime), i)
        });
      }
    })
    //刷新图层
    loadModules([
      "esri/layers/MapImageLayer",
      "extras/TDTLayer",
      "esri/views/MapView",
      "esri/Graphic"
    ]).then(([MapImageLayer, TDTLayer, MapView, Graphic]) => {
      this.server.view = new MapView({
        container: "viewDiv",
        map: this.server.map,
        zoom: 9,
        maxZoom: 18,//最大空间等级
        minZoom: 5,//最小空间等级
        center: [121.5465, 30.5233]
      });
      //验证是否已经存在图层
      if (this.server.layer) {
        this.server.map.remove(this.server.layer);
      }
      this.server.layer = new MapImageLayer({
        url: "http://xxs.dhybzx.org:6086/arcgis/rest/services/" + this.selectedType.type + "/MapServer",
        imageMaxHeight: 977,
        imageMaxWidth: 1920,
        dpi: 96,
      });
      this.server.map.add(this.server.layer);
      //promise view loader
      this.server.view.whenLayerView(this.server.layer)
        .then(() => {
          //设置0时刻显示
          this.server.layer.allSublayers.items[0].visible = true;
          this.isSpinning = false;
          // 绑定点击事件
          this.server.view.on("click", ($event) => {
            //绘制点
            var simpleMarkerSymbol = {
              type: "simple-marker",
              color: "#1890ff",  // orange
              outline: {
                color: [255, 255, 255], // white
                width: 1
              }
            };
            let pointGraphic = new Graphic({
              geometry: {
                type: "point",
                longitude: $event.mapPoint.longitude,
                latitude: $event.mapPoint.latitude,
              },
              symbol: simpleMarkerSymbol
            })
            if (this.server.view.graphics.length){
              this.server.view.graphics.items.forEach(element => {
                element.visible  = false;
              });
            }
            this.server.view.graphics.add(pointGraphic);
            //计算弹框显示区域
            const centerPoint = this.server.view.toScreen(this.server.view.center);
            const screenPoint = this.server.view.toScreen($event.mapPoint);
            let poorX = 0;
            let poorY = 0;
            if (screenPoint.x + 710 > document.body.clientWidth){
              poorX = screenPoint.x + 750 - document.body.clientWidth
            }
            if (screenPoint.y < 305) {
              poorY = 305-screenPoint.y;
            } else if (screenPoint.y + 210 > document.body.clientHeight){
              poorY = document.body.clientHeight - screenPoint.y - 210;
            }
            const point = this.server.view.toMap({
              x: centerPoint.x + poorX,
              y: centerPoint.y - poorY
            });
            if(poorX || poorY){
              this.server.view.goTo({
                center: [point.longitude, point.latitude],
              }, {
                duration: 1000  // Duration of animation will be 5 seconds
              });
            }
            this.getChartData($event);
          })
          this.server.view.on("pointer-move", ($event) => {
            if (this.showPop) {
              const screenPoint = this.server.view.toScreen(this.activePoint);
              this.dealStyle(screenPoint)
            }
          });
        }).catch(function (error) {

        });
    })
  }
  //改变图层类型
  changeLayer(item) {
    //停止播放
    this.playKey = 1;
    this.stopLayer();
    if (this.showPop) {
      this.showPop = false;
      this.chartData = null;
    }
    this.server.elements.forEach(element => {
      element.active = false;
    })
    this.selectedType = item;
    item.active = !item.active;
    this.getPublishtime();
  }
  //点击时刻
  targetBar(key, single?) {
    if (this.showPop) {
      this.showPop = false;
    }
    if (single && this.intervalPlay) {
      this.stopLayer();
    }
    this.barList.forEach((element, index) => {
      if (element.active) {
        this.preIndex = index;
        element.active = false;
      }
    })
    this.barList[key].actived = true;
    this.barList[key].active = true;
    this.playTime = this.barList[key].date;
    this.reflashLayer(this.preIndex, key)
  }
  //播放图层
  //key:需要刷新的图层对应的文件夹
  reflashLayer(preIndex, nextIndex) {
    this.playKey = nextIndex;
    this.isSpinning = true;
    let preLayerName = this.selectedType.type + "_NAN_0" + (preIndex > 9 ? preIndex : '0'+preIndex);
    let layerName = this.selectedType.type + "_NAN_0" + (nextIndex > 9 ? nextIndex : '0' + nextIndex);
    this.server.layer.allSublayers.forEach(element => {
      if (element.title == layerName) {
        element.visible = true;
      } else if (element.title == preLayerName) {
        element.visible = false;
      }
    });
    this.isSpinning = false;
  }
  //播放
  playLayer() {
    if (this.playKey==72){
      this.preIndex = 0;
      this.playKey = 0;
    }
    this.activePlay = !this.activePlay;
    if (this.activePlay) {
      this.targetBar(this.playKey);
      this.startPlay();
    } else {
      this.stopLayer();
    }
  }
  //开始播放
  startPlay() {
    if(this.showPop){
      this.showPop = false;
    }
    this.intervalPlay = setInterval(() => {
      this.targetBar(this.playKey);
      if (this.playKey >= 71) {
        this.stopLayer();
      }
      this.playKey++
    }, 2500)
  }
  //停止播放
  stopLayer() {
    this.activePlay = false;
    clearInterval(this.intervalPlay);
  }
  //获取曲线数据
  getChartData($event) {
    this.stopLayer();
    this.server.elements.forEach(element => {
      element.active = false;
      if (element.name == this.selectedType.name) {
        element.active = true;
      }
    })
    this.activePoint = $event.mapPoint;
    const screenPoint = this.server.view.toScreen($event.mapPoint);
    this.dealStyle(screenPoint)
    this.isLoading = true;
    let options = {
      api: this.api_chart + $event.mapPoint.longitude + "/" + $event.mapPoint.latitude + "/" + this.selectedType.chartName
    }
    this.server.getRxjsData(options).subscribe((data) => {
      var windData = echarts.util.map(data, function (entry) {
        return [entry.time, entry.speed, entry.lable, entry.dirAngle];
      });
      this.listOfData = data;
      let seriesLists = []
      let categorieList = []; //x轴
      let dirAngleList = []; //角度
      let speedList = []; //曲线
      this.listOfData.forEach((element: any) => {
        if (element.dirAngle) {
          dirAngleList.push(parseInt(element.dirAngle))
        }
        speedList.push(element.speed);
        categorieList.push(element.time);
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
              x: dims.time,
              y: dims.speed
            },
            data: windData,
            z: 10
          }
        )
      }
      let obj = {
        height: "186px",
        width: "680px",
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            return params.length > 1 ?
              [
                this.selectedType.seriesRightName + '：' + params[0].value + this.selectedType.unit,
                this.selectedType.seriesLeftName + '：' + params[1].value[dims.lable],
                // '角度：' + params[1].value[dims.dirAngle],
                '时间：' + params[1].value[dims.time],
              ].join('<br>')
              : [this.selectedType.seriesRightName + '：' + params[0].value + this.selectedType.unit, '时间：' + params[0].name].join('<br>');
          }
        },
        dataZoom: [{
          type: 'inside',
          xAxisIndex: 0,
          dataZoomIndex: 0,
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
          bottom: 10,
        }],
        xAxis: {
          type: 'category',
          color: '#222D65',
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
          // name: this.selectedType.name + "(" + this.selectedType.unit + ")",
          type: 'value',
        },
        visualMap: [
          {
            top: 0,
            right: 0,
            pieces: this.selectedType.pieces,
            outOfRange: this.selectedType.outOfRange,
            show: false,
            seriesIndex: 0,
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
      api.value(dims.time),
      api.value(dims.speed)
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
      // 公式为: 角度 = 180°×弧度÷π   弧度=角度×π÷180°
      rotation: api.value(dims.dirAngle) * Math.PI / 180,
      position: point,
      style: api.style({
        stroke: '#222D65',
        lineWidth: 1
      })
    };
  }
  //处理坐标
  dealStyle(screenPoint) {
    this.popoverStyle = {
      left: (screenPoint.x + 30) + 'px',
      top: (screenPoint.y - 198) + 'px',
    }
    this.showPop = true;
  }
  //关闭弹框
  closePop(){
    this.showPop = false;
    this.server.view.graphics.items.forEach(element => {
      element.visible = false;
    });
  }
}
