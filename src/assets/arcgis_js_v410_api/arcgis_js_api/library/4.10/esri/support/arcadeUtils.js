// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../arcade/arcade ../arcade/Dictionary ../arcade/Feature ../core/lang ../core/promiseUtils ../renderers/visualVariables/support/sizeVariableUtils".split(" "),function(t,d,e,p,h,q,k,l){function g(a){var b;try{b=a?e.parseScript(a):null}catch(c){b=null}return b}function f(a){a=g(a);return!!a&&e.scriptUsesGeometryEngine(a)}Object.defineProperty(d,"__esModule",{value:!0});var m=/^\$feature\./i,r={vars:{$feature:"any",$view:"any"},spatialReference:null};d.createSyntaxTree=g;d.createFunction=
function(a,b){b=b||q.clone(r);a="string"===typeof a?g(a):a;if(!a)return null;var c;try{c=a?e.compileScript(a,b):null}catch(n){c=null}return c};d.createExecContext=function(a,b){return{vars:{$feature:null==a?new h:h.createFromGraphic(a),$view:b&&b.view},spatialReference:b&&b.sr}};d.createFeature=function(a,b,c){return h.createFromGraphicLikeObject(b,a,c)};d.updateExecContext=function(a,b){a.vars.$feature=b};d.evalSyntaxTree=function(a,b){var c;try{c=e.executeScript(a,b,b.spatialReference)}catch(n){c=
null}return c};d.executeFunction=function(a,b){var c;try{c=a?a(b,b.spatialReference):null}catch(n){c=null}return c};d.executeAsyncFunction=function(a,b){try{return a?a(b,b.spatialReference):k.resolve(null)}catch(c){return k.resolve(null)}};d.extractFieldNames=function(a){if(!a)return[];a="string"===typeof a?g(a):a;if(!a)return[];var b=[];e.extractFieldLiterals(a).forEach(function(a){m.test(a)&&(a=a.replace(m,""),b.push(a))});b.sort();return b.filter(function(a,d){return 0===d||b[d-1]!==a})};d.dependsOnView=
function(a){return e.referencesMember(a,"$view")};d.getViewInfo=function(a){if(a&&a.viewingMode&&null!=a.scale&&a.spatialReference)return{view:new p({viewingMode:a.viewingMode,scale:a.scale}),sr:a.spatialReference}};d.convertServiceUrlToWorkspace=function(a,b){var c=e.featureSetUtils();return c?c.createFeatureSetCollectionFromService(a,b):null};d.convertFeatureLayerToFeatureSet=function(a,b){if(null===a)return null;var c=e.featureSetUtils();return c?c.constructFeatureSet(a,b):null};d.convertMapToFeatureSetCollection=
function(a){if(null===a||null===a.map)return null;var b=e.featureSetUtils();return b?b.createFeatureSetCollectionFromMap(a.map,a.spatialReference):null};d.loadScriptDependencies=function(a,b,c){void 0===c&&(c=[]);return e.loadScriptDependencies(a,b,c)};d.enableGeometryOperations=function(){return e.enableGeometrySupport()};d.enableFeatureSetOperations=function(){return e.enableFeatureSetSupport()};d.applyTextFormattingHTML=function(a){var b=/(\n)/gi;return"string"===typeof a?a.replace(b,'\x3cbr class\x3d"esri-text-new-line" /\x3e'):
a};d.hasGeometryOperations=function(a){if(!a)return!1;if("simple"===a.type||"class-breaks"===a.type||"unique-value"===a.type){var b=a.visualVariables,b=!!b&&b.some(function(a){var b=f(a.valueExpression);"size"===a.type&&(l.isSizeVariable(a.minSize)&&(b=b||f(a.minSize.valueExpression)),l.isSizeVariable(a.maxSize)&&(b=b||f(a.maxSize.valueExpression)));return b});return"valueExpression"in a&&f(a.valueExpression)?!0:b}return"esri.layers.support.LabelClass"===a.declaredClass?(a=a.labelExpressionInfo&&
a.labelExpressionInfo.expression,!(!a||!f(a))||!1):"esri.PopupTemplate"===a.declaredClass?!!a.expressionInfos&&a.expressionInfos.some(function(a){return f(a.expression)}):!1}});