// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler"],function(a,b,e,f){Object.defineProperty(b,"__esModule",{value:!0});a=function(a){function c(c,b,e){var d=a.call(this,!0)||this;d.key=b;d.registerIncoming("key-down",e,function(a){return d._handleKeyDown(a)});return d}e(c,a);c.prototype._handleKeyDown=function(a){a.data.key===this.key&&(this.activate(),a.stopPropagation())};return c}(f.InputHandler);b.SingleKey=a});