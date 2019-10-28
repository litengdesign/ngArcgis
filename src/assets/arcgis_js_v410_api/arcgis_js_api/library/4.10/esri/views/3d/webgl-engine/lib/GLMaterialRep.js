// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./Util"],function(h,k,f){var g=function(){function b(a){this.refCnt=0;this.glMaterial=a}b.prototype.incRefCnt=function(){++this.refCnt};b.prototype.decRefCnt=function(){--this.refCnt;f.assert(0<=this.refCnt)};b.prototype.getRefCnt=function(){return this.refCnt};b.prototype.getGLMaterial=function(){return this.glMaterial};return b}();return function(){function b(a,c){this.textureRep=a;this.programRep=c;this.id2glMaterialRef={}}b.prototype.aquire=function(a){return this.aquireExt(a,
"color")};b.prototype.aquireDepthShadowMap=function(a){return this.aquireExt(a,"depthShadowMap")};b.prototype.aquireDepth=function(a){return this.aquireExt(a,"depth")};b.prototype.aquireNormal=function(a){return this.aquireExt(a,"normal")};b.prototype.aquireHighlight=function(a){return this.aquireExt(a,"highlight")};b.prototype.aquireExt=function(a,c){var b=a.id+"_"+c,d=this.id2glMaterialRef[b];null==d?(a=(d=a.getGLMaterials()[c])?new d(a,this.programRep,this.textureRep):void 0,d=new g(a),this.id2glMaterialRef[b]=
d):a=d.getGLMaterial();d.incRefCnt();a&&this.increaseProgramReferences(a);return a};b.prototype.release=function(a){this.releaseExt(a,"color")};b.prototype.releaseDepth=function(a){this.releaseExt(a,"depth")};b.prototype.releaseNormal=function(a){this.releaseExt(a,"normal")};b.prototype.releaseDepthShadowMap=function(a){this.releaseExt(a,"depthShadowMap")};b.prototype.releaseHighlight=function(a){this.releaseExt(a,"highlight")};b.prototype.releaseExt=function(a,c){a=a+"_"+c;c=this.id2glMaterialRef[a];
c.decRefCnt();if(0===c.getRefCnt()){if(c=c.getGLMaterial())this.decreaseProgramReferences(c),c.dispose();delete this.id2glMaterialRef[a]}};b.prototype.updateMaterialParameters=function(a){var c=this.id2glMaterialRef[a+"_color"];c&&c.getGLMaterial()&&this.updateParamsForMat(c.getGLMaterial());(c=this.id2glMaterialRef[a+"_depth"])&&c.getGLMaterial()&&this.updateParamsForMat(c.getGLMaterial());(c=this.id2glMaterialRef[a+"_depthShadowMap"])&&c.getGLMaterial()&&this.updateParamsForMat(c.getGLMaterial());
(c=this.id2glMaterialRef[a+"_normal"])&&c.getGLMaterial()&&this.updateParamsForMat(c.getGLMaterial());(a=this.id2glMaterialRef[a+"_highlight"])&&a.getGLMaterial()&&this.updateParamsForMat(a.getGLMaterial())};b.prototype.updateParamsForMat=function(a){a.updateParameters&&(this.decreaseProgramReferences(a),a.updateParameters(),this.increaseProgramReferences(a))};b.prototype.increaseProgramReferences=function(a){a=a.getPrograms();for(var c=this.programRep,b=0;b<a.length;b++)c.increaseRefCount(a[b])};
b.prototype.decreaseProgramReferences=function(a){a=a.getPrograms();for(var b=this.programRep,e=0;e<a.length;e++)b.decreaseRefCount(a[e])};return b}()});