module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("JkW7");


/***/ }),

/***/ "1nBe":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"OwnerPicture":"OwnerPicture__310cR","OwnerPicture_inner":"OwnerPicture_inner__2Ih17"};

/***/ }),

/***/ "5ttS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match__ = __webpack_require__("sw5u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_router_match__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style__ = __webpack_require__("ZMjw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style__);





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { className: 'h3 tc', src: 'assets/logo.svg', alt: '' });

function MainFooter(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'footer',
    null,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'bg-primary ph3' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'mw9 center tc pv5' },
        _ref,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'nav',
          { className: 'db-l mt4 tl tc-l' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/' },
            'Home'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/profile' },
            'Profil'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/produk' },
            'Produk'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/article' },
            'Article'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/pemesanan' },
            'Pemesanan'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/kontak' },
            'Kontak'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/agen' },
            'Agen Resmi'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/member' },
            'Member'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/gallery' },
            'Galeri'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
            { className: 'ttu db dib-l pv2 pv0-l ph3-l link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/csr' },
            'CSR'
          )
        )
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'tl pv3 bg-black ph3 white f7' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        null,
        '\xA9 ' + new Date().getFullYear() + ' All Rights Reserved  |  duniawallet.com'
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (MainFooter);

/***/ }),

/***/ "7VC8":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "8Njl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Agen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unfetch__ = __webpack_require__("QAmr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_AgenCard__ = __webpack_require__("CvPs");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('section', null);

var Agen = function (_Component) {
  _inherits(Agen, _Component);

  function Agen(props) {
    _classCallCheck(this, Agen);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      dataHead: {},
      dataAgen: []
    };
    return _this;
  }

  Agen.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])('assets/data/about.json').then(function (resp) {
      return resp.json();
    }).then(function (respData) {
      var dataAgent = respData.office.agent;
      var agenArray = [];
      var parsingDataAgent = Object.keys(respData.office.agent).map(function (key) {
        agenArray.push(dataAgent[key]);
      });
      _this2.setState({
        dataHead: respData.office.head,
        dataAgen: agenArray
      });
    });
  };

  Agen.prototype.render = function render() {
    var agens = this.state.dataAgen;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'Agen bg-near-white' },
      _ref,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'mw8 center ph3 flex-l flex-wrap justify-center' },
        agens.map(function (agen) {
          var address = agen.address + ' ' + agen.city + '\n' + agen.provice + '\n' + agen.contact;
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'flex ma1' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__components_AgenCard__["a" /* default */], { name: agen.name, address: address })
          );
        })
      )
    );
  };

  return Agen;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);
// "name": "Akhmad Baihaqi",
// "address": "Jl. Pelita I No. 4 RT. 18 Kel. Kuala Pembuang 2",
// "city": "Seruyan ",
// "provice": "Kalimantan Tengah",
// "contact": "08125075650,085754953112"




/***/ }),

/***/ "CvPs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("qyLb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




function AgenCard(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_container },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_name },
        props.name
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_address },
        props.address
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_bar })
  );
}

/* harmony default export */ __webpack_exports__["a"] = (AgenCard);

/***/ }),

/***/ "E1C8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unfetch__ = __webpack_require__("QAmr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_NewsThumb__ = __webpack_require__("Q55m");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_HeadlineNews__ = __webpack_require__("PHPn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ProductThumb__ = __webpack_require__("q0al");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_MessageBox__ = __webpack_require__("KNxu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_OwnerPicture__ = __webpack_require__("xMYh");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__style__ = __webpack_require__("ZAL5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('section', { className: 'Hero mw9 center vh-75 bg-primary' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'fl dib w-100 w-30-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'w-40 w-100-l center mb3 pr4-l ft--3-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_6__components_OwnerPicture__["a" /* default */], { pictures: 'assets/images/3-1.jpg' })
  )
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  { className: 'ttu f6 fw6 tracked primary mb3 tc tl-l' },
  'Tentang Kami'
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  null,
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'cf center mw8 ph3 pv4 pv4-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'h3',
      { className: 'ttu f6 fw6 tracked primary mb3' },
      'Produk kami'
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'overflow-x-scroll overflow-hidden-l' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'dt dt--fixed' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dtc w5 w-third-l pb3 pr3' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_ProductThumb__["a" /* default */], {
            title: 'Paket Suara Walet Original',
            path: '/product',
            imageThumb: 'assets/images/paket-suara.jpg' })
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dtc w5 w-third-l pb3 pr3' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_ProductThumb__["a" /* default */], {
            title: 'Walet Audio System (WAS)',
            path: '/product',
            imageThumb: 'assets/images/walet-audio-s.jpg' })
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dtc w5 w-third-l pb3 pr3' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_ProductThumb__["a" /* default */], {
            title: 'Buku Panduan Budidaya Walet',
            path: '/product',
            imageThumb: 'assets/images/book.jpg' })
        )
      )
    )
  )
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  { className: 'ttu f6 fw6 tracked primary mb3' },
  'Highlight'
);

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  { className: 'ttu f6 fw6 tracked primary mb3' },
  'Berita terbaru'
);

var _ref7 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'fl dib w-100 w-third-l mb4 pr3-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h3',
    { className: 'ttu f6 fw6 tracked primary mb3' },
    'from our twitter'
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', null)
);

var _ref8 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  { className: 'ttu f6 fw6 tracked primary mb3' },
  'Kontak Kami'
);

