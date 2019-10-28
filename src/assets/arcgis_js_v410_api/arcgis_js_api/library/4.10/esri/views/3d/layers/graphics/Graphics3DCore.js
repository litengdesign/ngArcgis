// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper ../../../../geometry ../../../../renderers ../../../../symbols ../../../../core/Accessor ../../../../core/arrayUtils ../../../../core/compilerUtils ../../../../core/Error ../../../../core/Handles ../../../../core/iteratorUtils ../../../../core/Logger ../../../../core/now ../../../../core/ObjectPool ../../../../core/PooledArray ../../../../core/promiseUtils ../../../../core/watchUtils ../../../../core/accessorSupport/decorators ../../../../core/libs/gl-matrix-2/gl-matrix ../../../../geometry/support/aaBoundingBox ../../../../geometry/support/aaBoundingRect ../../../../layers/Layer ../../../../layers/graphics/dehydratedFeatures ../../../../renderers/support/diffUtils ../../../../renderers/support/rendererConversion ../../../../symbols/support/symbolConversion ./ElevationQuery ./featureExpressionInfoUtils ./Graphics3DGraphic ./Graphics3DOwner ./Graphics3DSymbolFactory ./Graphics3DWebStyleSymbol ./graphicUtils ./symbolComplexity ../../support/mathUtils ../../support/projectionUtils ../../support/PropertiesPool ../../webgl-engine/Stage ../../webgl-engine/lib/GridLocalOriginFactory ../../webgl-engine/lib/Layer".split(" "),
function(u,ma,P,h,Q,R,H,x,y,S,m,T,I,U,B,V,z,W,C,J,D,k,K,L,X,Y,M,Z,aa,N,ba,A,ca,da,ea,fa,ga,ha,q,v,ia,O,ja,ka){var w=new H.Point,E=K.vec3f64.create(),g=L.create(),n=V.getLogger("esri.views.3d.layers.graphics.Graphics3DCore");u=function(u){function c(a){a=u.call(this)||this;a.propertiesPool=new ia.PropertiesPool({computedExtent:H.Extent},a);a.computedExtent=null;a.symbolCreationContext=new da.Graphics3DSymbolCreationContext;a.graphics=new Map;a.stageLayer=null;a.stage=null;a.graphicsDrapedUids=new Set;
a.graphicsBySymbol=new Map;a.symbolConversionCache=new Map;a.symbols=new Map;a.graphicsWithoutSymbol={};a.graphicsWaitingForSymbol=new Set;a.lastFastUpdate=null;a.handles=new U;a.viewSR=null;a.elevationAlignment=null;a.scaleVisibility=null;a.spatialIndex=null;a.deconfliction=null;a.labeling=null;a.highlights=null;a.viewElevationProvider=null;a.sharedSymbolResourcesOwnerHandle=null;a.whenGraphics3DGraphicRequests={};a.pendingUpdates=new Map;a.pendingAdds=0;a.pendingRemoves=0;a.pendingUpdatesPool=new C({allocator:function(a){return a||
{add:null,remove:null}},deallocator:function(a){a.add=null;a.remove=null;return a}});a.symbolWarningLogged=!1;a.geometryWarningLogged=!1;a._whenSymbolRemoved=[];a.asyncUpdates=!1;a.elevationFeatureExpressionEnabled=!0;a.owner=null;a.layer=null;a.hasDraped=!1;a.graphicSymbolSupported=!0;a._usedMemory=0;a.numberOfGraphics=0;a._visible=void 0;a._startCreateGraphics=!1;a.maxPendingUpdates=0;return a}P(c,u);F=c;Object.defineProperty(c.prototype,"updating",{get:function(){return!!(0<this.graphicsWaitingForSymbol.size||
this.needsIdleUpdate()||this.elevationAlignment&&this.elevationAlignment.updating||this.scaleVisibility&&this.scaleVisibility.updating)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"updatingRemaining",{get:function(){return this.updating?this.pendingUpdates.size:0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"updatingTotal",{get:function(){return this.updating?this.maxPendingUpdates:0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"displayFeatureLimit",
{get:function(){var a=this.owner&&this.owner.view&&this.owner.view.qualitySettings,b=a?a.graphics3D.minTotalNumberOfFeatures:0,d=a?a.graphics3D.maxTotalNumberOfFeatures:0,a=a?a.graphics3D.maxTotalNumberOfPrimitives:0,f=this.maxSymbolComplexity,e=Math.max(b,Math.min(d,Math.ceil(a/Math.max(1,f?f.primitivesPerFeature:1)))),c=this._get("displayFeatureLimit");return c&&c.minimumTotalNumberOfFeatures===b&&c.maximumTotalNumberOfFeatures===d&&c.maximumTotalNumberOfPrimitives===a&&c.maximumSymbolComplexity===
f&&c.maximumNumberOfFeatures===e?c:{minimumTotalNumberOfFeatures:b,maximumTotalNumberOfFeatures:d,maximumTotalNumberOfPrimitives:a,maximumSymbolComplexity:f,maximumNumberOfFeatures:e}},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"maxSymbolComplexity",{get:function(){for(var a=null,b=0,d=this.getSymbolComplexities();b<d.length;b++){var f=d[b];a?0===a.primitivesPerCoordinate&&f.primitivesPerFeature>a.primitivesPerFeature?a=f:0!==a.primitivesPerCoordinate&&f.primitivesPerCoordinate>
a.primitivesPerCoordinate&&(a=f):a=f}b=this._get("maxSymbolComplexity");return!a||b&&b.primitivesPerFeature===a.primitivesPerFeature&&b.primitivesPerCoordinate===a.primitivesPerCoordinate?b:a},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"usedMemory",{get:function(){return this._usedMemory},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"usedMemoryPerGraphic",{get:function(){return this._usedMemory&&this.numberOfGraphics?this._usedMemory/this.numberOfGraphics:
this.maxSymbolComplexity?this.maxSymbolComplexity.memory.bytesPerFeature:0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"unprocessedMemoryEstimate",{get:function(){return Math.max(0,(this.pendingAdds-this.pendingRemoves)*this.usedMemoryPerGraphic)},enumerable:!0,configurable:!0});c.prototype.getSymbolComplexities=function(){return this.layer.renderer?this.getSymbolComplexitiesUsedOrRenderer(this.layer.renderer):this.getSymbolComplexitiesUsed()};c.prototype.getConvertedSymbol=
function(a){if("web-style"===a.type)return a.clone();var b=this.symbolConversionCache.get(a.id);if(void 0!==b)return b;var b=N.to3D(a,!0,!1,this.hasLabelingContext(a)),d=b.symbol||null;d||b.error&&n.error(b.error.message);this.symbolConversionCache.set(a.id,d);return d};c.prototype.getSymbolComplexitiesUsedOrRenderer=function(a){a=a.getSymbols();if(!a||!a.length)return[];for(var b=[],d=0;d<a.length;d++){var f=a[d],c=this.symbols.get(f.id);c?b.push(c.complexity):(f=this.getConvertedSymbol(f))&&b.push(ha.defaultSymbolComplexity(f))}return b};
c.prototype.getSymbolComplexitiesUsed=function(){var a=[];this.symbols.forEach(function(b){b&&a.push(b.complexity)});return a};c.prototype.initialize=function(){this.viewSR=this.owner.view.spatialReference};c.prototype.setup=function(a){var b=this;this._set("elevationAlignment",a.elevationAlignment);this._set("scaleVisibility",a.scaleVisibility);this._set("spatialIndex",a.spatialIndex);this._set("deconfliction",a.deconfliction);this._set("labeling",a.labeling);this._set("highlights",a.highlights);
var d=this.owner.view;this.viewElevationProvider=new ba.ViewElevationProvider(this.viewSR,d);this.initializeStage(d,this.layer.uid);this.symbolCreationContext.sharedResources=d.sharedSymbolResources;this.sharedSymbolResourcesOwnerHandle=d.sharedSymbolResources.addGraphicsOwner(this.owner);this.symbolCreationContext.renderer=this.layer.renderer;this.symbolCreationContext.stage=this.stage;this.symbolCreationContext.streamDataSupplier=d.sharedSymbolResources.streamDataSupplier;this.symbolCreationContext.renderSpatialReference=
d.renderSpatialReference;this.symbolCreationContext.renderCoordsHelper=d.renderCoordsHelper;this.symbolCreationContext.layer=this.layer;this.symbolCreationContext.layerView=this.owner;this.symbolCreationContext.layerOrder=0;this.symbolCreationContext.localOriginFactory=new ja;this.symbolCreationContext.elevationProvider=d.elevationProvider;a=A.extractExpressionInfo(this.layer.elevationInfo,this.elevationFeatureExpressionEnabled);this.symbolCreationContext.featureExpressionInfoContext=A.createContext(a,
this.viewSR,n);d.deconflictor.addGraphicsOwner(this);this.symbolCreationContext.screenSizePerspectiveEnabled=d.screenSizePerspectiveEnabled&&this.layer.screenSizePerspectiveEnabled;this.symbolCreationContext.slicePlaneEnabled=!!this.owner.slicePlaneEnabled;this.handles.add(this.owner.watch("suspended",function(){return b.updateLayerVisibility()}));this.handles.add([this.owner.watch("layer"in this.owner?["layer.screenSizePerspectiveEnabled,view.screenSizePerspectiveEnabled"]:"view.screenSizePerspectiveEnabled",
function(){var a=d.screenSizePerspectiveEnabled&&b.layer.screenSizePerspectiveEnabled;a!==b.symbolCreationContext.screenSizePerspectiveEnabled&&(b.symbolCreationContext.screenSizePerspectiveEnabled=a,b.recreateAllGraphics())}),this.owner.watch("slicePlaneEnabled",function(a){return b.slicePlaneEnabledChange(!!a)}),this.owner.watch("layer.featureReduction",function(){b.deconfliction.featureReductionChange()})]);this.handles.add(D.when(d.basemapTerrain,"tilingScheme",function(a){a.spatialReference.equals(b.symbolCreationContext.overlaySR)||
(b.symbolCreationContext.overlaySR=b.basemapTerrain.spatialReference);b.handles.has("loaded-graphics")?b.recreateAllGraphics():b.handles.add(D.on(b.owner,"loadedGraphics","change",function(a){return b.graphicsCollectionChanged(a)},function(){return b.recreateAllGraphics()}),"loaded-graphics")}));this.validateRenderer(this.layer.renderer);this.notifyChange("maxSymbolComplexity")};c.prototype.destroy=function(){this.owner.view.deconflictor.removeGraphicsOwner(this);this.owner.view.labeler.removeGraphicsOwner(this);
this.clear();this.stage&&(this.stage.removeFromViewContent([this.stageLayer.id]),this.stage.remove(O.ModelContentType.LAYER,this.stageLayer.id),this.stage=this.stageLayer=null);this.handles.destroy();this.viewSR=this.handles=null;this._set("owner",null);for(var a in this.whenGraphics3DGraphicRequests)this.whenGraphics3DGraphicRequests[a].reject(new I("graphic:layer-destroyed","Layer has been destroyed"));this.whenGraphics3DGraphicRequests=null;this.sharedSymbolResourcesOwnerHandle&&(this.sharedSymbolResourcesOwnerHandle.remove(),
this.sharedSymbolResourcesOwnerHandle=null);this.propertiesPool&&(this.propertiesPool.destroy(),this.propertiesPool=null);this.pendingUpdatesPool=null;this.symbolConversionCache.clear()};c.prototype.clear=function(){this.graphics.forEach(function(a){return a.destroy()});this.spatialIndex&&this.spatialIndex.clear();this.graphics.clear();this._usedMemory=this.numberOfGraphics=0;this.updateLayerVisibility();this.symbols.forEach(function(a){a&&a.destroy()});this.symbols.clear();this.graphicsBySymbol.clear();
this.graphicsWithoutSymbol={};this.graphicsWaitingForSymbol.clear();this.pendingUpdates.clear();this.pendingUpdatesPool.clear();this.pendingRemoves=this.pendingAdds=this.maxPendingUpdates=0;this._set("hasDraped",!1);this.notifyChange("updating");this.notifyChange("updatingTotal");this.notifyChange("updatingRemaining")};c.prototype.initializeStage=function(a,b){this.stage=a._stage;this.stageLayer=new ka(b,{isPickable:!this.owner.suspended},b);this.stage.add(O.ModelContentType.LAYER,this.stageLayer);
this.stage.addToViewContent([this.stageLayer.id])};c.prototype.setDrawingOrder=function(a){this.symbolCreationContext.layerOrder=a;var b=new Set;this.symbols.forEach(function(d){d&&d.setDrawOrder(a,b)});0<b.size&&this.stage.getDrapedTextureRenderer().updateRenderOrder(b)};c.prototype.updateLayerVisibility=function(){var a=this.numberOfGraphics>this.displayFeatureLimit.maximumNumberOfFeatures*la,a=!this.owner.suspended&&!a;a!==this._visible&&((this._visible=a)?(this.stageLayer.isPickable=!0,this.updateAllGraphicsVisibility()):
(this.stageLayer.isPickable=!1,this.hideAllGraphics()),this.updateStageLayerVisibility())};c.prototype.updateStageLayerVisibility=function(){this.stageLayer.isVisible=this._visible&&(null==this.layer.opacity||0<this.layer.opacity)};Object.defineProperty(c.prototype,"graphics3DGraphics",{get:function(){return this.graphics},enumerable:!0,configurable:!0});c.prototype.getGraphics3DGraphicById=function(a){return this.graphics.get(a)};Object.defineProperty(c.prototype,"graphics3DGraphicsByObjectID",{get:function(){var a=
this.owner.layer&&this.owner.layer.objectIdField;if(!a)return null;var b=new Map;this.graphics.forEach(function(d){if(d){var f=d.graphic,f=f.attributes&&f.attributes[a];null!=f&&b.set(f,d)}});return b},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelsEnabled",{get:function(){return!(!this.labeling||!this.labeling.layerLabelsEnabled())},enumerable:!0,configurable:!0});c.prototype.updateLabelingInfo=function(a){this.deconfliction&&this.deconfliction.labelingInfoChange();return this.labeling&&
this.labeling.labelingInfoChange(a)};c.prototype.updateVisibilityInfo=function(){this.deconfliction&&this.deconfliction.labelingInfoChange();return this.labeling&&this.labeling.visibilityInfoChange()};Object.defineProperty(c.prototype,"symbolUpdateType",{get:function(){var a=this;if(0<this.pendingUpdates.size)return"unknown";var b=0,d=0;return B.everyMap(this.symbols,function(f,c){if(f){f=f.getFastUpdateStatus();if(0<f.loading)return!1;a.graphicsBySymbol.has(c)&&(d+=f.fast,b+=f.slow)}})?0<=d&&0===
b?"fast":0<=b&&0===d?"slow":"mixed":"unknown"},enumerable:!0,configurable:!0});c.prototype.needsIdleUpdate=function(){return 0<this.pendingUpdates.size?!0:!!this.lastFastUpdate&&500<z()-this.lastFastUpdate};c.prototype.idleUpdate=function(a){var b=this.needsIdleUpdate();this._applyPendingUpdates(a);!a.done()&&this.lastFastUpdate&&(this.lastFastUpdate=null);a=this.needsIdleUpdate();b!==a&&this.notifyChange("updating")};c.prototype.whenGraphics3DGraphic=function(a){var b=this.graphics.get(a.uid);if(b)return J.resolve(b);
if(b=this.whenGraphics3DGraphicRequests[a.uid])return b.promise;b=J.createDeferred();this.whenGraphics3DGraphicRequests[a.uid]=b;return b.promise};c.prototype.boundsForGraphics3DGraphic=function(a,b){return R(this,void 0,void 0,function(){var d,f,c,r,g,k,h,p,l,m;return Q(this,function(e){switch(e.label){case 0:return d=this.owner.view.spatialReference,f=this.owner.view.renderSpatialReference,c=this.owner.view.basemapTerrain.spatialReference,r=function(a,b,c){return v.bufferToBuffer(a,f,b,a,d,b,c)},
g=function(a,b,f){return v.bufferToBuffer(a,c,b,a,d,b,f)},k=this.viewElevationProvider?{service:this.viewElevationProvider,useViewElevation:b&&b.useViewElevation,minDemResolution:b&&b.minDemResolution,minDemResolutionForPoints:this.owner.view.resolution}:null,[4,a.getProjectedBoundingBox(r,g,k)];case 1:h=e.sent();if(!h)return[2,null];p=h.boundingBox;h.requiresDrapedElevation&&(l=this.symbolCreationContext.elevationProvider)&&(L.center(p,E),w.x=E[0],w.y=E[1],w.z=void 0,w.spatialReference=d,m=l.getElevation(w)||
0,p[2]=Math.min(p[2],m),p[5]=Math.max(p[5],m));return[2,{boundingBox:p,screenSpaceObjects:h.screenSpaceObjects}]}})})};c.prototype.whenGraphicBounds=function(a,b){var d=this;return D.whenOnce(this.owner,"loadedGraphics").then(function(){var b=d.owner.layer&&d.owner.layer.objectIdField,c=d.owner.loadedGraphics.find(function(d){return d===a?!0:b&&d.attributes&&a.attributes&&d.attributes[b]===a.attributes[b]});if(c)return d.whenGraphics3DGraphic(c);throw new I("internal:graphic-not-part-of-view","Graphic is not part of this view");
}).then(function(a){return d.boundsForGraphics3DGraphic(a,b)})};c.prototype.graphicsCollectionChanged=function(a){this._startCreateGraphics&&(this.add(a.added),this.remove(a.removed))};c.prototype.graphicUpdateHandler=function(a){var b=this.graphics.get(a.graphic.uid);if(b)switch(a.property){case "visible":this.graphicUpdateVisible(b,a);break;case "geometry":case "attributes":case "symbol":this.recreateGraphic(b);break;default:T.neverReached(a)}};c.prototype.graphicUpdateVisible=function(a,b){(a=
a.setVisibilityFlag(0,b.newValue))&&this.labeling&&(this.lastFastUpdate=z(),this.owner.view.labeler.setDirty());a&&this.owner.view.deconflictor.setDirty()};c.prototype.recreateGraphic=function(a){a=[a.graphic];this.remove(a);this.add(a)};c.prototype._beginGraphicUpdate=function(a){this.graphicsWaitingForSymbol.add(a.uid);1===this.graphicsWaitingForSymbol.size&&this.notifyChange("updating");this._get("symbolsUpdating")||this._set("symbolsUpdating",!0)};c.prototype._endGraphicUpdate=function(a){a&&
(this.graphicsWaitingForSymbol.delete(a.uid),0===this.graphicsWaitingForSymbol.size&&(this._cleanupSymbols(),this.notifyChange("updating"),this._get("symbolsUpdating")&&(this.owner.view.flushDisplayModifications(),this._set("symbolsUpdating",!1))))};c.prototype.expandComputedExtent=function(a){var b=a.spatialReference;M.computeAABB(a,g);a=this.viewSR;var d=F.tmpVec;!b.equals(a)&&v.xyzToVector(g[0],g[1],0,b,d,a)&&(g[0]=d[0],g[1]=d[1],v.xyzToVector(g[3],g[4],0,b,d,a),g[3]=d[0],g[4]=d[1]);if(q.isFinite(g[0])&&
q.isFinite(g[3])&&q.isFinite(g[1])&&q.isFinite(g[4])){var b=this.computedExtent,d=null,c=q.isFinite(g[2])&&q.isFinite(g[5]),e=c&&(!b||null==b.zmin||g[2]<b.zmin),c=c&&(!b||null==b.zmax||g[5]>b.zmax);if(b){if(g[0]<b.xmin||g[1]<b.ymin||g[3]>b.xmax||g[4]>b.ymax||e||c)d=this.propertiesPool.get("computedExtent"),d.xmin=Math.min(g[0],b.xmin),d.ymin=Math.min(g[1],b.ymin),d.xmax=Math.max(g[3],b.xmax),d.ymax=Math.max(g[4],b.ymax),d.spatialReference=a}else d=this.propertiesPool.get("computedExtent"),d.xmin=
g[0],d.ymin=g[1],d.xmax=g[3],d.ymax=g[4],d.spatialReference=a;d&&(e&&(d.zmin=g[2]),c&&(d.zmax=g[5]),this._set("computedExtent",d))}};c.prototype.updateHasDraped=function(){this._set("hasDraped",0<this.graphicsDrapedUids.size)};c.prototype.elevationInfoChange=function(){var a=this,b=A.extractExpressionInfo(this.layer.elevationInfo,this.elevationFeatureExpressionEnabled);this.symbolCreationContext.featureExpressionInfoContext=A.createContext(b,this.viewSR,n);this.labeling&&this.labeling.elevationInfoChange();
this.layer.renderer!==this.symbolCreationContext.renderer&&this.rendererChange(this.layer.renderer);this.forEachGraphics3DSymbol(function(b,c,e){if(b.layerPropertyChanged("elevationInfo",c))for(var d in c){e=c[d];b=e.graphic;e=e._labelGraphics;for(var f=0;f<e.length;f++){var g=e[f];g.graphics3DSymbolLayer.updateGraphicElevationContext(b,g)}}else a._recreateSymbol(e)});this.elevationAlignment&&this.elevationAlignment.elevationInfoChange()};c.prototype.clearSymbolsAndGraphics=function(){this.clear();
this.labeling&&this.labeling.reset();this.deconfliction&&this.deconfliction.clear();this.elevationAlignment&&this.elevationAlignment.clear();this.stageLayer&&this.stageLayer.invalidateSpatialQueryAccelerator()};c.prototype.startCreateGraphics=function(){this._startCreateGraphics=!0;this.recreateAllGraphics()};c.prototype.recreateAllGraphics=function(){this._startCreateGraphics&&(this.clearSymbolsAndGraphics(),this._set("computedExtent",null),this.symbolCreationContext.screenSizePerspectiveEnabled=
this.owner.view.screenSizePerspectiveEnabled&&this.layer.screenSizePerspectiveEnabled,this.symbolCreationContext.slicePlaneEnabled=!!this.owner.slicePlaneEnabled,this.owner.loadedGraphics&&this.owner.view.basemapTerrain.tilingScheme&&this.add(this.owner.loadedGraphics.toArray()))};c.prototype._recreateSymbol=function(a){var b=this,d=[],c=[];this.graphicsBySymbol.get(a).forEach(function(a,f){var e=a.usedMemory;a.isDraped()&&b.graphicsDrapedUids.delete(f);b.labeling&&b.labeling.removeGraphic(a);b.deconfliction&&
b.deconfliction.removeGraphic(a);b.spatialIndex&&d.push(a);c.push(a.graphic);a.destroy();b.removeGraphics3DGraphic(f,e);b.updateLayerVisibility()});0<d.length&&this.spatialIndex.removeMany(d);this.graphicsBySymbol.set(a,new Map);var e=this.symbols.get(a);e&&e.destroy();this.symbols.delete(a);this.updateHasDraped();this.add(c)};c.prototype.add=function(a){this.owner.view.basemapTerrain&&this.owner.view.basemapTerrain.tilingScheme?(this.asyncUpdates?this._addDelayed(a):this._addImmediate(a),this.notifyChange("updating")):
n.error("#add()","Cannot add graphics before terrain surface has been initialized")};c.prototype._addImmediate=function(a){var b=this;this.symbolWarningLogged=this.geometryWarningLogged=!1;l.clear();for(var d=0;d<a.length;d++)this._startAddGraphic(a[d],l);l.forEach(function(a){return b._finishAddGraphics(a)});l.clear();this.updateHasDraped();this._cleanupSymbols();this.owner.view.labeler.setDirty();this._cleanupSymbols()};c.prototype._addDelayed=function(a){for(var b=0;b<a.length;b++){var d=a[b],
c=d.uid,e=this.pendingUpdates.get(c);e?(e.add||this.pendingAdds++,e.add=d):(e=this.pendingUpdatesPool.pushNew(),e.add=d,this.pendingAdds++,this.pendingUpdates.set(c,e))}this.maxPendingUpdates=Math.max(this.maxPendingUpdates,this.pendingUpdates.size);this.notifyChange("updatingTotal");this.notifyChange("updatingRemaining")};c.prototype.remove=function(a){this.asyncUpdates?this._removeDelayed(a):this._removeImmediate(a);this.notifyChange("updating")};c.prototype._removeImmediate=function(a){for(var b=
0;b<a.length;b++)this._removeGraphic(a[b]);this.updateHasDraped();this._cleanupSymbols();this.owner.view.labeler.setDirty()};c.prototype._removeDelayed=function(a){for(var b=0;b<a.length;b++){var d=a[b],c=d.uid,e=this.pendingUpdates.get(c);e?e.add&&(e.remove?e.add=null:this.pendingUpdates.delete(c),this.pendingAdds--):(e=this.pendingUpdatesPool.pushNew(),e.remove=d,this.pendingUpdates.set(c,e),this.pendingRemoves++)}0===this.pendingUpdates.size&&this._finishPendingUpdates();this.maxPendingUpdates=
Math.max(this.maxPendingUpdates,this.pendingUpdates.size);this.notifyChange("updatingTotal");this.notifyChange("updatingRemaining")};c.prototype._finishPendingUpdates=function(){this.pendingUpdatesPool.clear();this.maxPendingUpdates=0;this._cleanupSymbols();(this.pendingAdds||this.pendingRemoves)&&n.warn("pendingAdds/Removes in inconsistent state!");this.pendingRemoves=this.pendingAdds=0};c.prototype._applyPendingUpdates=function(a){var b=this;if(!a.done()){this.symbolWarningLogged=this.geometryWarningLogged=
!1;var d=0;l.clear();B.everyMap(this.pendingUpdates,function(c,e){if(a.done())return!1;c.remove&&(b.pendingRemoves--,b._removeGraphic(c.remove));c.add&&(b.pendingAdds--,b._startAddGraphic(c.add,l)&&d++);b.pendingUpdates.delete(e);1E3<d&&(l.forEach(function(a){return b._finishAddGraphics(a)}),l.clear(),d=0)});l.forEach(function(a){return b._finishAddGraphics(a)});l.clear();0===this.pendingUpdates.size&&this._finishPendingUpdates();this.notifyChange("updatingTotal");this.notifyChange("updatingRemaining");
this.updateHasDraped()}};c.prototype._startAddGraphic=function(a,b){this.graphicsWithoutSymbol[a.uid]=a;var d=this._getRenderingInfo(a,n);if(!d)return!1;var c=this.getOrCreateGraphics3DSymbol(d.symbol,d.renderer);if(!c)return!1;this.expandComputedExtent(a.geometry);this._beginGraphicUpdate(a);a={graphic:a,renderingInfo:d,layer:this.layer};var d=c.symbol.id,e=b.get(d);e?e.graphics.push(a):(e=G.acquire(),e.clear(),e.push(a),b.set(d,{asyncSymbol:c,graphics:e}));return!0};c.prototype._finishAddGraphics=
function(a){var b=this,d=!1,c=function(b){b===a.asyncSymbol.symbol.id&&(d=!0)};this._whenSymbolRemoved.push(c);a.asyncSymbol.then(function(){m.removeUnordered(b._whenSymbolRemoved,c);t.clear();for(var e=0;e<a.graphics.length;e++){var f=a.graphics.data[e],g=f.graphic;d||a.asyncSymbol.destroyed||(b.graphicsWaitingForSymbol.has(g.uid)&&(f=b.createGraphics3DGraphic(a.asyncSymbol,f),b.spatialIndex&&f&&t.push(f)),b._endGraphicUpdate(g));--a.asyncSymbol.referenced}0<t.length&&(b.spatialIndex.addMany(t.data,
t.length),t.clear());a.graphics.clear();G.release(a.graphics);b.labeling&&(b.lastFastUpdate=z(),b.owner.view.labeler.setDirty())},function(){m.removeUnordered(b._whenSymbolRemoved,c);if(!d&&!a.asyncSymbol.destroyed)for(var e=0;e<a.graphics.length;e++)b._endGraphicUpdate(a.graphics.data[e].graphic);a.graphics.clear();G.release(a.graphics)})};c.prototype._removeGraphic=function(a){a=a.uid;var b=this.graphics.get(a);if(b){var d=b.usedMemory;b.isDraped()&&this.graphicsDrapedUids.delete(a);this.deconfliction&&
this.deconfliction.removeGraphic(b);this.labeling&&this.labeling.removeGraphic(b);this.spatialIndex&&this.spatialIndex.remove(b);this.graphicsBySymbol.get(b.graphics3DSymbol.symbol.id).delete(a);delete this.graphicsWithoutSymbol[a];this.removeGraphics3DGraphic(a,d);b.destroy()}else delete this.graphicsWithoutSymbol[a],this.graphicsWaitingForSymbol.delete(a)};c.prototype.hasLabelingContext=function(a){if(a instanceof y.LabelSymbol3D||a instanceof y.TextSymbol){var b=this.symbolCreationContext.layer;
return b.labelingInfo?b.labelingInfo.some(function(b){return b.symbol===a}):!1}return!1};c.prototype.hasValidSymbolCreationContext=function(a){return a instanceof y.LabelSymbol3D&&!this.hasLabelingContext(a)?(n.error("LabelSymbol3D is only valid as part of a LabelClass. Using LabelSymbol3D as a renderer symbol is not supported."),!1):!0};c.prototype._getRenderingInfo=function(a,b){if(!a.geometry)return b&&!this.geometryWarningLogged&&(this.geometryWarningLogged=!0,b.warn("Graphic in layer "+this.layer.id+
" has no geometry and will not render")),null;if(!this.graphicSymbolSupported&&a.symbol)return b&&!this.symbolWarningLogged&&(this.symbolWarningLogged=!0,b.warn("Graphic in layer "+this.layer.id+" is not allowed to have a symbol, use a renderer instead")),null;a=this.owner.getRenderingInfo&&this.owner.getRenderingInfo(a);return a&&a.symbol?a:(b&&!this.symbolWarningLogged&&(this.symbolWarningLogged=!0,b.warn("Graphic in layer "+this.layer.id+" has no symbol and will not render")),null)};c.prototype.createGraphics3DSymbol=
function(a,b){var d=this;if(!this.hasValidSymbolCreationContext(a))return null;a=this.getConvertedSymbol(a);if(!a)return null;var c;b&&"backgroundFillSymbol"in b&&b.backgroundFillSymbol&&(b=N.to3D(b.backgroundFillSymbol,!1,!0),b.symbol&&"web-style"!==b.symbol.type&&(c=b.symbol.symbolLayers));c=ea.make(a,this.symbolCreationContext,c);c.then(function(){return d.notifyChange("maxSymbolComplexity")});return c};c.prototype.getOrCreateGraphics3DSymbol=function(a,b){var d=this,c=this.symbols.get(a.id);void 0===
c&&(c=a instanceof y.WebStyleSymbol?new fa(a,function(a){return d.createGraphics3DSymbol(a,b)}):this.createGraphics3DSymbol(a,b),this.symbols.set(a.id,c));c&&++c.referenced;return c};c.prototype.addGraphics3DGraphic=function(a){this._usedMemory+=a.usedMemory;this.graphics.set(a.graphic.uid,a);this.numberOfGraphics++;this.updateLayerVisibility()};c.prototype.removeGraphics3DGraphic=function(a,b){this._usedMemory-=b;this.graphics.delete(a);this.numberOfGraphics--;this.updateLayerVisibility()};c.prototype.createGraphics3DGraphic=
function(a,b){var d=b.graphic;delete this.graphicsWithoutSymbol[d.uid];if(!this.symbols.has(a.symbol.id))this.add([d]);else if(!this.graphics.has(d.uid)){b=a.createGraphics3DGraphic(b);a=a.symbol.id;this.addGraphics3DGraphic(b);this.graphicsBySymbol.has(a)||this.graphicsBySymbol.set(a,new Map);this.graphicsBySymbol.get(a).set(d.uid,b);b.initialize(this.stageLayer,this.stage);b.isDraped()&&(this.graphicsDrapedUids.add(d.uid),this._set("hasDraped",!0));b.centroid=null;"point"!==d.geometry.type&&b instanceof
ca&&(b.centroid=ga.computeCentroid(d.geometry,this.viewSR));a=this.scaleVisibility&&this.scaleVisibility.scaleRangeActive();this.deconfliction&&this.deconfliction.addGraphic(b);this.labeling&&this.labeling.addGraphic(b);a&&this.scaleVisibility.updateGraphicScaleVisibility(b);b.setVisibilityFlag(0,!!d.visible&&!this.owner.suspended);this.owner.view.deconflictor.setInitialIconVisibilityFlag(this,b);if(a=this.whenGraphics3DGraphicRequests[d.uid])delete this.whenGraphics3DGraphicRequests[d.uid],a.resolve(b);
this.highlights&&this.highlights.graphicCreated(b);return b}};c.prototype.rendererChange=function(a){var b=this.symbolCreationContext.renderer;if(a!==b){this.validateRenderer(a);this.symbolConversionCache.clear();var d=Z.diff(b,a);this.updateUnchangedSymbolMappings(d,a,b);this.symbolCreationContext.renderer=a;d&&("complete"===d.type?this.recreateAllGraphics():"partial"===d.type&&(this.applyRendererDiff(d,a,b)?this.volatileGraphicsUpdated():this.recreateAllGraphics()),this.notifyChange("maxSymbolComplexity"))}};
c.prototype.diffHasSymbolChange=function(a){for(var b in a.diff)switch(b){case "visualVariables":case "defaultSymbol":case "uniqueValueInfos":break;case "authoringInfo":case "fieldDelimiter":delete a.diff[b];break;default:return!0}return!1};c.prototype.applySymbolSetDiff=function(a,b,d,c){var e=this;a=a||[];b=b||[];var f=[];c=function(b){var c=g.graphicsBySymbol.get(b.id);c&&c.forEach(function(g,h){var k=g.graphic,r=e.layer instanceof Y?e.layer:null;if(b!==d.defaultSymbol||d.getSymbol(M.hydrateGraphic(k,
r))!==d.defaultSymbol)r=g.usedMemory,g.isDraped()&&e.graphicsDrapedUids.delete(h),a.length||d.defaultSymbol?f.push(k):e.graphicsWithoutSymbol[h]=k,k=e.graphics.get(h),e.highlights&&e.highlights.graphicDeleted(k),e.labeling&&e.labeling.removeGraphic(k),g.destroy(),c.delete(h),e.removeGraphics3DGraphic(h,r),e.updateLayerVisibility()});for(var h=0,k=g._whenSymbolRemoved;h<k.length;h++)(0,k[h])(b.id)};for(var g=this,h=0;h<b.length;h++)c(b[h]);if(a.length||f.length){for(var k in this.graphicsWithoutSymbol)f.push(this.graphicsWithoutSymbol[k]);
this.graphicsWithoutSymbol={};this.add(f)}this.updateHasDraped();this._cleanupSymbols();this.owner.view.labeler.setDirty()};c.prototype.applyUniqueValueRendererDiff=function(a,b,c){var d=a.diff.defaultSymbol,e=a.diff.uniqueValueInfos;if(d||e){var g=e?e.added.map(function(a){return a.symbol}):[],h=e?e.removed.map(function(a){return a.symbol}):[];if(e)for(var k=0;k<e.changed.length;k++)g.push(e.changed[k].newValue.symbol),h.push(e.changed[k].oldValue.symbol);d?(c.defaultSymbol&&h.push(c.defaultSymbol),
b.defaultSymbol&&g.push(b.defaultSymbol)):c.defaultSymbol&&g.length&&h.push(b.defaultSymbol);this.applySymbolSetDiff(g,h,b,c);delete a.diff.defaultSymbol;delete a.diff.uniqueValueInfos;return!0}return!1};c.prototype.calculateUnchangedSymbolMapping=function(a,b,c){if(b instanceof x.UniqueValueRenderer&&c instanceof x.UniqueValueRenderer&&(!a||"partial"===a.type)){var d=a&&a.diff;a=d&&d.defaultSymbol;var d=d&&d.uniqueValueInfos,e=void 0,e=d?d.unchanged.map(function(a){return{oldId:a.oldValue.symbol.id,
newId:a.newValue.symbol.id}}):c.uniqueValueInfos.map(function(a,c){return{oldId:a.symbol.id,newId:b.uniqueValueInfos[c].symbol.id}});!a&&c.defaultSymbol&&e.push({oldId:c.defaultSymbol.id,newId:b.defaultSymbol.id});return e}return[]};c.prototype.updateUnchangedSymbolMappings=function(a,b,c){var d=0;for(a=this.calculateUnchangedSymbolMapping(a,b,c);d<a.length;d++)if(c=a[d],b=c.oldId,c=c.newId,b&&b!==c){var e=this.graphicsBySymbol.get(b);this.graphicsBySymbol.delete(b);void 0!==e&&this.graphicsBySymbol.set(c,
e);e=this.symbols.get(b);this.symbols.delete(b);void 0!==e&&(this.symbols.set(c,e),e.symbol.id=c)}};c.prototype.applyRendererDiff=function(a,b,c){var d=this;return this.diffHasSymbolChange(a)?!1:b instanceof x.UniqueValueRenderer&&c instanceof x.UniqueValueRenderer&&this.applyUniqueValueRendererDiff(a,b,c)&&0===Object.keys(a.diff).length?!0:B.everyMap(this.graphicsBySymbol,function(c,f){if((c=d.symbols.get(f))&&!c.applyRendererDiff(a,b))return!1})};c.prototype.opacityChange=function(){this.forEachGraphics3DSymbol(function(a){return a.layerPropertyChanged("opacity")});
this.updateStageLayerVisibility()};c.prototype.slicePlaneEnabledChange=function(a){a!==this.symbolCreationContext.slicePlaneEnabled&&(this.symbolCreationContext.slicePlaneEnabled=a,this.stageLayer.isSliceable=a,this.forEachGraphics3DSymbol(function(a,c){return a.layerPropertyChanged("slicePlaneEnabled",c)}),this.deconfliction&&this.deconfliction.slicePlaneEnabledChange(),this.labeling&&this.labeling.slicePlaneEnabledChange())};c.prototype.setClippingExtent=function(a,b){var c=this.symbolCreationContext.clippingExtent,
f=X.create();v.extentToBoundingRect(a,f,b)?this.symbolCreationContext.clippingExtent=[f[0],f[1],-Infinity,f[2],f[3],Infinity]:this.symbolCreationContext.clippingExtent=null;return!m.equals(this.symbolCreationContext.clippingExtent,c)};c.prototype.forEachGraphics3DGraphic=function(a){var b=this;if(this.owner.loadedGraphics){var c=!1;this.owner.loadedGraphics.forEach(function(d){var e=b.getGraphics3DGraphicById(d.uid);e&&a(e,d)&&(c=!0)});c&&(this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty())}};
c.prototype.forEachGraphics3DSymbol=function(a){var b=this;this.graphicsBySymbol.forEach(function(c,f){var d=b.symbols.get(f);d&&a(d,c,f)})};c.prototype.updateAllGraphicsVisibility=function(){var a=this;this.forEachGraphics3DGraphic(function(b,c){c=b.setVisibilityFlag(0,c.visible);var d=!1;a.scaleVisibility&&(d=a.scaleVisibility.updateGraphicScaleVisibility(b));return c||d})};c.prototype.hideAllGraphics=function(){this.forEachGraphics3DGraphic(function(a){return a.setVisibilityFlag(0,!1)})};c.prototype.validateRenderer=
function(a){(a=aa.validateTo3D(a))&&n.warn("Renderer for layer '"+(this.layer.title?this.layer.title+", ":"")+", id:"+this.layer.id+"' is not supported in a SceneView",a.message)};c.prototype.volatileGraphicsUpdated=function(){this.labeling&&(this.lastFastUpdate=z(),this.labeling.reset());this.stageLayer.invalidateSpatialQueryAccelerator();this.stageLayer.shaderTransformationChanged();this.notifyChange("updating")};c.prototype._cleanupSymbols=function(){var a=this;if(!(0<this.graphicsWaitingForSymbol.size)){var b=
!1;this.symbols.forEach(function(c,f){if(c&&!(0<c.referenced)){var d=a.graphicsBySymbol.get(f);d&&0!==d.size||(a.graphicsBySymbol.delete(f),a.symbols.delete(f),c&&c.destroy(),b=!0)}});b&&this.notifyChange("maxSymbolComplexity")}};c.prototype.snapshotInternals=function(){var a=this;return{graphics:m.keysOfMap(this.graphics).sort(),symbols:m.keysOfMap(this.symbols).sort(),graphicsBySymbol:m.keysOfMap(this.graphicsBySymbol).sort().map(function(b){return{symbolId:b,graphics:m.keysOfMap(a.graphicsBySymbol.get(b)).sort()}}),
graphicsWithoutSymbol:Object.keys(this.graphicsWithoutSymbol).sort(),graphicsDrapedUids:m.keysOfSet(this.graphicsDrapedUids).sort(),pendingUpdates:this.pendingUpdates}};Object.defineProperty(c.prototype,"debug",{get:function(){return{symbols:this.symbols}},enumerable:!0,configurable:!0});c.prototype.getStats=function(){return{coreVisible:this.graphics.size,coreMissing:Object.keys(this.graphicsWithoutSymbol).length,corePending:this.pendingUpdates.size}};var F;c.tmpVec=K.vec3f64.create();h([k.property({readOnly:!0})],
c.prototype,"computedExtent",void 0);h([k.property({readOnly:!0})],c.prototype,"elevationAlignment",void 0);h([k.property({readOnly:!0})],c.prototype,"scaleVisibility",void 0);h([k.property({readOnly:!0})],c.prototype,"spatialIndex",void 0);h([k.property({readOnly:!0})],c.prototype,"deconfliction",void 0);h([k.property({readOnly:!0})],c.prototype,"labeling",void 0);h([k.property({readOnly:!0})],c.prototype,"highlights",void 0);h([k.property()],c.prototype,"asyncUpdates",void 0);h([k.property({constructOnly:!0})],
c.prototype,"elevationFeatureExpressionEnabled",void 0);h([k.property({constructOnly:!0})],c.prototype,"owner",void 0);h([k.property({constructOnly:!0})],c.prototype,"layer",void 0);h([k.property({constructOnly:!0})],c.prototype,"basemapTerrain",void 0);h([k.property({readOnly:!0})],c.prototype,"hasDraped",void 0);h([k.property({readOnly:!0})],c.prototype,"symbolsUpdating",void 0);h([k.property({constructOnly:!0})],c.prototype,"graphicSymbolSupported",void 0);h([k.property({readOnly:!0,dependsOn:["elevationAlignment.updating",
"scaleVisibility.updating"]})],c.prototype,"updating",null);h([k.property({readOnly:!0})],c.prototype,"updatingRemaining",null);h([k.property({readOnly:!0})],c.prototype,"updatingTotal",null);h([k.property({readOnly:!0,dependsOn:["owner.view.qualitySettings.graphics3D.maxTotalNumberOfPrimitives","owner.view.qualitySettings.graphics3D.maxTotalNumberOfFeatures","maxSymbolComplexity"]})],c.prototype,"displayFeatureLimit",null);h([k.property({readOnly:!0})],c.prototype,"maxSymbolComplexity",null);return c=
F=h([k.subclass("esri.views.3d.layers.graphics.Graphics3DCore")],c)}(k.declared(S));var l=new Map,t=new C,G=new W(C);(function(){return function(){this.remove=this.add=null}})();var la=10;return u});