//>>built
define("dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/when dojo/promise/all dojo/store/util/SimpleQueryEngine dojo/store/util/QueryResults".split(" "),function(A,M,N,I,O,J,T){function B(a){var b=new N;a.onsuccess=function(a){b.resolve(a.target.result)};a.onerror=function(){a.error.message=a.webkitErrorMessage;b.reject(a.error)};return b.promise}function D(a,b,c){if(l||q.length){a&&(q.push({cursor:a,priority:b,retry:c}),q.sort(function(a,b){return a.priority>b.priority?1:-1}));if(1<=l)return;
var e=q.pop();a=e&&e.cursor}if(a)try{a["continue"](),l++}catch(g){if("TransactionInactiveError"!==g.name&&0!==g.name||!e)throw g;e.retry()}}function U(){return!0}function P(a){function b(b,d){e?b&&c.then(function(a){a.forEach(b,d)}):(b&&g.push(b),c||(c=a.filter(function(a){e=!0;for(var b=0,c=g.length;b<c;b++)g[b].call(d,a);return!0})));return c}var c,e,g=[];return{total:a.total,filter:function(a,d){var c;return b(function(b){c||(c=!a.call(d,b))})},forEach:b,map:function(a,c){var d=[];return b(function(b){d.push(a.call(c,
b))}).then(function(){return d})},then:function(a,c){return b().then(a,c)}}}var q=[],l=0,K=/(.*)\*$/,t=window.IDBKeyRange||window.webkitIDBKeyRange;return A(null,{constructor:function(a){A.safeMixin(this,a);var b=this,c=this.dbConfig;this.indices=c.stores[this.storeName];this.cachedCount={};for(var e in b.indices)a=b.indices[e],"number"===typeof a&&(b.indices[e]={preference:a});this.db=this.db||c.db;if(!this.db){var g=c.openRequest;g||(g=c.openRequest=window.indexedDB.open(c.name||"dojo-db",parseInt(c.version,
10)),g.onupgradeneeded=function(){var a=b.db=g.result,d;for(d in c.stores){var e=c.stores[d];if(a.objectStoreNames.contains(d))m=g.transaction.objectStore(d);else var m=e.idProperty||"id",m=a.createObjectStore(d,{keyPath:m,autoIncrement:e[m]&&e[m].autoIncrement||!1});for(var h in e)m.indexNames.contains(h)||"autoIncrement"===h||!1===e[h].indexed||m.createIndex(h,h,e[h])}},c.available=B(g));this.available=c.available.then(function(a){return b.db=a})}},idProperty:"id",storeName:"",indices:{},queryEngine:J,
transaction:function(){var a=this;this._currentTransaction=null;return{abort:function(){a._currentTransaction.abort()},commit:function(){a._currentTransaction=null}}},_getTransaction:function(){if(!this._currentTransaction){this._currentTransaction=this.db.transaction([this.storeName],"readwrite");var a=this;this._currentTransaction.oncomplete=function(){a._currentTransaction=null};this._currentTransaction.onerror=function(a){console.error(a)}}return this._currentTransaction},_callOnStore:function(a,
b,c,e){var g=this;return I(this.available,function d(){var l=g._currentTransaction;if(l)var m=!0;else l=g._getTransaction();var h,n;if(m)try{n=l.objectStore(g.storeName),c&&(n=n.index(c)),h=n[a].apply(n,b)}catch(w){if("TransactionInactiveError"===w.name||"InvalidStateError"===w.name)return g._currentTransaction=null,d();throw w;}else n=l.objectStore(g.storeName),c&&(n=n.index(c)),h=n[a].apply(n,b);return e?h:B(h)})},get:function(a){return this._callOnStore("get",[a])},getIdentity:function(a){return a[this.idProperty]},
put:function(a,b){b=b||{};this.cachedCount={};return this._callOnStore(!1===b.overwrite?"add":"put",[a])},add:function(a,b){b=b||{};b.overwrite=!1;return this.put(a,b)},remove:function(a){this.cachedCount={};return this._callOnStore("delete",[a])},query:function(a,b){function c(a,b,c){E++;var e=d.indices[a];if(e&&!1!==e.indexed&&(b=b||e.preference*(c||1)||.001,b>A))return A=b,u=a,!0;E++}b=b||{};var e=b.start||0,g=b.count||Infinity,r=b.sort,d=this;if(a.forEach){var q={sort:r},m=this.queryEngine({},
q),h=[],n=0,w=0;return P({total:{then:function(){return O(h).then(function(a){return a.reduce(function(a,b){return a+b})*n/(w||1)}).then.apply(this,arguments)}},filter:function(b,c){var Q=0,f=[],k,p={},l=[];return O(a.map(function(a,S){function R(a){V.push(a);for(var d=[],p=[];f.every(function(a){if(0<a.length)return(a=a[0])&&p.push(a),d.push(a)});){if(Q>=e+g||0===p.length){k=!0;return}a=m(p)[0];f[d.indexOf(a)].shift();if(Q++>=e&&(l.push(a),!b.call(c,a))){k=!0;return}d=[];p=[]}return!0}var V=f[S]=
[];a=d.query(a,q);h[S]=a.total;return a.filter(function(a){if(!k){var b=d.getIdentity(a);w++;if(b in p)return!0;n++;p[b]=!0;return R(a)}}).then(function(a){R(null);return a})})).then(function(){return l})}})}var C,F=JSON.stringify(a)+"-"+JSON.stringify(b.sort),x,u,A=0,E=0,f,G;for(G in a){f=a[G];var B=!1,y,z=null;if("boolean"!==typeof f){if(f)if(f.from||f.to)B=!0,function(a,b){z={test:function(c){return!a||a<=c&&(!b||b>=c)},keyRange:a?b?t.bound(a,b,f.excludeFrom,f.excludeTo):t.lowerBound(a,f.excludeFrom):
t.upperBound(b,f.excludeTo)}}(f.from,f.to);else if("object"===typeof f&&f.contains)(function(a){var b,c=(b=a[0])&&b.match&&b.match(K);c?(b=c[1],b=t.bound(b,b+"~")):b=t.only(b);z={test:function(b){return a.every(function(a){var c=a&&a.match&&a.match(K);return c?(a=c[1],b&&b.some(function(b){return b.slice(0,a.length)===a})):b&&-1<b.indexOf(a)})},keyRange:b}})(f.contains);else if(y=f.match&&f.match(K))y=y[1],z=new RegExp("^"+y),z.keyRange=t.bound(y,y+"~");z&&(a[G]=z);c(G,null,B?.1:1)}}var v;if(r)if(r=
r[0],r.attribute===u||c(r.attribute,1))v=r.descending;else var H=!0,e=0,g=Infinity;var L;u?(C=u in a?(f=a[u])&&f.keyRange?f.keyRange:t.only(f):null,L=[C,v?"prev":"next"]):L=[];var k=d.cachedPosition;k&&k.queryId===F&&k.offset<e&&1<E?(x=k.preFilterOffset+1,d.cachedPosition=k=M.mixin({},k)):(k=d.cachedPosition={offset:-1,preFilterOffset:-1,queryId:F},2>E&&(k.offset=k.preFilterOffset=(x=e)-1));var J=this.queryEngine(a);v={total:{then:function(a){function b(a){d.cachedCount[F]=a;return Math.round((k.offset+
1.01)/(k.preFilterOffset+1.01)*a)}var c=d.cachedCount[F];return c?a(b(c)):(this.then=(C?d._callOnStore("count",[C],u):d._callOnStore("count")).then(b)).then.apply(this,arguments)}},filter:function(a,c){function f(){I(d._callOnStore("openCursor",L,u,!0),function(d){l++;d.onsuccess=function(n){l--;var p=n.target.result;if(p){if(x){p.advance(x);l++;x=!1;return}k.preFilterOffset++;try{var q=p.value;b.join&&(q=b.join(q));return I(q,function(l){if(J.matches(l)&&(k.offset++,k.offset>=e&&(m.push(l),!a.call(c,
l)||k.offset>=e+g-1))){d.lastCursor=p;h.resolve(m);D();return}return D(p,b.priority,function(){x=k.preFilterOffset;f()})})}catch(W){h.reject(W)}}else h.resolve(m);D()};d.onerror=function(a){l--;h.reject(a);D()}})}var h=new N,m=[];f();return h.promise}};return H?(m=this.queryEngine({},b),H=M.delegate(v.filter(U).then(function(a){return m(a)})),H.total=v.total,new T(H)):b.rawResults?v:P(v)}})});