// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../webgl/BufferObject"],function(h,k,e){return function(){function a(b,a,c,d,g){this._elementSize=d;this._buffer=new e(b,a,c);this.resize(g)}a.prototype.destroy=function(){this._buffer.dispose()};Object.defineProperty(a.prototype,"elementSize",{get:function(){return this._elementSize},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"capacity",{get:function(){return this._capacity},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,
"array",{get:function(){return this._array},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"buffer",{get:function(){return this._buffer},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"memoryUsage",{get:function(){return{cpu:this._capacity*this._elementSize,gpu:this._capacity*this._elementSize}},enumerable:!0,configurable:!0});a.prototype.copyRange=function(b,a,c,d){void 0===d&&(d=0);b=new Uint8Array(this.array,b*this.elementSize,(a-b)*this.elementSize);(new Uint8Array(c.array,
d*this.elementSize)).set(b)};a.prototype.transferAll=function(){this._buffer.setData(this._array)};a.prototype.transferRange=function(a,f){a*=this._elementSize;this._buffer.setSubData(this._array,a,a,f*this._elementSize)};a.prototype.resize=function(a){var b=a*this._elementSize,c=new ArrayBuffer(b);this._array&&(a>=this._capacity?(new Uint8Array(c)).set(new Uint8Array(this._array)):(new Uint8Array(c)).set((new Uint8Array(this._array)).subarray(0,a*this._elementSize)));this._array=c;this._buffer.setData(b);
this._capacity=a};return a}()});