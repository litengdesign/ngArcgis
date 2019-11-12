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
          color: '#e6f0ff',
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
          lte: 1,
          color: '#e6f0ff',
        },
        {
          gte: 1,
          lte: 1.5,
          color: '#bee8ff',
        },
        {
          gte: 1.5,
          lte: 2,
          color: '#55C2EC',
        },
        {
          gte: 2,
          lte: 2.5,
          color: '#139ADE',
        },
        {
          gte: 2.5,
          lte: 3,
          color: '#0073CB',
        },
        {
          gte: 3,
          lte: 3.5,
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
          color: '#1800FF',
        },
        {
          gte: 15,
          lte: 16,
          color: '#3891FF',
        },
        {
          gte: 16,
          lte: 17,
          color: '#18F2FF',
        },
        {
          gte: 17,
          lte: 18,
          color: '#59FFE7',
        },
        {
          gte: 18,
          lte: 19,
          color: '#B5FF8C',
        },
        {
          gte: 19,
          lte: 20,
          color: '#EFFF39',
        },
        {
          gte: 20,
          lte: 21,
          color: '#FFF500',
        },
        {
          gte: 21,
          lte: 22,
          color: '#FFCB03',
        },
        {
          gte: 22,
          lte: 23,
          color: '#FEA200',
        },
        {
          gte: 23,
          lte: 24,
          color: '#FF4C00',
        },
        {
          gte: 24,
          lte: 25,
          color: '#FE0000',
        },
        {
          gte: 25,
          color: '#ff0000',
        }
      ],
      outOfRange: {
        color: '#0000ff'
      },
      max: 36,
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
          gte: 4,
          color: "#ff0000",
        },
        {
          gte: 3,
          lte: 3.5,
          color: "#ff4d00",
        },
        {
          gte: 2.5,
          lte: 3,
          color: "#ff7500",
        },
        {
          gte: 2,
          lte: 2.5,
          color: "#ffa200",
        },
        {
          gte: 1.5,
          lte: 2,
          color: "#ffcb00",
        },
        {
          gte: 1,
          lte: 1.5,
          color: "#fff300",
        },
        {
          gte: 0.5,
          lte: 1,
          color: "#fdff34",
        },
        {
          gte: 0,
          lte: 0.5,
          color: "#d6ff63",
        },
        {
          gte: -0.5,
          lte: 0,
          color: "#b5ff8c",
        },
        {
          gte: -1,
          lte: -0.5,
          color: "#8cffbd",
        },
        {
          gte: -1.5,
          lte: -1,
          color: "#8cffbd",
        },
        {
          gte: -2,
          lte: -1.5,
          color: "#21dfe9",
        },
        {
          gte: -2.5,
          lte: -2,
          color: "#2bccff",
        },
        {
          gte: -3,
          lte: -2.5,
          color: "#2bccff",
        },
        {
          gte: -3.5,
          lte: -3,
          color: "#3969ff",
        },
        {
          gte: -3.5,
          color: "#293cff",
        }
      ],
      outOfRange: {
        color: '#39f700'
      },
      max: 4,
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
