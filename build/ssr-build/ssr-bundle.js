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
module.exports = {"OwnerPicture":"OwnerPicture__1NhnD","OwnerPicture_inner":"OwnerPicture_inner__1Ld8C"};

/***/ }),

/***/ "2yh/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Product; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unfetch__ = __webpack_require__("QAmr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ProductCard__ = __webpack_require__("E+wR");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Product = function (_Component) {
  _inherits(Product, _Component);

  function Product(props) {
    _classCallCheck(this, Product);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      data: {}
    };
    return _this;
  }

  Product.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_unfetch__["a" /* default */])('assets/data/product.json').then(function (resp) {
      return resp.json();
    }).then(function (respData) {
      _this2.setState({
        data: respData.product
      });
    }).catch(function (err) {
      return console.error(err);
    });
  };

  Product.prototype.render = function render() {
    var dataBook = this.state.data.books;
    var dataAudio = this.state.data.audios;
    var dataAudioSystem = this.state.data.audiosystem;

    var test = dataBook;
    var Data = this.state.data;
    var renderProduct = Object.keys(Data).map(function (key) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'pv3 pv4-l ph3-l b--primary relative' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'mw8 center bg-white' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'h2',
            { className: 'f7 fw6 ttu tl tracked primary mb2 relative z-2 pl3 pl0-l' },
            Data[key].title
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'p',
            { className: 'ph3 ph0-l mb3 measure-wide f5-l serif' },
            Data[key].desc
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'overflow-x-scroll overflow-x-visible-l nowrap ws-normal-l bg-near-white bg-white-l pv3' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'cf ml3 ml0-l' },
              Data[key].products.map(function (product) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'div',
                  { className: 'dib fl-l w5 w-third-l pr3' },
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__components_ProductCard__["a" /* default */], { image: product.images,
                    title: product.title,
                    price: product.price })
                );
              })
            )
          )
        )
      );
    });

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'pt5 pt6-l' },
      renderProduct
    );
  };

  return Product;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "5D9O":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("wVGV")();
}

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





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'dib db-l fl w-100 w-third-l primary mb3 mb0-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { className: 'h3 tc mb3', src: 'assets/logo-white.svg', alt: '' }),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'p',
    null,
    'Jl. Dr. Soetomo 41 Weleri \u2013 Kendal 51355',
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br', null),
    'Jawa Tengah \u2013 Indonesia',
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br', null),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br', null),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-phone' }),
    ' 082138388899  -  ',
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-whatsapp' }),
    ' 085729486688',
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br', null),
    'arief.walet@gmail.com',
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br', null),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br', null),
    '(Senin - Sabtu, Pukul 08.00 - 16.00 WIB)'
  )
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'social-icon-top f4 w-20-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'a',
    { className: 'link dib ml3 primary', href: '' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-facebook' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'a',
    { className: 'link dib ml3 primary', href: '' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-twitter' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'a',
    { className: 'link dib ml3 primary', href: '' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-instagram' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'a',
    { className: 'link dib ml3 primary', href: '' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-youtube-play' })
  )
);

function MainFooter(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'footer',
    { className: 'bg-near-black' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'ph3' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'mw8 center pv5 cf f8 pr3 flex-l items-end' },
        _ref,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dib db-l fl w-100 w-two-thirds-l mb3 mb0-l tr-l' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'flex-l items-center' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'nav',
              { className: 'dib column-2s tr-l w-80-l' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/' },
                'Home'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/profile' },
                'Profil'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/produk' },
                'Produk'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/article' },
                'Article'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/pemesanan' },
                'Pemesanan'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/kontak' },
                'Kontak'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/agen' },
                'Agen Resmi'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/member' },
                'Member'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/gallery' },
                'Galeri'
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                __WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
                { className: 'db dib-l pv2 pv0-l pr3-l link primary tracked f7', activeClassName: __WEBPACK_IMPORTED_MODULE_2__style___default.a.active, href: '/csr' },
                'CSR'
              )
            ),
            _ref2
          )
        )
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'tl pv3 bg-black ph3 ph0-l white f7' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'mw8 center primary f8' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'span',
          null,
          '\xA9 ' + new Date().getFullYear() + ' All Rights Reserved  |  duniawallet.com'
        )
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (MainFooter);

/***/ }),

/***/ "7KlK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Wallop__ = __webpack_require__("IA/S");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Wallop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Wallop__);


var wallopInit = function wallopInit() {
  var wallopEl = document.querySelector('.Wallop');
  var wallop = new __WEBPACK_IMPORTED_MODULE_0__Wallop___default.a(wallopEl);

  var paginationDots = Array.prototype.slice.call(document.querySelectorAll('.Wallop-dot'));
  paginationDots.forEach(function (dotEl, index) {
    dotEl.addEventListener('click', function (e) {
      e.preventDefault();
      wallop.goTo(index);
    });
  });

  wallop.on('change', function (event) {
    removeClass(document.querySelector('.Wallop-dot--current'), 'Wallop-dot--current');
    addClass(paginationDots[event.detail.currentItemIndex], 'Wallop-dot--current');
  });

  function addClass(element, className) {
    if (!element) {
      return;
    }
    element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
  }

  function removeClass(element, className) {
    if (!element) {
      return;
    }
    element.className = element.className.replace(className, '');
  }
};
/* harmony default export */ __webpack_exports__["a"] = (wallopInit);

// (function(){
//   var Wallop = require('wallop'),
//   wallopEl = document.getElementById('slider'),
//   slider = new Wallop(wallopEl, {
//     // wallop options, like custom class names, ...
//   });
//   var autoPlayMs = 4500,
//   nextTimeout,
//   loadNext = function() {
//     var nextIndex = (slider.currentItemIndex + 1) % slider.allItemsArray.length;
//     slider.goTo(nextIndex);
//   };
//   nextTimeout = setTimeout(function() {
//     loadNext();
//   }, autoPlayMs);
//   slider.on('change', function() {
//     clearTimeout(nextTimeout);
//     nextTimeout = setTimeout(function() {
//       loadNext();
//     }, autoPlayMs);
//   });
//   // the code you asked for:
//   wallopEl.addEventListener('mouseenter', function() {
//     clearTimeout(nextTimeout);
//   });
//   wallopEl.addEventListener('mouseleave', function() {
//     nextTimeout = setTimeout(function() {
//       loadNext();
//     }, autoPlayMs);
//   });
// })();

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ListToCard__ = __webpack_require__("dFBD");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style__ = __webpack_require__("L9Lz");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: 'pt5' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  { className: 'bg-primary ph3 mb3' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'flex items-center mw8 center vh-50' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'measure-wide white' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h2',
        { className: 'f3 f2-l fw6 white' },
        'Agen Resmi'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        { className: 'serif f5-l' },
        'Dapatkan produk-produk kami yang asli hanya di Agen-agen resmi terdekat di kota anda.'
      )
    )
  )
);

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
    var agenSortProv = agens.reduce(function (r, a) {
      r[a.provice] = r[a.provice] || [];
      r[a.provice].push(a);
      return r;
    }, Object.create(null));

    console.log(agenSortProv);

    // result = cars.reduce(function (r, a) {
    //     r[a.make] = r[a.make] || [];
    //     r[a.make].push(a);
    //     return r;
    // }, Object.create(null));

    // console.log(result);


    // const agenProv = agens.map(agen => {
    //   agenSortProv[agen.provice] = agen;
    //   console.log(agenSortProv);
    // })

    var agenRender = Object.keys(agenSortProv).sort().map(function (prov) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'mw8 center' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'h4',
          { className: 'f7 ttc fw6 primary ph2 pv2 bg-near-white bg-white-l' },
          prov
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'flex-l flex-wrap' },
          agenSortProv[prov].map(function (agen) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'w-100 w-20-l pa2' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_ListToCard__["a" /* default */], { name: agen.name,
                avatar: agen.avatar,
                city: agen.city,
                streetAddress: agen.address,
                contact: agen.contact,
                prov: agen.provice })
            );
          })
        )
      );
    });

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      null,
      _ref,
      _ref2,
      agenRender
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

