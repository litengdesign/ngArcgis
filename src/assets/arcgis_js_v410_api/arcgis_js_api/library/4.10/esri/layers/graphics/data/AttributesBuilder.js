// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","@dojo/framework/shim/Map","./attributeSupport"],function(h,k,l,g){Object.defineProperty(k,"__esModule",{value:!0});h=function(){function f(a,b){this._fieldDataCache=new l.default;this._returnDistinctMap=new l.default;this.returnDistinctValues=a.returnDistinctValues;this.fieldsMap=b;if((a=a.outFields)&&-1===a.indexOf("*")){this.outFields=a;for(var c=b=0;c<a.length;c++){var e=a[c],d=g.getExpressionFromFieldName(e),f=this.fieldsMap.has(d),d=f?null:g.getWhereClause(d),f=f?
this.fieldsMap.get(e).name:g.getAliasFromFieldName(e)||"FIELD_EXP_"+b++;this._fieldDataCache.set(e,{alias:f,clause:d})}}}f.prototype.getAttributes=function(a){a=a.attributes;a=this._processAttributesForOutFields(a);return a=this._processAttributesForDistinctValues(a)};f.prototype.getFieldValue=function(a,b){a=a.attributes;var c=this.fieldsMap.has(b),e=c?this.fieldsMap.get(b).name:b,d=null;this._fieldDataCache.has(e)?d=this._fieldDataCache.get(e).clause:c||(d=g.getWhereClause(b),this._fieldDataCache.set(e,
{alias:e,clause:d}));return c?a[e]:d.calculateValue(a)};f.prototype.validateItem=function(a,b){this._fieldDataCache.has(b)||this._fieldDataCache.set(b,{alias:b,clause:g.getWhereClause(b)});return this._fieldDataCache.get(b).clause.testFeature(a.attributes)};f.prototype.validateItems=function(a,b){var c=this;this._fieldDataCache.has(b)||this._fieldDataCache.set(b,{alias:b,clause:g.getWhereClause(b)});a=a.map(function(a){return c.getAttributes(a)});return this._fieldDataCache.get(b).clause.testSet(a)};
f.prototype._processAttributesForOutFields=function(a){var b=this.outFields;if(!a||!b||!b.length)return a;for(var c={},e=0;e<b.length;e++){var d=this._fieldDataCache.get(b[e]),f=d.alias,d=d.clause;c[f]=d?d.calculateValue(a):a[f]}return c};f.prototype._processAttributesForDistinctValues=function(a){if(!a||!this.returnDistinctValues)return a;var b=this.outFields,c=[];if(b)for(var e=0;e<b.length;e++){var d=this._fieldDataCache.get(b[e]).alias;c.push(a[d])}else for(d in a)c.push(a[d]);b=(b||["*"]).join(",")+
"\x3d"+c.join(",");c=this._returnDistinctMap.get(b)||0;this._returnDistinctMap.set(b,++c);return 1<c?null:a};return f}();k.default=h});