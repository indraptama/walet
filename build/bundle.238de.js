!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n=window.webpackJsonp;window.webpackJsonp=function(t,r,i){for(var a,c,l=0,u=[];l<t.length;l++)c=t[l],o[c]&&u.push(o[c][0]),o[c]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);for(n&&n(t,r,i);u.length;)u.shift()()};var r={},o={4:0};t.e=function(e){function n(){c.onerror=c.onload=null,clearTimeout(l);var t=o[e];0!==t&&(t&&t[1](new Error("Loading chunk "+e+" failed.")),o[e]=void 0)}var r=o[e];if(0===r)return new Promise(function(e){e()});if(r)return r[2];var i=new Promise(function(t,n){r=o[e]=[t,n]});r[2]=i;var a=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.charset="utf-8",c.async=!0,c.timeout=12e4,t.nc&&c.setAttribute("nonce",t.nc),c.src=t.p+""+({0:"route-home",1:"route-article",2:"route-profile",3:"route-agen"}[e]||e)+".chunk."+{0:"b946b",1:"4ea91",2:"c0aa2",3:"2f896"}[e]+".js";var l=setTimeout(n,12e4);return c.onerror=c.onload=n,a.appendChild(c),i},t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t.oe=function(e){throw console.error(e),e},t(t.s=0)}({"+GyM":function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){function t(){var t=this;r.Component.call(this);var n=function(e){t.setState({child:e&&e.default||e})},o=e(n);o&&o.then&&o.then(n)}return t.prototype=new r.Component,t.prototype.constructor=t,t.prototype.render=function(e,t){return(0,r.h)(t.child,e)},t};var r=n("KM04")},"/QC5":function(e,t,n){"use strict";function r(e,t){for(var n in t)e[n]=t[n];return e}function o(e,t,n){void 0===n&&(n=g);var r,o=/(?:\?([^#]*))?(#.*)?$/,i=e.match(o),c={};if(i&&i[1])for(var l=i[1].split("&"),u=0;u<l.length;u++){var s=l[u].split("=");c[decodeURIComponent(s[0])]=decodeURIComponent(s.slice(1).join("="))}e=a(e.replace(o,"")),t=a(t||"");for(var f=Math.max(e.length,t.length),p=0;p<f;p++)if(t[p]&&":"===t[p].charAt(0)){var h=t[p].replace(/(^\:|[+*?]+$)/g,""),d=(t[p].match(/[+*?]+$/)||g)[0]||"",m=~d.indexOf("+"),v=~d.indexOf("*"),b=e[p]||"";if(!b&&!v&&(d.indexOf("?")<0||m)){r=!1;break}if(c[h]=decodeURIComponent(b),m||v){c[h]=e.slice(p).map(decodeURIComponent).join("/");break}}else if(t[p]!==e[p]){r=!1;break}return(!0===n.default||!1!==r)&&c}function i(e,t){var n=e.attributes||g,r=t.attributes||g;return n.default?1:r.default?-1:c(n.path)-c(r.path)||n.path.length-r.path.length}function a(e){return l(e).split("/")}function c(e){return(l(e).match(/\/+/g)||"").length}function l(e){return e.replace(/(^\/+|\/+$)/g,"")}function u(e){return null!=e.__preactattr_||"undefined"!=typeof Symbol&&null!=e[Symbol.for("preactattr")]}function s(e,t){void 0===t&&(t="push"),N&&N[t]?N[t](e):"undefined"!=typeof history&&history[t+"State"]&&history[t+"State"](null,null,e)}function f(){var e;return e=N&&N.location?N.location:N&&N.getCurrentLocation?N.getCurrentLocation():"undefined"!=typeof location?location:x,""+(e.pathname||"")+(e.search||"")}function p(e,t){return void 0===t&&(t=!1),"string"!=typeof e&&e.url&&(t=e.replace,e=e.url),h(e)&&s(e,t?"replace":"push"),d(e)}function h(e){for(var t=w.length;t--;)if(w[t].canRoute(e))return!0;return!1}function d(e){for(var t=!1,n=0;n<w.length;n++)!0===w[n].routeTo(e)&&(t=!0);for(var r=C.length;r--;)C[r](e);return t}function m(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),n=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return p(t)}}function v(e){if(0==e.button)return m(e.currentTarget||e.target||this),b(e)}function b(e){return e&&(e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault()),!1}function _(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||0!==e.button)){var t=e.target;do{if("A"===String(t.nodeName).toUpperCase()&&t.getAttribute("href")&&u(t)){if(t.hasAttribute("native"))return;if(m(t))return b(e)}}while(t=t.parentNode)}}function y(){L||("function"==typeof addEventListener&&(N||addEventListener("popstate",function(){return d(f())}),addEventListener("click",_)),L=!0)}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"subscribers",function(){return C}),n.d(t,"getCurrentUrl",function(){return f}),n.d(t,"route",function(){return p}),n.d(t,"Router",function(){return M}),n.d(t,"Route",function(){return O}),n.d(t,"Link",function(){return j});var k=n("KM04"),g=(n.n(k),{}),N=null,w=[],C=[],x={},L=!1,M=function(e){function t(t){e.call(this,t),t.history&&(N=t.history),this.state={url:t.url||f()},y()}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.shouldComponentUpdate=function(e){return!0!==e.static||(e.url!==this.props.url||e.onChange!==this.props.onChange)},t.prototype.canRoute=function(e){return this.getMatchingChildren(this.props.children,e,!1).length>0},t.prototype.routeTo=function(e){return this._didRoute=!1,this.setState({url:e}),this.updating?this.canRoute(e):(this.forceUpdate(),this._didRoute)},t.prototype.componentWillMount=function(){w.push(this),this.updating=!0},t.prototype.componentDidMount=function(){var e=this;N&&(this.unlisten=N.listen(function(t){e.routeTo(""+(t.pathname||"")+(t.search||""))})),this.updating=!1},t.prototype.componentWillUnmount=function(){"function"==typeof this.unlisten&&this.unlisten(),w.splice(w.indexOf(this),1)},t.prototype.componentWillUpdate=function(){this.updating=!0},t.prototype.componentDidUpdate=function(){this.updating=!1},t.prototype.getMatchingChildren=function(e,t,a){return e.slice().sort(i).map(function(e){var i=e.attributes||{},c=i.path,l=o(t,c,i);if(l){if(!1!==a){var u={url:t,matches:l};return r(u,l),n.i(k.cloneElement)(e,u)}return e}return!1}).filter(Boolean)},t.prototype.render=function(e,t){var n=e.children,r=e.onChange,o=t.url,i=this.getMatchingChildren(n,o,!0),a=i[0]||null;this._didRoute=!!a;var c=this.previousUrl;return o!==c&&(this.previousUrl=o,"function"==typeof r&&r({router:this,url:o,previous:c,active:i,current:a})),a},t}(k.Component),j=function(e){return n.i(k.h)("a",r({onClick:v},e))},O=function(e){return n.i(k.h)(e.component,e)};M.subscribers=C,M.getCurrentUrl=f,M.route=p,M.Router=M,M.Route=O,M.Link=j,t.default=M},0:function(e,t,n){e.exports=n("YK4a")},"5ttS":function(e,t,n){"use strict";function r(){return n.i(o.h)("footer",null,n.i(o.h)("div",{className:"bg-primary ph3"},n.i(o.h)("div",{className:"mw9 center tc pv5"},l,n.i(o.h)("nav",{className:"db-l mt4 tl tc-l"},n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/"},"Home"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/profile"},"Profil"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/produk"},"Produk"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/article"},"Article"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/pemesanan"},"Pemesanan"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/kontak"},"Kontak"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/agen"},"Agen Resmi"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/member"},"Member"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/gallery"},"Galeri"),n.i(o.h)(i.Link,{className:"ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6",activeClassName:c.a.active,href:"/csr"},"CSR")))),n.i(o.h)("div",{className:"tl pv3 bg-black ph3 white f7"},n.i(o.h)("span",null,"© "+(new Date).getFullYear()+" All Rights Reserved  |  duniawallet.com")))}var o=n("KM04"),i=(n.n(o),n("sw5u")),a=(n.n(i),n("ZMjw")),c=n.n(a),l=n.i(o.h)("img",{className:"h3 tc",src:"assets/logo.svg",alt:""});t.a=r},"7VC8":function(){},"8Njl":function(e,t,n){"use strict";function r(e){n.e(3).then(function(){e(n("COxD"))}.bind(null,n)).catch(n.oe)}var o=n("+GyM");t.a=n.n(o)()(r)},E1C8:function(e,t,n){"use strict";function r(e){n.e(0).then(function(){e(n("sITr"))}.bind(null,n)).catch(n.oe)}var o=n("+GyM");t.a=n.n(o)()(r)},HOGw:function(){},JkW7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("HOGw"),o=(n.n(r),n("kuxM")),i=(n.n(o),n("slnC")),a=(n.n(i),n("7VC8")),c=(n.n(a),n("rq4c"));n.n(c);t.default=n("qLaj").a},KM04:function(e){!function(){"use strict";function t(){}function n(e,n){var r,o,i,a,c=S;for(a=arguments.length;a-- >2;)R.push(arguments[a]);for(n&&null!=n.children&&(R.length||R.push(n.children),delete n.children);R.length;)if((o=R.pop())&&void 0!==o.pop)for(a=o.length;a--;)R.push(o[a]);else"boolean"==typeof o&&(o=null),(i="function"!=typeof e)&&(null==o?o="":"number"==typeof o?o+="":"string"!=typeof o&&(i=!1)),i&&r?c[c.length-1]+=o:c===S?c=[o]:c.push(o),r=i;var l=new t;return l.nodeName=e,l.children=c,l.attributes=null==n?void 0:n,l.key=null==n?void 0:n.key,void 0!==P.vnode&&P.vnode(l),l}function r(e,t){for(var n in t)e[n]=t[n];return e}function o(e,t){return n(e.nodeName,r(r({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function i(e){!e.__d&&(e.__d=!0)&&1==T.push(e)&&(P.debounceRendering||A)(a)}function a(){var e,t=T;for(T=[];e=t.pop();)e.__d&&L(e)}function c(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&l(e,t.nodeName):n||e._componentConstructor===t.nodeName}function l(e,t){return e.__n===t||e.nodeName.toLowerCase()===t.toLowerCase()}function u(e){var t=r({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function s(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.__n=e,n}function f(e){var t=e.parentNode;t&&t.removeChild(e)}function p(e,t,n,r,o){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),r&&r(e);else if("class"!==t||o)if("style"===t){if(r&&"string"!=typeof r&&"string"!=typeof n||(e.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(e.style[i]="");for(var i in r)e.style[i]="number"==typeof r[i]&&!1===E.test(i)?r[i]+"px":r[i]}}else if("dangerouslySetInnerHTML"===t)r&&(e.innerHTML=r.__html||"");else if("o"==t[0]&&"n"==t[1]){var a=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),r?n||e.addEventListener(t,d,a):e.removeEventListener(t,d,a),(e.__l||(e.__l={}))[t]=r}else if("list"!==t&&"type"!==t&&!o&&t in e)h(e,t,null==r?"":r),null!=r&&!1!==r||e.removeAttribute(t);else{var c=o&&t!==(t=t.replace(/^xlink\:?/,""));null==r||!1===r?c?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof r&&(c?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),r):e.setAttribute(t,r))}else e.className=r||""}function h(e,t,n){try{e[t]=n}catch(e){}}function d(e){return this.__l[e.type](P.event&&P.event(e)||e)}function m(){for(var e;e=K.pop();)P.afterMount&&P.afterMount(e),e.componentDidMount&&e.componentDidMount()}function v(e,t,n,r,o,i){W++||(I=null!=o&&void 0!==o.ownerSVGElement,G=null!=e&&!("__preactattr_"in e));var a=b(e,t,n,r,i);return o&&a.parentNode!==o&&o.appendChild(a),--W||(G=!1,i||m()),a}function b(e,t,n,r,o){var i=e,a=I;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||o)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),y(e,!0))),i.__preactattr_=!0,i;var c=t.nodeName;if("function"==typeof c)return M(e,t,n,r);if(I="svg"===c||"foreignObject"!==c&&I,c+="",(!e||!l(e,c))&&(i=s(c,I),e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),y(e,!0)}var u=i.firstChild,f=i.__preactattr_,p=t.children;if(null==f){f=i.__preactattr_={};for(var h=i.attributes,d=h.length;d--;)f[h[d].name]=h[d].value}return!G&&p&&1===p.length&&"string"==typeof p[0]&&null!=u&&void 0!==u.splitText&&null==u.nextSibling?u.nodeValue!=p[0]&&(u.nodeValue=p[0]):(p&&p.length||null!=u)&&_(i,p,n,r,G||null!=f.dangerouslySetInnerHTML),g(i,t.attributes,f),I=a,i}function _(e,t,n,r,o){var i,a,l,u,s,p=e.childNodes,h=[],d={},m=0,v=0,_=p.length,k=0,g=t?t.length:0;if(0!==_)for(var N=0;N<_;N++){var w=p[N],C=w.__preactattr_,x=g&&C?w._component?w._component.__k:C.key:null;null!=x?(m++,d[x]=w):(C||(void 0!==w.splitText?!o||w.nodeValue.trim():o))&&(h[k++]=w)}if(0!==g)for(var N=0;N<g;N++){u=t[N],s=null;var x=u.key;if(null!=x)m&&void 0!==d[x]&&(s=d[x],d[x]=void 0,m--);else if(!s&&v<k)for(i=v;i<k;i++)if(void 0!==h[i]&&c(a=h[i],u,o)){s=a,h[i]=void 0,i===k-1&&k--,i===v&&v++;break}s=b(s,u,n,r),l=p[N],s&&s!==e&&s!==l&&(null==l?e.appendChild(s):s===l.nextSibling?f(l):e.insertBefore(s,l))}if(m)for(var N in d)void 0!==d[N]&&y(d[N],!1);for(;v<=k;)void 0!==(s=h[k--])&&y(s,!1)}function y(e,t){var n=e._component;n?j(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||f(e),k(e))}function k(e){for(e=e.lastChild;e;){var t=e.previousSibling;y(e,!0),e=t}}function g(e,t,n){var r;for(r in n)t&&null!=t[r]||null==n[r]||p(e,r,n[r],n[r]=void 0,I);for(r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||p(e,r,n[r],n[r]=t[r],I)}function N(e){var t=e.constructor.name;(D[t]||(D[t]=[])).push(e)}function w(e,t,n){var r,o=D[e.name];if(e.prototype&&e.prototype.render?(r=new e(t,n),O.call(r,t,n)):(r=new O(t,n),r.constructor=e,r.render=C),o)for(var i=o.length;i--;)if(o[i].constructor===e){r.__b=o[i].__b,o.splice(i,1);break}return r}function C(e,t,n){return this.constructor(e,n)}function x(e,t,n,r,o){e.__x||(e.__x=!0,(e.__r=t.ref)&&delete t.ref,(e.__k=t.key)&&delete t.key,!e.base||o?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r),r&&r!==e.context&&(e.__c||(e.__c=e.context),e.context=r),e.__p||(e.__p=e.props),e.props=t,e.__x=!1,0!==n&&(1!==n&&!1===P.syncComponentUpdates&&e.base?i(e):L(e,1,o)),e.__r&&e.__r(e))}function L(e,t,n,o){if(!e.__x){var i,a,c,l=e.props,s=e.state,f=e.context,p=e.__p||l,h=e.__s||s,d=e.__c||f,b=e.base,_=e.__b,k=b||_,g=e._component,N=!1;if(b&&(e.props=p,e.state=h,e.context=d,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(l,s,f)?N=!0:e.componentWillUpdate&&e.componentWillUpdate(l,s,f),e.props=l,e.state=s,e.context=f),e.__p=e.__s=e.__c=e.__b=null,e.__d=!1,!N){i=e.render(l,s,f),e.getChildContext&&(f=r(r({},f),e.getChildContext()));var C,M,O=i&&i.nodeName;if("function"==typeof O){var U=u(i);a=g,a&&a.constructor===O&&U.key==a.__k?x(a,U,1,f,!1):(C=a,e._component=a=w(O,U,f),a.__b=a.__b||_,a.__u=e,x(a,U,0,f,!1),L(a,1,n,!0)),M=a.base}else c=k,C=g,C&&(c=e._component=null),(k||1===t)&&(c&&(c._component=null),M=v(c,i,f,n||!b,k&&k.parentNode,!0));if(k&&M!==k&&a!==g){var R=k.parentNode;R&&M!==R&&(R.replaceChild(M,k),C||(k._component=null,y(k,!1)))}if(C&&j(C),e.base=M,M&&!o){for(var S=e,A=e;A=A.__u;)(S=A).base=M;M._component=S,M._componentConstructor=S.constructor}}if(!b||n?K.unshift(e):N||(e.componentDidUpdate&&e.componentDidUpdate(p,h,d),P.afterUpdate&&P.afterUpdate(e)),null!=e.__h)for(;e.__h.length;)e.__h.pop().call(e);W||o||m()}}function M(e,t,n,r){for(var o=e&&e._component,i=o,a=e,c=o&&e._componentConstructor===t.nodeName,l=c,s=u(t);o&&!l&&(o=o.__u);)l=o.constructor===t.nodeName;return o&&l&&(!r||o._component)?(x(o,s,3,n,r),e=o.base):(i&&!c&&(j(i),e=a=null),o=w(t.nodeName,s,n),e&&!o.__b&&(o.__b=e,a=null),x(o,s,1,n,r),e=o.base,a&&e!==a&&(a._component=null,y(a,!1))),e}function j(e){P.beforeUnmount&&P.beforeUnmount(e);var t=e.base;e.__x=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?j(n):t&&(t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),e.__b=t,f(t),N(e),k(t)),e.__r&&e.__r(null)}function O(e,t){this.__d=!0,this.context=t,this.props=e,this.state=this.state||{}}function U(e,t,n){return v(n,e,{},!1,t,!1)}var P={},R=[],S=[],A="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,E=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,T=[],K=[],W=0,I=!1,G=!1,D={};r(O.prototype,{setState:function(e,t){var n=this.state;this.__s||(this.__s=r({},n)),r(n,"function"==typeof e?e(n,this.props):e),t&&(this.__h=this.__h||[]).push(t),i(this)},forceUpdate:function(e){e&&(this.__h=this.__h||[]).push(e),L(this,2)},render:function(){}});var H={h:n,createElement:n,cloneElement:o,Component:O,render:U,rerender:a,options:P};e.exports=H}()},YK4a:function(e,t,n){"use strict";var r=n("KM04");"serviceWorker"in navigator&&"https:"===location.protocol&&navigator.serviceWorker.register("/sw.js");var o=function(e){return e&&e.default||e};if("function"==typeof o(n("JkW7"))){var i=document.body.firstElementChild,a=function(){var e=o(n("JkW7"));i=(0,r.render)((0,r.h)(e),document.body,i)};a()}},ZMjw:function(){},gNuw:function(e,t,n){"use strict";function r(e){n.e(2).then(function(){e(n("jAps"))}.bind(null,n)).catch(n.oe)}var o=n("+GyM");t.a=n.n(o)()(r)},kuxM:function(){},qLaj:function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return k});var i=n("KM04"),a=(n.n(i),n("/QC5")),c=n("sIAo"),l=n("5ttS"),u=n("E1C8"),s=n("gNuw"),f=n("vf5e"),p=n("8Njl"),h=n.i(i.h)(c.a,null),d=n.i(i.h)(u.a,{path:"/"}),m=n.i(i.h)(s.a,{path:"/profile/",user:"me"}),v=n.i(i.h)(f.a,{path:"/article/"}),b=n.i(i.h)(p.a,{path:"/agen/"}),_=n.i(i.h)(s.a,{path:"/profile/:user"}),y=n.i(i.h)(l.a,null),k=function(e){function t(){for(var t,n,o,i=arguments.length,a=Array(i),c=0;c<i;c++)a[c]=arguments[c];return t=n=r(this,e.call.apply(e,[this].concat(a))),n.handleRoute=function(e){n.currentUrl=e.url},o=t,r(n,o)}return o(t,e),t.prototype.render=function(){return n.i(i.h)("div",{id:"app"},h,n.i(i.h)(a.Router,{onChange:this.handleRoute},d,m,v,b,_),y)},t}(i.Component)},rq4c:function(){},sIAo:function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return p});var i=n("KM04"),a=(n.n(i),n("sw5u")),c=(n.n(a),n("u3et")),l=n.n(c),u=n.i(i.h)("div",{className:"center bg-primary w-100 white"},n.i(i.h)("div",{className:"h2 mw9 ph3 center dn flex-l items-center justify-between"},n.i(i.h)("nav",{className:"f7"},n.i(i.h)("div",{className:"dib"},n.i(i.h)("span",{className:"mr3"},n.i(i.h)("i",{className:"icon icon-envelope"})," arief.walet@gmail.com "),n.i(i.h)("span",null,n.i(i.h)("i",{className:"icon icon-phone"})," +6282138388899 "))),n.i(i.h)("div",{className:"social-icon-top"},n.i(i.h)("a",{className:"link dib mh2 white",href:""},n.i(i.h)("i",{className:"icon icon-facebook"})),n.i(i.h)("a",{className:"link dib mh2 white",href:""},n.i(i.h)("i",{className:"icon icon-twitter"})),n.i(i.h)("a",{className:"link dib mh2 white",href:""},n.i(i.h)("i",{className:"icon icon-instagram"})),n.i(i.h)("a",{className:"link dib mh2 white",href:""},n.i(i.h)("i",{className:"icon icon-youtube-play"}))))),s=n.i(i.h)("img",{src:"assets/logo.svg",alt:"",className:"h2"}),f=n.i(i.h)("div",{className:"dn-l"},n.i(i.h)("button",{className:"bn flex items-center sans ttu tracked f7 fw5 pa2 bg-black white"},"Menu")),p=function(e){function t(){return r(this,e.apply(this,arguments))}return o(t,e),t.prototype.render=function(){return n.i(i.h)("header",{className:"bg-white bb b--black-10"},u,n.i(i.h)("div",{className:"h3 mw9 center flex items-center justify-between ph3"},n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw5",activeClassName:l.a.active,href:"/"},s),n.i(i.h)("nav",{className:"dn db-l"},n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/"},"Home"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/profile"},"Profil"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/produk"},"Produk"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/article"},"Article"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/pemesanan"},"Pemesanan"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/kontak"},"Kontak"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/agen"},"Agen Resmi"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/member"},"Member"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/gallery"},"Galeri"),n.i(i.h)(a.Link,{className:"ttu dib ph3 link near-black tracked f7 fw6",activeClassName:l.a.active,href:"/csr"},"CSR")),f))},t}(i.Component)},slnC:function(){},sw5u:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Link=t.Match=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=n("KM04"),l=n("/QC5"),u=t.Match=function(e){function t(){for(var t,n,r,i=arguments.length,a=Array(i),c=0;c<i;c++)a[c]=arguments[c];return t=n=o(this,e.call.apply(e,[this].concat(a))),n.update=function(e){n.nextUrl=e,n.setState({})},r=t,o(n,r)}return i(t,e),t.prototype.componentDidMount=function(){l.subscribers.push(this.update)},t.prototype.componentWillUnmount=function(){l.subscribers.splice(l.subscribers.indexOf(this.update)>>>0,1)},t.prototype.render=function(e){var t=this.nextUrl||(0,l.getCurrentUrl)(),n=t.replace(/\?.+$/,"");return this.nextUrl=null,e.children[0]&&e.children[0]({url:t,path:n,matches:n===e.path})},t}(c.Component),s=function(e){var t=e.activeClassName,n=e.path,o=r(e,["activeClassName","path"]);return(0,c.h)(u,{path:n||o.href},function(e){var n=e.matches;return(0,c.h)(l.Link,a({},o,{class:[o.class||o.className,n&&t].filter(Boolean).join(" ")}))})};t.Link=s,t.default=u,u.Link=s},u3et:function(e){e.exports={header:"header__3QGkI",active:"active__3gItZ"}},vf5e:function(e,t,n){"use strict";function r(e){n.e(1).then(function(){e(n("KJmj"))}.bind(null,n)).catch(n.oe)}var o=n("+GyM");t.a=n.n(o)()(r)}});
//# sourceMappingURL=bundle.238de.js.map