// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/libs/gl-matrix-2/gl-matrix ../GeometryUtils ./rendererUtils ../../webgl/VertexArrayObject".split(" "),function(D,E,q,B,C,z){var A=1/65536;return function(){function p(e){this._viewProjMat=q.mat4f32.create();this._offsetVector=q.vec3f32.create();this._patternMatrix=q.mat3f32.create();this._color=q.vec4f32.create();this._outlineColor=q.vec4f32.create();this._initialized=!1;this._fillProgramOptions={id:!1,dd:!1,pattern:!1};this._outlineProgramOptions={id:!1,dd:!1};
this._programCache=e}p.prototype.dispose=function(){};p.prototype.render=function(e,c,a,b,n,l,g,p,y,h,d){if(0!==c.triangleElementCount){this._initialized||this._initialize(e);var u=void 0!==g.getPaintValue("fill-pattern",a),f=g.hasDataDrivenColor?[1,1,1,1]:g.getPaintValue("fill-color",a),t=g.hasDataDrivenOpacity?1:g.getPaintValue("fill-opacity",a),m=t*f[3]*d;this._color[0]=m*f[0];this._color[1]=m*f[1];this._color[2]=m*f[2];this._color[3]=m;var f=3===n,k;f&&(k=C.int32To4Bytes(c.layerID));var m=l.tileTransform.transform,
v=l.coordRange/512,r=g.getPaintValue("fill-translate",a);if(0!==r[0]||0!==r[1]){q.mat4.copy(this._viewProjMat,l.tileTransform.transform);var m=r[0],r=r[1],w=0,x=0,v=(1<<l.key.level)/Math.pow(2,a)*v;1===g.getPaintValue("fill-translate-anchor",a)?(w=-B.C_DEG_TO_RAD*b,b=Math.sin(w),x=Math.cos(w),w=v*(m*x-r*b),x=v*(m*b+r*x)):(w=v*m,x=v*r);this._offsetVector[0]=w;this._offsetVector[1]=x;this._offsetVector[2]=0;q.mat4.translate(this._viewProjMat,this._viewProjMat,this._offsetVector);m=this._viewProjMat}this._drawFill(e,
c,a,n,l,g,p,m,h,d,f,k);if(g.getPaintValue("fill-antialias",a)&&!u&&0<c.outlineElementCount&&(1===n||3===n)){n=g.hasDataDrivenOutline;if(g.outlineUsesFillColor){if(1!==this._color[3])return;this._outlineColor[0]=this._color[0];this._outlineColor[1]=this._color[1];this._outlineColor[2]=this._color[2];this._outlineColor[3]=this._color[3]}else a=g.hasDataDrivenOutlineColor?[1,1,1,1]:g.getPaintValue("fill-outline-color",a),d*=t*a[3],this._outlineColor[0]=d*a[0],this._outlineColor[1]=d*a[1],this._outlineColor[2]=
d*a[2],this._outlineColor[3]=d;h=.75/h;if(d=this._getOutlineVAO(e,l,n))e.bindVAO(d),d=this._outlineProgramOptions,d.id=f,d.dd=n,d=this._programCache.getProgram(2,(f?1:0)<<1|(n?1:0),d),e.bindProgram(d),d.setUniformMatrix4fv("u_transformMatrix",m),d.setUniformMatrix4fv("u_extrudeMatrix",y),d.setUniform2fv("u_normalized_origin",l.tileTransform.displayCoord),d.setUniform1f("u_depth",g.z+A),d.setUniform1f("u_outline_width",h),d.setUniform4fv("u_color",this._outlineColor),f&&d.setUniform4f("u_id",k[0],
k[1],k[2],k[3]),e.drawElements(4,c.outlineElementCount,5125,12*c.outlineElementStart),e.bindVAO()}}};p.prototype._initialize=function(e){if(this._initialized)return!0;this._fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]};this._fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]};this._outlineVertexAttributes=
{geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]};this._outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,
divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]};return this._initialized=!0};p.prototype._drawFill=function(e,c,a,b,n,l,g,p,y,h,d,u){var f=l.getPaintValue("fill-pattern",a),t=void 0!==f,m=l.hasDataDrivenOpacity?1:h*l.getPaintValue("fill-opacity",a),k=l.hasDataDrivenColor?[1,1,1,1]:l.getPaintValue("fill-color",a);h*=m*k[3];this._color[0]=h*k[0];this._color[1]=h*k[1];this._color[2]=h*k[2];this._color[3]=h;k=l.hasDataDrivenFill;h=t||1>h||k;if(!h||0!==b)if(h||
1!==b)if(b=this._getFillVAO(e,n,k)){e.bindVAO(b);b=this._fillProgramOptions;b.id=d;b.dd=k;b.pattern=t;b=this._programCache.getProgram(1,(d?1:0)<<2|(k?1:0)<<1|(t?1:0),b);e.bindProgram(b);if(t){f=g.getMosaicItemPosition(f,!0);if(!f){e.bindVAO();e.bindProgram();return}a=n.coordRange/512/Math.pow(2,Math.round(a)-n.key.level)/y;q.mat3.identity(this._patternMatrix);y=1/(f.size[1]*a);this._patternMatrix[0]=1/(f.size[0]*a);this._patternMatrix[4]=y;g.bind(e,9729,f.page,5);b.setUniformMatrix3fv("u_pattern_matrix",
this._patternMatrix);b.setUniform2f("u_pattern_tl",f.tl[0],f.tl[1]);b.setUniform2f("u_pattern_br",f.br[0],f.br[1]);b.setUniform1i("u_texture",5)}b.setUniformMatrix4fv("u_transformMatrix",p);b.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord);b.setUniform1f("u_depth",l.z+A);b.setUniform4fv("u_color",this._color);d&&b.setUniform4f("u_id",u[0],u[1],u[2],u[3]);e.drawElements(4,c.triangleElementCount,5125,12*c.triangleElementStart);e.bindVAO()}};p.prototype._getFillVAO=function(e,c,a){if(a){if(c.fillDDVertexArrayObject)return c.fillDDVertexArrayObject;
a=c.fillDDVertexBuffer;var b=c.fillIndexBuffer;if(!a||!b)return null;c.fillDDVertexArrayObject=new z(e,this._programCache.getProgramAttributes(1),this._fillVertexAttributesDD,{geometry:a},b);return c.fillDDVertexArrayObject}if(c.fillVertexArrayObject)return c.fillVertexArrayObject;a=c.fillVertexBuffer;b=c.fillIndexBuffer;if(!a||!b)return null;c.fillVertexArrayObject=new z(e,this._programCache.getProgramAttributes(1),this._fillVertexAttributes,{geometry:a},b);return c.fillVertexArrayObject};p.prototype._getOutlineVAO=
function(e,c,a){if(a){if(c.outlineDDVertexArrayObject)return c.outlineDDVertexArrayObject;a=c.outlineDDVertexBuffer;var b=c.outlineIndexBuffer;if(!a||!b)return null;c.outlineDDVertexArrayObject=new z(e,this._programCache.getProgramAttributes(2),this._outlineVertexAttributesDD,{geometry:a},b);return c.outlineDDVertexArrayObject}if(c.outlineVertexArrayObject)return c.outlineVertexArrayObject;a=c.outlineVertexBuffer;b=c.outlineIndexBuffer;if(!a||!b)return null;c.outlineVertexArrayObject=new z(e,this._programCache.getProgramAttributes(2),
this._outlineVertexAttributes,{geometry:a},b);return c.outlineVertexArrayObject};return p}()});