var _ref9 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'w4 mb3 center' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/logo.svg', alt: '' })
);

var _ref10 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-phone mr2 dib' });

var _ref11 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-whatsapp mr2 dib' });

var _ref12 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-envelope mr2 dib' });

var _ref13 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'fl dib w-100 w-50-l v-mid' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'mw6 center' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'mw6 ba b--black-10 shadow-3' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__components_MessageBox__["a" /* default */], null)
    )
  )
);

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      about: "",
      news: [],
      headline: {},
      address: ""

    };
    return _this;
  }

  Home.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])('assets/data/about.json').then(function (resp) {
      return resp.json();
    }).then(function (respData) {
      _this2.setState({
        about: respData.about,
        address: respData.office.head
      });
      console.log(_this2.state.address);
    });

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])('/assets/data/article-s.json').then(function (resp) {
      return resp.json();
    }).then(function (respData) {
      var aView = [];
      var arrayViewer = Object.keys(respData).map(function (key) {
        aView.push(respData[key]);
      });
      _this2.setState({
        news: aView,
        headline: respData["01"]
      });
    });
  };

  Home.prototype.render = function render() {
    var LatestNews = this.state.news.slice(0, 3).map(function (key) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: 'dib fl w-100 mb2 mr3-l' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__components_NewsThumb__["a" /* default */], {
          title: key.title,
          imageThumb: 'assets/images/news1.jpg',
          postDate: key.date,
          viewer: key.views,
          postLink: 'post'
        })
      );
    });

    var address = this.state.address;

    // PREACT RENDER
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      null,
      _ref,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'sction',
        null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'cf center mw8 ph3 pv4 pv0-l' },
          _ref2,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'fl dib w-100 w-70-l pv4-l f5-l lh-copy' },
            _ref3,
            this.state.about
          )
        )
      ),
      _ref4,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'cf center mw8 ph3 pv4 pv4-l' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'fl dib w-100 w-third-l mb4 pr3-l' },
            _ref5,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_HeadlineNews__["a" /* default */], {
              title: this.state.headline.title,
              imageThumb: 'assets/images/news1.jpg',
              postDate: this.state.headline.date,
              viewer: this.state.headline.views,
              postLink: 'post',
              link: '#',
              reviews: this.state.headline.preview
            })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'fl dib w-100 w-third-l mb4 pr3-l' },
            _ref6,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'ul',
              null,
              LatestNews
            )
          ),
          _ref7
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'cf center mw8 ph3 pv4 pv4-l' },
          _ref8,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'db cf flex-l items-center bg-primary-l' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'fl dib w-100 w-50-l lh-copy v-mid pa5-l white-l mb4 mb0-l' },
              _ref9,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'ul',
                null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'li',
                  { className: 'mb2' },
                  address.address
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'li',
                  { className: 'mb2' },
                  _ref10,
                  address.phone
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'li',
                  { className: 'mb2' },
                  _ref11,
                  address.whatsapp
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'li',
                  { className: 'mb2' },
                  _ref12,
                  address.email
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'li',
                  { className: 'mb2' },
                  'Jam Operasional : ' + address.operationTime
                )
              )
            ),
            _ref13
          )
        )
      )
    );
  };

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "GCBY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_js__ = __webpack_require__("Jna3");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { className: 'w-100 db bb b--black-20 relative z-1' });

function TextField(props) {
  var highlightLine = null;
  var Labels = null;

  function inputOnFocus() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__animation_js__["a" /* focusLine */])(highlightLine, Labels);
  }

  function inputOnBlur() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__animation_js__["b" /* outFocusLine */])(highlightLine, Labels);
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'label',
    { className: 'db' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'span',
      { className: 'f7 db fw5 ttc silver ttc', ref: function ref(span) {
          Labels = span;
        } },
      props.label
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', _extends({
      className: 'input-reset sans pv2 w-100 bn bg-transparent noFocus',
      type: 'text',
      onFocus: inputOnFocus,
      onBlur: inputOnBlur
    }, props)),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'relative w-100 overflow-x-hidden' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { className: 'w-100 db absolute z-2 top-0', ref: function ref(span) {
          highlightLine = span;
        }, style: Style.highlightLine }),
      _ref
    )
  );
}

var Style = {
  highlightLine: {
    right: '100%',
    height: 1,
    width: '100%',
    background: 'linear-gradient(to left, #ff00cc, #333399)'
  }
};

/* harmony default export */ __webpack_exports__["a"] = (TextField);

/***/ }),

/***/ "HOGw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_minireset_css__ = __webpack_require__("HOGw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_minireset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_minireset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tachyons__ = __webpack_require__("kuxM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tachyons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tachyons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_wallop_css_wallop_css__ = __webpack_require__("slnC");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_wallop_css_wallop_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_wallop_css_wallop_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_fonticon_css__ = __webpack_require__("7VC8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_fonticon_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_fonticon_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style__ = __webpack_require__("rq4c");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_app__ = __webpack_require__("qLaj");







/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_5__components_app__["a" /* default */]);

/***/ }),

/***/ "Jna3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return focusLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return outFocusLine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs__ = __webpack_require__("NQR3");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_animejs__);


// Animation InputBorder
var focusLine = function focusLine(elem, elem2) {
  __WEBPACK_IMPORTED_MODULE_0_animejs___default()({
    targets: elem,
    translateX: {
      value: '100%',
      elasticity: 250
    },
    easing: [0, 0, .2, 1],
    duration: 500
  });
  __WEBPACK_IMPORTED_MODULE_0_animejs___default()({
    targets: elem2,
    color: '#ff00cc',
    easing: [0, 0, .2, 1],
    duration: 500
  });
};

