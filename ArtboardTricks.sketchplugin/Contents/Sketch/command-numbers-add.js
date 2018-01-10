var that = this;
function run (key, context) {
  that.context = context;

var exports =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArtboard = isArtboard;
exports.getContainingArtboard = getContainingArtboard;
exports.setSelection = setSelection;
exports.arrayFromNSArray = arrayFromNSArray;
exports.zeropad = zeropad;
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}

function getContainingArtboard(layer) {
  while (layer && !isArtboard(layer)) {
    layer = layer.parentGroup();
  }

  return layer;
}

function setSelection(context, layers) {
  context.document.currentPage().changeSelectionBySelectingLayers(null);
  layers.forEach(function (l) {
    return l.select_byExpandingSelection_(true, true);
  });
}

function arrayFromNSArray(nsArray) {
  var arr = [];
  for (var i = 0; i < nsArray.count(); i++) {
    arr.push(nsArray.objectAtIndex(i));
  }
  return arr;
}

function zeropad(s) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  s = String(s);
  s = s || '';
  while (s.length < length) {
    s = '0' + s;
  }
  return s;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports['default'] = function (context) {
  var page = context.document.currentPage();
  var currentPrefs = prefs.resolvePagePrefs(context, page);
  var artboardMetas = common.generateArtboardMetas(common.collectTargetArtboards(context));

  var uniqueYPositions = new Set(artboardMetas.map(function (meta) {
    return meta.t;
  }));
  var numRows = uniqueYPositions.size;

  // sort artboards top-down then left-right
  artboardMetas.sort(function (a, b) {
    if (a.t == b.t) {
      return a.l - b.l;
    } else {
      return a.t - b.t;
    }
  });

  // update artboard names
  var row = 0;
  var col = -1;
  var subCol = 0;
  var lastMetaT = null;
  artboardMetas.forEach(function (meta) {
    // strip off current digits and dots
    var fullName = meta.artboard.name();
    var currentNamePath = fullName.substring(0, fullName.lastIndexOf('/') + 1);
    var currentName = fullName.slice(currentNamePath.length);

    var _currentName$match = currentName.match(/^([\d.]*)[_-]?(.*)$/),
        _currentName$match2 = _slicedToArray(_currentName$match, 3),
        _ = _currentName$match2[0],
        currentNumber = _currentName$match2[1],
        baseName = _currentName$match2[2];

    if (lastMetaT === null || lastMetaT != meta.t) {
      lastMetaT = meta.t;
      ++row;
      subCol = 0;
      col = -1;
    }

    if (currentNumber.indexOf('.') >= 0) {
      // in a subcol
      ++subCol;
      col = Math.max(0, col);
    } else {
      // not in a subcol
      if (subCol >= 0) {
        // no longer in a subcol
        subCol = 0;
      }

      ++col;
    }

    // create prefix (e.g. "301" and "415.4" with subflows)
    var prefix = util.zeropad(row, numRows >= 10 ? 2 : 1) + currentPrefs.rowColSeparator + util.zeropad(col, 2) + (subCol > 0 ? '.' + subCol : '');

    // add prefix to the name
    meta.artboard.setName('' + String(currentNamePath) + prefix + String(currentPrefs.numberTitleSeparator) + String(baseName));
  });
};

var _sketchUtil = __webpack_require__(0);

var util = _interopRequireWildcard(_sketchUtil);

var _common = __webpack_require__(2);

var common = _interopRequireWildcard(_common);

var _prefs = __webpack_require__(3);

var prefs = _interopRequireWildcard(_prefs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectTargetArtboards = collectTargetArtboards;
exports.generateArtboardMetas = generateArtboardMetas;

var _sketchUtil = __webpack_require__(0);

var util = _interopRequireWildcard(_sketchUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

/**
 * Returns an array of all the artboards to target for grid operations
 * (e.g. re-number, rearrange, etc)
 */
function collectTargetArtboards(context) {
  if (context.selection.count()) {
    // if there's an active selection inside an artboard, consider
    // the artboards containing the selection the target
    var selectedArtboards = util.arrayFromNSArray(context.selection).map(function (layer) {
      return util.getContainingArtboard(layer);
    }).filter(function (layer) {
      return !!layer;
    });
    if (selectedArtboards.length) {
      return selectedArtboards;
    }
  }

  // otherwise, all artboards on the page
  return util.arrayFromNSArray(context.document.currentPage().artboards());
}

/**
 * Generates artboard metadata (primarily the object and frame)
 */
// Common functionality across related commands

function generateArtboardMetas(artboards) {
  return artboards.map(function (artboard) {
    var frame = artboard.frame();
    return {
      artboard: artboard,
      l: Number(frame.minX()),
      t: Number(frame.minY()),
      r: Number(frame.maxX()),
      b: Number(frame.maxY())
    };
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePagePrefs = resolvePagePrefs;
exports.getDefaultPrefs = getDefaultPrefs;
exports.getUserPrefs = getUserPrefs;
exports.setUserPrefs = setUserPrefs;
exports.getPagePrefs = getPagePrefs;
exports.setPagePrefs = setPagePrefs;

var _pluginUserPrefs = __webpack_require__(4);

var pluginUserPrefs = _interopRequireWildcard(_pluginUserPrefs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var PREFS_LAYER_KEY = 'artboard_tricks_spacing'; // for backward compatibility, don't change the key name


/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var DEFAULTS = {
  xSpacing: 100,
  ySpacing: 400,
  rowColSeparator: '',
  numberTitleSeparator: '_'
};

function resolvePagePrefs(context, page) {
  return Object.assign(getDefaultPrefs(), getUserPrefs(context), getPagePrefs(context, page));
}

function getDefaultPrefs() {
  return Object.assign({}, DEFAULTS);
}

function getUserPrefs(context) {
  return pluginUserPrefs.get(context, PREFS_LAYER_KEY, {});
}

function setUserPrefs(context, prefs) {
  pluginUserPrefs.set(context, PREFS_LAYER_KEY, prefs);
}

function getPagePrefs(context, page) {
  var v = context.command.valueForKey_onLayer_(PREFS_LAYER_KEY, page) || {};
  // convert v to a more pure JS object by serializing to JSON in Cocoa
  var jsonData = NSJSONSerialization.dataWithJSONObject_options_error_(v, 0, null);
  var jsonString = NSString.alloc().initWithData_encoding_(jsonData, NSUTF8StringEncoding);
  return JSON.parse(jsonString);
}

function setPagePrefs(context, page, prefs) {
  context.command.setValue_forKey_onLayer_(prefs, PREFS_LAYER_KEY, page);
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sets a preference for the plugin with the given key and value.
 */
function set(context, key, value) {
  var userDefaults = getUserDefaults(context);
  userDefaults.setObject_forKey_(JSON.stringify(value), key);
  userDefaults.synchronize(); // save
}

/**
 * Gets the value for the given preference.
 */
function get(context, key) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var userDefaults = getUserDefaults(context);
  var storedValue = userDefaults.stringForKey_(key);
  if (!storedValue) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedValue);
  } catch (e) {
    return defaultValue;
  }
}

function getUserDefaults(context) {
  var pluginId = String(context.plugin.identifier());
  return NSUserDefaults.alloc().initWithSuiteName(pluginId);
}

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
