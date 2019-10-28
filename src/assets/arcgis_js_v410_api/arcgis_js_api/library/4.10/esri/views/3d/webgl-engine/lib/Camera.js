// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/libs/gl-matrix-2/gl-matrix ../../support/geometryUtils ../../support/mathUtils ./Util".split(" "),function(n,r,b,g,f,h){function p(b,a){var c=a[0]-b[0],d=a[1]-b[1],e=a[2]-b[2];b=a[3]-b[3];return c*c+d*d+e*e+b*b}function k(b,a){return b[0]===a[0]&&b[1]===a[1]&&b[2]===a[2]}function q(b,a){return b[0]===a[0]&&b[1]===a[1]&&b[2]===a[2]&&b[3]===a[3]}n=function(){function c(a,c,d){void 0===a&&(a=b.vec3f64.create());void 0===c&&(c=b.vec3f64.create());void 0===d&&(d=
b.vec3f64.fromValues(0,0,1));this._viewUp=b.vec3f64.create();this._viewForward=b.vec3f64.create();this._viewRight=b.vec3f64.create();this._ray=g.ray.createWrapper();this._viewport=b.vec4f64.fromValues(0,0,1,1);this._padding=b.vec4f64.create();this._fov=55/180*Math.PI;this._near=1;this._far=1E3;this._viewDirty=!0;this._viewMatrix=b.mat4f64.create();this._projectionDirty=!0;this._projectionMatrix=b.mat4f64.create();this._viewProjectionDirty=!0;this._viewProjectionMatrix=b.mat4f64.create();this._viewInverseTransposeMatrixDirty=
!0;this._viewInverseTransposeMatrix=b.mat4f64.create();this._frustumDirty=!0;this._frustum=g.frustum.create();this._fullViewport=null;this.relativeElevation=0;this._eye=b.vec3f64.clone(a);this._center=b.vec3f64.clone(c);this._up=b.vec3f64.clone(d);this._padding=b.vec4f64.create()}Object.defineProperty(c.prototype,"eye",{get:function(){return this._eye},set:function(a){this._compareAndSetView(a,this._eye)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"center",{get:function(){return this._center},
set:function(a){this._compareAndSetView(a,this._center)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"ray",{get:function(){this._ray.origin=this.eye;this._ray.direction||(this._ray.direction=b.vec3f64.create());b.vec3.subtract(this._ray.direction,this.center,this.eye);return this._ray},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"up",{get:function(){return this._up},set:function(a){this._compareAndSetView(a,this._up)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"viewMatrix",{get:function(){this._ensureViewClean();return this._viewMatrix},set:function(a){b.mat4.copy(this._viewMatrix,a);this._viewDirty=!1;this._frustumDirty=this._viewProjectionDirty=this._viewInverseTransposeMatrixDirty=!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"viewForward",{get:function(){this._ensureViewClean();return this._viewForward},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"viewUp",{get:function(){this._ensureViewClean();return this._viewUp},
enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"viewRight",{get:function(){this._ensureViewClean();return this._viewRight},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"near",{get:function(){return this._near},set:function(a){this._near!==a&&(this._near=a,this._frustumDirty=this._viewProjectionDirty=this._projectionDirty=!0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"far",{get:function(){return this._far},set:function(a){this._far!==
a&&(this._far=a,this._frustumDirty=this._viewProjectionDirty=this._projectionDirty=!0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"viewport",{get:function(){return this._viewport},set:function(a){this.x=a[0];this.y=a[1];this.width=a[2];this.height=a[3]},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"x",{get:function(){return this._viewport[0]},set:function(a){a+=this._padding[3];this._viewport[0]!==a&&(this._viewport[0]=a,this._frustumDirty=this._viewProjectionDirty=
this._projectionDirty=!0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"y",{get:function(){return this._viewport[1]},set:function(a){a+=this._padding[2];this._viewport[1]!==a&&(this._viewport[1]=a,this._frustumDirty=this._viewProjectionDirty=this._projectionDirty=!0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"width",{get:function(){return this._viewport[2]},set:function(a){this._viewport[2]!==a&&(this._viewport[2]=a,this._frustumDirty=this._viewProjectionDirty=
this._projectionDirty=!0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"height",{get:function(){return this._viewport[3]},set:function(a){this._viewport[3]!==a&&(this._viewport[3]=a,this._frustumDirty=this._viewProjectionDirty=this._projectionDirty=!0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"fullWidth",{get:function(){return this._viewport[2]+this._padding[1]+this._padding[3]},set:function(a){this.width=a-(this._padding[1]+this._padding[3])},enumerable:!0,
configurable:!0});Object.defineProperty(c.prototype,"fullHeight",{get:function(){return this._viewport[3]+this._padding[0]+this._padding[2]},set:function(a){this.height=a-(this._padding[0]+this._padding[2])},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"fullViewport",{get:function(){this._fullViewport||(this._fullViewport=b.vec4f64.create());this._fullViewport[0]=this._viewport[0]-this._padding[3];this._fullViewport[1]=this._viewport[1]-this._padding[2];this._fullViewport[2]=
this.fullWidth;this._fullViewport[3]=this.fullHeight;return this._fullViewport},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"aspect",{get:function(){return this.width/this.height},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"padding",{get:function(){return this._padding},set:function(a){if(this._padding[0]!==a[0]||this._padding[1]!==a[1]||this._padding[2]!==a[2]||this._padding[3]!==a[3])this._viewport[0]+=a[3]-this._padding[3],this._viewport[1]+=a[2]-this._padding[2],
this._viewport[2]-=a[1]+a[3]-(this._padding[1]+this._padding[3]),this._viewport[3]-=a[0]+a[2]-(this._padding[0]+this._padding[2]),b.vec4.copy(this._padding,a),this._frustumDirty=this._viewProjectionDirty=this._projectionDirty=!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"viewProjectionMatrix",{get:function(){this._viewProjectionDirty&&(b.mat4.multiply(this._viewProjectionMatrix,this.projectionMatrix,this.viewMatrix),this._viewProjectionDirty=!1);return this._viewProjectionMatrix},
enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"projectionMatrix",{get:function(){if(this._projectionDirty){var a=this.width,c=this.height,d=this.near*Math.tan(this.fovY/2),e=d*this.aspect;b.mat4.frustum(this._projectionMatrix,-e*(1+2*this._padding[3]/a),e*(1+2*this._padding[1]/a),-d*(1+2*this._padding[2]/c),d*(1+2*this._padding[0]/c),this.near,this.far);this._projectionDirty=!1}return this._projectionMatrix},set:function(a){b.mat4.copy(this._projectionMatrix,a);this._projectionDirty=
!1;this._frustumDirty=this._viewProjectionDirty=!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"fov",{get:function(){return this._fov},set:function(a){this._fov=a;this._frustumDirty=this._viewProjectionDirty=this._projectionDirty=!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"fovX",{get:function(){return h.fovd2fovx(this._fov,this.width,this.height)},set:function(a){this._fov=h.fovx2fovd(a,this.width,this.height);this._frustumDirty=this._viewProjectionDirty=
this._projectionDirty=!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"fovY",{get:function(){return h.fovd2fovy(this._fov,this.width,this.height)},set:function(a){this._fov=h.fovy2fovd(a,this.width,this.height);this._frustumDirty=this._viewProjectionDirty=this._projectionDirty=!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"distance",{get:function(){return b.vec3.distance(this._center,this._eye)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"frustum",{get:function(){this._recomputeFrustum();return this._frustum},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"viewInverseTransposeMatrix",{get:function(){if(this._viewInverseTransposeMatrixDirty||this._viewDirty)this._viewInverseTransposeMatrix||(this._viewInverseTransposeMatrix=b.mat4f64.create()),b.mat4.invert(this._viewInverseTransposeMatrix,this.viewMatrix),b.mat4.transpose(this._viewInverseTransposeMatrix,this._viewInverseTransposeMatrix),this._viewInverseTransposeMatrixDirty=
!1;return this._viewInverseTransposeMatrix},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"perPixelRatio",{get:function(){return Math.tan(this.fovX/2)/this.width},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"aboveGround",{get:function(){return 0<=this.relativeElevation},enumerable:!0,configurable:!0});c.prototype.copyFrom=function(a){b.vec3.copy(this._eye,a._eye);b.vec3.copy(this._center,a._center);b.vec3.copy(this._up,a._up);b.vec4.copy(this._viewport,a._viewport);
b.vec4.copy(this._padding,a._padding);this._near=a._near;this._far=a._far;this._fov=a._fov;this.relativeElevation=a.relativeElevation;a._viewDirty?this._viewDirty=!0:(b.mat4.copy(this._viewMatrix,a._viewMatrix),b.vec3.copy(this._viewRight,a._viewRight),b.vec3.copy(this._viewUp,a._viewUp),b.vec3.copy(this._viewForward,a._viewForward),this._viewDirty=!1);a._projectionDirty?this._projectionDirty=!0:(b.mat4.copy(this._projectionMatrix,a._projectionMatrix),this._projectionDirty=!1);this._viewProjectionDirty=
!0;a._frustumDirty?this._frustumDirty=!0:(g.frustum.copy(a._frustum,this._frustum),this._frustumDirty=!1);a._viewInverseTransposeMatrixDirty?this._viewInverseTransposeMatrixDirty=!0:(this._viewInverseTransposeMatrix?b.mat4.copy(this._viewInverseTransposeMatrix,a._viewInverseTransposeMatrix):this._viewInverseTransposeMatrix=b.mat4f64.clone(a._viewInverseTransposeMatrix),this._viewInverseTransposeMatrixDirty=!1);a._fullViewport?this._fullViewport?b.vec4.copy(this._fullViewport,a._fullViewport):this._fullViewport=
b.vec4f64.clone(a._fullViewport):this._fullViewport=null;return this};c.prototype.copyViewFrom=function(a){this.eye=a.eye;this.center=a.center;this.up=a.up};c.prototype.copy=function(){var a=new c;a.copyFrom(this);return a};c.prototype.equivalent=function(a){return k(this._eye,a._eye)&&k(this._center,a._center)&&k(this._up,a._up)&&q(this._viewport,a._viewport)&&q(this._padding,a._padding)&&this._near===a._near&&this._far===a._far&&this._fov===a._fov};c.prototype.almostEquals=function(a,c,d){void 0===
d&&(d=!1);c=b.vec3.distance(this._eye,this._center)*(c||5E-4);c*=c;d?(f.directionFromTo(e,a._eye,a._center),f.directionFromTo(m,this._eye,this._center),d=1E-10):(b.vec3.copy(e,a._center),b.vec3.copy(m,this._center),d=c);return b.vec3.squaredDistance(a._eye,this._eye)<c&&b.vec3.squaredDistance(e,m)<d&&.001>Math.abs(a._fov-this._fov)&&.5>p(a._padding,this._padding)&&.5>p(a._viewport,this._viewport)};c.prototype.markViewDirty=function(){this._viewProjectionDirty=this._frustumDirty=this._viewDirty=!0};
c.prototype.computePixelSizeAt=function(a){return this.computePixelSizeAtDist(b.vec3.distance(a,this._eye))};c.prototype.computePixelSizeAtDist=function(a){return 2*a*Math.tan(this.fovX/2)/this.width};c.prototype.computeDistanceFromRadius=function(a,b){return a/Math.tan(Math.min(this.fovX,this.fovY)/(2*(b||1)))};c.prototype.setGLViewport=function(a){var b=this.viewport,c=this.padding;a.setViewport(b[0]-c[3],b[1]-c[2],b[2]+c[1]+c[3],b[3]+c[0]+c[2])};c.prototype.applyProjection=function(a,c,e){void 0===
e&&(e=!1);a!==d&&b.vec3.copy(d,a);d[3]=1;e&&(c[2]=-d[2]);b.vec4.transformMat4(d,d,this.projectionMatrix);b.vec3.scale(d,d,1/Math.abs(d[3]));a=this.fullViewport;c[0]=f.lerp(0,a[0]+a[2],.5+.5*d[0]);c[1]=f.lerp(0,a[1]+a[3],.5+.5*d[1]);e||(c[2]=.5*(d[2]+1));return c};c.prototype.projectPoint=function(a,c){d[0]=a[0];d[1]=a[1];d[2]=a[2];d[3]=1;b.vec4.transformMat4(d,d,this.viewProjectionMatrix);if(0===d[3])return null;b.vec3.scale(d,d,1/Math.abs(d[3]));a=this.fullViewport;c[0]=f.lerp(0,a[0]+a[2],.5+.5*
d[0]);c[1]=f.lerp(0,a[1]+a[3],.5+.5*d[1]);c[2]=.5*(d[2]+1);return c};c.prototype.unprojectPoint=function(a,c){b.mat4.multiply(l,this.projectionMatrix,this.viewMatrix);if(!b.mat4.invert(l,l))return null;var e=this.fullViewport;d[0]=2*(a[0]-e[0])/e[2]-1;d[1]=2*(a[1]-e[1])/e[3]-1;d[2]=2*a[2]-1;d[3]=1;b.vec4.transformMat4(d,d,l);if(0===d[3])return null;c[0]=d[0]/d[3];c[1]=d[1]/d[3];c[2]=d[2]/d[3];return c};c.prototype.computeUp=function(a){"global"===a?this.computeUpGlobal():this.computeUpLocal()};c.prototype.computeUpGlobal=
function(){b.vec3.subtract(e,this.center,this.eye);var a=b.vec3.length(this.center);1>a?(b.vec3.set(this.up,0,0,1),this.markViewDirty()):Math.abs(b.vec3.dot(e,this.center))>.9999*b.vec3.length(e)*a||(b.vec3.cross(this.up,e,this.center),b.vec3.cross(this.up,this.up,e),b.vec3.normalize(this.up,this.up),this.markViewDirty())};c.prototype.computeUpLocal=function(){f.directionFromTo(e,this.eye,this.center);.9999>=Math.abs(e[2])&&(b.vec3.scale(e,e,e[2]),b.vec3.set(this.up,-e[0],-e[1],1-e[2]),b.vec3.normalize(this.up,
this.up),this.markViewDirty())};c.prototype._compareAndSetView=function(a,c){k(a,c)||(b.vec3.copy(c,a),this._viewProjectionDirty=this._frustumDirty=this._viewDirty=!0)};c.prototype._recomputeFrustum=function(){this._frustumDirty&&(g.frustum.fromMatrix(this.viewMatrix,this.projectionMatrix,this._frustum),this._frustumDirty=!1)};c.prototype._ensureViewClean=function(){this._viewDirty&&(b.mat4.lookAt(this._viewMatrix,this._eye,this._center,this._up),b.vec3.set(this._viewForward,-this._viewMatrix[2],
-this._viewMatrix[6],-this._viewMatrix[10]),b.vec3.set(this._viewUp,this._viewMatrix[1],this._viewMatrix[5],this._viewMatrix[9]),b.vec3.set(this._viewRight,this._viewMatrix[0],this._viewMatrix[4],this._viewMatrix[8]),this._viewDirty=!1,this._viewInverseTransposeMatrixDirty=!0)};return c}();var d=b.vec4f64.create(),l=b.mat4f64.create(),e=b.vec3f64.create(),m=b.vec3f64.create();return n});