var outFocusLine = function outFocusLine(elem, elem2) {
  __WEBPACK_IMPORTED_MODULE_0_animejs___default()({
    targets: elem,
    translateX: {
      value: '0%',
      elasticity: 250
    },
    easing: [.4, 0, 0, 1],
    duration: 500
  });
  __WEBPACK_IMPORTED_MODULE_0_animejs___default()({
    targets: elem2,
    color: '#999999',
    easing: [.4, 0, 0, 1],
    duration: 500
  });
};

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "KNxu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextField__ = __webpack_require__("GCBY");




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'MessageBox bg-white' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'form',
    { className: 'pa4', onSubmit: '' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'ul',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: 'mb3' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__TextField__["a" /* default */], { label: 'Full Name' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: 'mb3' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__TextField__["a" /* default */], { label: 'your email' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: 'mb3' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__TextField__["a" /* default */], { label: 'your message' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: '' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'button',
          { className: 'f7 bg-primary tc bn db w-100 pa3 ttu fw5 sans tracked white' },
          'Kirim Pesan'
        )
      )
    )
  )
);

function MessageBox(props) {
  return _ref;
}

/* harmony default export */ __webpack_exports__["a"] = (MessageBox);

/***/ }),

/***/ "NPkS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);



var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  "h4",
  { className: "ttu tracked f6 fw6 mb2" },
  "Subscribe Us"
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  "p",
  { className: "mb3 lh-copy" },
  "Dapatkan info terbaru langsung ke email anda "
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  "button",
  { className: "ph3 pv2 bn bg-primary f4 white" },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("i", { className: "icon icon-paper-plane-o" })
);

function SubscribeBox(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "div",
    { className: "SubscribeBox pa3 bg-primary white" },
    _ref,
    _ref2,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "form",
      { className: "pa1 bg-white flex item-center", onSubmit: console.log('submited') },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("input", { style: Style.Input, className: "w-100 input-reset pa2 bn sans", type: "email" }),
      _ref3
    )
  );
}

var Style = {
  Input: {
    fontSize: 16
  }
};

/* harmony default export */ __webpack_exports__["a"] = (SubscribeBox);

/***/ }),