/***/ "Asjh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "BfGA":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "CvPs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("qyLb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_preact_router__ = __webpack_require__("/QC5");





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'button',
  { href: '#' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'span',
    null,
    'Detail'
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-angle-right' })
);

function AgenCard(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_container },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_ava },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: props.avatar, alt: '' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_content },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_name },
          props.name
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_address },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'p',
            null,
            props.address
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'p',
            null,
            props.contact
          )
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.AgenCard_Arrow },
        _ref
      )
    )
  );
}

/* unused harmony default export */ var _unused_webpack_default_export = (AgenCard);

/***/ }),

/***/ "D4Qw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_js__ = __webpack_require__("Jna3");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { className: 'w-100 db bb b--black-20 relative z-1' });

function TextFieldRow(props) {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('textarea', _extends({
      style: Style.noFocus,
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
  },
  noFocus: {
    outline: 'none',
    resize: 'vertical'
  }
};

/* harmony default export */ __webpack_exports__["a"] = (TextFieldRow);

/***/ }),

/***/ "DEO0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"ProductCard":"ProductCard__ZM59l"};

/***/ }),

/***/ "E+wR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("DEO0");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




function ProductCard(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.ProductCard },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'bg-primary aspect-ratio aspect-ratio--1x1 aspect-ratio--4x3-l' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'aspect-ratio--object cover', style: 'background:url(' + props.image + ') center' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: props.image, alt: '', className: 'dn' })
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'pa3 pa3-l lh-title' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h4',
        { className: 'f6 truncate mb1' },
        props.title
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        { className: 'primary f7 fw6' },
        props.price
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (ProductCard);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Carousel__ = __webpack_require__("U0+c");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_TestiBox__ = __webpack_require__("wmdF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style__ = __webpack_require__("ZAL5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  { className: 'mw9 center pt5' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_7__components_Carousel__["a" /* default */], { Data: 'assets/data/carousel.json' })
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h2',
  { className: 'f7 fw6 ttu tc tracked primary mb4 relative z-2' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'span',
    { className: 'dib pa2 bg-white' },
    'Tentang Kami'
  )
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'dt center' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'dtc v-mid' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/images/ava/owner.jpg', alt: '', className: 'w3 br-100' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'dtc pl3 v-mid' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'h4',
      { className: 'fw6 serif' },
      'Drs. Arief Budiman'
    )
  )
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: 'bl b--primary w1px left-50 absolute top-0 bottom-0 h-100' });

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  { className: 'pv5 ph3 bt b--primary relative bg-near-white' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h2',
    { className: 'f7 fw6 ttu tc tracked primary mb4 relative z-2' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'span',
      { className: 'dib pa2 bg-near-white' },
      'Produk Kami'
    )
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'mw8 center pv2' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'overflow-x-scroll overflow-hidden-l bg-near-white' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'dt dt--fixed ml3 ml0-l' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dtc w5 w-third-l pb3 pr3' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_ProductThumb__["a" /* default */], {
            title: 'Paket Suara Walet Original',
            path: '/product',
            imageThumb: 'assets/images/product/suara-1.jpg' })
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dtc w5 w-third-l pb3 pr3' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_ProductThumb__["a" /* default */], {
            title: 'Walet Audio System (WAS)',
            path: '/product',
            imageThumb: 'assets/images/product/was-3.jpg' })
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dtc w5 w-third-l pb3 pr3' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_ProductThumb__["a" /* default */], {
            title: 'Buku Panduan Budidaya Walet',
            path: '/product',
            imageThumb: 'assets/images/product/book-solusi.jpg' })
        )
      )
    )
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: 'bl b--primary w1px left-50 absolute top-0 bottom-0 h-100' })
);

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  { className: 'pv5 ph3 bt b--primary relative' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h2',
    { className: 'f7 fw6 ttu tc tracked primary mb4 relative z-2' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'span',
      { className: 'dib pa2 bg-white' },
      'testimony'
    )
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'mw8 center ph3 cf relative z-2' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'fl dib w-100 w-50-l pa3' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_8__components_TestiBox__["a" /* default */], { quote: 'sangat bermanfaat untuk meningkatkan produksi walet saya.', user: 'Melinda Guess', city: 'bandung', prov: 'jawa barat' })
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'fl dib w-100 w-50-l pa3' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_8__components_TestiBox__["a" /* default */], { quote: 'Saya sangat puas dengan pelatihan, tutorial dan respon yang diberikan oleh dunia walet. Jelas, Singkat, Cepat dan Padat.', user: 'Ujang Sinclair', city: 'bandung', prov: 'jawa barat' })
    )
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: 'bl b--primary w1px left-50 absolute top-0 bottom-0 h-100' })
);

var _ref7 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h3',
  { className: 'ttu f7 fw6 tracked primary mb3' },
  'Artikel'
);

