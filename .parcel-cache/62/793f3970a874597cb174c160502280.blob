// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"40b86b6c079b8884ab301263e3b97733":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "440ee49b6079722c0dd5eefecc188f8f";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"e21478b8abae4cf3d61c8189e216014f":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"0dd5eefecc188f8f\":\"controler.440ee49b.js\",\"c03f26ab0abd0e6f\":\"icons.42a98b49.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"1dce7d46d8385df4a1463c270f8613f4":[function(require,module,exports) {
"use strict";

var model = _interopRequireWildcard(require("./model"));

var _searchView = _interopRequireDefault(require("./views/searchView"));

var _pokemonView = _interopRequireDefault(require("./views/pokemonView"));

var _listView = _interopRequireDefault(require("./views/listView"));

var _paginationView = _interopRequireDefault(require("./views/paginationView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const controlPokemon = async function (pokemon) {
  window.location = `#${pokemon}`;

  _pokemonView.default.renderSpinner();

  try {
    await model.loadPokemon(pokemon);

    _pokemonView.default.render(model.getPokemon());
  } catch (err) {
    // console.log(err);
    _pokemonView.default.renderError('sorry pokemon not found ! , you can try pikachu or charmander for example');
  }
};

const controlSearchResult = function () {
  const userInput = _searchView.default.getQuery();

  if (!userInput) return;
  controlPokemon(userInput);
};

const controlVisitPokemon = function (pokemon) {
  controlPokemon(pokemon);
}; //types results


const controlResults = async function () {
  // load first page of pokemons
  controlPokemonListToRender();
};

const controlPokemonListToRender = async function (page = 1) {
  const hash = window.location.hash;
  if (!hash.includes('type')) return;
  const type = hash.slice(1).split('-')[1];
  if (!type) return;

  try {
    _listView.default.renderSpinner();

    if (type === 'all') {
      await model.loadAllPokemon(page);
    } else {
      await model.loadAllPokemonType(type, page);
    }

    _listView.default.render(model.getPokemonList());

    _paginationView.default.render(model.getSearch());
  } catch (err) {
    console.log(err);

    _pokemonView.default.renderError('sorry an mysterious error occurred , try again pls !');
  }
};

const controlPagination = function (goToPage) {
  // load the REQUESTED PAGE of pokemons
  controlPokemonListToRender(goToPage);
};

const init = function () {
  _searchView.default.addHandlerSearch(controlSearchResult);

  _pokemonView.default.addHandlerVisit(controlVisitPokemon);

  _listView.default.addHandlerRender(controlResults);

  _paginationView.default.addHandlerClick(controlPagination);
};

init();
},{"./model":"aabf248f40f7693ef84a0cb99f385d1f","./views/searchView":"c5d792f7cac03ef65de30cc0fbb2cae7","./views/pokemonView":"c882a2e4e19850278d24b1c39cd329b9","./views/listView":"ff8a8f8ac20ab348688cb09b686b90c2","./views/paginationView":"d2063f3e7de2e4cdacfcb5eb6479db05"}],"aabf248f40f7693ef84a0cb99f385d1f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearch = exports.getPokemon = exports.getPokemonList = exports.loadAllPokemonType = exports.loadAllPokemon = exports.loadPokemon = void 0;

var _helper = require("./helper");

var pokemon = _interopRequireWildcard(require("./models/pokemon"));

var _config = require("./config.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const state = {
  pokemon: {},
  allPokemonType: {
    type: null,
    pokemonList: [],
    resultsPerPage: _config.RES_PER_PAGE,
    numberOfPages: null,
    page: 1
  },
  favorites: []
}; // load pokemon by name

const loadPokemon = async function (pokemonSearched, loadAll = false, fetchByName = true) {
  try {
    let data;
    let pokemonObj;

    if (fetchByName) {
      data = await fetchPokemon(pokemonSearched);
      pokemonObj = await pokemon.generatePokemonObj(data);
      state.pokemon = pokemonObj;
    } else {
      data = await fetchPokemonByUrl(pokemonSearched);
      pokemonObj = await pokemon.generatePokemonObj(data);
      return pokemonObj;
    }
  } catch (err) {
    throw err;
  }
};

