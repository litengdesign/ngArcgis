import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import { ServersService } from '../../servers.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-arcgis-map',
  templateUrl: './arcgis-map.component.html',
  styleUrls: ['./arcgis-map.component.less']
})

export class ArcgisMapComponent implements OnInit {
  public view;
  constructor(public server: ServersService) { }
  @Output('checked') checkedBack = new EventEmitter<any>();
  ngOnInit() {
    //加载地图
    this.initMap();
  }
  initMap() {
    // first, we use Dojo's loader to require the map class
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "extras/TDTLayer",
    ]).then(([Map, MapView, TDTLayer]) => {
      // jiaxin 44407920251c35ea7e90953fed95f563
      // jxweb key df97ab6ec21a7baa838a4833eddf35ae
      // dba355508086fb3d8a49c74ca6971afd
      //天地图
      var tdtLayer = new TDTLayer({
        urlTemplate: "http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=df97ab6ec21a7baa838a4833eddf35ae",
      });
      //天地图标识
      var annoTDTLayer = new TDTLayer({
        id: "anooMarkerLayer",
        title: "anooMarkerLayer",
        urlTemplate: "http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=df97ab6ec21a7baa838a4833eddf35ae",
      })
      this.server.map = new Map({
        basemap: {
          baseLayers: [tdtLayer, annoTDTLayer],
        }
      });

      this.server.view = new MapView({
        container: "viewDiv",
        map: this.server.map,
        zoom:11,
        minZoom: 5,//最小空间等级
        maxZoom: 18,//最大空间等级
        center: [121.1135, 30.5007]
      });
      this.server.view.when(() => {
        this.checkedBack.emit();
      })
    })
      .catch(err => {
        console.error(err);
      });
  }

}