var _ref8 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'fl dib w-100 w-third-l mb4 pr3-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h3',
    { className: 'ttu f7 fw6 tracked mb3' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { className: 'link primary', href: 'https://twitter.com/duniawaletnews' },
      'from our twitter'
    )
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    null,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', { 'class': 'twitter-timeline', 'data-lang': 'id', 'data-height': '360', 'data-dnt': 'true', href: 'https://twitter.com/duniawaletnews' }),
    ' ',
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('script', { async: true, src: '//platform.twitter.com/widgets.js', charset: 'utf-8' })
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
          imageThumb: 'assets/images/news1-s.jpg',
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
      { className: '{style.HP}' },
      _ref,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'pv5 ph3 relative' },
        _ref2,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'measure-wide center f5 tc bg-white z-2 relative' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'p',
            { className: 'serif mb4' },
            this.state.about
          ),
          _ref3
        ),
        _ref4
      ),
      _ref5,
      _ref6,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'pv5 ph3 bt b--primary relative' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'mw8 center ph3 cf bg-white relative z-2' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'fl dib w-100 w-two-thirds-l' },
            _ref7,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'cf' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'div',
                { className: 'fl dib w-100 w-50-l pr3-l' },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_HeadlineNews__["a" /* default */], {
                  title: this.state.headline.title,
                  imageThumb: 'assets/images/sarang.jpg',
                  postDate: this.state.headline.date,
                  viewer: this.state.headline.views,
                  postLink: 'post',
                  link: '#',
                  reviews: this.state.headline.preview
                })
              ),
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'div',
                { className: 'fl dib w-100 w-50-l' },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'ul',
                  null,
                  LatestNews
                )
              )
            )
          ),
          _ref8
        )
      )
    );
  };

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "FUXK":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"TestiBox":"TestiBox__3u_c-"};

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
      style: Style.noFocus,
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
  },
  noFocus: {
    outline: 'none'
  }
};

/* harmony default export */ __webpack_exports__["a"] = (TextField);

/***/ }),

/***/ "HOGw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "IA/S":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
* Wallop.js
*
* @fileoverview Minimal JS library to show & hide things
*
* @author Pedro Duarte
* @author http://pedroduarte.me/wallop
*
*/
(function (global) {
  function Wallop(selector, options) {
    if (!selector) {
      throw new Error('Missing selector. Refer to Usage documentation: https://github.com/peduarte/wallop#javascript');
    }

    for (var i = 0; i < selectorPool.length; i++) {
      if (selectorPool[i] === selector) {
        throw new Error('An instance of Wallop with this selector already exists.');
      }
    }

    this.options = {
      buttonPreviousClass: 'Wallop-buttonPrevious',
      buttonNextClass: 'Wallop-buttonNext',
      itemClass: 'Wallop-item',
      currentItemClass: 'Wallop-item--current',
      showPreviousClass: 'Wallop-item--showPrevious',
      showNextClass: 'Wallop-item--showNext',
      hidePreviousClass: 'Wallop-item--hidePrevious',
      hideNextClass: 'Wallop-item--hideNext',
      carousel: true
    };

    // Whitelist elements which contain `length`
    this.whitelist = {
      'form': true
    };

    if (selector.length > 0 && !this.whitelist[selector]) {
      throw new Error('Selector cannot be an array, Refer to Usage documentation: https://github.com/peduarte/wallop#javascript');
    } else {
      this.$selector = selector;
    }

    this.options = extend(this.options, options);
    this.event = null;

    // "Global vars"
    this.reset();
    this.buttonPrevious = this.$selector.querySelector(' .' + this.options.buttonPreviousClass);
    this.buttonNext = this.$selector.querySelector(' .' + this.options.buttonNextClass);

    this.bindEvents();
    this.createCustomEvent();

    // If there is no active item, start at 0
    if (this.currentItemIndex === -1) {
      this.currentItemIndex = 0;
      addClass(this.allItemsArray[this.currentItemIndex], this.options.currentItemClass);
    }

    // Update button states to make sure the correct state is set on initialization
    this.updateButtonStates();

    // Wrapped in timeout function so event can
    // be listened from outside at anytime
    var _this = this;
    setTimeout(function () {
      _this.event.detail.currentItemIndex = _this.currentItemIndex;
      _this.$selector.dispatchEvent(_this.event);
    }, 0);
  }

  var selectorPool = [];

  var WS = Wallop.prototype;

  // Update prev/next disabled attribute
  WS.updateButtonStates = function () {
    if (!this.buttonPrevious && !this.buttonNext || this.options.carousel) {
      return;
    }

    if (this.currentItemIndex === this.lastItemIndex) {
      this.buttonNext.setAttribute('disabled', 'disabled');
    } else if (this.currentItemIndex === 0) {
      this.buttonPrevious.setAttribute('disabled', 'disabled');
    }
  };

  // Reset all settings by removing classes and attributes added by goTo() & updateButtonStates()
  WS.removeAllHelperSettings = function () {
    removeClass(this.allItemsArray[this.currentItemIndex], this.options.currentItemClass);
    removeClass($$(this.options.hidePreviousClass, this.$selector), this.options.hidePreviousClass);
    removeClass($$(this.options.hideNextClass, this.$selector), this.options.hideNextClass);
    removeClass($$(this.options.showPreviousClass, this.$selector), this.options.showPreviousClass);
    removeClass($$(this.options.showNextClass, this.$selector), this.options.showNextClass);

    if (!this.buttonPrevious && !this.buttonNext) {
      return;
    }

    this.buttonPrevious.removeAttribute('disabled');
    this.buttonNext.removeAttribute('disabled');
  };

  // Method to add classes to the right elements depending on the index passed
  WS.goTo = function (index) {
    if (index === this.currentItemIndex) {
      return;
    }

    // Fix the index if it's out of bounds and carousel is enabled
    index = index === -1 && this.options.carousel ? this.lastItemIndex : index;
    index = index === this.lastItemIndex + 1 && this.options.carousel ? 0 : index;

    // Exit when index is out of bounds
    if (index < 0 || index > this.lastItemIndex) {
      return;
    }

    this.removeAllHelperSettings();

    var isForwards = (index > this.currentItemIndex || index === 0 && this.currentItemIndex === this.lastItemIndex) && !(index === this.lastItemIndex && this.currentItemIndex === 0);
    addClass(this.allItemsArray[this.currentItemIndex], isForwards ? this.options.hidePreviousClass : this.options.hideNextClass);
    addClass(this.allItemsArray[index], this.options.currentItemClass + ' ' + (isForwards ? this.options.showNextClass : this.options.showPreviousClass));

    this.currentItemIndex = index;

    this.updateButtonStates();

    this.event.detail.currentItemIndex = this.currentItemIndex;
    this.$selector.dispatchEvent(this.event);
  };

  // Previous item handler
  WS.previous = function () {
    this.goTo(this.currentItemIndex - 1);
  };

  // Next item handler
  WS.next = function () {
    this.goTo(this.currentItemIndex + 1);
  };

  // Update global variables
  WS.reset = function () {
    this.allItemsArray = Array.prototype.slice.call(this.$selector.querySelectorAll(' .' + this.options.itemClass));
    this.currentItemIndex = this.allItemsArray.indexOf(this.$selector.querySelector(' .' + this.options.currentItemClass));
    this.lastItemIndex = this.allItemsArray.length - 1;
  };

  // Attach click handlers
  WS.bindEvents = function () {
    selectorPool.push(this.$selector);

    var _this = this;

    if (this.buttonPrevious) {
      this.buttonPrevious.addEventListener('click', function (event) {
        event.preventDefault();
        _this.previous();
      });
    }

    if (this.buttonNext) {
      this.buttonNext.addEventListener('click', function (event) {
        event.preventDefault();
        _this.next();
      });
    }
  };

  // Method to bind custom event
  WS.on = function (eventName, callback) {
    this.$selector.addEventListener(eventName, callback, false);
  };

  // Method to unbind custom event
  WS.off = function (eventName, callback) {
    this.$selector.removeEventListener(eventName, callback, false);
  };

  // Create custom Event
  WS.createCustomEvent = function () {
    var _this = this;
    this.event = new CustomEvent('change', {
      detail: {
        wallopEl: _this.$selector,
        currentItemIndex: Number(_this.currentItemIndex)
      },
      bubbles: true,
      cancelable: true
    });
  };

  // Helper functions
  function $$(element, container) {
    if (!element) {
      return;
    }
    if (!container) {
      container = document;
    }
    return container.querySelector('.' + element);
  }

  function addClass(element, className) {
    if (!element) {
      return;
    }
    element.className = (element.className + ' ' + className).trim();
  }

  function removeClass(element, className) {
    if (!element) {
      return;
    }
    element.className = element.className.replace(className, '').trim();
  }

  function extend(origOptions, userOptions) {
    var extendOptions = {},
        attrname;
    for (attrname in origOptions) {
      extendOptions[attrname] = origOptions[attrname];
    }
    for (attrname in userOptions) {
      extendOptions[attrname] = userOptions[attrname];
    }
    return extendOptions;
  }

  // Pollyfill for CustomEvent() Constructor - thanks to Internet Explorer
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  if (typeof window !== "undefined") {
    CustomEvent.prototype = window.CustomEvent ? window.CustomEvent.prototype : {};
    window.CustomEvent = CustomEvent;
  }
  // Exports to multiple environments
  if (true) {
    //AMD
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return Wallop;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module !== 'undefined' && module.exports) {
    //node
    module.exports = Wallop;
  } else {
    // browser
    // use string because of Google closure compiler ADVANCED_MODE
    /* jslint sub:true */
    global['Wallop'] = Wallop;
  }
})(this);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_slider_css__ = __webpack_require__("BfGA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_slider_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_slider_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style__ = __webpack_require__("rq4c");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_app__ = __webpack_require__("qLaj");
// Import CSS







// Import Apps

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_6__components_app__["a" /* default */]);

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