exports.loadPokemon = loadPokemon;

const fetchPokemon = async function (pokemon) {
  const data = await (0, _helper.AJAX)(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return data;
};

const fetchPokemonByUrl = async function (url) {
  const data = await (0, _helper.AJAX)(`${url}`);
  return data;
};

const loadAllPokemon = async function (page = 1, type = 'all') {
  const data = await (0, _helper.AJAX)(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800`);
  state.allPokemonType.page = page;
  const start = (page - 1) * state.allPokemonType.resultsPerPage;
  const end = page * state.allPokemonType.resultsPerPage;
  const pokemonList = [];

  for (let index = start; index < end; index++) {
    const pokemonObj = await loadPokemon(data.results[index].url, true, false);
    pokemonList.push(pokemonObj);
  } // get the number of page so we can display numbers of pages in pagination buttons


  state.allPokemonType.type = type;
  state.allPokemonType.pokemonList = pokemonList;
  state.allPokemonType.numberOfPages = data.results.length;
  return pokemonList;
}; // loading types


exports.loadAllPokemon = loadAllPokemon;

const loadAllPokemonType = async function (type, page = 1) {
  const data = await (0, _helper.AJAX)(`https://pokeapi.co/api/v2/type/${type}`);
  const allPokemonType = data.pokemon;
  state.allPokemonType.page = page;
  const start = (page - 1) * state.allPokemonType.resultsPerPage;
  const end = page * state.allPokemonType.resultsPerPage;
  const pokemonList = [];

  for (let index = start; index < end; index++) {
    const pokemonObj = await loadPokemon(allPokemonType[index].pokemon.url, true, false);
    pokemonList.push(pokemonObj);
  } // get the number of page so we can display numbers of pages in pagination buttons


  state.allPokemonType.type = type;
  state.allPokemonType.pokemonList = pokemonList;
  state.allPokemonType.numberOfPages = allPokemonType.length;
}; // getters


exports.loadAllPokemonType = loadAllPokemonType;

const getPokemonList = function () {
  return state.allPokemonType.pokemonList;
};

exports.getPokemonList = getPokemonList;

const getPokemon = function () {
  return state.pokemon;
};

exports.getPokemon = getPokemon;

const getSearch = function () {
  return {
    numberOfPages: state.allPokemonType.numberOfPages,
    currentPage: state.allPokemonType.page,
    resultsPerPage: state.allPokemonType.resultsPerPage
  };
};

exports.getSearch = getSearch;
},{"./helper":"ca5e72bede557533b2de19db21a2a688","./models/pokemon":"999f2a7f8a9a856ba568d7560ec43598","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"ca5e72bede557533b2de19db21a2a688":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AJAX = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _config = require("./config.js");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
    const res = await Promise.race([fetchPro, timeout(_config.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.AJAX = AJAX;
},{"regenerator-runtime":"e155e0d3930b156f86c48e8d05522b16","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"e155e0d3930b156f86c48e8d05522b16":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"09212d541c5c40ff2bd93475a904f8de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RES_PER_PAGE = exports.TIMEOUT_SEC = exports.API_URL = void 0;
const API_URL = 'https://pokeapi.co/api/v2/';
exports.API_URL = API_URL;
const TIMEOUT_SEC = 10;
exports.TIMEOUT_SEC = TIMEOUT_SEC;
const RES_PER_PAGE = 10;
exports.RES_PER_PAGE = RES_PER_PAGE;
},{}],"999f2a7f8a9a856ba568d7560ec43598":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePokemonObj = void 0;

var _helper = require("../helper");

const fetchData = async function (pokemon) {
  const data = await (0, _helper.AJAX)(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return data;
};

const generatePokemonObj = async function (data) {
  const typesInfos = generatePokemonTypesInfos(data.types);
  const types = generatePokemonTypesName(typesInfos);
  const moves = generatePokemonMoves(data.moves);
  const stats = generatePokemonStats(data.stats);
  const abilities = generatePokemonAbilities(data.abilities); // we need to get pokemon species to get the chain infos and weaknesses
  // but we get only name,lvl , item and trigger , we dont get imgUrl , types etc for parents-child pokemons , that's why we make another fetch "getEvolutionDetails" TO GET ALL DETAILS

  const evolutionChain = await getEvolutionChain(data.species); // after getting Evolutions pokemons names , we fetch more details (img , id , types ..)

  const evolutionDetails = await getEvolutionDetails(evolutionChain); // we need typesInfo (type url) to make the search

  const {
    weakAgainst
  } = await getWeaknessesInfos(typesInfos);
  const {
    strongAgainst
  } = await getWeaknessesInfos(typesInfos);
  const pokemon = {
    id: data.id,
    order: data.order,
    name: data.name,
    height: data.height,
    weight: data.weight,
    stats: stats,
    typesInfos: types,
    types: types,
    abilities: abilities,
    moves: moves,
    img: data.sprites.front_default,
    urlSpecies: data.species,
    evolutionDetails: evolutionDetails,
    weakAgainst,
    strongAgainst,
    favorite: false
  };
  return pokemon;
}; //////////////////////////////////////
// shit happens here
/////////////////////////
//evolution


exports.generatePokemonObj = generatePokemonObj;

const getEvolutionChain = async function (urlSpecies) {
  // we need to get specie first to get evolution infos
  const speciesInfos = await (0, _helper.AJAX)(`${urlSpecies.url}`);
  const evolutionChainUrl = speciesInfos.evolution_chain.url;
  const evoData = await (0, _helper.AJAX)(`${evolutionChainUrl}`);
  let evoList = [];
  let evoChainData = evoData.chain;

  do {
    let evoDetails = evoChainData['evolution_details'][0];
    evoList.push({
      pokemonName: evoChainData.species.name,
      minLevel: !evoDetails ? 1 : evoDetails.min_level,
      triggerName: !evoDetails ? null : evoDetails.trigger.name,
      item: !evoDetails ? null : evoDetails.item
    });
    evoChainData = evoChainData['evolves_to'][0];
  } while (!!evoChainData && evoChainData.hasOwnProperty('evolves_to'));

  return evoList;
};

const getEvolutionDetails = async function (evolutionChain) {
  const pokemonList = [];
  const evoluteTo = [];
  evolutionChain.forEach(el => {
    const pokemon = {
      name: el.pokemonName,
      minLvl: el.minLevel,
      triggerName: el.triggerName,
      item: el.item
    };
    pokemonList.push(el.pokemonName);
    evoluteTo.push(pokemon);
  });
  const allPokemonInfos = [];

  for (const pokemon of pokemonList) {
    const infos = await fetchData(pokemon);
    allPokemonInfos.push(infos);
  }

  allPokemonInfos.forEach((pokemonInfos, index) => {
    const typesInfos = generatePokemonTypesInfos(pokemonInfos.types);
    const typesNames = [];
    typesInfos.forEach(typeInfo => {
      typesNames.push(typeInfo.name);
    });
    evoluteTo[index].id = pokemonInfos.id;
    evoluteTo[index].type = typesNames;
    evoluteTo[index].img = pokemonInfos.sprites.front_default;
  });
  return evoluteTo;
}; // generate pokemon interne objects : stats , types , moves , abilities
// we need types infos for weaknesses and strengths (search by url type)


const generatePokemonTypesInfos = function (typesArray) {
  const types = [];
  typesArray.forEach(typeObj => {
    types.push({
      name: typeObj.type.name,
      url: typeObj.type.url
    });
  });
  return types;
};

const generatePokemonMoves = function (movesArray) {
  const moves = [];
  movesArray.forEach(moveObj => {
    moves.push(moveObj.move.name);
  });
  return moves;
};

const generatePokemonStats = function (statsArray) {
  const stats = [];
  statsArray.forEach(statsObj => {
    stats.push({
      statName: statsObj.stat.name,
      statValue: statsObj.base_stat
    });
  });
  return stats;
};

const generatePokemonAbilities = function (abilitiesArray) {
  const abilities = [];
  abilitiesArray.forEach(abilityObj => {
    abilities.push(abilityObj.ability.name);
  });
  return abilities;
};

const generatePokemonTypesName = function (types) {
  const typesList = [];
  types.forEach(type => {
    typesList.push(type.name);
  });
  return typesList;
}; // weakness and strength


const getWeaknessesInfos = async function (types) {
  const weaknessesInfos = [];

  for (const type of types) {
    const infos = await (0, _helper.AJAX)(`${type.url}`);
    weaknessesInfos.push({
      type: infos.name,
      infos: infos.damage_relations
    });
  }

  let weakAgainst = [];
  let strongAgainst = [];
  weaknessesInfos.forEach(damageRelations => {
    // weak against
    damageRelations.infos.double_damage_from.forEach(type => {
      weakAgainst.push(type.name);
    });
    damageRelations.infos.half_damage_to.forEach(type => {
      weakAgainst.push(type.name);
    });
    damageRelations.infos.no_damage_to.forEach(type => {
      weakAgainst.push(type.name);
    }); // strong against

    damageRelations.infos.double_damage_to.forEach(type => {
      strongAgainst.push(type.name);
    });
    damageRelations.infos.half_damage_from.forEach(type => {
      strongAgainst.push(type.name);
    });
    damageRelations.infos.no_damage_from.forEach(type => {
      strongAgainst.push(type.name);
    });
  }); // to compare and remove duplicated value ( if type in both list , remove it)

  weakAgainst = weakAgainst.filter(type => !strongAgainst.includes(type));
  strongAgainst = strongAgainst.filter(type => !weakAgainst.includes(type));
  return {
    weakAgainst: [...new Set(weakAgainst)],
    strongAgainst: [...new Set(strongAgainst)]
  };
};
},{"../helper":"ca5e72bede557533b2de19db21a2a688"}],"c5d792f7cac03ef65de30cc0fbb2cae7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchView {
  constructor() {
    _defineProperty(this, "_parentElement", document.querySelector('.search'));

    _defineProperty(this, "_data", void 0);
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value.toLowerCase(); // this._parentElement.querySelector('.search__field').value = '';


    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

}

var _default = new SearchView();

exports.default = _default;
},{}],"c882a2e4e19850278d24b1c39cd329b9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/svg/icons.svg"));

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PokemonView extends _view.default {
  constructor() {
    super();

    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "_parentElement", document.querySelector('.pokemon-list'));

    this.addHandlerBtnDetailsClick();
  }

  addHandlerVisit(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-visit');
      if (!btn) return;
      const pokemonName = btn.dataset.name;
      handler(pokemonName);
    });
  }

  addHandlerBtnDetailsClick() {
    this._parentElement.addEventListener('click', function (e) {
      let detailsContainer;
      let btn;

      if (e.target.classList.contains('btn-details')) {
        // e.target.innerText = text;
        btn = e.target;
      }

      if (e.target.dataset.icon) {
        btn = e.target.parentElement.parentElement;
      }

      if (e.target.classList.contains('toggle-details')) {
        btn = e.target.parentElement;
      }

      if (!btn) return;
      detailsContainer = btn.parentElement.parentElement.parentElement.parentElement.querySelector('.details');
      detailsContainer.classList.toggle('hidden'); // toggle show hide text

      if (btn.dataset.hide === 'true') {
        btn.firstElementChild.textContent = 'hide details';
        btn.dataset.hide = false;
      } else {
        btn.firstElementChild.textContent = 'show details';
        btn.dataset.hide = true;
      }
    });
  }

  render(pokemon) {
    this._data = pokemon;
    const markup = this.generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    const paginationContainer = document.querySelector('.footer .container');
    paginationContainer.innerHTML = '';
  }

  generateMarkup() {
    return this.generatePokemon(this._data);
  }

}

