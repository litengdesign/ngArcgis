// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../types"],function(q,m,n){function p(c,b,a){var d=c.typedBuffer;c=c.typedBufferStride;var g=b.typedBuffer,e=b.typedBufferStride;b=a?a.count:b.count;var f=(a&&a.dstIndex?a.dstIndex:0)*c;a=(a&&a.srcIndex?a.srcIndex:0)*e;for(var l=0;l<b;++l)d[f]=g[a],d[f+1]=g[a+1],f+=c,a+=e}Object.defineProperty(m,"__esModule",{value:!0});m.copy=p;m.normalizeIntegerBuffer=function(c,b,a){var d=c.typedBuffer,g=c.typedBufferStride,e=b.typedBuffer,f=b.typedBufferStride,l=a?a.count:b.count,
h=(a&&a.dstIndex?a.dstIndex:0)*g,k=(a&&a.srcIndex?a.srcIndex:0)*f;if(n.isInteger(b.elementType))if(a=n.maximumValue(b.elementType),n.isSigned(b.elementType))for(b=0;b<l;++b)d[h]=Math.max(e[k]/a,-1),d[h+1]=Math.max(e[k+1]/a,-1),h+=g,k+=f;else for(b=0;b<l;++b)d[h]=e[k]/a,d[h+1]=e[k+1]/a,h+=g,k+=f;else p(c,b,a);return c}});