/***/ "NQR3":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp$this = this;
(function (v, p) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (p),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" === typeof module && module.exports ? module.exports = p() : v.anime = p();
})(this, function () {
  function v(a) {
    if (!g.col(a)) try {
      return document.querySelectorAll(a);
    } catch (b) {}
  }function p(a) {
    return a.reduce(function (a, d) {
      return a.concat(g.arr(d) ? p(d) : d);
    }, []);
  }function w(a) {
    if (g.arr(a)) return a;g.str(a) && (a = v(a) || a);return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a];
  }function F(a, b) {
    return a.some(function (a) {
      return a === b;
    });
  }
  function A(a) {
    var b = {},
        d;for (d in a) {
      b[d] = a[d];
    }return b;
  }function G(a, b) {
    var d = A(a),
        c;for (c in a) {
      d[c] = b.hasOwnProperty(c) ? b[c] : a[c];
    }return d;
  }function B(a, b) {
    var d = A(a),
        c;for (c in b) {
      d[c] = g.und(a[c]) ? b[c] : a[c];
    }return d;
  }function S(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, b, d, h) {
      return b + b + d + d + h + h;
    });var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);a = parseInt(b[1], 16);var d = parseInt(b[2], 16),
        b = parseInt(b[3], 16);return "rgb(" + a + "," + d + "," + b + ")";
  }function T(a) {
    function b(a, b, c) {
      0 > c && (c += 1);1 < c && --c;return c < 1 / 6 ? a + 6 * (b - a) * c : .5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a;
    }var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);a = parseInt(d[1]) / 360;var c = parseInt(d[2]) / 100,
        d = parseInt(d[3]) / 100;if (0 == c) c = d = a = d;else {
      var e = .5 > d ? d * (1 + c) : d + c - d * c,
          l = 2 * d - e,
          c = b(l, e, a + 1 / 3),
          d = b(l, e, a);a = b(l, e, a - 1 / 3);
    }return "rgb(" + 255 * c + "," + 255 * d + "," + 255 * a + ")";
  }function x(a) {
    if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a)) return a[2];
  }function U(a) {
    if (-1 < a.indexOf("translate")) return "px";
    if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg";
  }function H(a, b) {
    return g.fnc(a) ? a(b.target, b.id, b.total) : a;
  }function C(a, b) {
    if (b in a.style) return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0";
  }function I(a, b) {
    if (g.dom(a) && F(V, b)) return "transform";if (g.dom(a) && (a.getAttribute(b) || g.svg(a) && a[b])) return "attribute";if (g.dom(a) && "transform" !== b && C(a, b)) return "css";if (null != a[b]) return "object";
  }function W(a, b) {
    var d = U(b),
        d = -1 < b.indexOf("scale") ? 1 : 0 + d;a = a.style.transform;if (!a) return d;for (var c = [], e = [], l = [], h = /(\w+)\((.+?)\)/g; c = h.exec(a);) {
      e.push(c[1]), l.push(c[2]);
    }a = l.filter(function (a, c) {
      return e[c] === b;
    });return a.length ? a[0] : d;
  }function J(a, b) {
    switch (I(a, b)) {case "transform":
        return W(a, b);case "css":
        return C(a, b);case "attribute":
        return a.getAttribute(b);}return a[b] || 0;
  }function K(a, b) {
    var d = /^(\*=|\+=|-=)/.exec(a);if (!d) return a;b = parseFloat(b);a = parseFloat(a.replace(d[0], ""));switch (d[0][0]) {case "+":
        return b + a;case "-":
        return b - a;case "*":
        return b * a;}
  }function D(a) {
    return g.obj(a) && a.hasOwnProperty("totalLength");
  }function X(a, b) {
    function d(c) {
      c = void 0 === c ? 0 : c;return a.el.getPointAtLength(1 <= b + c ? b + c : 0);
    }var c = d(),
        e = d(-1),
        l = d(1);switch (a.property) {case "x":
        return c.x;case "y":
        return c.y;case "angle":
        return 180 * Math.atan2(l.y - e.y, l.x - e.x) / Math.PI;}
  }function L(a, b) {
    var d = /-?\d*\.?\d+/g;a = D(a) ? a.totalLength : a;if (g.col(a)) b = g.rgb(a) ? a : g.hex(a) ? S(a) : g.hsl(a) ? T(a) : void 0;else {
      var c = x(a);a = c ? a.substr(0, a.length - c.length) : a;b = b ? a + b : a;
    }b += "";return { original: b,
      numbers: b.match(d) ? b.match(d).map(Number) : [0], strings: b.split(d) };
  }function Y(a, b) {
    return b.reduce(function (b, c, e) {
      return b + a[e - 1] + c;
    });
  }function M(a) {
    return (a ? p(g.arr(a) ? a.map(w) : w(a)) : []).filter(function (a, d, c) {
      return c.indexOf(a) === d;
    });
  }function Z(a) {
    var b = M(a);return b.map(function (a, c) {
      return { target: a, id: c, total: b.length };
    });
  }function aa(a, b) {
    var d = A(b);if (g.arr(a)) {
      var c = a.length;2 !== c || g.obj(a[0]) ? g.fnc(b.duration) || (d.duration = b.duration / c) : a = { value: a };
    }return w(a).map(function (a, c) {
      c = c ? 0 : b.delay;
      a = g.obj(a) && !D(a) ? a : { value: a };g.und(a.delay) && (a.delay = c);return a;
    }).map(function (a) {
      return B(a, d);
    });
  }function ba(a, b) {
    var d = {},
        c;for (c in a) {
      var e = H(a[c], b);g.arr(e) && (e = e.map(function (a) {
        return H(a, b);
      }), 1 === e.length && (e = e[0]));d[c] = e;
    }d.duration = parseFloat(d.duration);d.delay = parseFloat(d.delay);return d;
  }function ca(a) {
    return g.arr(a) ? y.apply(this, a) : N[a];
  }function da(a, b) {
    var d;return a.tweens.map(function (c) {
      c = ba(c, b);var e = c.value,
          l = J(b.target, a.name),
          h = d ? d.to.original : l,
          h = g.arr(e) ? e[0] : h,
          m = K(g.arr(e) ? e[1] : e, h),
          l = x(m) || x(h) || x(l);c.isPath = D(e);c.from = L(h, l);c.to = L(m, l);c.start = d ? d.end : a.offset;c.end = c.start + c.delay + c.duration;c.easing = ca(c.easing);c.elasticity = (1E3 - Math.min(Math.max(c.elasticity, 1), 999)) / 1E3;g.col(c.from.original) && (c.round = 1);return d = c;
    });
  }function ea(a, b) {
    return p(a.map(function (a) {
      return b.map(function (b) {
        var c = I(a.target, b.name);if (c) {
          var d = da(b, a);b = { type: c, property: b.name, animatable: a, tweens: d, duration: d[d.length - 1].end, delay: d[0].delay };
        } else b = void 0;return b;
      });
    })).filter(function (a) {
      return !g.und(a);
    });
  }
  function O(a, b, d) {
    var c = "delay" === a ? Math.min : Math.max;return b.length ? c.apply(Math, b.map(function (b) {
      return b[a];
    })) : d[a];
  }function fa(a) {
    var b = G(ga, a),
        d = G(ha, a),
        c = Z(a.targets),
        e = [],
        g = B(b, d),
        h;for (h in a) {
      g.hasOwnProperty(h) || "targets" === h || e.push({ name: h, offset: g.offset, tweens: aa(a[h], d) });
    }a = ea(c, e);return B(b, { children: [], animatables: c, animations: a, duration: O("duration", a, d), delay: O("delay", a, d) });
  }function n(a) {
    function b() {
      return window.Promise && new Promise(function (a) {
        return Q = a;
      });
    }function d(a) {
      return f.reversed ? f.duration - a : a;
    }function c(a) {
      for (var b = 0, c = {}, d = f.animations, e = {}; b < d.length;) {
        var g = d[b],
            h = g.animatable,
            m = g.tweens;e.tween = m.filter(function (b) {
          return a < b.end;
        })[0] || m[m.length - 1];e.isPath$1 = e.tween.isPath;e.round = e.tween.round;e.eased = e.tween.easing(Math.min(Math.max(a - e.tween.start - e.tween.delay, 0), e.tween.duration) / e.tween.duration, e.tween.elasticity);m = Y(e.tween.to.numbers.map(function (a) {
          return function (b, c) {
            c = a.isPath$1 ? 0 : a.tween.from.numbers[c];b = c + a.eased * (b - c);a.isPath$1 && (b = X(a.tween.value, b));a.round && (b = Math.round(b * a.round) / a.round);return b;
          };
        }(e)), e.tween.to.strings);ia[g.type](h.target, g.property, m, c, h.id);g.currentValue = m;b++;e = { isPath$1: e.isPath$1, tween: e.tween, eased: e.eased, round: e.round };
      }if (c) for (var k in c) {
        E || (E = C(document.body, "transform") ? "transform" : "-webkit-transform"), f.animatables[k].target.style[E] = c[k].join(" ");
      }f.currentTime = a;f.progress = a / f.duration * 100;
    }function e(a) {
      if (f[a]) f[a](f);
    }function g() {
      f.remaining && !0 !== f.remaining && f.remaining--;
    }function h(a) {
      var h = f.duration,
          l = f.offset,
          n = f.delay,
          P = f.currentTime,
          q = f.reversed,
          r = d(a),
          r = Math.min(Math.max(r, 0), h);if (f.children) {
        var p = f.children;if (r >= f.currentTime) for (var u = 0; u < p.length; u++) {
          p[u].seek(r);
        } else for (u = p.length; u--;) {
          p[u].seek(r);
        }
      }r > l && r < h ? (c(r), !f.began && r >= n && (f.began = !0, e("begin")), e("run")) : (r <= l && 0 !== P && (c(0), q && g()), r >= h && P !== h && (c(h), q || g()));a >= h && (f.remaining ? (t = m, "alternate" === f.direction && (f.reversed = !f.reversed)) : (f.pause(), "Promise" in window && (Q(), R = b()), f.completed || (f.completed = !0, e("complete"))), k = 0);e("update");
    }a = void 0 === a ? {} : a;var m,
        t,
        k = 0,
        Q = null,
        R = b(),
        f = fa(a);f.reset = function () {
      var a = f.direction,
          b = f.loop;f.currentTime = 0;f.progress = 0;f.paused = !0;f.began = !1;f.completed = !1;f.reversed = "reverse" === a;f.remaining = "alternate" === a && 1 === b ? 2 : b;for (a = f.children.length; a--;) {
        b = f.children[a], b.seek(b.offset), b.reset();
      }
    };f.tick = function (a) {
      m = a;t || (t = m);h((k + m - t) * n.speed);
    };f.seek = function (a) {
      h(d(a));
    };f.pause = function () {
      var a = q.indexOf(f);-1 < a && q.splice(a, 1);f.paused = !0;
    };f.play = function () {
      f.paused && (f.paused = !1, t = 0, k = d(f.currentTime), q.push(f), z || ja());
    };f.reverse = function () {
      f.reversed = !f.reversed;t = 0;k = d(f.currentTime);
    };f.restart = function () {
      f.pause();f.reset();f.play();
    };f.finished = R;f.reset();f.autoplay && f.play();return f;
  }var ga = { update: void 0, begin: void 0, run: void 0, complete: void 0, loop: 1, direction: "normal", autoplay: !0, offset: 0 },
      ha = { duration: 1E3, delay: 0, easing: "easeOutElastic", elasticity: 500, round: 0 },
      V = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
      E,
      g = { arr: function arr(a) {
      return Array.isArray(a);
    }, obj: function obj(a) {
      return -1 < Object.prototype.toString.call(a).indexOf("Object");
    }, svg: function svg(a) {
      return a instanceof SVGElement;
    }, dom: function dom(a) {
      return a.nodeType || g.svg(a);
    }, str: function str(a) {
      return "string" === typeof a;
    }, fnc: function fnc(a) {
      return "function" === typeof a;
    }, und: function und(a) {
      return "undefined" === typeof a;
    }, hex: function hex(a) {
      return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
      );
    }, rgb: function rgb(a) {
      return (/^rgb/.test(a)
      );
    }, hsl: function hsl(a) {
      return (/^hsl/.test(a)
      );
    }, col: function col(a) {
      return g.hex(a) || g.rgb(a) || g.hsl(a);
    } },
      y = function () {
    function a(a, d, c) {
      return (((1 - 3 * c + 3 * d) * a + (3 * c - 6 * d)) * a + 3 * d) * a;
    }return function (b, d, c, e) {
      if (0 <= b && 1 >= b && 0 <= c && 1 >= c) {
        var g = new Float32Array(11);if (b !== d || c !== e) for (var h = 0; 11 > h; ++h) {
          g[h] = a(.1 * h, b, c);
        }return function (h) {
          if (b === d && c === e) return h;if (0 === h) return 0;if (1 === h) return 1;for (var m = 0, k = 1; 10 !== k && g[k] <= h; ++k) {
            m += .1;
          }--k;var k = m + (h - g[k]) / (g[k + 1] - g[k]) * .1,
              l = 3 * (1 - 3 * c + 3 * b) * k * k + 2 * (3 * c - 6 * b) * k + 3 * b;if (.001 <= l) {
            for (m = 0; 4 > m; ++m) {
              l = 3 * (1 - 3 * c + 3 * b) * k * k + 2 * (3 * c - 6 * b) * k + 3 * b;if (0 === l) break;
              var n = a(k, b, c) - h,
                  k = k - n / l;
            }h = k;
          } else if (0 === l) h = k;else {
            var k = m,
                m = m + .1,
                f = 0;do {
              n = k + (m - k) / 2, l = a(n, b, c) - h, 0 < l ? m = n : k = n;
            } while (1e-7 < Math.abs(l) && 10 > ++f);h = n;
          }return a(h, d, e);
        };
      }
    };
  }(),
      N = function () {
    function a(a, b) {
      return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b);
    }var b = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
        d = { In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98, .335], [.6, -.28, .735, .045], a], Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function (b, c) {
        return 1 - a(1 - b, c);
      }], InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function (b, c) {
        return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2;
      }] },
        c = { linear: y(.25, .25, .75, .75) },
        e = {},
        l;for (l in d) {
      e.type = l, d[e.type].forEach(function (a) {
        return function (d, e) {
          c["ease" + a.type + b[e]] = g.fnc(d) ? d : y.apply($jscomp$this, d);
        };
      }(e)), e = { type: e.type };
    }return c;
  }(),
      ia = { css: function css(a, b, d) {
      return a.style[b] = d;
    }, attribute: function attribute(a, b, d) {
      return a.setAttribute(b, d);
    }, object: function object(a, b, d) {
      return a[b] = d;
    }, transform: function transform(a, b, d, c, e) {
      c[e] || (c[e] = []);c[e].push(b + "(" + d + ")");
    } },
      q = [],
      z = 0,
      ja = function () {
    function a() {
      z = requestAnimationFrame(b);
    }function b(b) {
      var c = q.length;if (c) {
        for (var d = 0; d < c;) {
          q[d] && q[d].tick(b), d++;
        }a();
      } else cancelAnimationFrame(z), z = 0;
    }return a;
  }();n.version = "2.0.2";
  n.speed = 1;n.running = q;n.remove = function (a) {
    a = M(a);for (var b = q.length; b--;) {
      for (var d = q[b], c = d.animations, e = c.length; e--;) {
        F(a, c[e].animatable.target) && (c.splice(e, 1), c.length || d.pause());
      }
    }
  };n.getValue = J;n.path = function (a, b) {
    var d = g.str(a) ? v(a)[0] : a,
        c = b || 100;return function (a) {
      return { el: d, property: a, totalLength: d.getTotalLength() * (c / 100) };
    };
  };n.setDashoffset = function (a) {
    var b = a.getTotalLength();a.setAttribute("stroke-dasharray", b);return b;
  };n.bezier = y;n.easings = N;n.timeline = function (a) {
    var b = n(a);b.pause();
    b.duration = 0;b.add = function (a) {
      b.children.forEach(function (a) {
        a.began = !0;a.completed = !0;
      });w(a).forEach(function (a) {
        var c = b.duration,
            d = a.offset;a.autoplay = !1;a.offset = g.und(d) ? c : K(d, c);b.seek(a.offset);a = n(a);a.duration > c && (b.duration = a.duration);a.began = !0;b.children.push(a);
      });b.reset();b.seek(0);b.autoplay && b.restart();return b;
    };return b;
  };n.random = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };return n;
});