/* unused harmony default export */ var _unused_webpack_default_export = (MessageBox);

/***/ }),

/***/ "KvjY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);



var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("i", { className: "icon icon-calendar mr2" });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("i", { className: "icon icon-eye mr2" });

function NewsList(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "div",
    { className: "NewsList" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { className: "link inherit flex-l flex-column justify-between min-h10-l dim pointer" },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        "div",
        { className: "" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "h5",
          { className: "f5 mb3 lh-title fw6" },
          props.title
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        "div",
        { className: "f7" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "p",
          { className: "f7 serif mb3" },
          props.preview
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "div",
          { className: "cf pt3 bt b--primary-2 f8 fw6 primary" },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "div",
            { className: "fl" },
            _ref,
            props.postDate
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "div",
            { className: "fr" },
            _ref2,
            props.viewer,
            " views"
          )
        )
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (NewsList);

/***/ }),

/***/ "L9Lz":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"AP":"AP___Npsy","AP_Search":"AP_Search__3Atnk","AP_SearchContainer":"AP_SearchContainer__202hU","AP_Section":"AP_Section__2XggV","APL":"APL__13yG0"};

/***/ }),

/***/ "NPkS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("ghUV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'p',
  { className: 'mb3 lh-copy' },
  'Dapatkan info terbaru langsung ke email anda '
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'button',
  { className: 'ph3 pv2 bn bg-primary f4 white' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-paper-plane-o' })
);

function SubscribeBox(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.SB },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'h4',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.SB_T },
      'Subscribe Us'
    ),
    _ref,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'form',
      { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.SB_F, onSubmit: console.log('submited') },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { style: Style.Input, className: 'w-100 input-reset pa2 bn sans', type: 'email' }),
      _ref2
    )
  );
}

var Style = {
  Input: {
    fontSize: 16
  }
};

/* unused harmony default export */ var _unused_webpack_default_export = (SubscribeBox);

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

/***/ "OHv1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);



var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  "div",
  { className: "vh-100 flex justify-center items-center bg-primary white" },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "div",
    { className: "mw7 f4 tc" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "h1",
      { className: "lh-title" },
      "Maaf..."
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "p",
      { className: "serif" },
      "Halaman ini belum tersedia pada saat kompetisi berlangsung"
    )
  )
);

function ErrorPage() {
  return _ref;
}

/* harmony default export */ __webpack_exports__["a"] = (ErrorPage);

/***/ }),

/***/ "PHPn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("ZIrQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-calendar mr2' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-eye mr2' });

function HeadlineNews(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.HLN },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { href: props.link, className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.HLN_C },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.outer },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.inner,
          style: 'background-image:url(' + props.imageThumb + ')' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.HLN_Con },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'h3',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.HLN_T },
          props.title
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.HLN_D },
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
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.HLN_P },
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
      { href: '#', className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_container },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_imgContainer },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_img },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_imgInner, style: 'background-image:url(' + props.imageThumb + ')' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: '' + props.imageThumb, alt: '', className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.dn })
          )
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.NewsThumb_content },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'h4',
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

/***/ "U0+c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Carousel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_js__ = __webpack_require__("7KlK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_unfetch__ = __webpack_require__("QAmr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_css__ = __webpack_require__("Y2gO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__theme_css__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// Dependencies require Wallop.js
// import Wallop from 'wallop'; //slider library





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: 'Wallop-pagination' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'button',
  { 'class': 'Wallop-buttonPrevious' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-angle-left' })
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'button',
  { 'class': 'Wallop-buttonNext' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-angle-right' })
);

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      image: [],
      loading: true
    };
    return _this;
  }

  // init Wallops

  Carousel.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_unfetch__["a" /* default */])(this.props.Data).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      // console.log(data);
      _this2.setState({
        image: data.images,
        loading: false
      });
    }).then(function () {
      setTimeout(function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helper_js__["a" /* default */])();
      }, 500);
    }).catch(function (err) {
      return console.error(err);
    });
  }; //componentDidMount


  Carousel.prototype.render = function render() {
    var test = this.state.name;
    var images = this.state.image;
    var mapImage = images.map(function (image) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(ImageCarouselItem, { imgLink: image });
    });
    var pageination = images.map(function (image) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(WallopDot, { imgLink: image });
    });

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'Wallop' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'Wallop-list' },
        mapImage
      ),
      _ref,
      _ref2,
      _ref3
    ); //return
  }; //render function


  return Carousel;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);


