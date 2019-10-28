// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/assignHelper @dojo/framework/shim/Set ../../../../../geometry ../../../../../core/Error ../../../../../core/has ../../../../../core/Logger ../../../../../core/promiseUtils ../../../../../core/QueueProcessor ../../../../../core/accessorSupport/decorators ../../../../../layers/graphics/featureConversionUtils ../../../../../layers/graphics/data/FeatureStore ../../../../../layers/graphics/data/QueryEngine ../../../../../layers/support/FeatureProcessing ../../../../../tasks/operations/query ../../../../../tasks/support/QuantizationParameters ../../../../../tasks/support/Query ../../../engine/webgl/Utils ./BaseController ../support/DataTile ../support/DataTileFeaturesIndex ../support/Tile ../support/TileUpdateQueue ../../../tiling/TileQueue".split(" "),
function(f,y,E,k,S,r,z,A,n,F,q,G,h,t,B,C,H,u,I,p,J,K,D,L,v,M,N){Object.defineProperty(y,"__esModule",{value:!0});var w=F.getLogger("esri.views.2d.layers.features.controllers.OnDemandController");f=n("esri-featurelayer-webgl");n=n("esri-mobile");var O=f&&"object"===typeof f&&null!=f.maxDrillLevel?f.maxDrillLevel:n?1:4,P=f&&"object"===typeof f&&null!=f.maxRecordCountFactor?f.maxRecordCountFactor:n?1:3,Q=f&&"object"===typeof f&&null!=f.enablePBFQuery?f.enablePBFQuery:!0,x=new r.default,l=[];r=function(f){function c(){var a=
null!==f&&f.apply(this,arguments)||this;a.type="on-demand";a._queryInfoHash=null;a._processingInMainThread=!1;a._dataTileIndex=new L.default;a._editsQueue=new G({concurrency:1,ordered:!0,process:function(b){return a._processEditsEvent(b)}});return a}E(c,f);c.prototype.initialize=function(){var a=this;this._fetchQueue=new N({concurrency:10,strategy:"center-first",tileInfoView:this.tileStore.tileScheme,process:function(b){return a._fetchTile(b)}});this._updateQueue=new M.default({tileInfoView:this.tileStore.tileScheme,
process:function(b,d){return a._updateTile(b,d)}});this.handles.add(this.watch("processor",this._switchProcessor.bind(this)))};c.prototype.destroy=function(){this._fetchQueue.clear();this._updateQueue.clear();this.queryEngine&&(this.queryEngine.destroy(),this._set("queryEngine",null))};Object.defineProperty(c.prototype,"processing",{get:function(){return H.fromWorker(this.configuration.processing)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"updating",{get:function(){return this._fetchQueue.updating||
this._updateQueue.updating},enumerable:!0,configurable:!0});c.prototype.onEdits=function(a){var b=this;this._fetchQueue.pause();this._fetchQueue.reset();this._editsQueue.push(a).then(function(){0===b._editsQueue.length&&b._fetchQueue.resume()})};c.prototype.queryFeatures=function(a){return this.queryEngine.executeQuery(p.fromJSON(a))};c.prototype.queryFeatureCount=function(a){return this.queryEngine.executeQueryForCount(p.fromJSON(a))};c.prototype.queryObjectIds=function(a){return this.queryEngine.executeQueryForIds(p.fromJSON(a))};
c.prototype.queryExtent=function(a){return this.queryEngine.executeQueryForExtent(p.fromJSON(a))};c.prototype.redraw=function(){this._updateQueue.pause();this._manageTiles(this.tileStore.tiles);this._updateQueue.resume()};c.prototype.refresh=function(){this.queryEngine&&this.queryEngine.destroy();this.spatialIndex&&this.spatialIndex.clear();this._dataTileIndex.spatialIndex=null;this._dataTileIndex.clear();this._editsQueue.pause();this._fetchQueue.pause();this._updateQueue.pause();this._editsQueue.clear();
this._fetchQueue.reset();this._updateQueue.clear();if(this.processor){var a=this.processor.queryInfo,b=a.definitionExpression,d=a.gdbVersion,a=a.historicMoment;this._set("spatialIndex",new B.default({geometryType:this.service.geometryType,hasM:!1,hasZ:!1}));this._set("queryEngine",new C.default({definitionExpression:b,fields:this.service.fields,geometryType:this.service.geometryType,objectIdField:this.service.objectIdField,hasM:!1,hasZ:!1,spatialReference:this.spatialReference.toJSON(),cacheSpatialQueries:!0,
gdbVersion:d,historicMoment:null!=a&&new Date(a),spatialIndex:this.spatialIndex}));this._dataTileIndex.spatialIndex=this.spatialIndex;this._dataTileIndex.clear();this._manageTiles(this.tileStore.tiles);this._fetchQueue.resume();this._editsQueue.resume();this._updateQueue.resume()}};c.prototype.setViewState=function(a){this._fetchQueue.state=a;this._updateQueue.state=a};c.prototype.onTileUpdate=function(a){this.queryEngine&&this._manageTiles(a.added,a.removed)};c.prototype._manageTiles=function(a,
b){void 0===b&&(b=null);for(var d=this._dataTileIndex,e=this._fetchQueue,g=this._updateQueue,c="esriGeometryPoint"===this.service.geometryType,R=function(a){var b=d.get(a.id);b?(b.displayTile=a,c?d.forEach(function(d){v.isChildOf(d,b)&&(d.displayTile=a)}):b.done=!1):(b=new D.default,b.tile=a.clone(),b.displayTile=a,d.add(b));f._processDataTile(b)},f=this,h=0;h<a.length;h++){var m=a[h];R(m)}if(b)for(a=0;a<b.length;a++)m=b[a],x.add(m),g.cancel(m.id);d.forEach(function(a){x.has(a.displayTile)&&l.push(a)});
for(g=0;g<l.length;g++)m=l[g],e.has(m.id)&&e.getPromise(m.id).cancel(),d.delete(m);l.length=0;x.clear()};c.prototype._processDataTile=function(a){var b=this,d=a.key,e=this._fetchQueue,g=d.id,c=this._queryInfoHash,d=d.level-a.displayTile.key.level>=O;this._dataTileIndex.add(a);if(a.done||e.has(g)){if(a.queryInfoHash!==c||a.returnExceeded!==d)if(a.done)a.done=!1;else if(e.isOngoing(g))e.getPromise(g).cancel();else{a.queryInfoHash=c;a.returnExceeded=d;return}}else a.queryInfoHash=c,a.returnExceeded=
d;a.done?this._invalidateTile(a.displayTile):e.has(g)||e.push(a).then(function(d){return b._handleResponse(a,d)}).catch(function(b){"cancel"!==b.dojoType&&w.error(new A("mapview-controller","Encountered an error when handling tile response",b));a.done=!0})};c.prototype._handleResponse=function(a,b){a.done=!0;t.hydrateOptimizedFeatureSet(b);if(b.exceededTransferLimit)if(a.returnExceeded)this._dataTileIndex.setTileFeatures(a,b.features),this._deleteChildrenDataTiles(a);else{b=0;for(var d=a.tile.createChildTiles();b<
d.length;b++){var e=d[b],g=new D.default;g.tile=e;g.displayTile=a.displayTile;this._processDataTile(g)}}else this._dataTileIndex.setTileFeatures(a,b.features),this._deleteChildrenDataTiles(a);this._invalidateTile(a.tile)};c.prototype._deleteChildrenDataTiles=function(a){this._dataTileIndex.forEach(function(b){v.isChildOf(b,a)&&l.push(b)});for(var b=0;b<l.length;b++){var d=l[b];this._fetchQueue.has(d.id)&&this._fetchQueue.getPromise(d.id).cancel();this._dataTileIndex.delete(d)}l.length=0};c.prototype._fetchTile=
function(a){var b=this;a=this._createQuery(a.displayTile,a.tile,a.returnExceeded);var d=this.service.source;return Q&&this.service.capabilities.query.supportsFormatPBF?u.executeQueryPBF(d,a,{type:"optimized"}).then(function(a){return a.data}):u.executeQuery(d,a).then(function(a){return t.convertFromFeatureSet(a.data,b.service.objectIdField)})};c.prototype._invalidateTile=function(a){var b=this._updateQueue,d=0;for(a=this.tileStore.intersections(a,this.processor.queryInfo.pixelBuffer);d<a.length;d++){var e=
a[d].tile;b.push(e.id,e.updateTimestamp)}};c.prototype._updateTile=function(a,b){var d=this,e=this.tileStore.get(a);a=this.processor.queryInfo;a=this.queryEngine.executeTileQuery(e,{pixelBuffer:a.pixelBuffer,returnGeometry:a.returnGeometry,returnCentroid:a.returnCentroid});var g=a.objectIds,c={features:a.features,fields:this.service.fields,objectIdFieldName:this.service.objectIdField,transform:{originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]}};return this._applyProcessing(c).catch(function(a){a&&
"cancel"!==a.dojoType&&w.error("updating-tile",a);return c}).then(function(a){var c=[],f=!0;d._dataTileIndex.forEach(function(a){e.id!==a.id&&v.isChildOf(a,e)&&f&&!a.done&&(f=!1)});f&&e&&e.objectIds.forEach(function(a){g.has(a)||c.push(a)});g.forEach(function(a){e.objectIds.add(a)});e.updateTimestamp=b;return d.processor.onTileData(e,{addOrUpdate:a.features,remove:c,transformParams:J.getTransformParams(a)}).catch(function(a){a&&"cancel"!==a.dojoType&&w.error("updating-tile",a)})})};c.prototype._processEditsEvent=
function(a){var b=this;return q.create(function(d,e){e=function(a){return a.objectId};var c=a.deletedFeatures.map(e),f=b._dataTileIndex.deleteFeaturesById(c),c=a.addedFeatures.concat(a.updatedFeatures).map(e);if(c.length)e=b.service.source,c=b._createObjectIdsQuery(c),u.executeQuery(e,c).then(function(a){if((a=a.data)&&a.features&&a.features.length)for(a=t.convertFromFeatureSet(a,b.service.objectIdField).features,f.push.apply(f,b._dataTileIndex.addOrUpdateFeatures(a)),a=0;a<f.length;a++)b._invalidateTile(f[a].tile)}).then(d,
d);else{for(e=0;e<f.length;e++)b._invalidateTile(f[e].tile);d()}})};c.prototype._switchProcessor=function(a,b){var d=a.queryInfo;b=d.definitionExpression;var e=d.gdbVersion,d=d.historicMoment;a=this._createQueryInfoHash(a);this._queryInfoHash!==a&&(this._queryInfoHash=a,this.queryEngine&&this.queryEngine.destroy(),this.spatialIndex&&this.spatialIndex.clear(),this._set("spatialIndex",new B.default({geometryType:this.service.geometryType,hasM:!1,hasZ:!1})),this._set("queryEngine",new C.default({definitionExpression:b,
fields:this.service.fields,geometryType:this.service.geometryType,objectIdField:this.service.objectIdField,hasM:!1,hasZ:!1,spatialReference:this.spatialReference.toJSON(),cacheSpatialQueries:!0,gdbVersion:e,historicMoment:null!=d&&new Date(d),spatialIndex:this.spatialIndex})),this._dataTileIndex.spatialIndex=this.spatialIndex,this._dataTileIndex.forEach(function(a){a.done=!1}));this._editsQueue.pause();this._fetchQueue.pause();this._updateQueue.pause();this._editsQueue.clear();this._fetchQueue.reset();
this._updateQueue.clear();this._manageTiles(this.tileStore.tiles);this._fetchQueue.resume();this._editsQueue.resume();this._updateQueue.resume()};c.prototype._createQuery=function(a,b,d){void 0===d&&(d=!0);var e=this.service.geometryType,c=this._createDefaultQuery();a="esriGeometryPoint"===this.service.geometryType?b:a;c.maxRecordCountFactor=P;c.resultType="tile";c.returnExceededLimitFeatures=d;c.geometry=new z.Extent({xmin:b.bounds[0],ymin:b.bounds[1],xmax:b.bounds[2],ymax:b.bounds[3],spatialReference:this.spatialReference});
if(this.service.capabilities.query.supportsQuantization)c.quantizationParameters=new I.default({mode:"view",originPosition:"upper-left",tolerance:a.resolution,extent:new z.Extent({xmin:a.bounds[0],ymin:a.bounds[1],xmax:a.bounds[2],ymax:a.bounds[3],spatialReference:this.spatialReference})}),"esriGeometryPolyline"===e&&(c.maxAllowableOffset=a.resolution);else if("esriGeometryPolyline"===e||"esriGeometryPolygon"===e)c.maxAllowableOffset=a.resolution;return c};c.prototype._createObjectIdsQuery=function(a){var b=
this._createDefaultQuery();b.objectIds=a;return b};c.prototype._createDefaultQuery=function(){var a=this,b=this.processor.queryInfo,d=new p;d.outSpatialReference=this.spatialReference;var c=b.outFields,f=b.orderByFields;this.processing&&(c=c&&c.filter(function(b){return!a.processing.getField(b)}),f=f&&f.filter(function(b){return!a.processing.getField(b)}));c=.75<=c.length/this.service.fields.length?["*"]:c;d.gdbVersion=b.gdbVersion;d.historicMoment=null!=b.historicMoment?new Date(b.historicMoment):
null;d.outFields=c;d.where=b.definitionExpression||"1\x3d1";d.returnGeometry=!0;d.returnCentroid=b.returnCentroid;d.orderByFields=f;return d};c.prototype._applyProcessing=function(a){var b=this.processing;if(!b)return q.resolve(a);if(this._processingInMainThread)return this.remoteClient.invoke("executeProcessing",{featureSet:a});try{var d=b.process(a,b.options);return d?"then"in d?d:q.resolve(d):q.reject(new A("FeatureLayer","invalid processing.process() method, returns nothing"))}catch(e){return this._processingInMainThread=
!0,this.remoteClient.invoke("executeProcessing",{featureSet:a})}};c.prototype._createQueryInfoHash=function(a){var b=this,d=a.queryInfo,c=d.orderByFields,d=d.outFields,f=a.queryInfo;a=f.definitionExpression;var h=f.gdbVersion,f=f.historicMoment;this.processing&&(d=d&&d.filter(function(a){return!b.processing.getField(a)}),c=c&&c.filter(function(a){return!b.processing.getField(a)}));d&&d.sort();c&&c.sort();return JSON.stringify({definitionExpression:a,outFields:.75<=d.length/this.service.fields.length?
["*"]:d,orderByFields:c,gdbVersion:h,historicMoment:f})};k([h.property()],c.prototype,"_fetchQueue",void 0);k([h.property()],c.prototype,"_updateQueue",void 0);k([h.property()],c.prototype,"configuration",void 0);k([h.property({readOnly:!0,dependsOn:["configuration"]})],c.prototype,"processing",null);k([h.property({readOnly:!0})],c.prototype,"queryEngine",void 0);k([h.property({readOnly:!0})],c.prototype,"spatialIndex",void 0);k([h.property({dependsOn:["_fetchQueue.updating","_updateQueue.updating"]})],
c.prototype,"updating",null);return c=k([h.subclass()],c)}(h.declared(K.default));y.default=r});