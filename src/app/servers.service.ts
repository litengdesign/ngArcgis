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
          lte: 4,
          color: '#e6f0ff',
        },
        {
          gte: 4,
          lte: 5,
          color: '#d2e8ff',
        },
        {
          gte: 5,
          lte: 6,
          color: '#fae9d4',
        },
        {
          gte: 6,
          lte: 7,
          color: '#f0cab1',
        },
        {
          gte: 7,
          lte: 8,
          color: '#e6ad91',
        },
        {
          gte: 8,
          lte: 9,
          color: '#cc7958',
        },
        {
          gte: 9,
          lte: 10,
          color: '#c86437',
        },
        {
          gte: 10,
          lte: 11,
          color: '#be502a',
        },
        {
          gte: 11,
          lte: 12,
          color: '#a0351d',
        }
      ],
      max:12,
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
          lte: 2,
          color: '#bee8ff',
        },
        {
          gte: 2,
          lte: 3,
          color: '#55c2ed',
        },
        {
          gte: 4,
          lte: 6,
          color: '#149bde',
        },
        {
          gte: 6,
          lte: 9,
          color: '#0074cc',
        },
        {
          gte: 9,
          lte: 14,
          color: '#ffff00',
        }
      ],
      max: 14,
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
          lte: 0.2,
          color: '#2b41ff',
        },
        {
          gte: 0.2,
          lte: 0.4,
          color: '#386dff',
        },
        {
          gte: 0.4,
          lte: 0.6,
          color: '#3b9dff',
        },
        {
          gte: 0.6,
          lte: 0.8,
          color: '#30cfff',
        },
        {
          gte: 0.8,
          lte: 1,
          color: '#00ffff',
        },
        {
          gte: 1,
          lte: 1.2,
          color: '#70ffdc',
        },
        {
          gte: 1.2,
          lte: 1.4,
          color: '#a1ffa4',
        },
        {
          gte: 1.4,
          lte: 1.6,
          color: '#c7ff78',
        },
        {
          gte: 1.6,
          lte: 1.8,
          color: '#e7ff4a',
        },
        {
          gte: 1.8,
          lte: 2,
          color: '#ffff00',
        },
        {
          gte: 2,
          lte: 2.2,
          color: '#ffd500',
        },
        {
          gte: 2.2,
          lte: 2.4,
          color: '#ffac00',
        },
        {
          gte: 2.4,
          lte: 2.6,
          color: '#ff7b00',
        },
        {
          gte: 2.6,
          lte: 2.8,
          color: '#ff4d00',
        },
        {
          gte: 2.8,
          color: '#923636',
        }
      ],
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
          lte: 4,
          color: '#0000ff',
        },
        {
          gte: 4,
          lte: 6,
          color: '#293cff',
        },
        {
          gte: 6,
          lte: 8,
          color: '#3969ff',
        },
        {
          gte: 8,
          lte: 10,
          color: '#3992ff',
        },
        {
          gte: 10,
          lte: 12,
          color: '#31c3ff',
        },
        {
          gte: 12,
          lte: 14,
          color: '#18f3ff',
        },
        {
          gte: 14,
          lte: 16,
          color: '#5affe7',
        },
        {
          gte: 16,
          lte: 18,
          color: '#8cffbd',
        },
        {
          gte: 18,
          lte: 20,
          color: '#b5ff8c',
        },
        {
          gte: 20,
          lte: 22,
          color: '#d6ff63',
        },
        {
          gte: 22,
          lte: 24,
          color: '#efff39',
        },
        {
          gte: 24,
          lte: 26,
          color: '#fff300',
        },
        {
          gte: 26,
          lte: 28,
          color: '#ffcb00',
        },
        {
          gte: 28,
          lte: 30,
          color: '#ffa200',
        },
        {
          gte: 30,
          lte: 32,
          color: '#ff7500',
        },
        {
          gte: 32,
          lte: 34,
          color: '#ff4d00',
        },
        {
          gte: 34,
          lte: 36,
          color: '#ff0000',
        }
      ],
      max: 36,
      active: false
    },
    {
      name: "盐度",
      type: "SAL",
      mapServer: "SAL/MapServer",
      chartName: "salinity",
      icon: "iconGroup3",
      unit: "‰",
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
          gte: 34,
          lte: 36,
          color: "#f70000",
        }
      ],
      max: 36,
      active: false
    },
    {
      name: "潮位",
      type: "TIDE",
      mapServer: "TIDE/MapServer",
      chartName: "tide",
      icon: "iconlang",
      unit: "m",
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
