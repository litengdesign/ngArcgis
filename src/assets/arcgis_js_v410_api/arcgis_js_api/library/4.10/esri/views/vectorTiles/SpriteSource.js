// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper ../../request ../../core/promiseUtils".split(" "),function(l,m,n,p,h,g){return function(){function e(b,f){this.baseURL=b;this.devicePixelRatio=f;this._isRetina=!1;this._spritesData={};this.height=this.width=this.image=null;this.loadStatus="not-loaded"}Object.defineProperty(e.prototype,"spriteNames",{get:function(){var b=[],f;for(f in this._spritesData)b.push(f);b.sort();return b},enumerable:!0,configurable:!0});
e.prototype.getSpriteInfo=function(b){return this._spritesData[b]};e.prototype.load=function(){var b=this;this.loadStatus="loading";return this.baseURL?this._loadSprites().then(function(){b.loadStatus="loaded";return b}).catch(function(f){b.loadStatus="failed";return b}):g.resolve(this)};e.prototype._loadSprites=function(){var b=this;this._isRetina=1.15<this.devicePixelRatio?!0:!1;var f=this.baseURL,e=this._isRetina?"@2x":"",k=""+f+e+".png";return g.all([h(f+e+".json",{responseType:"json"}),h(k,{responseType:"image"})]).then(function(d){var a=
d[0];d=d[1];var c=Object.keys(a.data);if(!c||0===c.length||1===c.length&&"_ssl"===c[0]||!d||!d.data)return b._spritesData=b.image=null,b.width=b.height=0,g.resolve(null);b._spritesData=a.data;a=d.data;b.width=a.width;b.height=a.height;d=document.createElement("canvas");c=d.getContext("2d");d.width=a.width;d.height=a.height;c.drawImage(a,0,0,a.width,a.height);a=c.getImageData(0,0,a.width,a.height);a=new Uint8Array(a.data);for(c=0;c<a.length;c+=4)d=a[c+3]/255,a[c]*=d,a[c+1]*=d,a[c+2]*=d;b.image=a})};
return e}()});