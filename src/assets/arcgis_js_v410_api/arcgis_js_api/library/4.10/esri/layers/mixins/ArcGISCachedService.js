// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/assignHelper ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../geometry ../../core/accessorSupport/decorators ./ArcGISService ../support/TileInfo ../support/TilemapCache".split(" "),function(l,m,n,f,c,g,b,h,e,k){return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;a.copyright=null;a.minScale=0;a.maxScale=0;a.spatialReference=null;a.tileInfo=null;a.tilemapCache=null;return a}f(a,d);Object.defineProperty(a.prototype,
"supportsBlankTile",{get:function(){return 10.2<=this.version},enumerable:!0,configurable:!0});a.prototype.readTileInfo=function(a,b){var c=b.minScale?Math.round(1E4*b.minScale)/1E4:Infinity,d=b.maxScale?Math.round(1E4*b.maxScale)/1E4:-Infinity;return a?(a.lods=a.lods.filter(function(a){a=Math.round(1E4*a.scale)/1E4;return a<=c&&a>=d}),e.fromJSON(a)):null};a.prototype.readTilemapCache=function(a,b){return b.capabilities&&-1<b.capabilities.indexOf("Tilemap")?new k({layer:this}):null};c([b.property({json:{read:{source:"copyrightText"}}})],
a.prototype,"copyright",void 0);c([b.property({json:{origins:{service:{read:!1}}}})],a.prototype,"minScale",void 0);c([b.property({json:{origins:{service:{read:!1}}}})],a.prototype,"maxScale",void 0);c([b.property({type:g.SpatialReference})],a.prototype,"spatialReference",void 0);c([b.property({readOnly:!0,dependsOn:["version"]})],a.prototype,"supportsBlankTile",null);c([b.property({type:e})],a.prototype,"tileInfo",void 0);c([b.reader("service","tileInfo",["tileInfo","minScale","maxScale"])],a.prototype,
"readTileInfo",null);c([b.property()],a.prototype,"tilemapCache",void 0);c([b.reader("service","tilemapCache",["capabilities"])],a.prototype,"readTilemapCache",null);c([b.property()],a.prototype,"version",void 0);return a=c([b.subclass("esri.layers.mixins.ArcGISCachedService")],a)}(b.declared(h))});