/***/ }),

/***/ "PHPn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);



var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("i", { className: "icon icon-calendar mr2" });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("i", { className: "icon icon-eye mr2" });

function HeadlineNews(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "div",
    { className: "HeadlineNews bg-white-l" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { href: props.link, className: "HeadlineNews_container link black" },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        "div",
        { className: "aspect-ratio aspect-ratio--16x9 z-1" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("div", { className: "aspect-ratio--object cover",
          style: "background:url(" + props.imageThumb + ") center" })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        "div",
        { className: "pv3 bg-white-l w-90-l center tc-l ft--3-l z-2 relative" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "h3",
          { className: "fw6 f4 f3-l mb3" },
          props.title
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "div",
          { className: "f7 mb3 primary" },
          _ref,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "span",
            { className: "mr4 fw6" },
            props.postDate
          ),
          _ref2,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "span",
            { className: "fw6" },
            props.viewer,
            " viewer"
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "div",
          { className: "lh-copy" },
          props.reviews
        )
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (HeadlineNews);

/***/ }),

/***/ "Q55m":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("hS8a");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-calendar mr2' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-eye mr2' });

function NewsThumb(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { href: '#', className: 'flex link black' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'w-25 mr3' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'aspect-ratio aspect-ratio--3x4' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'aspect-ratio--object cover', style: 'background:url(' + props.imageThumb + ') center' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: '' + props.imageThumb, alt: '', className: 'dn' })
          )
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'w-75' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_title },
          props.title
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_date },
          _ref,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'span',
            { className: 'mr4 fw6' },
            props.postDate
          ),
          _ref2,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'span',
            { className: 'fw6' },
            props.viewer,
            ' viewer'
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_preview },
          props.reviews
        )
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (NewsThumb);

