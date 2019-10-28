// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/paramHelper dojo/_base/kernel dojo/_base/url ../config ../kernel ../request ../core/Error ../core/JSONSupport ../core/lang ../core/Loadable ../core/promiseUtils ../core/urlUtils ../core/accessorSupport/decorators ../geometry/Extent ./PortalQueryParams ./PortalQueryResult ./PortalUser".split(" "),function(f,G,u,v,d,w,p,x,m,k,y,q,z,A,B,e,C,c,D,n,E,F){var l,
t={Bookmark:function(){return e.create(function(c){return f(["./Bookmark"],c)})},Portal:function(){return e.create(function(c){return f(["./Portal"],c)})},PortalFolder:function(){return e.create(function(c){return f(["./PortalFolder"],c)})},PortalGroup:function(){return e.create(function(c){return f(["./PortalGroup"],c)})},PortalItem:function(){return e.create(function(c){return f(["./PortalItem"],c)})},PortalQueryParams:function(){return e.create(function(c){return f(["./PortalQueryParams"],c)})},
PortalQueryResult:function(){return e.create(function(c){return f(["./PortalQueryResult"],c)})},PortalRating:function(){return e.create(function(c){return f(["./PortalRating"],c)})},PortalUser:function(){return e.create(function(c){return f(["./PortalUser"],c)})}};return function(r){function b(a){a=r.call(this)||this;a.access=null;a.allSSL=!1;a.authMode="auto";a.authorizedCrossOriginDomains=null;a.basemapGalleryGroupQuery=null;a.bingKey=null;a.canListApps=!1;a.canListData=!1;a.canListPreProvisionedItems=
!1;a.canProvisionDirectPurchase=!1;a.canSearchPublic=!0;a.canShareBingPublic=!1;a.canSharePublic=!1;a.canSignInArcGIS=!1;a.canSignInIDP=!1;a.colorSetsGroupQuery=null;a.commentsEnabled=!1;a.created=null;a.culture=null;a.customBaseUrl=null;a.defaultBasemap=null;a.defaultExtent=null;a.defaultVectorBasemap=null;a.description=null;a.eueiEnabled=!1;a.featuredGroups=null;a.featuredItemsGroupQuery=null;a.galleryTemplatesGroupQuery=null;a.livingAtlasGroupQuery=null;a.hasCategorySchema=!1;a.helperServices=
null;a.homePageFeaturedContent=null;a.homePageFeaturedContentCount=null;a.httpPort=null;a.httpsPort=null;a.id=null;a.ipCntryCode=null;a.isPortal=!1;a.layerTemplatesGroupQuery=null;a.maxTokenExpirationMinutes=null;a.modified=null;a.name=null;a.portalHostname=null;a.portalMode=null;a.portalProperties=null;a.region=null;a.rotatorPanels=null;a.showHomePageDescription=!1;a.supportsHostedServices=!1;a.symbolSetsGroupQuery=null;a.templatesGroupQuery=null;a.units=null;a.url=m.portalUrl;a.urlKey=null;a.user=
null;a.useStandardizedQuery=!1;a.useVectorBasemaps=!1;a.vectorBasemapGalleryGroupQuery=null;return a}v(b,r);g=b;b.prototype.normalizeCtorArgs=function(a){return"string"===typeof a?{url:a}:a};b.prototype.destroy=function(){this._esriId_credentialCreateHandle&&(this._esriId_credentialCreateHandle.remove(),this._esriId_credentialCreateHandle=null)};b.prototype.readAuthorizedCrossOriginDomains=function(a){if(a)for(var b=0;b<a.length;b++){var c=a[b];-1===m.request.trustedServers.indexOf(c)&&m.request.trustedServers.push(c)}return a};
b.prototype.readDefaultBasemap=function(a){return a?(a=l.fromJSON(a),a.portalItem={portal:this},a):null};b.prototype.readDefaultVectorBasemap=function(a){return a?(a=l.fromJSON(a),a.portalItem={portal:this},a):null};Object.defineProperty(b.prototype,"extraQuery",{get:function(){var a=!(this.user&&this.user.orgId)||this.canSearchPublic;return this.id&&!a?" AND orgid:"+this.id:null},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"isOrganization",{get:function(){return!!this.access},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"restUrl",{get:function(){var a=this.url;if(a)var b=a.indexOf("/sharing"),a=0<b?a.substring(0,b):this.url.replace(/\/+$/,""),a=a+"/sharing/rest";return a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"thumbnailUrl",{get:function(){var a=this.restUrl,b=this.thumbnail;return a&&b?this._normalizeSSL(a+"/portals/self/resources/"+b):null},enumerable:!0,configurable:!0});b.prototype.readUrlKey=function(a){return a?a.toLowerCase():
a};b.prototype.readUser=function(a){var b=null;a&&(b=F.fromJSON(a),b.portal=this);return b};b.prototype.load=function(){var a=this,b=e.create(function(a){return f(["../Basemap"],a)}).then(function(a){l=a}).then(function(){return a._fetchSelf()}).then(function(b){if(k.id){var c=k.id;a.credential=c.findCredential(a.restUrl);a.credential||a.authMode!==g.AUTH_MODE_AUTO||(a._esriId_credentialCreateHandle=c.on("credential-create",function(){c.findCredential(a.restUrl)&&a._signIn()}))}a.read(b)});this.addResolvingPromise(b);
return this.when()};b.prototype.fetchBasemaps=function(a){var b=new n;b.query=a||(this.useVectorBasemaps?this.vectorBasemapGalleryGroupQuery:this.basemapGalleryGroupQuery);b.disableExtraQuery=!0;return this.queryGroups(b).then(function(a){b.num=100;b.query='type:"Web Map" -type:"Web Application"';return a.total?(a=a.results[0],b.sortField=a.sortField||"name",b.sortOrder=a.sortOrder||"desc",a.queryItems(b)):null}).then(function(a){return a&&a.total?a.results.filter(function(a){return"Web Map"===a.type}).map(function(a){return new l({portalItem:a})}):
[]})};b.prototype.fetchCategorySchema=function(){return this.hasCategorySchema?this._request(this.restUrl+"/portals/self/categorySchema").then(function(a){return a.categorySchema}):e.resolve([])};b.prototype.fetchFeaturedGroups=function(){var a=this.featuredGroups,b=new n;b.num=100;b.sortField="title";if(a&&a.length){for(var c=[],d=0;d<a.length;d++){var f=a[d];c.push('(title:"'+f.title+'" AND owner:'+f.owner+")")}b.query=c.join(" OR ");return this.queryGroups(b).then(function(a){return a.results})}return e.resolve([])};
b.prototype.fetchRegions=function(){return this._request(this.restUrl+"/portals/regions",{query:{culture:this.user&&this.user.culture||this.culture||p.locale}})};b.getDefault=function(){g._default||(g._default=new g);return g._default};b.prototype.queryGroups=function(a){return this._queryPortal("/community/groups",a,"PortalGroup")};b.prototype.queryItems=function(a){return this._queryPortal("/search",a,"PortalItem")};b.prototype.queryUsers=function(a){a.sortField||(a.sortField="username");return this._queryPortal("/community/users",
a,"PortalUser")};b.prototype.toJSON=function(){throw new q("internal:not-yet-implemented","Portal.toJSON is not yet implemented");};b.prototype._fetchSelf=function(a,b){void 0===a&&(a=this.authMode);void 0===b&&(b=!1);var c=this.restUrl+"/portals/self";a={authMode:a,query:{culture:p.locale}};"auto"===a.authMode&&(a.authMode="no-prompt");b&&(a.query.default=!0);return this._request(c,a)};b.prototype._queryPortal=function(a,b,c){var d=this,h=function(c){return d._request(d.restUrl+a,b.toRequestOptions(d)).then(function(a){var h=
b.clone();h.start=a.nextStart;return new E({nextQueryParams:h,queryParams:b,total:a.total,results:g._resultsToTypedArray(c,{portal:d},a)})}).then(function(a){return e.all(a.results.map(function(b){return"function"===typeof b.when?b.when():a})).then(function(){return a},function(){return a})})};return c&&t[c]?t[c]().then(function(a){return h(a)}):h()};b.prototype._signIn=function(){var a=this;if(this.authMode===g.AUTH_MODE_ANONYMOUS)return e.reject(new q("portal:invalid-auth-mode",'Current "authMode"\' is "'+
this.authMode+'"'));if("failed"===this.loadStatus)return e.reject(this.loadError);var b=function(b){return e.resolve().then(function(){if("not-loaded"===a.loadStatus)return b||(a.authMode="immediate"),a.load().then(function(){return null});if("loading"===a.loadStatus)return a.load().then(function(){if(a.credential)return null;a.credential=b;return a._fetchSelf("immediate")});if(a.user&&a.credential===b)return null;a.credential=b;return a._fetchSelf("immediate")}).then(function(b){b&&a.read(b)})};
return k.id?k.id.getCredential(this.restUrl).then(function(a){return b(a)}):b(this.credential)};b.prototype._normalizeSSL=function(a){var b=this.allSSL||C.isAppHTTPS();if(this.isPortal){var c=new x(a);return-1<this.portalHostname.toLowerCase().indexOf(c.host.toLowerCase())&&c.port&&"80"!==c.port&&"443"!==c.port?b?"https://"+c.host+(this.httpsPort&&443!==this.httpsPort?":"+this.httpsPort:"")+c.path+"?"+c.query:"http://"+c.host+(this.httpPort&&80!==this.httpPort?":"+this.httpPort:"")+c.path+"?"+c.query:
b?a.replace("http:","https:"):a}return b?a.replace("http:","https:"):a};b.prototype._normalizeUrl=function(a){var b=this.credential&&this.credential.token;return this._normalizeSSL(b?a+(-1<a.indexOf("?")?"\x26":"?")+"token\x3d"+b:a)};b.prototype._requestToTypedArray=function(a,b,c){var d=this,h=function(c){return d._request(a,b).then(function(a){var b=g._resultsToTypedArray(c,{portal:d},a);return e.all(b.map(function(b){return"function"===typeof b.when?b.when():a})).then(function(){return b},function(){return b})})};
return c?e.create(function(a){return f(["./"+c],a)}).then(function(a){return h(a)}):h()};b.prototype._request=function(a,b){var c=this.authMode===g.AUTH_MODE_ANONYMOUS?"anonymous":"auto",d=null,e="auto",f={f:"json"},k="json";b&&(b.authMode&&(c=b.authMode),b.body&&(d=b.body),b.method&&(e=b.method),b.query&&(f=u({},f,b.query)),b.responseType&&(k=b.responseType));b={authMode:c,body:d,method:e,query:f,responseType:k,timeout:0};return y(this._normalizeSSL(a),b).then(function(a){return a.data})};b._resultsToTypedArray=
function(a,b,c){if(c){if(c=c.listings||c.notifications||c.userInvitations||c.tags||c.items||c.groups||c.comments||c.provisions||c.results||c.relatedItems||c,a||b)c=c.map(function(c){c=A.mixin(a?a.fromJSON(c):c,b);"function"===typeof c.load&&c.load();return c})}else c=[];return c};var g;b.AUTH_MODE_ANONYMOUS="anonymous";b.AUTH_MODE_AUTO="auto";b.AUTH_MODE_IMMEDIATE="immediate";d([c.property()],b.prototype,"access",void 0);d([c.property()],b.prototype,"allSSL",void 0);d([c.property()],b.prototype,"authMode",
void 0);d([c.property()],b.prototype,"authorizedCrossOriginDomains",void 0);d([c.reader("authorizedCrossOriginDomains")],b.prototype,"readAuthorizedCrossOriginDomains",null);d([c.property()],b.prototype,"basemapGalleryGroupQuery",void 0);d([c.property()],b.prototype,"bingKey",void 0);d([c.property()],b.prototype,"canListApps",void 0);d([c.property()],b.prototype,"canListData",void 0);d([c.property()],b.prototype,"canListPreProvisionedItems",void 0);d([c.property()],b.prototype,"canProvisionDirectPurchase",
void 0);d([c.property()],b.prototype,"canSearchPublic",void 0);d([c.property()],b.prototype,"canShareBingPublic",void 0);d([c.property()],b.prototype,"canSharePublic",void 0);d([c.property()],b.prototype,"canSignInArcGIS",void 0);d([c.property()],b.prototype,"canSignInIDP",void 0);d([c.property()],b.prototype,"colorSetsGroupQuery",void 0);d([c.property()],b.prototype,"commentsEnabled",void 0);d([c.property({type:Date})],b.prototype,"created",void 0);d([c.property()],b.prototype,"credential",void 0);
d([c.property()],b.prototype,"culture",void 0);d([c.property()],b.prototype,"currentVersion",void 0);d([c.property()],b.prototype,"customBaseUrl",void 0);d([c.property()],b.prototype,"defaultBasemap",void 0);d([c.reader("defaultBasemap")],b.prototype,"readDefaultBasemap",null);d([c.property({type:D})],b.prototype,"defaultExtent",void 0);d([c.property()],b.prototype,"defaultVectorBasemap",void 0);d([c.reader("defaultVectorBasemap")],b.prototype,"readDefaultVectorBasemap",null);d([c.property()],b.prototype,
"description",void 0);d([c.property()],b.prototype,"eueiEnabled",void 0);d([c.property({dependsOn:["user","id","canSearchPublic"],readOnly:!0})],b.prototype,"extraQuery",null);d([c.property()],b.prototype,"featuredGroups",void 0);d([c.property()],b.prototype,"featuredItemsGroupQuery",void 0);d([c.property()],b.prototype,"galleryTemplatesGroupQuery",void 0);d([c.property()],b.prototype,"livingAtlasGroupQuery",void 0);d([c.property()],b.prototype,"hasCategorySchema",void 0);d([c.property()],b.prototype,
"helpBase",void 0);d([c.property()],b.prototype,"helperServices",void 0);d([c.property()],b.prototype,"helpMap",void 0);d([c.property()],b.prototype,"homePageFeaturedContent",void 0);d([c.property()],b.prototype,"homePageFeaturedContentCount",void 0);d([c.property()],b.prototype,"httpPort",void 0);d([c.property()],b.prototype,"httpsPort",void 0);d([c.property()],b.prototype,"id",void 0);d([c.property()],b.prototype,"ipCntryCode",void 0);d([c.property({dependsOn:["access"],readOnly:!0})],b.prototype,
"isOrganization",null);d([c.property()],b.prototype,"isPortal",void 0);d([c.property()],b.prototype,"layerTemplatesGroupQuery",void 0);d([c.property()],b.prototype,"maxTokenExpirationMinutes",void 0);d([c.property({type:Date})],b.prototype,"modified",void 0);d([c.property()],b.prototype,"name",void 0);d([c.property()],b.prototype,"portalHostname",void 0);d([c.property()],b.prototype,"portalMode",void 0);d([c.property()],b.prototype,"portalProperties",void 0);d([c.property()],b.prototype,"region",
void 0);d([c.property({dependsOn:["url"],readOnly:!0})],b.prototype,"restUrl",null);d([c.property()],b.prototype,"rotatorPanels",void 0);d([c.property()],b.prototype,"showHomePageDescription",void 0);d([c.property()],b.prototype,"staticImagesUrl",void 0);d([c.property()],b.prototype,"stylesGroupQuery",void 0);d([c.property()],b.prototype,"supportsHostedServices",void 0);d([c.property()],b.prototype,"symbolSetsGroupQuery",void 0);d([c.property()],b.prototype,"templatesGroupQuery",void 0);d([c.property()],
b.prototype,"thumbnail",void 0);d([c.property({dependsOn:["restUrl","thumbnail"],readOnly:!0})],b.prototype,"thumbnailUrl",null);d([c.property()],b.prototype,"units",void 0);d([c.property()],b.prototype,"url",void 0);d([c.property()],b.prototype,"urlKey",void 0);d([c.reader("urlKey")],b.prototype,"readUrlKey",null);d([c.property()],b.prototype,"user",void 0);d([c.reader("user")],b.prototype,"readUser",null);d([c.property()],b.prototype,"useStandardizedQuery",void 0);d([c.property()],b.prototype,"useVectorBasemaps",
void 0);d([c.property()],b.prototype,"vectorBasemapGalleryGroupQuery",void 0);d([w(1,c.cast(n))],b.prototype,"_queryPortal",null);return b=g=d([c.subclass("esri.portal.Portal")],b)}(c.declared(z,B))});