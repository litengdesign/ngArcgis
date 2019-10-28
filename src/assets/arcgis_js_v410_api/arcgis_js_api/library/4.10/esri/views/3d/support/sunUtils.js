// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../core/libs/gl-matrix-2/gl-matrix","../lib/SunCalc","./mathUtils"],function(N,q,l,u,w){function m(g,e,k,h){for(var a=[],c=0;c<k.length;c++)a[c]=(h[c]-k[c])*g/e+k[c];return a}Object.defineProperty(q,"__esModule",{value:!0});q.settings={local:{altitude:1500,ambientAtNight:.1,ambientAtNoon:.45,ambientAtTwilight:.2,diffuseAtNoon:.65,diffuseAtTwilight:.7},global:{altitude:8E5,ambient:.015,diffuse:.75},planarDirection:{localAltitude:1E4,globalAltitude:1E6,globalAngles:{azimuth:1.3*
Math.PI,altitude:.6*Math.PI}}};q.computeColorAndIntensity=function(g,e){var k,h,a,c,d=e.z,n=K;l.vec3.set(n.ambient.color,1,1,1);n.ambient.intensity=q.settings.global.ambient;l.vec3.set(n.diffuse.color,1,1,1);n.diffuse.intensity=q.settings.global.diffuse;d=(Math.abs(d)-q.settings.local.altitude)/(q.settings.global.altitude-q.settings.local.altitude);d=w.clamp(d,0,1);n.globalFactor=d;e=u.getTimes(g,e.y,e.x);if(1>d){a=g.valueOf();var p,f;e.polarException===u.POLAR_EXCEPTION.MIDNIGHT_SUN?(p=a-36E5*(g.getHours()+
48)-6E4*g.getMinutes(),f=p+432E6):e.polarException===u.POLAR_EXCEPTION.POLAR_NIGHT?(p=a-2,f=a-1):(p=e.sunrise.valueOf(),f=e.sunset.valueOf());var t=f-p;c=p+t/2;h=t/4;k=c-h;h=c+h;var b=.06*t,t=p-b/2;p+=b/2;var v=f-b/2,D=f+b/2;f=q.settings.local;var E=[.01,f.ambientAtNight],F=[.8,.8,1],G=[.01,.01,.01],x=[f.diffuseAtTwilight,f.ambientAtTwilight],y=[1,.75,.75],z=[.8,.8,1],A=[.9*f.diffuseAtNoon,f.ambientAtNoon],B=[1,.98,.98],C=[.98,.98,1],H=[f.diffuseAtNoon,f.ambientAtNoon],I=[1,1,1],J=[1,1,1];f=[0,0];
var r=[0,0,0],b=[0,0,0];a<t||a>D?(f=E,r=G,b=F):a<p?(b=p-t,f=m(a-t,b,E,x),r=m(a-t,b,G,y),b=m(a-t,b,F,z)):a<k?(b=k-p,f=m(a-p,b,x,A),r=m(a-p,b,y,B),b=m(a-p,b,z,C)):a<c?(b=c-k,f=m(a-k,b,A,H),r=m(a-k,b,B,I),b=m(a-k,b,C,J)):a<h?(b=h-c,f=m(a-c,b,H,A),r=m(a-c,b,I,B),b=m(a-c,b,J,C)):a<v?(b=v-h,f=m(a-h,b,A,x),r=m(a-h,b,B,y),b=m(a-h,b,C,z)):a<D&&(b=D-v,f=m(a-v,b,x,E),r=m(a-v,b,y,G),b=m(a-v,b,z,F));a=f[0];c=l.vec3f64.fromValues(r[0],r[1],r[2]);k=f[1];h=l.vec3f64.fromValues(b[0],b[1],b[2]);l.vec3.lerp(n.ambient.color,
h,n.ambient.color,d);n.ambient.intensity=w.lerp(k,n.ambient.intensity,d);l.vec3.lerp(n.diffuse.color,c,n.diffuse.color,d);n.diffuse.intensity=w.lerp(a,n.diffuse.intensity,d)}d=g.valueOf();e.polarException===u.POLAR_EXCEPTION.MIDNIGHT_SUN?(g=d-36E5*(g.getHours()+48)-6E4*g.getMinutes(),e=g+432E6):e.polarException===u.POLAR_EXCEPTION.POLAR_NIGHT?(g=d-2,e=d-1):(g=e.sunrise.valueOf(),e=e.sunset.valueOf());g=1-w.clamp(Math.abs(d-(g+(e-g)/2))/432E5,0,1);n.noonFactor=g;return n};q.computeDirection=function(g,
e,k,h){h||(h=l.vec3f64.create());var a=L,c=l.mat4.identity(M);if("global"===k)u.getPosition(g,0,0,a),l.vec3.set(h,0,0,-1),l.mat4.rotateX(c,c,-a.azimuth),l.mat4.rotateY(c,c,-a.altitude);else{var d=q.settings.planarDirection;k=d.globalAngles;d=(Math.abs(e.z)-d.localAltitude)/(d.globalAltitude-d.localAltitude);d=w.clamp(d,0,1);1>d?(u.getPosition(g,e.y,e.x,a),a.azimuth=(1-d)*a.azimuth+d*k.azimuth,a.altitude=(1-d)*a.altitude+d*k.altitude):(a.azimuth=k.azimuth,a.altitude=k.altitude);l.vec3.set(h,0,-1,0);
l.mat4.rotateZ(c,c,-a.azimuth);l.mat4.rotateX(c,c,-a.altitude)}l.vec3.transformMat4(h,h,c);return h};q.computeShadowsEnabled=function(g,e){return"global"===e?!0:Math.abs(g.z)<q.settings.planarDirection.localAltitude};var M=l.mat4f64.create(),L={azimuth:0,altitude:0},K={ambient:{color:l.vec3f64.create(),intensity:0},diffuse:{color:l.vec3f64.create(),intensity:0,direction:l.vec3f64.create()},globalFactor:0,noonFactor:0}});