/***/ }),

/***/ "QAmr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var index = typeof fetch == 'function' ? fetch.bind() : function (url, options) {
	options = options || {};
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials == 'include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var _keys = [],
			    all = [],
			    headers = {},
			    header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				_keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? header + "," + value : value;
			});

			return {
				ok: (request.status / 200 | 0) == 1, // 200-299
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function text() {
					return Promise.resolve(request.responseText);
				},
				json: function json() {
					return Promise.resolve(request.responseText).then(JSON.parse);
				},
				blob: function blob() {
					return Promise.resolve(new Blob([request.response]));
				},
				headers: {
					keys: function keys() {
						return _keys;
					},
					entries: function entries() {
						return all;
					},
					get: function get(n) {
						return headers[n.toLowerCase()];
					},
					has: function has(n) {
						return n.toLowerCase() in headers;
					}
				}
			};
		}
	});
};

/* harmony default export */ __webpack_exports__["a"] = (index);
//# sourceMappingURL=unfetch.es.js.map

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd"};

/***/ }),

/***/ "ZMjw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "gNuw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unfetch__ = __webpack_require__("QAmr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_OwnerPicture__ = __webpack_require__("xMYh");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'fl dib w-100 w-40-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'mb4 center w-40 w-100-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__components_OwnerPicture__["a" /* default */], { pictures: 'assets/images/3-1.jpg' })
  )
);

