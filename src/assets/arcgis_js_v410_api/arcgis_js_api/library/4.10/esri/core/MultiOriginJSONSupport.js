// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ./tsSupport/declareExtendsHelper ./tsSupport/decorateHelper ./Accessor ./accessorSupport/decorators ./accessorSupport/MultiOriginStore ./accessorSupport/PropertyOrigin ./accessorSupport/read ./accessorSupport/utils ./accessorSupport/write".split(" "),function(v,w,m,n,p,k,q,e,r,h,t){function f(e){return h.getProperties(e).store}return function(l){function c(){var a=l.call(this)||this,b=h.getProperties(a),u=b.metadatas,d=b.store,c=new q.default;b.store=c;d.keys().forEach(function(a){c.set(a,
d.get(a),e.OriginId.DEFAULTS)});Object.keys(u).forEach(function(a){b.internalGet(a)&&c.set(a,b.internalGet(a),e.OriginId.DEFAULTS)});return a}m(c,l);c.prototype.clear=function(a,b){void 0===b&&(b="user");return f(this).clear(a,e.nameToId(b))};c.prototype.read=function(a,b){r.default(this,a,b);return this};c.prototype.write=function(a,b){a=a||{};t.default(this,a,b);return a};c.prototype.getAtOrigin=function(a,b){var c=f(this),d=e.nameToId(b);if("string"===typeof a)return c.get(a,d);var g={};a.forEach(function(a){g[a]=
c.get(a,d)});return g};c.prototype.originOf=function(a){var b=f(this);if("string"===typeof a)return e.idToName(b.originOf(a));a.forEach(function(a){e.idToName(b.originOf(a))})};c.prototype.revert=function(a,b){var c=f(this),d=e.nameToId(b),g=h.getProperties(this);("string"===typeof a?"*"===a?Object.keys(c.getAll(d)):[a]:a).forEach(function(a){g.propertyInvalidated(a);c.revert(a,d);g.propertyCommitted(a)})};c.prototype.removeOrigin=function(a){var b=f(this);a=e.nameToId(a);var c=b.getAll(a),d;for(d in c)b.originOf(d)===
a&&b.set(d,c[d],e.OriginId.USER)};c.prototype.updateOrigin=function(a,b){var c=f(this);b=e.nameToId(b);var d=this.get(a);c.clear(a);c.set(a,d,b)};return c=n([k.subclass("esri.core.MultiOriginJSONSupport")],c)}(k.declared(p))});