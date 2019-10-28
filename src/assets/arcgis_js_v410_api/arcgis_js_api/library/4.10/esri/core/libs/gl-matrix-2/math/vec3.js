// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../factories/vec3f64","./common"],function(C,d,t,m){function u(a){var b=a[0],c=a[1];a=a[2];return Math.sqrt(b*b+c*c+a*a)}function q(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];return a}function v(a,b,c){a[0]=b[0]-c[0];a[1]=b[1]-c[1];a[2]=b[2]-c[2];return a}function w(a,b,c){a[0]=b[0]*c[0];a[1]=b[1]*c[1];a[2]=b[2]*c[2];return a}function x(a,b,c){a[0]=b[0]/c[0];a[1]=b[1]/c[1];a[2]=b[2]/c[2];return a}function y(a,b){var c=b[0]-a[0],e=b[1]-a[1];a=b[2]-a[2];return Math.sqrt(c*c+e*e+
a*a)}function z(a,b){var c=b[0]-a[0],e=b[1]-a[1];a=b[2]-a[2];return c*c+e*e+a*a}function A(a){var b=a[0],c=a[1];a=a[2];return b*b+c*c+a*a}function r(a,b){var c=b[0],e=b[1],f=b[2],c=c*c+e*e+f*f;0<c&&(c=1/Math.sqrt(c),a[0]=b[0]*c,a[1]=b[1]*c,a[2]=b[2]*c);return a}function B(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}Object.defineProperty(d,"__esModule",{value:!0});d.length=u;d.copy=q;d.set=function(a,b,c,e){a[0]=b;a[1]=c;a[2]=e;return a};d.add=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];a[2]=b[2]+
c[2];return a};d.subtract=v;d.multiply=w;d.divide=x;d.ceil=function(a,b){a[0]=Math.ceil(b[0]);a[1]=Math.ceil(b[1]);a[2]=Math.ceil(b[2]);return a};d.floor=function(a,b){a[0]=Math.floor(b[0]);a[1]=Math.floor(b[1]);a[2]=Math.floor(b[2]);return a};d.min=function(a,b,c){a[0]=Math.min(b[0],c[0]);a[1]=Math.min(b[1],c[1]);a[2]=Math.min(b[2],c[2]);return a};d.max=function(a,b,c){a[0]=Math.max(b[0],c[0]);a[1]=Math.max(b[1],c[1]);a[2]=Math.max(b[2],c[2]);return a};d.round=function(a,b){a[0]=Math.round(b[0]);
a[1]=Math.round(b[1]);a[2]=Math.round(b[2]);return a};d.scale=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;return a};d.scaleAndAdd=function(a,b,c,e){a[0]=b[0]+c[0]*e;a[1]=b[1]+c[1]*e;a[2]=b[2]+c[2]*e;return a};d.distance=y;d.squaredDistance=z;d.squaredLength=A;d.negate=function(a,b){a[0]=-b[0];a[1]=-b[1];a[2]=-b[2];return a};d.inverse=function(a,b){a[0]=1/b[0];a[1]=1/b[1];a[2]=1/b[2];return a};d.normalize=r;d.dot=B;d.cross=function(a,b,c){var e=b[0],f=b[1];b=b[2];var g=c[0],d=c[1];c=c[2];a[0]=
f*c-b*d;a[1]=b*g-e*c;a[2]=e*d-f*g;return a};d.lerp=function(a,b,c,e){var f=b[0],g=b[1];b=b[2];a[0]=f+e*(c[0]-f);a[1]=g+e*(c[1]-g);a[2]=b+e*(c[2]-b);return a};d.hermite=function(a,b,c,e,f,g){var d=g*g,h=d*(2*g-3)+1,l=d*(g-2)+g,k=d*(g-1);g=d*(3-2*g);a[0]=b[0]*h+c[0]*l+e[0]*k+f[0]*g;a[1]=b[1]*h+c[1]*l+e[1]*k+f[1]*g;a[2]=b[2]*h+c[2]*l+e[2]*k+f[2]*g;return a};d.bezier=function(a,b,c,e,f,g){var d=1-g,h=d*d,l=g*g,k=h*d,h=3*g*h,d=3*l*d;g*=l;a[0]=b[0]*k+c[0]*h+e[0]*d+f[0]*g;a[1]=b[1]*k+c[1]*h+e[1]*d+f[1]*
g;a[2]=b[2]*k+c[2]*h+e[2]*d+f[2]*g;return a};d.random=function(a,b){b=b||1;var c=2*m.RANDOM()*Math.PI,e=2*m.RANDOM()-1,f=Math.sqrt(1-e*e)*b;a[0]=Math.cos(c)*f;a[1]=Math.sin(c)*f;a[2]=e*b;return a};d.transformMat4=function(a,b,c){var e=b[0],f=b[1];b=b[2];a[0]=c[0]*e+c[4]*f+c[8]*b+c[12];a[1]=c[1]*e+c[5]*f+c[9]*b+c[13];a[2]=c[2]*e+c[6]*f+c[10]*b+c[14];return a};d.transformMat3=function(a,b,c){var e=b[0],f=b[1];b=b[2];a[0]=e*c[0]+f*c[3]+b*c[6];a[1]=e*c[1]+f*c[4]+b*c[7];a[2]=e*c[2]+f*c[5]+b*c[8];return a};
d.transformQuat=function(a,b,c){var e=c[0],f=c[1],d=c[2],m=b[0],h=b[1];b=b[2];var l=f*b-d*h,k=d*m-e*b,n=e*h-f*m;c=2*c[3];a[0]=m+l*c+2*(f*n-d*k);a[1]=h+k*c+2*(d*l-e*n);a[2]=b+n*c+2*(e*k-f*l);return a};d.rotateX=function(a,b,c,d){var f=[],e=[];f[0]=b[0]-c[0];f[1]=b[1]-c[1];f[2]=b[2]-c[2];e[0]=f[0];e[1]=f[1]*Math.cos(d)-f[2]*Math.sin(d);e[2]=f[1]*Math.sin(d)+f[2]*Math.cos(d);a[0]=e[0]+c[0];a[1]=e[1]+c[1];a[2]=e[2]+c[2];return a};d.rotateY=function(a,b,c,d){var f=[],e=[];f[0]=b[0]-c[0];f[1]=b[1]-c[1];
f[2]=b[2]-c[2];e[0]=f[2]*Math.sin(d)+f[0]*Math.cos(d);e[1]=f[1];e[2]=f[2]*Math.cos(d)-f[0]*Math.sin(d);a[0]=e[0]+c[0];a[1]=e[1]+c[1];a[2]=e[2]+c[2];return a};d.rotateZ=function(a,b,c,d){var e=[],g=[];e[0]=b[0]-c[0];e[1]=b[1]-c[1];e[2]=b[2]-c[2];g[0]=e[0]*Math.cos(d)-e[1]*Math.sin(d);g[1]=e[0]*Math.sin(d)+e[1]*Math.cos(d);g[2]=e[2];a[0]=g[0]+c[0];a[1]=g[1]+c[1];a[2]=g[2]+c[2];return a};d.angle=function(a,b){q(n,a);q(p,b);r(n,n);r(p,p);a=B(n,p);return 1<a?0:-1>a?Math.PI:Math.acos(a)};var n=t.create(),
p=t.create();d.str=function(a){return"vec3("+a[0]+", "+a[1]+", "+a[2]+")"};d.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]};d.equals=function(a,b){var c=a[0],d=a[1];a=a[2];var f=b[0],g=b[1];b=b[2];return Math.abs(c-f)<=m.EPSILON*Math.max(1,Math.abs(c),Math.abs(f))&&Math.abs(d-g)<=m.EPSILON*Math.max(1,Math.abs(d),Math.abs(g))&&Math.abs(a-b)<=m.EPSILON*Math.max(1,Math.abs(a),Math.abs(b))};d.sub=v;d.mul=w;d.div=x;d.dist=y;d.sqrDist=z;d.len=u;d.sqrLen=A});