var _default = new PokemonView();

exports.default = _default;
},{"url:../../img/svg/icons.svg":"f6a347d4f57f6f4becd9f92d4fa8e4dd","./view":"6a3957d8744bf1d70b2b44f3726dda59"}],"f6a347d4f57f6f4becd9f92d4fa8e4dd":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("0dd5eefecc188f8f", "c03f26ab0abd0e6f");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"6a3957d8744bf1d70b2b44f3726dda59":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/svg/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class View {
  constructor() {
    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "_parentElement", void 0);
  }

  render(data) {
    this._data = data;
    const markup = this.generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]; // console.log(curEl, newEl.isEqualNode(curEl));
      // Updates changed TEXT

      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      } // Updates changed ATTRIBUES


      if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    });
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
            <svg class="fav__icon">
                <use href="${_icons.default}#pokeball"></use>
            </svg>
                </div>  `;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message) {
    const markup = `
        <div class="message">
        ${message}
        </div>
        `;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage() {}

  _clear() {
    this._parentElement.innerHTML = '';
  } // pokemon


  generatePokemon(data, hidden = false) {
    const markup = `
        <div class="pokemon">
        <div class="main">
            <div class="pokemon__card">
                <span class="height circle">${data.height}m</span>
                <span class="weight circle">${data.weight}kg</span>
                <span class="header">
                    <span class="number">#${data.id}</span>
                    <img src="${data.img}" alt="${data.name}" class="img" />
                </span>

                <span class="infos">
                    <span class="name">${data.name}</span>
                    <span class="genus">${data.types[0]} pokémon</span>
                    
                    <div class="type">
                    ${this._generateTypes(data.types)}
                    </div>
                </span>

                <div class="abilities">
                    ${this._generateAbilities(data.abilities)}
                </div>
            </div>

            <div class="pokemon__infos">
                <div class="stats">
                ${this._generateStats(data.stats)}                                                    
                </div>

                <div class="actions">
                    <button data-hide="true" class="btn btn--details btn-details ">
                        <h4 class="toggle-details" >show details</h4>
                        <svg class="fav__icon">
                            <use data-icon="true" href="${_icons.default}#pokeball"></use>
                        </svg>
                        
                    </button>

                    <button class="btn btn--fav">
                        <svg class="heart">
                            <use  href="${_icons.default}#heart${!data.favorite ? '-fill' : ''}"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="details ${hidden ? 'hidden' : ''} ">
            <div class="evolutions">
                <div class="title">
                    <h3>evolutions :</h3>
                </div>

                <div class="container">
                  ${this._generateEvolution(data.evolutionDetails)}
                </div>
            </div>

            <div class="moves">
                <div class="title">
                    <h3>moves :</h3>
                </div>
                <div class="container">
                    ${this._generateMoves(data.moves)}
                   
                </div>
            </div>
            <div class="strong">
                <div class="title">
                    <h3>Strong against :</h3>
                </div>
                <div class="container">
                ${this._generateTypes(data.strongAgainst)}
                </div>
            </div>
            <div class="weak">
                <div class="title">
                    <h3>weak against :</h3>
                </div>
                <div class="container">
                   ${this._generateTypes(data.weakAgainst)}
                </div>
            </div>
        </div>
    </div>
        `;
    return markup;
  }

  _generateTypes(types) {
    return types.map(type => {
      return `<span class="type badge badge--${type}">${type}</span>`;
    }).join('');
  }

  _generateAbilities(abilities) {
    return abilities.map(ability => {
      return `<p>${ability} </p>`;
    }).join('');
  }

  _generateStats(stats) {
    const generateClass = function (value) {
      let className = '';

      if (value < 250) {
        className = 'epic';
      }

      if (value < 150) {
        className = 'high';
      }

      if (value < 100) {
        className = 'medium';
      }

      if (value < 50) {
        className = 'low';
      }

      return className;
    };

    return stats.map(stat => {
      return `<div class="stat">
                <p class="title">${stat.statName}</p>
                <p class="number">${stat.statValue}</p>
                <div class="bar bar-total">
                    <div class="bar bar-stat ${generateClass(stat.statValue)}" style="width: ${stat.statValue}px"></div>
                </div>
            </div>
                `;
    }).join(''); // <div class="stat">
    //     <p class="title">attack</p>
    //     <p class="number">85</p>
    //     <div class="bar bar-total">
    //         <div class="bar bar-stat high" style="width: 85px"></div>
    //     </div>
    // </div>
  }

  _generateMoves(moves) {
    return moves.map(move => {
      return `<p>${move} </p>`;
    }).join('');
  }

  _generateEvolution(evolutionDetails) {
    return evolutionDetails.map(evolution => {
      return `   <div class="evolution">
                <div class="img">
                    <img src="${evolution.img}" alt="${evolution.name}" />
                </div>
                <span class="number"># ${evolution.id}</span>
                <span class="name">${evolution.name}</span>
                <div class="types">
                ${this._generateTypes(evolution.type)}
                </div>
        
                <button data-name="${evolution.name}" class="btn btn--details btn-visit">
                    visit
                    <svg class="fav__icon">
                        <use href="${_icons.default}#pokeball"></use>
                    </svg>
                </button>
            </div>
               
           
         
                `;
    }).join(`   <div class="arrow">
            <svg class="fav__icon">
                <use href="${_icons.default}#right-arrow"></use>
            </svg>
        </div>`);
  }

}

exports.default = View;
},{"url:../../img/svg/icons.svg":"f6a347d4f57f6f4becd9f92d4fa8e4dd"}],"ff8a8f8ac20ab348688cb09b686b90c2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ListView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "_parentElement", document.querySelector('.pokemon-list'));
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  render(data) {
    this._data = data;
    let markup = this.generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup() {
    return this._data.map(pokemon => this.generatePokemon(pokemon, true)).join('');
  }

}

var _default = new ListView();

exports.default = _default;
},{"./view":"6a3957d8744bf1d70b2b44f3726dda59"}],"d2063f3e7de2e4cdacfcb5eb6479db05":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/svg/icons.svg"));

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PaginationView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector('.footer .container'));
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-pagination');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  render(data) {
    this._data = data;

    let markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    const curPage = this._data.currentPage;
    const numPages = Math.ceil(this._data.numberOfPages / this._data.resultsPerPage); // Page 1, and there are other pages

    if (curPage === 1 && numPages > 1) {
      return `
            <button  data-goto="${curPage + 1}" class="btn btn--next btn-pagination">
            <p>page ${curPage + 1}</p>
            <svg class="fav__icon">
                <use href="${_icons.default}#right-arrow"></use>
            </svg>
        </button>
            
	  `;
    } // Last page


    if (curPage === numPages && numPages > 1) {
      return `
            <button data-goto="${curPage - 1}" class="btn btn--previous btn-pagination">
            
				<svg class="fav__icon">
					<use href="${_icons.default}#left-arrow"></use>
				</svg>
				<p>page ${curPage - 1}</p>
            </button>
	  `;
    } // Other page


    if (curPage < numPages) {
      return `
            <button data-goto="${curPage - 1}" class="btn btn--previous btn-pagination">

            <svg class="fav__icon">
            <use href="${_icons.default}#left-arrow"></use>
            </svg>
            <p>page ${curPage - 1}</p>
            </button>
        

        <button  data-goto="${curPage + 1}" class="btn btn--next btn-pagination">
        <p>page ${curPage + 1}</p>
        <svg class="fav__icon">
                <use href="${_icons.default}#right-arrow"></use>
            </svg>
    </button>
	  `;
    } // Page 1, and there are NO other pages


    return '';
  }

}

var _default = new PaginationView();

exports.default = _default;
},{"url:../../img/svg/icons.svg":"f6a347d4f57f6f4becd9f92d4fa8e4dd","./view":"6a3957d8744bf1d70b2b44f3726dda59"}]},{},["40b86b6c079b8884ab301263e3b97733","e21478b8abae4cf3d61c8189e216014f","1dce7d46d8385df4a1463c270f8613f4"], null)

//# sourceMappingURL=controler.440ee49b.js.map
