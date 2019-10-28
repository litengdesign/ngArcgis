// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/PooledArray","../../../../core/libs/gl-matrix-2/gl-matrix","./Util"],function(q,z,x,n,p){q=function(){function f(d,g,k,c){p.assert(1<=d.length);p.assert(0===k.length%g);p.assert(k.length>=d.length*g);p.assert(3===c.size||4===c.size);this.primitiveIndices=d;this.indices=k;this._position=c;this._numIndexPerPrimitive=g;var a=c.data,e=c.offsetIdx,f=c.strideIdx;c=0;var y=d.length,b=e+f*k[g*d[c]];m.clear();m.push(b);this.bbMin=n.vec3f64.fromValues(a[b],a[b+
1],a[b+2]);for(this.bbMax=n.vec3f64.clone(this.bbMin);c<y;++c)for(var r=g*d[c],h=0;h<g;++h){b=e+f*k[r+h];m.push(b);var l=a[b];this.bbMin[0]=Math.min(l,this.bbMin[0]);this.bbMax[0]=Math.max(l,this.bbMax[0]);l=a[b+1];this.bbMin[1]=Math.min(l,this.bbMin[1]);this.bbMax[1]=Math.max(l,this.bbMax[1]);l=a[b+2];this.bbMin[2]=Math.min(l,this.bbMin[2]);this.bbMax[2]=Math.max(l,this.bbMax[2])}this.center=n.vec3f64.create();n.vec3.lerp(this.center,this.bbMin,this.bbMax,.5);this.bsRadius=.5*Math.max(Math.max(this.bbMax[0]-
this.bbMin[0],this.bbMax[1]-this.bbMin[1]),this.bbMax[2]-this.bbMin[2]);d=this.bsRadius*this.bsRadius;for(c=0;c<m.length;++c)b=m.data[c],g=a[b]-this.center[0],k=a[b+1]-this.center[1],b=a[b+2]-this.center[2],e=g*g+k*k+b*b,e<=d||(e=Math.sqrt(e),f=.5*(e-this.bsRadius),this.bsRadius+=f,d=this.bsRadius*this.bsRadius,e=f/e,this.center[0]+=g*e,this.center[1]+=k*e,this.center[2]+=b*e);m.clear()}f.prototype.getCenter=function(){return this.center};f.prototype.getBSRadius=function(){return this.bsRadius};f.prototype.getBBMin=
function(){return this.bbMin};f.prototype.getBBMax=function(){return this.bbMax};f.prototype.getPrimitiveIndices=function(){return this.primitiveIndices};f.prototype.getIndices=function(){return this.indices};f.prototype.getPosition=function(){return this._position};f.prototype.getChildren=function(){if(this.children)return this.children;if(1<n.vec3.squaredDistance(this.bbMin,this.bbMax)){for(var d=n.vec3.lerp(n.vec3f64.create(),this.bbMin,this.bbMax,.5),g=this.primitiveIndices.length,k=new Uint8Array(g),
c=Array(8),a=0;8>a;++a)c[a]=0;for(var a=this._position,e=a.data,m=a.offsetIdx,p=a.strideIdx,a=0;a<g;++a){for(var b=0,r=this._numIndexPerPrimitive*this.primitiveIndices[a],h=m+p*this.indices[r],l=e[h],t=e[h+1],u=e[h+2],v=1;v<this._numIndexPerPrimitive;++v){var h=m+p*this.indices[r+v],q=e[h],w=e[h+1],h=e[h+2];q<l&&(l=q);w<t&&(t=w);h<u&&(u=h)}l<d[0]&&(b|=1);t<d[1]&&(b|=2);u<d[2]&&(b|=4);k[a]=b;++c[b]}for(a=d=0;8>a;++a)0<c[a]&&++d;if(2>d)return;d=Array(8);for(a=0;8>a;++a)d[a]=0<c[a]?new Uint32Array(c[a]):
void 0;for(a=0;8>a;++a)c[a]=0;for(a=0;a<g;++a)b=k[a],d[b][c[b]++]=this.primitiveIndices[a];this.children=Array(8);for(a=0;8>a;++a)void 0!==d[a]&&(this.children[a]=new f(d[a],this._numIndexPerPrimitive,this.indices,this._position))}return this.children};return f}();var m=new x({deallocator:null});return q});