var Profile = function (_Component) {
  _inherits(Profile, _Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      content: ""
    };
    return _this;
  }

  Profile.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])('assets/data/about.json').then(function (resp) {
      return resp.json();
    }).then(function (respData) {
      var article = respData.profile.split('\n').map(function (p) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'p',
          { className: 'mb4' },
          p
        );
      });
      console.log(article);
      _this2.setState({
        content: article
      });
    });
  };

  Profile.prototype.render = function render() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: '' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('section', { className: 'vh-25 vh-50-l cover z-1', style: 'background:url("assets/images/sarang.jpg") center' }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'mw8 center bg-white ft--3-l pa4 z-3 cf bt bw2 b--primary' },
        _ref,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'article',
          { className: 'fl dib lh-copy w-100 w-60-l pl4-l' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'p',
            null,
            this.state.content
          )
        )
      )
    );
  };

  return Profile;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "hS8a":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"NewsThumb":"NewsThumb__1FLBp","NewsThumb_container":"NewsThumb_container__1dD0U","NewsThumb_img":"NewsThumb_img__2643G","NewsThumb_imgInner":"NewsThumb_imgInner__1IrUd","NewsThumb_title":"NewsThumb_title__1gqb7","NewsThumb_content":"NewsThumb_content__2QlgO","NewsThumb_date":"NewsThumb_date__1sHv-","NewsThumb_preview":"NewsThumb_preview__3nSz8"};

/***/ }),

/***/ "kuxM":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "q0al":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'span',
  { className: 'f7 ttc' },
  'lihat details'
);

function ProductThumb(props) {
  var productThumb = null;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'ProductThumb relative shadow-1' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      __WEBPACK_IMPORTED_MODULE_1_preact_router__["Link"],
      { href: props.path, className: 'link black ProductThumb_container', onMouseEnter: "" },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'aspect-ratio aspect-ratio--3x4 z-1 overflow-hidden' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { ref: function ref(div) {
            productThumb = div;
          }, className: 'grow aspect-ratio--object cover',
          style: 'background:url(' + props.imageThumb + ') center' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { style: Style.productDetails, className: 'absolute tc bottom-0 bg-white pa2 pa3-l z-3 w-80 center' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'h4',
          { className: 'f6 f5-l fw6 mb2' },
          props.title
        ),
        _ref
      )
    )
  );
}

var Style = {
  productDetails: {
    left: '10%'
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ProductThumb);

/***/ }),

/***/ "qLaj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header__ = __webpack_require__("sIAo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__footer__ = __webpack_require__("5ttS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_home__ = __webpack_require__("E1C8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes_profile__ = __webpack_require__("gNuw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes_article__ = __webpack_require__("vf5e");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes_agen__ = __webpack_require__("8Njl");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










// import Home from 'async!./home';
// import Profile from 'async!./profile';

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__header__["a" /* default */], null);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__routes_home__["a" /* default */], { path: '/' });

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__routes_profile__["a" /* default */], { path: '/profile/', user: 'me' });

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_6__routes_article__["a" /* default */], { path: '/article/' });

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_7__routes_agen__["a" /* default */], { path: '/agen/' });

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__routes_profile__["a" /* default */], { path: '/profile/:user' });

var _ref7 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__footer__["a" /* default */], null);

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}
	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ id: 'app' },
			_ref,
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_1_preact_router__["Router"],
				{ onChange: this.handleRoute },
				_ref2,
				_ref3,
				_ref4,
				_ref5,
				_ref6
			),
			_ref7
		);
	};

	return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "qyLb":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"AgenCard":"AgenCard__1xpQ5","AgenCard_name":"AgenCard_name__3gwT-","AgenCard_address":"AgenCard_address__sdb0E","AgenCard_bar":"AgenCard_bar__IZ1_T","AgenCard_container":"AgenCard_container__2Evkn"};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sIAo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Header; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match__ = __webpack_require__("sw5u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_router_match__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style__ = __webpack_require__("u3et");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// "Jl. Dr. Soetomo 41 Weleri – Kendal 51355,
// Jawa Tengah – Indonesia",
// +6282138388899",
// 085729486688
// arief.walet@gmail.com",
// Senin - Sabtu, Pukul 08.00 - 16.00 WIB"

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'div',
	{ className: 'center bg-primary w-100 white' },
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'div',
		{ className: 'h2 mw9 ph3 center dn flex-l items-center justify-between' },
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'nav',
			{ className: 'f7' },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ className: 'dib' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'span',
					{ className: 'mr3' },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-envelope' }),
					' arief.walet@gmail.com '
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'span',
					null,
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-phone' }),
					' +6282138388899 '
				)
			)
		),
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ className: 'social-icon-top' },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'a',
				{ className: 'link dib mh2 white', href: '' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-facebook' })
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'a',
				{ className: 'link dib mh2 white', href: '' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-twitter' })
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'a',
				{ className: 'link dib mh2 white', href: '' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-instagram' })
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'a',
				{ className: 'link dib mh2 white', href: '' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-youtube-play' })
			)
		)
	)
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/logo.svg', alt: '', className: 'h2' });

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'div',
	{ className: 'dn-l' },
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'button',
		{ className: 'bn flex items-center sans ttu tracked f7 fw5 pa2 bg-black white' },
		'Menu'
	)
);

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Header.prototype.render = function render() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'header',
			{ className: 'bg-white bb b--black-10' },
			_ref,
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ className: 'h3 mw9 center flex items-center justify-between ph3' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
					{ className: 'ttu dib ph3 link near-black tracked f7 fw5', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/' },
					_ref2
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'nav',
					{ className: 'dn db-l' },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/' },
						'Home'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/profile' },
						'Profil'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/produk' },
						'Produk'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/article' },
						'Article'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/pemesanan' },
						'Pemesanan'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/kontak' },
						'Kontak'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/agen' },
						'Agen Resmi'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/member' },
						'Member'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/gallery' },
						'Galeri'
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
						{ className: 'ttu dib ph3 link near-black tracked f7 fw6', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/csr' },
						'CSR'
					)
				),
				_ref3
			)
		);
	};

	return Header;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

