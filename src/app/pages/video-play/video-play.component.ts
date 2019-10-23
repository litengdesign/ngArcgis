import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';
import { format, addHours, differenceInDays } from 'date-fns';
import { NzMessageModule } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.less']
})
export class VideoPlayComponent implements OnInit {
  //API
  public api_list_vedio_pinhu = '/jx/pinghuvideo';//平湖视频列表
  public api_list_vedio_haiyan = '/jx/haiyanvideo'//海盐视频列表

  //其他参数
  public loading = false; //预加载
  public displayData = [];
  public listData = [];
  public selectedType = 'pinhu';
  public isVisible = false;
  public fileObj: any = {};
  public isSpinning = true;
  public vedioDate = null;
  constructor(public server: ServersService) { }

  ngOnInit() {
    this.server.isDataForecast = false;
    this.getVedioList('pinhu');
  }
  //获取视频列表
  getVedioList(key) {
    this.selectedType = key;
    let options = {
      api: this.selectedType == 'pinhu' ? this.api_list_vedio_pinhu : this.api_list_vedio_haiyan
    }
    this.loading = true;
    this.server.getRxjsData(options).subscribe((data) => {
      this.displayData = data;
      this.listData = data;
      this.loading = false;
      this.isSpinning = false;
    })
  }
  //搜索数据
  searchData() {
    this.loading = true;
    if (this.vedioDate && this.vedioDate.length){
      this.listData = [];
      this.displayData.forEach(element => {
        console.log(differenceInDays(new Date(element.filedate), this.vedioDate[0]))
        console.log(differenceInDays(new Date(element.filedate), this.vedioDate[1]))
        if (differenceInDays(new Date(element.filedate), this.vedioDate[0]) >= 0 && differenceInDays(new Date(element.filedate), this.vedioDate[1]) <= 0) {
          this.listData.push(element)
        }
      })
    }else{
      this.listData = this.displayData;
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }
  //播放视频
  playVideo(item) {
    this.isVisible = true;
    this.fileObj = {
      filename: item.filename,
      path: this.selectedType == 'pinhu' ? "https://xxs.dhybzx.org:3000/jx/pinghuvideo/" + item.filename : "https://xxs.dhybzx.org:3000/jx/haiyanvideo/" + item.filename
    }
  }
  handleCancel() {
    this.isVisible = false;
  }


}
