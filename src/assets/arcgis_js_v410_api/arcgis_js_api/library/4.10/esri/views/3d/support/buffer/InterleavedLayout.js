// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./BufferView","./types"],function(k,e,d,h){Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function c(a,b){this.layout=a;this.buffer="number"===typeof b?new ArrayBuffer(b*a.stride):b;b=0;for(var c=a.fieldNames;b<c.length;b++){var d=c[b],e=a.fields.get(d);this[d]=new e.constructor(this.buffer,e.offset,this.stride)}}Object.defineProperty(c.prototype,"stride",{get:function(){return this.layout.stride},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"count",{get:function(){return this.buffer.byteLength/this.stride},enumerable:!0,configurable:!0});c.prototype.getField=function(a,b){return(a=this[a])&&a.elementCount===b.ElementCount&&a.elementType===b.ElementType?a:null};c.prototype.slice=function(a,b){return new c(this.layout,this.buffer.slice(a*this.stride,b*this.stride))};return c}(),g=function(){function c(){this.stride=0;this.fields=new Map;this.fieldNames=[]}c.prototype.vec2f=function(a,b){this.appendField(a,d.BufferViewVec2f,b);return this};
c.prototype.vec2f64=function(a,b){this.appendField(a,d.BufferViewVec2f64,b);return this};c.prototype.vec3f=function(a,b){this.appendField(a,d.BufferViewVec3f,b);return this};c.prototype.vec3f64=function(a,b){this.appendField(a,d.BufferViewVec3f64,b);return this};c.prototype.vec4f=function(a,b){this.appendField(a,d.BufferViewVec4f,b);return this};c.prototype.vec4f64=function(a,b){this.appendField(a,d.BufferViewVec4f64,b);return this};c.prototype.mat3f=function(a,b){this.appendField(a,d.BufferViewMat3f,
b);return this};c.prototype.mat3f64=function(a,b){this.appendField(a,d.BufferViewMat3f64,b);return this};c.prototype.mat4f=function(a,b){this.appendField(a,d.BufferViewMat4f,b);return this};c.prototype.mat4f64=function(a,b){this.appendField(a,d.BufferViewMat4f64,b);return this};c.prototype.vec4u8=function(a,b){this.appendField(a,d.BufferViewVec4u8,b);return this};c.prototype.f32=function(a,b){this.appendField(a,d.BufferViewFloat,b);return this};c.prototype.f64=function(a,b){this.appendField(a,d.BufferViewFloat64,
b);return this};c.prototype.u8=function(a,b){this.appendField(a,d.BufferViewUint8,b);return this};c.prototype.u16=function(a,b){this.appendField(a,d.BufferViewUint16,b);return this};c.prototype.i8=function(a,b){this.appendField(a,d.BufferViewInt8,b);return this};c.prototype.vec2i8=function(a,b){this.appendField(a,d.BufferViewVec2i8,b);return this};c.prototype.vec2i16=function(a,b){this.appendField(a,d.BufferViewVec2i16,b);return this};c.prototype.vec2u8=function(a,b){this.appendField(a,d.BufferViewVec2u8,
b);return this};c.prototype.vec4u16=function(a,b){this.appendField(a,d.BufferViewVec4u16,b);return this};c.prototype.u32=function(a,b){this.appendField(a,d.BufferViewUint32,b);return this};c.prototype.appendField=function(a,b,c){var d=b.ElementCount*h.elementTypeSize(b.ElementType);this.fields.set(a,{size:d,constructor:b,offset:this.stride,optional:c});this.stride+=d;this.fieldNames.push(a)};c.prototype.alignTo=function(a){this.stride=Math.floor((this.stride+a-1)/a)*a;return this};c.prototype.hasField=
function(a){return 0<=this.fieldNames.indexOf(a)};c.prototype.createBuffer=function(a){return new f(this,a)};c.prototype.createView=function(a){return new f(this,a)};c.prototype.clone=function(){var a=new c;a.stride=this.stride;a.fields=new Map;this.fields.forEach(function(b,c){return a.fields.set(c,b)});a.fieldNames=this.fieldNames.slice();a.BufferType=this.BufferType;return a};return c}();e.InterleavedLayout=g;e.newLayout=function(){return new g}});