// {/* <Link activeClassName={style.active} href="/">Home</Link>
// <Link activeClassName={style.active} href="/profile">Me</Link>
// <Link activeClassName={style.active} href="/profile/john">John</Link> */}




/***/ }),

/***/ "slnC":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3QGkI","active":"active__3gItZ"};

/***/ }),

/***/ "vf5e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Article; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unfetch__ = __webpack_require__("QAmr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_HeadlineNews__ = __webpack_require__("PHPn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_NewsThumb__ = __webpack_require__("Q55m");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_SubscribeBox__ = __webpack_require__("NPkS");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




// Import Components




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  { className: 'ttu f6 fw6 tracked primary mb3' },
  'Latest News'
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'mb4' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h3',
    { className: 'ttu f6 fw6 tracked primary mb3' },
    'Follow Us'
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'social-icon-top' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { className: 'link dib mr3 f3 black', href: '' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-facebook' })
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { className: 'link dib mr3 f3 black', href: '' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-twitter' })
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { className: 'link dib mr3 f3 black', href: '' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-instagram' })
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { className: 'link dib mr3 f3 black', href: '' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-youtube-play' })
    )
  )
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'mb4' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_SubscribeBox__["a" /* default */], null)
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  { className: 'ttu f6 fw6 tracked primary mb3' },
  'Artikel Populer'
);

var Article = function (_Component) {
  _inherits(Article, _Component);

  function Article(props) {
    _classCallCheck(this, Article);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      dataArticle: [],
      headline: {},
      mostViewer: [],
      latest: []

    };
    return _this;
  }

  Article.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])('/assets/data/article-s.json').then(function (resp) {
      return resp.json();
    }).then(function (respData) {
      var aView = [];
      var arrayViewer = Object.keys(respData).map(function (key) {
        aView.push(respData[key]);
      });
      _this2.setState({
        dataArticle: aView,
        headline: respData["01"]
      });
    });
  };

  Article.prototype.render = function render() {
    // Render 5 latest post
    var HighlightsNews = this.state.dataArticle.slice(0, 2).map(function (key) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'dib fl w-100 w-50-l mr3-l' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_NewsThumb__["a" /* default */], {
          title: key.title,
          imageThumb: 'assets/images/news1.jpg',
          postDate: key.date,
          viewer: key.views,
          postLink: 'post',
          reviews: key.preview
        })
      );
    });

    var LatestNews = this.state.dataArticle.map(function (key) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: 'dib fl w-100 pv2 mr3-l bb b--black-10' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_NewsThumb__["a" /* default */], {
          title: key.title,
          imageThumb: 'assets/images/news1.jpg',
          postDate: key.date,
          viewer: key.views,
          postLink: 'post',
          reviews: key.preview
        })
      );
    });

    var MostView = this.state.dataArticle.slice(0, 5).map(function (key) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: 'dib fl w-100 pv2 mr3-l bb b--black-10' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_NewsThumb__["a" /* default */], {
          title: key.title,
          imageThumb: 'assets/images/news1.jpg',
          postDate: key.date,
          viewer: key.views,
          postLink: 'post'
        })
      );
    });

    // PRact Render
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'mw8 center ph3 mt4' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__components_HeadlineNews__["a" /* default */], {
          title: this.state.headline.title,
          imageThumb: 'assets/images/news1.jpg',
          postDate: this.state.headline.date,
          viewer: this.state.headline.views,
          postLink: 'post',
          link: '#',
          reviews: this.state.headline.preview
        })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'cf mw8 center ph3' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dib fl w-100 w-two-thirds-l mb4 mb0-l' },
          _ref,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'ul',
            { className: 'pr5-l' },
            LatestNews
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dib fl w-100 w-third-l' },
          _ref2,
          _ref3,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'mb4' },
            _ref4,
            MostView
          )
        )
      )
    );
  };

  return Article;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "xMYh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("1nBe");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




function OwnerPicture(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.OwnerPicture },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.OwnerPicture_inner,
      style: 'background-image:url(' + props.pictures + ')' })
  );
}

/* harmony default export */ __webpack_exports__["a"] = (OwnerPicture);

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map