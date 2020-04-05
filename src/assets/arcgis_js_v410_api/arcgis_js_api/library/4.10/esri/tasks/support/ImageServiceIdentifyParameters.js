// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["../../core/Accessor","../../geometry/support/jsonUtils"],function(c,d){return c.createSubclass({declaredClass:"esri.tasks.support.ImageServiceIdentifyParameters",properties:{geometry:null,mosaicRule:null,noData:null,renderingRule:null,pixelSizeX:null,pixelSizeY:null,pixelSize:null,returnGeometry:!1,returnCatalogItems:!0,timeExtent:null},toJSON:function(a){var b=a&&a.geometry||this.geometry;a={geometry:b,returnGeometry:this.returnGeometry,returnCatalogItems:this.returnCatalogItems,mosaicRule:this.mosaicRule?
JSON.stringify(this.mosaicRule.toJSON()):null,renderingRule:this.renderingRule?JSON.stringify(this.renderingRule.toJSON()):null};b&&(a.geometryType=d.getJsonType(b));b=this.timeExtent;a.time=b?b.toJSON().join(","):null;null!=this.pixelSizeX&&null!=this.pixelSizeY?a.pixelSize=JSON.stringify({x:parseFloat(this.pixelSizeX),y:parseFloat(this.pixelSizeY)}):this.pixelSize&&(a.pixelSize=this.pixelSize?JSON.stringify(this.pixelSize.toJSON()):null);return a}})});