;

var ImageCarouselItem = function ImageCarouselItem(_ref4) {
  var imgLink = _ref4.imgLink,
      current = _ref4.current;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'Wallop-item' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__theme_css___default.a.outer },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: __WEBPACK_IMPORTED_MODULE_3__theme_css___default.a.inner, style: 'background: url(' + imgLink + ') center;background-size: cover' })
    )
  );
};

var WallopDot = function WallopDot(_ref5) {
  var imgLink = _ref5.imgLink;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'a',
    { href: '#', className: 'Wallop-dot' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: imgLink })
  );
};

/***/ }),

/***/ "UQex":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "Y2gO":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"outer":"outer__LmZ_7","inner":"inner__14PgZ","Wallop-buttonPrevious":"Wallop-buttonPrevious__vRTeW","Wallop-buttonNext":"Wallop-buttonNext__1Bj5f","Wallop-pagination":"Wallop-pagination__1OTAZ","Wallop-dot":"Wallop-dot__2QGBS","Wallop-dot--current":"Wallop-dot--current__24Pkx"};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"HP":"HP__3TacR","Hr":"Hr__2pk3-"};

/***/ }),

/***/ "ZIrQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"HLN":"HLN__1WIt5","HLN_C":"HLN_C__VGJIM","outer":"outer__2qvlU","inner":"inner__23lJT","HLN_Con":"HLN_Con__2Gu_0","HLN_T":"HLN_T__2K9pf","HLN_D":"HLN_D__1JKnL"};

/***/ }),

/***/ "ZMjw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "dFBD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'span',
  null,
  ' - '
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('br', null);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'w2 ph3-l f6 bg-primary-l w-100-l tc pv2-l dn-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'span',
    { className: 'mr3 dn dib-l white fw6 ttc f7' },
    'details'
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-angle-right dn-l' })
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'span',
  { className: 'fl dib gray w-third f7' },
  'Nama'
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'span',
  { className: 'fl dib gray w-third f7' },
  'Alamat'
);

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'span',
  { className: 'fl dib gray w-third f7' },
  'Kota'
);

var _ref7 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'span',
  { className: 'fl dib gray w-third f7' },
  'Kontak'
);

var MyComponent = function (_Component) {
  _inherits(MyComponent, _Component);

  function MyComponent(props) {
    _classCallCheck(this, MyComponent);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      detailOpen: false
    };
    return _this;
  }

  MyComponent.prototype.handleClick = function handleClick(e) {
    e.preventDefault();
    this.setState({
      detailOpen: !this.state.detailOpen
    });
  };

  MyComponent.prototype.render = function render() {
    var OpenDetail = this.state.detailOpen ? 'display:flex' : 'display:none';
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'a',
        { onClick: this.handleClick.bind(this),
          href: '#',
          className: 'elevation-hover pointer ListToCard flex flex-column-l items-center w-100 justify-between link black db-l mw5-l ba-l b--black-10' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'w3 center-l mt4-l mb3-l' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'w3 h3 bg-red br-100 overflow-hidden cover', style: 'background:url(' + this.props.avatar + ') center' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: this.props.avatar, alt: '', className: 'dn' })
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: ' ph3 w-100 f7 gray pv2 h4-l' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'h4',
            { className: 'f6 black mb1 ttc' },
            this.props.name
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'p',
            { className: 'f7 ttc' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'span',
              null,
              this.props.city
            ),
            _ref,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'span',
              null,
              this.props.prov
            ),
            _ref2
          )
        ),
        _ref3
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { style: OpenDetail, onClick: this.handleClick.bind(this), className: 'ContactDialog bg-black-70 fixed w-100 h-100 absolute--fill z-5 pa3 flex items-center' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'w-90 mw6-l w-100-l center bg-white f7 br2 elevation-10 ttc' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'pa4 center' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'w3 h3 bg-red br-100 overflow-hidden cover center', style: 'background:url(' + this.props.avatar + ') center' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: this.props.avatar, alt: '', className: 'dn' })
            )
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'bt b--black-10 pv2 ph3' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'cf justify-between' },
              _ref4,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'span',
                { className: 'fl dib black tr pl4 w-two-thirds' },
                this.props.name
              )
            )
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'bt b--black-10 pv2 ph3' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'cf justify-between' },
              _ref5,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'span',
                { className: 'fl dib black tr pl4 w-two-thirds ttc' },
                this.props.streetAddress
              )
            )
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'bt b--black-10 pv2 ph3' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'cf justify-between' },
              _ref6,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'span',
                { className: 'fl dib black tr pl4 w-two-thirds' },
                this.props.city + ' - ' + this.props.prov
              )
            )
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'bt b--black-10 pv2 ph3' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'cf justify-between' },
              _ref7,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'span',
                { className: 'fl dib black tr pl4 w-two-thirds' },
                this.props.contact
              )
            )
          )
        )
      )
    );
  };

  return MyComponent;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "eW0v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export version */
/* unused harmony export DOM */
/* unused harmony export Children */
/* unused harmony export render */
/* unused harmony export createClass */
/* unused harmony export createFactory */
/* unused harmony export createElement */
/* unused harmony export cloneElement */
/* unused harmony export isValidElement */
/* unused harmony export findDOMNode */
/* unused harmony export unmountComponentAtNode */
/* unused harmony export Component */
/* unused harmony export PureComponent */
/* unused harmony export unstable_renderSubtreeIntoContainer */
/* unused harmony export __spread */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("5D9O");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact__);
/* unused harmony reexport PropTypes */



var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = typeof Symbol !== 'undefined' && Symbol.for && Symbol.for('react.element') || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol !== 'undefined' ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};

var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;

var BYPASS_HOOK = {};

/*global process*/
var DEV = typeof process === 'undefined' || !process.env || "production" !== 'production';

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() {
	return null;
}

// make react think we're react.
var VNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function get() {
		return this.nodeName;
	},
	set: function set(v) {
		this.nodeName = v;
	},
	configurable: true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function get() {
		return this.attributes;
	},
	set: function set(v) {
		this.attributes = v;
	},
	configurable: true
});

var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) {
		e = oldEventHook(e);
	}
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};

var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
		    attrs = vnode.attributes = extend({}, vnode.attributes);

		if (typeof tag === 'function') {
			if (tag[COMPONENT_WRAPPER_KEY] === true || tag.prototype && 'isReactComponent' in tag.prototype) {
				if (vnode.children && String(vnode.children) === '') {
					vnode.children = undefined;
				}
				if (vnode.children) {
					attrs.children = vnode.children;
				}

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		} else {
			if (vnode.children && String(vnode.children) === '') {
				vnode.children = undefined;
			}
			if (vnode.children) {
				attrs.children = vnode.children;
			}

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value !== 0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) {
		oldVnodeHook(vnode);
	}
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
	    a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) {
		extend(vnode.attributes, tag.defaultProps);
	}
	if (a) {
		extend(vnode.attributes, a);
	}
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) {
			if (shouldSanitize = CAMEL_PROPS.test(i)) {
				break;
			}
		}
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = a[i];
				}
			}
		}
	}
}

// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode !== parent) {
		prev = null;
	}

	// default to first Element child
	if (!prev && parent) {
		prev = parent.firstElementChild;
	}

	// remove unaffected siblings
	for (var i = parent.childNodes.length; i--;) {
		if (parent.childNodes[i] !== prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) {
		parent._preactCompatRendered = out && (out._component || { base: out });
	}
	if (typeof callback === 'function') {
		callback();
	}
	return out && out._component || out;
}

var ContextProvider = function ContextProvider() {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) {
		callback.call(component, renderContainer);
	}
	return component;
}

function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode === container) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}

var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function map(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		return children.map(fn);
	},
	forEach: function forEach(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		children.forEach(fn);
	},
	count: function count(children) {
		return children && children.length || 0;
	},
	only: function only(children) {
		children = Children.toArray(children);
		if (children.length !== 1) {
			throw new Error('Children.only() expects only one child.');
		}
		return children[0];
	},
	toArray: function toArray(children) {
		if (children == null) {
			return [];
		}
		return ARR.concat(children);
	}
};

/** Track current render() component for ref assignment */
var currentComponent;

function createFactory(type) {
	return createElement.bind(null, type);
}

var DOM = {};
for (var i = ELEMENTS.length; i--;) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i = offset || 0; i < arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		} else if (obj && typeof obj === 'object' && !isValidElement(obj) && (obj.props && obj.type || obj.attributes && obj.nodeName || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function render() {
			return WrappedComponent(this.props, this.context);
		}
	});
}

function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) {
		return Wrapped === true ? Ctor : Wrapped;
	}

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable: true, value: true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable: true, value: Wrapped });

	return Wrapped;
}

function createElement() {
	var args = [],
	    len = arguments.length;
	while (len--) {
		args[len] = arguments[len];
	}upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}

function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
	    type = ref && typeof ref;
	if (currentComponent && (type === 'string' || type === 'number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}

function cloneElement$1(element, props) {
	var children = [],
	    len = arguments.length - 2;
	while (len-- > 0) {
		children[len] = arguments[len + 2];
	}if (!isValidElement(element)) {
		return element;
	}
	var elementProps = element.attributes || element.props;
	var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(element.nodeName || element.type, elementProps, element.children || elementProps && elementProps.children);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	} else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}

function isValidElement(element) {
	return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
}

function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}

function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName !== 'string') {
		return;
	}
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName === 'textarea' || nodeName.toLowerCase() === 'input' && !/^fil|che|rad/i.test(attributes.type))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}

function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) {
		a.class = a.className;
	}
	Object.defineProperty(a, 'className', classNameDescriptor);
}

var classNameDescriptor = {
	configurable: true,
	get: function get() {
		return this.class;
	},
	set: function set(v) {
		this.class = v;
	}
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i = 1, obj = void 0; i < arguments.length; i++) {
		if (obj = arguments$1[i]) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}

function shallowDiffers(a, b) {
	for (var i in a) {
		if (!(i in b)) {
			return true;
		}
	}
	for (var i$1 in b) {
		if (a[i$1] !== b[i$1]) {
			return true;
		}
	}
	return false;
}

function findDOMNode(component) {
	return component && component.base || component;
}

function F() {}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps();
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}

// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i = 0; i < mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}

// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) {
		if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(mixins[key].concat(proto[key] || ARR), key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext');
		}
	}
}

function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}

function callMethod(ctx, m, args) {
	if (typeof m === 'string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m === 'function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function () {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i = 0; i < hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r != null) {
				if (!ret) {
					ret = {};
				}
				for (var key in r) {
					if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					}
				}
			} else if (typeof r !== 'undefined') {
				ret = r;
			}
		}
		return ret;
	};
}

function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}

function propsHook(props, context) {
	if (!props) {
		return;
	}

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length === 1 && (typeof c[0] === 'string' || typeof c[0] === 'function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this === 'function' ? this : this.constructor,
		    propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}

function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}

function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts !== BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function replaceState(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function getDOMNode() {
		return this.base;
	},

	isMounted: function isMounted() {
		return !!this.base;
	}
});

function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function (props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	__spread: extend
};

/* harmony default export */ __webpack_exports__["a"] = (index);
//# sourceMappingURL=preact-compat.es.js.map

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
  'section',
  { className: 'bg-primary ph3' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'flex items-center mw8 center vh-50' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'measure-wide white' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h2',
        { className: 'f3 f2-l fw6 white' },
        'Drs. Arief Budiman'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        { className: 'serif f5-l' },
        'Konsultan Walet Asia Tenggara'
      )
    )
  )
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'fl dib w-100 w-40-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'center w-40 w-100-l mb3 mb0-l' },
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
      { className: 'mt4 mt5-l' },
      _ref,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'cf mw8 center ph3 ph4-l pv4 bg-white-l ft--4-l elevation-10' },
        _ref2,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'article',
          { className: 'fl dib w-100 w-60-l pl4-l lh-copy' },
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

/***/ "ghUV":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"SB":"SB__3CYnd","SB_T":"SB_T__7GY6k","SB_F":"SB_F__1ZimL"};

/***/ }),

/***/ "hS8a":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"NewsThumb":"NewsThumb__3-kuu","NewsThumb_container":"NewsThumb_container__1fOlI","NewsThumb_imgContainer":"NewsThumb_imgContainer__33vBp","NewsThumb_img":"NewsThumb_img__1PJmm","NewsThumb_imgInner":"NewsThumb_imgInner__1PW9z","dn":"dn__1aoGF","NewsThumb_title":"NewsThumb_title__1uSCr","NewsThumb_content":"NewsThumb_content__2-L3_","NewsThumb_date":"NewsThumb_date__11BDS","NewsThumb_preview":"NewsThumb_preview__2n3IS"};

/***/ }),

/***/ "kuxM":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "lGI2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);



var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  "div",
  { className: "action f7" },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "a",
    { href: "#", className: "link primary" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "span",
      { className: "v-mid" },
      "Baca Selengkapnya"
    ),
    " ",
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("i", { className: "icon icon-angle-right ml3 v-mid" })
  )
);

