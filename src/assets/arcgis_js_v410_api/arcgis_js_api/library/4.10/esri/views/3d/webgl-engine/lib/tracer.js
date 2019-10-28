// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./webgl-debug","../../../webgl/capabilities/isWebGL2Context"],function(g,b,e,f){Object.defineProperty(b,"__esModule",{value:!0});var c=null,d=[];b.enabled=!1;b.begin=function(){b.enabled&&(c=[])};b.trace=function(a){b.enabled&&null!=c&&c.push(a)};b.end=function(){if(b.enabled){var a=c;c=null;a&&(d.forEach(function(b){return b(a)}),d.length=0);return a}};b.instrumentContext=function(a){return b.enabled?f.default(a)?(console.warn("WebGL tracer is not supported on a WebGL2 Context"),
a):e.makeDebugContext(a,void 0,function(a,d){b.enabled&&c&&c.push("gl."+a+"("+e.glFunctionArgsToString(a,d)+")")}):a};b.request=function(a){d.push(a)}});