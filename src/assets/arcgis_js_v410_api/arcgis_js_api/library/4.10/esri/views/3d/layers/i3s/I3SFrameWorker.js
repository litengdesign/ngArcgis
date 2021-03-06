// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/arrayUtils"],function(l,g,h){Object.defineProperty(g,"__esModule",{value:!0});var k=function(){function b(a){var c=this;this.referenceCount=0;this.callbacks=[];this.runIndex=0;this.handle=a.registerFrameWorker(function(a){return c.work(a)})}b.prototype.destroy=function(){this.handle&&(this.handle.remove(),this.handle=null)};b.prototype.work=function(a){this.sort();for(var c=this.callbacks,b={numIndexLoading:0,numNodesLoading:0},d=0;d<c.length&&!a.doneWithProgress();++d)c[d].priority=
c[d](a,b),this.runIndex=d};b.prototype.sort=function(){for(var a=this.callbacks,c=a.length,b=this.runIndex;0<b;b--){for(var d=a[b-1],e=b;e<a.length&&d.priority<=a[e].priority&&(e!==c||d.priority<a[e].priority);)a[e-1]=a[e],e++;a[e-1]=d;c=e-1}this.runIndex=0};b.prototype.add=function(a){this.sort();a.priority=Infinity;this.callbacks.unshift(a)};b.prototype.remove=function(a){h.removeUnordered(this.callbacks,a);this.runIndex=this.callbacks.length;this.sort()};return b}(),f=new Map;g.addFrameWorker=
function(b,a){var c=f.get(b);null==c&&(c=new k(b),f.set(b,c));c.add(a);return{remove:function(){null!=c&&(c.remove(a),0<c.callbacks.length||(f.delete(b),c.destroy()),c=null)}}}});