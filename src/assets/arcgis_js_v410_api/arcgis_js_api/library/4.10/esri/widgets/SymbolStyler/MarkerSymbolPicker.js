// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/widgets/SymbolStyler/templates/MarkerSymbolPicker.html":'\x3cdiv\x3e\r\n  \x3cdiv id\x3d"${id}_typeInput" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"dap_markerCategoryInput" class\x3d"${css.typeInput} ${css.categorySelect}"\x3e\x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"dap_symbolTypeHeader" class\x3d"${css.header} ${css.hidden}"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"${css.symbolViewport}" data-dojo-attach-point\x3d"dap_symbolViewport"\x3e\r\n    \x3cdiv class\x3d"${css.symbolGrid}" data-dojo-attach-point\x3d"dap_symbolGrid"\x3e\x3c!--symbols added dynamically--\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("../../core/domUtils ../../core/promiseUtils ../../portal/Portal ../../symbols/support/styleUtils ./support/symbolFetcher ./support/symbolStorage dijit/_TemplatedMixin dijit/_WidgetBase dijit/_WidgetsInTemplateMixin dijit/Tooltip dojo/dom-class dojo/dom-construct dojo/on dojo/store/Memory dojo/store/Observable dojo/i18n!./nls/SymbolStyler dojo/text!./templates/MarkerSymbolPicker.html dijit/form/Select ../../core/libs/intersection-observer/intersection-observer".split(" "),function(r,k,t,l,
m,f,u,v,w,x,d,n,y,p,z,g,A){function q(){return!0}var h={id:"customTypes",keywords:"custom symbols",name:g.customImages,title:g.customImages},c={root:"esri-marker-symbol-picker",symbolGrid:"esri-symbol-grid",symbol:"esri-symbol",noSymbols:"esri-no-symbols",defaultSymbols:"esri-default-symbols",loader:"esri-loading-indicator",loading:"esri-loading",typeInput:"esri-type-input",categorySelect:"esri-marker-symbol-picker__category-select",loadingSymbols:"esri-marker-symbol-picker--loading",symbolViewport:"esri-marker-symbol-picker__symbolViewport",
selectedSymbol:"esri-symbol--selected",dimensionalityFlat:"esri-marker-symbol-picker--dimensionality-flat",dimensionalityVolumetric:"esri-marker-symbol-picker--dimensionality-volumetric",blocked:"esri-marker-symbol-picker--blocked",header:"esri-marker-symbol-picker__header",showingOverlay:"esri-marker-symbol-picker--showing-overlay",hidden:"esri-hidden"};return v.createSubclass([u,w],{baseClass:c.root,declaredClass:"esri.widgets.SymbolStyler.MarkerSymbolPicker",templateString:A,css:c,postCreate:function(){this.inherited(arguments);
this._sourceSymbolTypesStore=new p;this._symbolTypesStore=new z(new p);this._activeSymbolFetch={};this._portalToSourcesMap=new Map;this.dap_markerCategoryInput.set({labelAttr:"title",sortByLabel:!1});this._symbolTooltip=new x({connectId:this.dap_symbolGrid,selector:".esri-symbol",getContent:function(a){return a.item.get("data.title")||""}.bind(this)});this.own(this._symbolTooltip)},startup:function(){this.inherited(arguments);f.init();var a=this;y(this.dap_symbolGrid,".esri-symbol:click",function(){this.item.getSymbol().then(function(b){a._selectedNode&&
d.remove(a._selectedNode,c.selectedSymbol);a._selectedNode=this;d.add(this,c.selectedSymbol);a.emit("symbol-select",{selection:b.clone()})}.bind(this))});this.dap_markerCategoryInput.on("change",function(a){this.clearSelection();this._fetchSymbols(a)}.bind(this));this.refresh()},destroy:function(){this.inherited(arguments);this._portalToSourcesMap.clear();this._portalToSourcesMap=null;this._symbolIntersectionObserver.disconnect();this._symbolIntersectionObserver=null},_3dSymbolsFilter:"volumetric",
_symbolTypesStore:null,_sourceSymbolTypesStore:null,_symbolItemSurfaces:null,_noSymbolsOverlay:null,_symbolGrid:null,_portal:null,_portalLoadTimeoutInMs:3E3,_portalToSourcesMap:null,_selectedNode:null,_symbolTooltip:null,_symbolIntersectionObserver:null,_webStyleItemKeywordBlacklist:{EsriThematicShapesStyle:!0},displayMode:"portal",filters:null,_setFiltersAttr:function(a){this._set("filters",{source:a&&a.source||q,symbol:a&&a.symbol||q})},portal:null,symbolSource:"symbol-set",addCustomImageSymbol:function(a){var b=
a.clone();a=f.loadCustomItems()||[];var e=b.url.split("/").pop();a.some(function(a){return a.url===b.url})||(b.type="esriPMS",b.name=e,a.push(b),this.dap_markerCategoryInput.set("value",h.id),this.clearSelection(),this._fetchSymbols(h.id))},_getDimensionality:function(){return this.symbolSource.split(":")[1]},_updateDisplay:function(){var a=this.dap_markerCategoryInput;this.clearSelection();"portal"===this.displayMode&&(this._fetchSymbols(a.value),r.show(a.domNode),d.remove(this.domNode,c.defaultSymbols))},
refresh:function(a){a=a||{};a.freshStorage&&f.empty();this._blockInteraction(!0);this._setUpDimensionality();this._setUpSymbolCategories().then(this._updateDisplay.bind(this)).then(function(){this._blockInteraction(!1)}.bind(this))},_blockInteraction:function(a){this.dap_markerCategoryInput.set("disabled",a);d.toggle(this.domNode,c.blocked,a)},clearSelection:function(){for(var a=this.dap_symbolGrid;a.lastChild;)a.removeChild(a.lastChild)},_activeSymbolFetch:null,_fetchSymbols:function(a){if(a){var b;
this._activeSymbolFetch.promise&&(this._activeSymbolFetch.promise.cancel(),this._activeSymbolFetch.promise=null,this._activeSymbolFetch.id=null);b=this._symbolTypesStore.query({id:a})[0];this._showLoadingIndicator();this._activeSymbolFetch.id=a;this._activeSymbolFetch.promise=this._getSymbolItems(b).then(function(b){f.saveRecentItem({id:a,dimensionality:b[0]&&b[0].data.dimensionality});this._symbolTypesStore.query({defaultType:!0});return b}.bind(this)).then(function(e){a===this._activeSymbolFetch.id&&
this._updateSymbolOptions(this._filterSymbols(e,b))}.bind(this))}},_filterSymbols:function(a,b){return a.filter(function(a){return this.filters.symbol({name:a.data.name},b)},this)},_showLoadingIndicator:function(){d.add(this.domNode,c.loadingSymbols)},_hideLoadingIndicator:function(){d.remove(this.domNode,c.loadingSymbols)},_showNoSymbolsMessage:function(){this._hideLoadingIndicator();d.add(this.domNode,c.noSymbols);this._showMessageOverlay(g.symbolLoadError)},_showMessageOverlay:function(a){d.add(this.dap_symbolViewport,
c.showingOverlay);this._noSymbolsOverlay||(this._noSymbolsOverlay=n.create("div"));this._noSymbolsOverlay.innerHTML=a;this.dap_symbolViewport.appendChild(this._noSymbolsOverlay)},_hideMessageOverlay:function(){d.remove(this.dap_symbolViewport,c.showingOverlay);this._noSymbolsOverlay&&this._noSymbolsOverlay.parentNode&&this._noSymbolsOverlay.parentNode.removeChild(this._noSymbolsOverlay)},_setUpSymbolCategories:function(){this._showLoadingIndicator();d.remove(this.dap_markerCategoryInput.domNode,c.hidden);
d.add(this.dap_symbolTypeHeader,c.hidden);this._hideMessageOverlay();return this._initPortal().then(function(a){if(0===this.symbolSource.indexOf("symbol-set"))return m.fetchSymbolSetSymbolSources(a);var b=this._portalToSourcesMap.get(a);return b?b:m.fetchWebStyleSymbolSources(a).then(function(a){return a.sort(function(a,b){a=l.styleNameFromItem(a.portalItem);b=l.styleNameFromItem(b.portalItem);return a>b?1:a<b?-1:0})}).then(function(b){this._portalToSourcesMap.set(a,b);return b}.bind(this))}.bind(this)).then(this._filterSourcesInternally.bind(this)).then(this._setUpSymbolSelect.bind(this)).then(function(){this._hideLoadingIndicator();
0===this._symbolTypesStore.data.length?this._showMessageOverlay(g.noSymbolsAvailable):this._hideMessageOverlay()}.bind(this)).catch(this._showNoSymbolsMessage.bind(this))},_filterSourcesInternally:function(a){return k.resolve(a).then(function(a){var b=this._webStyleItemKeywordBlacklist;return a.filter(function(a){return!a.portalItem.typeKeywords.some(function(a){return b[a]})})}.bind(this)).then(function(a){if(0===this.symbolSource.indexOf("symbol-set"))return a;var b=this._getDimensionality(),c=
a.map(function(a){return a.fetchData()});return k.eachAlways(c).then(function(c){var e=[m.getPrimitives(b)];c.forEach(function(c,d){if((c=c.value)&&c.items&&Array.isArray(c.items)&&0!==c.items.length){var C=l.styleNameFromItem(a[d].portalItem);(c.items[0].dimensionality||("EsriIconsStyle"===C?"flat":"volumetric"))===b&&e.push(a[d])}});return e}).then(this._filterSources.bind(this))}.bind(this))},_filterSources:function(a){return a.filter(this.filters.source,this)},_setUpDimensionality:function(){var a=
"volumetric"===this._getDimensionality();d.toggle(this.domNode,c.dimensionalityVolumetric,a);d.toggle(this.domNode,c.dimensionalityFlat,!a)},_setUpSymbolSelect:function(a){var b=this._sourceSymbolTypesStore,e,B;b.setData(a);a.forEach(function(a){a.defaultType&&(e=a.id)});(a=f.loadRecentSymbolItem())&&(B=b.query({id:a.id})[0])&&this._matchesDimensionality(a)&&(e=a.id);a=this._symbolTypesStore;a.setData(b.query());b=this.dap_markerCategoryInput;b.set("store",a);b.set("value",e,!1);this.dap_symbolTypeHeader.innerHTML=
b.get("displayedValue");a=a.data.length;d.toggle(b.domNode,c.hidden,1>=a);d.toggle(this.dap_symbolTypeHeader,c.hidden,1!=a)},_matchesDimensionality:function(a){var b=this._getDimensionality();a=a.dimensionality;return"volumetric"===a&&"volumetric"===b||"flat"===a&&"flat"===b},_injectCustomSymbolType:function(a){a.push(h);return a},_initPortal:function(){var a=this.portal||t.getDefault(),b;b=k.timeout(a.load().then(function(){return this._portal=a}.bind(this)),this._portalLoadTimeoutInMs);this.own(b);
return b},_getSymbolItems:function(a){return a.id===h.id?f.loadCustomItems():a.getItems().then(function(a){return a.filter(function(a){var b=this.symbolSource.split(":")[1];a=a.data.dimensionality;return!b||a===b},this)}.bind(this))},_getActiveSource:function(){var a=this.dap_markerCategoryInput.get("value");return this._symbolTypesStore.query({id:a})[0]},_updateSymbolOptions:function(a){var b=document.createDocumentFragment();this._symbolIntersectionObserver&&this._symbolIntersectionObserver.disconnect();
this._symbolIntersectionObserver=new IntersectionObserver(function(a,b){function c(){d++;e[d]&&(e[d](),delete e[d],c())}var d=a[0].target.index,e={};a.forEach(function(a){if(a.isIntersecting){var f=a.target;f.item.getThumbnail(f).then(function(a){f.index===d?(a(),c()):e[f.index]=a});f.item.getSymbol();b.unobserve(f)}})},{root:this.dap_symbolViewport});a.forEach(function(a,d){var e=n.create("div",{class:c.symbol});e.item=a;e.index=d;this._symbolIntersectionObserver.observe(e);b.appendChild(e)},this);
this._hideLoadingIndicator();0===a.length?this._showMessageOverlay(g.noSymbolsAvailable):(this._hideMessageOverlay(),this.dap_symbolGrid.appendChild(b),this.dap_symbolViewport.scrollTop=0)}})});