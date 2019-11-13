import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  public configUrl = environment.API; //获取环境文件中api地址
  public postHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
  
  public isDataForecast = false;
  constructor(private http: HttpClient, private msg: NzMessageService) {
  }
  public map;
  public view;
  public layer;
  public sublayerList = [];
  public elements = [
    {
      name: "海面风",
      type: "WIND",
      mapServer: "WIND/MapServer",
      chartName: "wind",
      icon: "iconGroup",
      unit: "m/s",
      seriesLeftName: '风向',
      seriesRightName: '风速',
      pieces: [
        {
          gte: 0,
          lte: 8,
          color: '#E5EFFE',
        },
        {
          gte: 8,
          lte: 10.7,
          color: '#d2e8ff',
        },
        {
          gte: 10.7,
          lte: 13.8,
          color: '#fae9d4',
        },
        {
          gte: 13.8,
          lte: 17.1,
          color: '#f0cab1',
        },
        {
          gte: 17.1,
          lte: 20.7,
          color: '#e6ad91',
        },
        {
          gte: 20.7,
          lte: 24.4,
          color: '#cc7958',
        },
        {
          gte: 24.4,
          lte: 28.4,
          color: '#c86437',
        },
        {
          gte: 28.4,
          lte: 32.6,
          color: '#be502a',
        },
        {
          gte: 32.6,
          color: '#a0351d',
        }
      ],
      outOfRange: {
        color: '#e6f0ff'
      },
      max: 33,
      hasChart:true,
      hasChartKey: true,
      hasAngle: true,
      active: true
    },
    {
      name: "海浪",
      type: "WAVE",
      mapServer: "WAVE/MapServer",
      chartName: "wave",
      icon: "iconFill",
      unit: "m",
      seriesLeftName: '浪向',
      seriesRightName: '浪高',
      pieces: [
        {
          gte: 0,
          lte: 0.5,
          color: '#e6f0ff',
        },
        {
          gte: 0.5,
          lte: 1,
          color: '#bee8ff',
        },
        {
          gte: 1,
          lte: 1.5,
          color: '#55C2EC',
        },
        {
          gte: 1.5,
          lte: 2,
          color: '#139ADE',
        },
        {
          gte: 2,
          lte: 2.5,
          color: '#0073CB',
        },
        {
          gte: 2.5,
          lte: 3,
          color: '#FEFF04',
        },
        {
          gte: 3.5,
          lte: 4,
          color: '#FF5500',
        },
        {
          gte: 4,
          color: '#ffff00',
        }
      ],
      outOfRange: {
        color: '#e6f0ff'
      },
      max: 4,
      hasChart: true,
      hasChartKey: true,
      hasAngle: true,
      active: false
    },
    {
      name: "海流",
      type: "CURRENT",
      mapServer: "CURRENT/MapServer",
      chartName: "current",
      icon: "iconliuliang",
      unit: "m/s",
      seriesLeftName: '流向',
      seriesRightName: '流速',
      pieces: [
        {
          gte: 0,
          lte: 0.4,
          color: '#293BFF',
        },
        {
          gte: 0.4,
          lte: 0.8,
          color: '#33C3FF',
        },
        {
          gte: 0.8,
          lte: 1.2,
          color: '#1BF3FF',
        },
        {
          gte: 1.2,
          lte: 1.6,
          color: '#C7FF78',
        },
        {
          gte: 1.6,
          lte: 2,
          color: '#FEF300',
        },
        {
          gte: 2,
          color: '#FFA102',
        }
      ],
      outOfRange: {
        color: '#293BFF'
      },
      max: 3,
      hasAngle: true,
      hasChartKey: true,
      active: false
    },
    {
      name: "海温",
      type: "TEMP",
      mapServer: "TEMP/MapServer",
      chartName: "sst",
      icon: "iconGroup1",
      unit: "°",
      seriesRightName: '海温',
      hasChart: true,
      pieces: [
        {
          gte: 0,
          lte: 5,
          color: '#3344FF',
        },
        {
          gte: 15,
          lte: 16,
          color: '#3388FF',
        },
        {
          gte: 16,
          lte: 17,
          color: '#33CCFF',
        },
        {
          gte: 17,
          lte: 18,
          color: '#00FFFF',
        },
        {
          gte: 18,
          lte: 19,
          color: '#88FFCC',
        },
        {
          gte: 19,
          lte: 20,
          color: '#BBFF88',
        },
        {
          gte: 20,
          lte: 21,
          color: '#DDFF55',
        },
        {
          gte: 21,
          lte: 22,
          color: '#FFFF00',
        },
        {
          gte: 22,
          lte: 23,
          color: '#FFCC00',
        },
        {
          gte: 23,
          lte: 24,
          color: '#FF9900',
        },
        {
          gte: 24,
          lte: 25,
          color: '#FF5500',
        },
        {
          gte: 25,
          color: '#FF0000',
        }
      ],
      outOfRange: {
        color: '#0000ff'
      },
      max: 36,
      min:15,
      active: false
    },
    {
      name: "盐度",
      type: "SAL",
      mapServer: "SAL/MapServer",
      chartName: "salinity",
      icon: "iconGroup3",
      unit: "",
      seriesRightName: '盐度',
      pieces: [
        {
          gte: 0,
          lte: 2,
          color: "#39f700",
        },
        {
          gte: 2,
          lte: 4,
          color: "#5af700",
        },
        {
          gte: 4,
          lte: 6,
          color: "#73f700",
        },
        {
          gte: 6,
          lte: 8,
          color: "#8cf700",
        },
        {
          gte: 8,
          lte: 10,
          color: "#a5f700",
        },
        {
          gte: 10,
          lte: 12,
          color: "#bdf700",
        },
        {
          gte: 12,
          lte: 14,
          color: "#e7f700",
        },
        {
          gte: 14,
          lte: 16,
          color: "#e7f700",
        },
        {
          gte: 16,
          lte: 18,
          color: "#f7f700",
        },
        {
          gte: 18,
          lte: 20,
          color: "#f7df00",
        },
        {
          gte: 20,
          lte: 22,
          color: "#ffc700",
        },
        {
          gte: 22,
          lte: 24,
          color: "#ffb200",
        },
        {
          gte: 24,
          lte: 26,
          color: "#ff9600",
        },
        {
          gte: 26,
          lte: 28,
          color: "#ff8200",
        },
        {
          gte: 28,
          lte: 30,
          color: "#ff6900",
        },
        {
          gte: 30,
          lte: 32,
          color: "#f73400",
        },
        {
          gte: 32,
          lte: 34,
          color: "#f73400",
        },
        {
          gte: 36,
          color: "#f70000",
        }
      ],
      outOfRange: {
        color: '#39f700'
      },
      max: 36,
      active: false
    },
    {
      name: "潮位",
      type: "TIDE",
      mapServer: "TIDE/MapServer",
      chartName: "tide",
      icon: "iconlang",
      unit: "cm",
      seriesRightName: '潮高',
      pieces: [
        {
          gte: 0,
          lte: -350,
          color: "#293BFF",
        },
        {
          gte: -350,
          lte: -300,
          color: "#3969FF",
        },
        {
          gte: -300,
          lte: -250,
          color: "#3891FF",
        },
        {
          gte: -250,
          lte: -200,
          color: "#33C3FF",
        },
        {
          gte: -200,
          lte: -150,
          color: "#1BF3FF",
        },
        {
          gte: -150,
          lte: -100,
          color: "#5BFFE7",
        },
        {
          gte: -100,
          lte: -50,
          color: "#5BFFE7",
        },
        {
          gte: -50,
          lte: 0,
          color: "#B5FF8C",
        },
        {
          gte: 0,
          lte: 50,
          color: "#D5FE62",
        },
        {
          gte: 50,
          lte: 100,
          color: "#EEFF37",
        },
        {
          gte: 100,
          lte: 150,
          color: "#FEF300",
        },
        {
          gte: 150,
          lte: 200,
          color: "#FECA00",
        },
        {
          gte: 200,
          lte: 250,
          color: "#FFA102",
        },
        {
          gte:250,
          lte: 300,
          color: "#FE7500",
        },
        {
          gte: 300,
          lte: 350,
          color: "#FF4C00",
        },
        {
          gte: 350,
          color: "#FF0200",
        }
      ],
      outOfRange: {
        color: '#39f700'
      },
      max: 400,
      hasChartKey: true,
      active: false
    }
  ]
  //通过rxjs获取数据
  getRxjsData(options) {
    return new Observable<any>((observer) => {
      this.http.get(options.origin ? options.origin + options.api : this.configUrl + options.api, { params: options.params }).subscribe((response: any) => {
        if (response.status !== 0) {
          observer.next(response);
        } else {
          return false;
        }
      }, (error) => {
        if (error.status == 403) {
        }
      })
    })
  }
  postRxjsData(options) {
    return new Observable<any>((observer) => {
      this.http.post(options.origin ? options.origin + options.api : this.configUrl + options.api, JSON.stringify(options.params), { headers: this.postHeaders }).subscribe(
        (response: any) => {
          this.msg.info(response.message);
          if (response.status) {
            observer.next();
          } else {
            return false;
          }
        },
        (error) => {
          if (error.status == 403) {
          }
        }
      );
    });

  }
  //获取项目列表
  getCoastaRegional(api) {
    let options = {
      api: api,
    }
    return this.http.get(this.configUrl + options.api);
  }
  resetElementActive(){
    //设置默认选中海面风
    this.elements.forEach(element => {
      if (element.name == '海面风') {
        element.active = true;
      } else {
        element.active = false;
      }
    })
  }
}