function NewsFeatured(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "div",
    { className: "NewsFeatured elevation-10" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "div",
      { className: "flex-l" },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        "div",
        { className: "w-two-thirds-l cover", style: "background:url(" + props.image + ") center" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "div",
          { className: "aspect-ratio aspect-ratio--4x3" },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "div",
            { className: "aspect-ratio--object cover" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("img", { src: props.image, alt: "", className: "dn" })
          )
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        "div",
        { className: "w-third-l bg-near-black pa3 pa4-l white flex-l flex-column justify-between" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          "div",
          { className: "content" },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "h3",
            { className: "ttc primary f4 lh-title fw6 mb3 bb b--primary-2 pb3" },
            props.title
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            "p",
            { className: "f6 serif" },
            props.preview
          )
        ),
        _ref
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (NewsFeatured);

/***/ }),

/***/ "mxH6":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"AP":"AP__3OUjQ","T_s":"T_s__3WbLh","LNW_li":"LNW_li__3FoaM"};

/***/ }),

/***/ "q0al":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'span',
  { className: 'f7 ttc primary' },
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
          { className: 'f7 f7-l fw6 mb1 lh-title' },
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__routes_product__ = __webpack_require__("2yh/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes_kontak__ = __webpack_require__("xaAX");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routes_errorpage__ = __webpack_require__("OHv1");


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

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_8__routes_product__["a" /* default */], { path: '/produk/' });

var _ref7 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_9__routes_kontak__["a" /* default */], { path: '/kontak/' });

var _ref8 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_10__routes_errorpage__["a" /* default */], { path: '/gallery/' });

var _ref9 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_10__routes_errorpage__["a" /* default */], { path: '/csr/' });

var _ref10 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_10__routes_errorpage__["a" /* default */], { path: '/member/' });

var _ref11 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_10__routes_errorpage__["a" /* default */], { path: '/pemesanan/' });

var _ref12 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__routes_profile__["a" /* default */], { path: '/profile/:user' });

var _ref13 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__footer__["a" /* default */], null);

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
				_ref6,
				_ref7,
				_ref8,
				_ref9,
				_ref10,
				_ref11,
				_ref12
			),
			_ref13
		);
	};

	return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "qyLb":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"AgenCard":"AgenCard__303IV","AgenCard_container":"AgenCard_container__1uOEJ","AgenCard_ava":"AgenCard_ava__2DWXf","AgenCard_content":"AgenCard_content__2pabp","AgenCard_name":"AgenCard_name__28vTi","AgenCard_address":"AgenCard_address__3fmM6","AgenCard_Arrow":"AgenCard_Arrow__xjU61","AgenCard_bar":"AgenCard_bar__1pnsi"};

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("eW0v");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_preact_router_match__ = __webpack_require__("sw5u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_preact_router_match___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_preact_router_match__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style__ = __webpack_require__("u3et");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style__);


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
	{ className: 'dn flex-l items-center justify-between h2 f7 ph3 bb b--primary' },
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'div',
		{ className: 'lift primary' },
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'p',
			null,
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'span',
				{ className: 'mr3' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-envelope mr2' }),
				'arief.walet@gmail.com'
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'span',
				{ className: 'mr3' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-whatsapp mr2' }),
				'082138388899'
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'span',
				{ className: 'mr3' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-phone mr2' }),
				'082138388899'
			)
		)
	),
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'div',
		{ className: 'right' },
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ className: 'f7' },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ className: 'social-icon-top' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'a',
					{ className: 'link dib ml3 primary', href: '' },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-facebook' })
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'a',
					{ className: 'link dib ml3 primary', href: '' },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-twitter' })
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'a',
					{ className: 'link dib ml3 primary', href: '' },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-instagram' })
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'a',
					{ className: 'link dib ml3 primary', href: '' },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-youtube-play' })
				)
			)
		)
	)
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/logo-side.svg', alt: '', className: 'h2' });

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-menu' });

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/logo.svg', alt: '' });

var Header = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header(props) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			sideOpen: false
		};
		return _this;
	}

	Header.prototype.handleSideBar = function handleSideBar(e) {
		e.preventDefault();
		window.scrollTo(0, 0);
		this.setState({
			sideOpen: !this.state.sideOpen
		});
	};

	Header.prototype.handleMainNav = function handleMainNav(e) {
		e.preventDefault();
		window.scrollTo(0, 0);
	};

	Header.prototype.render = function render() {
		var Style = {
			isActive: {
				transform: 'translate3d(0,0,0)'
			},
			isClosed: {
				transform: 'translate3d(100%,0,0)'
			}
		};
		var sidebarOpen = this.state.sideOpen ? Style.isActive : Style.isClosed;

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			null,
			console.log(this.state.sideOpen),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'header',
				{ className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.MH },
				_ref,
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ className: 'flex items-center justify-between h3 f6 ph3' },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'div',
						{ className: 'left' },
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
							__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
							{ className: 'link primary db', activeClassName: __WEBPACK_IMPORTED_MODULE_3__style___default.a.active, href: '/' },
							_ref2
						)
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'div',
						{ className: 'right' },
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
							'nav',
							{ className: 'dn db-l fw4 f7 tracked' },
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/' },
								'Home'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/profile' },
								'Profil'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/produk' },
								'Produk'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/pemesanan' },
								'Pemesanan'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/article' },
								'Article'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/agen' },
								'Agen Resmi'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/kontak' },
								'Kontak'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/member' },
								'Member'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/gallery' },
								'Galeri'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleMainNav.bind(this), className: 'link gray dim dib ml3', activeClassName: 'current', href: '/csr' },
								'CSR'
							)
						)
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'a',
						{ href: '#', onClick: this.handleSideBar.bind(this), className: 'link primary f2  dn-l bn bg-transparent' },
						_ref3
					)
				)
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'aside',
				{ className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.MS, style: sidebarOpen, onClick: this.handleSideBar.bind(this) },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.MS_C, style: sidebarOpen },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'div',
						{ className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.MS_C_L },
						_ref4
					),
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'div',
						{ className: __WEBPACK_IMPORTED_MODULE_3__style___default.a.MS_NAV },
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
							'nav',
							{ onClick: this.handleSideBar.bind(this) },
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/' },
								'Home'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/profile' },
								'Profil'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/produk' },
								'Produk'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/article' },
								'Article'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/pemesanan' },
								'Pemesanan'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/kontak' },
								'Kontak'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/agen' },
								'Agen Resmi'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/member' },
								'Member'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/gallery' },
								'Galeri'
							),
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								__WEBPACK_IMPORTED_MODULE_2_preact_router_match__["Link"],
								{ onClick: this.handleSideBar.bind(this), href: '/csr' },
								'CSR'
							)
						)
					)
				)
			)
		);
	};

	return Header;
}(__WEBPACK_IMPORTED_MODULE_1_react__["a" /* default */].Component);

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
module.exports = {"MAINHEADER":"MAINHEADER__ZsYU8","MH":"MH__2Z-Ka","MH_CS":"MH_CS__3K5tR","MH_CB":"MH_CB__1KUkE","MS":"MS__qsz-2","MS_C":"MS_C__Zz7Ml","MS_EB":"MS_EB__1d2bz","MS_C_L":"MS_C_L__X4CuL","MS_NAV":"MS_NAV__1O0zs"};

