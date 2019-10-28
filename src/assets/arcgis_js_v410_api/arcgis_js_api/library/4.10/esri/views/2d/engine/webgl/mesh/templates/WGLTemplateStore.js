// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/tsSupport/awaiterHelper ../../../../../../core/tsSupport/generatorHelper ../../../../../../symbols ../../../../../../core/Error ../../../../../../core/Logger ../../../../../../core/promiseUtils ../../enums ./WGLFillTemplate ./WGLLineTemplate ./WGLMarkerTemplate ./WGLTextTemplate ../../util/BidiText ../../util/Lock ../../util/Result ../../util/vvFlagUtils".split(" "),function(u,v,l,m,r,z,A,t,n,w,B,x,C,D,y,q,p){function h(b,a){var c=b.length;b.push(null);
a.then(function(a){return b[c]=a});return b}Object.defineProperty(v,"__esModule",{value:!0});var k=A.getLogger("esri.views.2d.engine.webgl.mesh.templates.WGLTemplateStore"),E=[],F=new r.SimpleFillSymbol({color:"black",outline:null}),G=new r.SimpleMarkerSymbol({size:"14px",color:"black",outline:null}),H=new r.SimpleLineSymbol({color:"black",width:"2px"});u=function(){function b(a,c){this._templateIdCounter=this._idCounter=0;this._idToTemplateGroup=new Map;this._symbolToTemplate=new Map;this._fetchQueue=
[];this._idToResolver=new Map;this._pixelRatio=1;this._lock=new y.default;this._fetchResource=a;this._pixelRatio=c}Object.defineProperty(b.prototype,"_markerError",{get:function(){return this._errorTemplates.marker[0]},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"_fillError",{get:function(){return this._errorTemplates.fill[0]},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"_lineError",{get:function(){return this._errorTemplates.line[0]},enumerable:!0,configurable:!0});
b.prototype.createTemplateGroup=function(a,c,d,g){this._initErrorTemplates(d);var e=this._hashSymbol(a);if(!this._symbolToTemplate.has(e)){var f=[];c&&this._createMeshTemplates(f,d,c,g,this._pixelRatio,!0);this._createMeshTemplates(f,d,a,g,this._pixelRatio,!1);a=this._createGroupId();this._idToTemplateGroup.set(a,f);this._symbolToTemplate.set(e,a)}return this._symbolToTemplate.get(e)};b.prototype.getTemplateGroup=function(a){return this._idToTemplateGroup.has(a)?this._idToTemplateGroup.get(a):E};
b.prototype.finalize=function(){return this._fetchQueue.length||this._lock.isHeld()?y.withLock(this._lock,this._fetchAllQueuedResources.bind(this)):t.resolve()};b.prototype._initErrorTemplates=function(a){if(!this._errorTemplates){var c=this._pixelRatio,d=this._createMeshTemplates([],a,F,0,c,!1),g=this._createMeshTemplates([],a,G,0,c,!1);a=this._createMeshTemplates([],a,H,0,c,!1);this._errorTemplates={fill:d,marker:g,line:a}}};b.prototype._fetchAllQueuedResources=function(){var a=this;if(!this._fetchQueue.length)return t.resolve();
var c=this._fetchQueue;this._fetchQueue=[];return this._fetchResource(c).then(function(c){for(var d=0;d<c.length;d++){var e=c[d],f=e.id,e=e.mosaicItem;a._idToResolver.get(f)(e);a._idToResolver.delete(f)}}).catch(function(d){"cancel"===d.dojoType?a._fetchQueue=a._fetchQueue.concat(c):k.error(z("mapview-template-store","Unable to fetch requested texture resources",d))})};b.prototype._createGroupId=function(){return this._idCounter++};b.prototype._createTemplateId=function(){return this._templateIdCounter++};
b.prototype._getCodepoints=function(a){a=D.bidiText(a.text)[0];for(var c=[],d=0;d<a.length;d++)c.push(a.charCodeAt(d));return c};b.prototype._getMosaicItem=function(a){var c=this,d=this._createTemplateId(),g="text"===a.type&&this._getCodepoints(a),e=t.create(function(a){return c._idToResolver.set(d,a)});this._fetchQueue.push({symbol:a.toJSON(),id:d,glyphIds:g});return e};b.prototype._hashSymbol=function(a){return a.id?a.id:JSON.stringify(a)};b.prototype._createSMS=function(a,c,d,g){return l(this,
void 0,void 0,function(){var e,f;return m(this,function(b){switch(b.label){case 0:return[4,this._getMosaicItem(c)];case 1:return e=b.sent().spriteMosaicItem,f=p.getMarkerVVFlags(d),q.ok(e,k)?[2,x.default.fromSimpleMarker(a,f,c,e,g)]:[2,this._markerError]}})})};b.prototype._createPMS=function(a,c,d,b){return l(this,void 0,void 0,function(){var e,f;return m(this,function(g){switch(g.label){case 0:return[4,this._getMosaicItem(c)];case 1:return e=g.sent().spriteMosaicItem,f=p.getMarkerVVFlags(d),q.ok(e,
k)?[2,x.default.fromPictureMarker(a,f,c,e,b)]:[2,this._markerError]}})})};b.prototype._createSFS=function(a,c,d,b,e){return l(this,void 0,void 0,function(){var f,g;return m(this,function(h){switch(h.label){case 0:return[4,this._getMosaicItem(c)];case 1:return f=h.sent().spriteMosaicItem,g=p.getFillVVFlags(d),q.ok(f,k)?[2,w.default.fromSimpleFill(a,g,c,f,b,e)]:[2,this._fillError]}})})};b.prototype._createPFS=function(a,c,d,b,e){return l(this,void 0,void 0,function(){var f,g;return m(this,function(h){switch(h.label){case 0:return[4,
this._getMosaicItem(c)];case 1:return f=h.sent().spriteMosaicItem,g=p.getFillVVFlags(d),q.ok(f,k)?[2,w.default.fromPictureFill(a,g,c,f,b,e)]:[2,this._fillError]}})})};b.prototype._createSLS=function(a,c,d,b,e){return l(this,void 0,void 0,function(){var f,g;return m(this,function(h){switch(h.label){case 0:return[4,this._getMosaicItem(c)];case 1:return f=h.sent().spriteMosaicItem,g=p.getLineVVFlags(d,e),q.ok(f,k)?[2,B.default.fromSimpleLine(a,g,c,f,b)]:[2,this._lineError]}})})};b.prototype._createTS=
function(a,c,d,b){return l(this,void 0,void 0,function(){var e,f;return m(this,function(g){switch(g.label){case 0:return[4,this._getMosaicItem(c)];case 1:return e=g.sent().glyphMosaicItems,f=p.getTextVVFlags(d),[2,C.default.fromText(a,f,c,b,e)]}})})};b.prototype._createMeshTemplates=function(a,c,d,b,e,f){if(-1!==d.type.indexOf("3d"))return k.error("3D symbols are not supported with MapView"),a;switch(d.type){case n.EsriSymbolTypeKebab.SIMPLE_MARKER:return h(a,this._createSMS(c,d,b,e));case n.EsriSymbolTypeKebab.PICTURE_MARKER:return h(a,
this._createPMS(c,d,b,e));case n.EsriSymbolTypeKebab.SIMPLE_FILL:return h(a,this._createSFS(c,d,b,e,f)),d.outline&&h(a,this._createSLS(c,d.outline,b,e,!0)),a;case n.EsriSymbolTypeKebab.PICTURE_FILL:return h(a,this._createPFS(c,d,b,e,f)),d.outline&&h(a,this._createSLS(c,d.outline,b,e,!0)),a;case n.EsriSymbolTypeKebab.SIMPLE_LINE:return h(a,this._createSLS(c,d,b,e,!1));case n.EsriSymbolTypeKebab.TEXT:return h(a,this._createTS(c,d,b,e));default:return k.error("Unable to create mesh template for unknown symbol type: "+
d.type),a}};return b}();v.default=u});