/***/ }),

/***/ "vf5e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Article; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unfetch__ = __webpack_require__("QAmr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style__ = __webpack_require__("mxH6");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_NewsFeatured__ = __webpack_require__("lGI2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_NewsThumb__ = __webpack_require__("Q55m");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_SubscribeBox__ = __webpack_require__("NPkS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_NewsList__ = __webpack_require__("KvjY");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// Import Components





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  { className: 'bg-primary ph3' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'flex items-center mw8 center vh-50' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'measure-wide white' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h2',
        { className: 'f3 f2-l fw6 white lh-title' },
        'Artikel, Tips & Trick'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        { className: 'serif f5-l' },
        'Kumpulan berita terkini, Tips & Trick dan tanya jawab seputar dunia sarang burung walet'
      )
    )
  )
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  { className: 'mb4 mb5-l  ph3-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'mw8 center' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_NewsFeatured__["a" /* default */], { image: 'assets/images/sarang.jpg',
      title: 'Sekat Gantung apa Sekat Full?',
      preview: 'Jika gedung walet anda ingin produktif, maka lakukan pengaturan \u2026' })
  )
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'fl w-100 w-third-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h4',
    { className: 'f5-l primary ttu pa3 ph0-l tracked fw6' },
    'Latest News'
  )
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'mw8 center cf ph3 ph5-l tc mb3' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'button',
    { className: 'bg-primary white w-100 w-third-l tc pa3 ttu f7 bn fw6' },
    'Read More'
  )
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

    var LatestNews = this.state.dataArticle.slice(0, 5).map(function (key) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'fl w-100 w-third-l pa3 mb5-l' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_6__components_NewsList__["a" /* default */], {
          title: key.title,
          imageThumb: 'assets/images/sarang.jpg',
          postDate: key.date,
          viewer: key.views,
          postLink: 'post',
          preview: key.preview
        })
      );
    });

    var MostView = this.state.dataArticle.slice(0, 5).map(function (key) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'li',
        { className: 'dib fl w-100 pv2 mr3-l bb b--black-10' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__components_NewsThumb__["a" /* default */], {
          title: key.title,
          imageThumb: 'assets/images/news1-s.jpg',
          postDate: key.date,
          viewer: key.views,
          postLink: 'post'
        })
      );
    });

    // PRact Render
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'pt5 pt5-l' },
      _ref,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'ft--4-l' },
        _ref2,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'section',
          { className: 'mb4 mb0-l ph3-l ' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'mw8 center cf' },
            _ref3,
            LatestNews
          )
        ),
        _ref4
      )
    );
  };

  return Article;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "wRU+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "wVGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__("UQex");
var invariant = __webpack_require__("wRU+");
var ReactPropTypesSecret = __webpack_require__("Asjh");

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),

/***/ "wmdF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("FUXK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'dtc w3 v-mid' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: 'assets/images/ava/image-1.png', alt: '', className: 'br-100' })
);

function TestiBox(props) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1__style___default.a.TestiBox },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'serif lh-title f4 white' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'bg-primary pa4 minh-5' },
        props.quote
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'pa3 bg-white' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { className: 'dt w-100' },
        _ref,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'dtc pl3 v-mid' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'h4',
            { className: 'f6 lh-solid ttc' },
            props.user
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'span',
            { className: 'f7 primary ttc' },
            props.city,
            ' - ',
            props.prov
          )
        )
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["a"] = (TestiBox);

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

/***/ }),

/***/ "xaAX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Kontak; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TextField__ = __webpack_require__("GCBY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_TextField_TextFieldRow_js__ = __webpack_require__("D4Qw");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { className: 'pt5' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'section',
  { className: 'bg-primary ph3' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'flex items-center mw8 center vh-50' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'measure-wide white' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h2',
        { className: 'f3 f2-l fw6 white' },
        'Hubungi kami'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        { className: 'serif f5-l' },
        'Hubungi Kami untuk bertanya dan konsultasi seputar bisnis sarang burung walet dan perawatannya.'
      )
    )
  )
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h4',
  { className: 'f4 primary mb4' },
  'Sampaikan Pesan Anda'
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'cf mb3' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'fl-l dib-l w-100 w-50-l mb3 pr4-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__components_TextField__["a" /* default */], { label: 'nama lengkap' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'fl-l dib-l w-100 w-50-l mb3 pr2-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__components_TextField__["a" /* default */], { label: 'Alamat' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'fl-l dib-l w-100 w-50-l mb3 pr4-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__components_TextField__["a" /* default */], { label: 'Nomor Telepon', type: 'number' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'fl-l dib-l w-100 w-50-l mb3 pr2-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__components_TextField__["a" /* default */], { label: 'Email', type: 'email' })
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: 'fl-l dib-l w-100 mb3 pr2-l' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__components_TextField_TextFieldRow_js__["a" /* default */], { label: 'pesan anda' })
  )
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-paper-plane-o' });

var _ref6 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'div',
  { className: 'w-third-l bg-near-black white pa3 ph4-l pv5-l' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'h4',
    { className: 'f4 primary mb4' },
    'Kontak'
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'div',
    { className: '' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'div f7 mb4' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h6',
        { className: 'mb3 ttu tracked f7 fw6 primary' },
        'Office'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'Jl. Dr. Soetomo 41 Weleri \u2013 Kendal 51355, Jawa Tengah \u2013 Indonesia'
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'div f7 mb4' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h6',
        { className: 'mb3 ttu tracked f7 fw6 primary' },
        'Telepon'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        { className: 'mb2' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-phone mr3' }),
        '082138388899'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        { className: '' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { className: 'icon icon-whatsapp mr3' }),
        '082138388899'
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'div f7 mb4' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h6',
        { className: 'mb3 ttu tracked f7 fw6 primary' },
        'email'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'arief.walet@gmail.com'
      )
    )
  )
);

var Kontak = function (_Component) {
  _inherits(Kontak, _Component);

  function Kontak(props) {
    _classCallCheck(this, Kontak);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  Kontak.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    alert('submited');
  };

  Kontak.prototype.render = function render() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { className: 'div' },
      _ref,
      _ref2,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'section',
        { className: 'ph3-l' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { className: 'mw8 bg-white center elevation-10 ft--4-l' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { className: 'flex-l' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              { className: 'w-two-thirds-l pa3 pa5-l' },
              _ref3,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'form',
                { action: '' },
                _ref4,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'div',
                  { className: 'sendButton tr' },
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'button',
                    { onClick: this.handleSubmit.bind(this), className: 'br-100 bn bg-primary white w3 h3 elevation-10 f4 lh-solid tc' },
                    _ref5
                  )
                )
              )
            ),
            _ref6
          )
        )
      )
    );
  };

  return Kontak;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map