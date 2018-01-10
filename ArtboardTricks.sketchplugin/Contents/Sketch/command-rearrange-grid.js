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

exports['default'] = function (context) {
  var page = context.document.currentPage();
  var currentPrefs = prefs.resolvePagePrefs(context, page);
  var artboardMetas = common.generateArtboardMetas(common.collectTargetArtboards(context));

  // find row-starting artboards
  var rowStarterArtboardMetas = [];
  artboardMetas.forEach(function (meta) {
    var leftmostInRow = true;
    artboardMetas.forEach(function (otherMeta) {
      if (meta === otherMeta) {
        return;
      }

      if (otherMeta.l < meta.l) {
        if (meta.t <= otherMeta.b && otherMeta.t <= meta.b) {
          leftmostInRow = false;
          return;
        }
      }
    });

    if (leftmostInRow) {
      rowStarterArtboardMetas.push(meta);
    }
  });

  // sort list of row-starting artboards
  rowStarterArtboardMetas.sort(function (a, b) {
    return a.t - b.t;
  });

  // start a list of artboards for each row
  var rows = [];
  var rowHeights = [];

  rowStarterArtboardMetas.forEach(function (artboardMeta, i) {
    artboardMeta.row = i;
    rows[i] = [];
    rows[i].push(artboardMeta);
    rowHeights[i] = artboardMeta.b - artboardMeta.t;
  });

  // assign all other artboards to a row by
  // computing shortest distance between artboard vertical centers
  artboardMetas.forEach(function (meta) {
    if (rowStarterArtboardMetas.indexOf(meta) >= 0) {
      return;
    }

    rowStarterArtboardMetas.forEach(function (rowStarterMeta) {
      rowStarterMeta._tmpDistance = Math.abs((rowStarterMeta.t + rowStarterMeta.b) / 2 - (meta.t + meta.b) / 2);
    });

    var tmp = rowStarterArtboardMetas.slice();
    tmp.sort(function (a, b) {
      return a._tmpDistance - b._tmpDistance;
    });

    var artboardRow = tmp[0].row;
    rows[artboardRow].push(meta);

    // update row height
    rowHeights[artboardRow] = Math.max(rowHeights[artboardRow], meta.b - meta.t);
  });

  // sort each row by x position
  rows.forEach(function (metasInRow) {
    return metasInRow.sort(function (a, b) {
      return a.l - b.l;
    });
  });

  // finally, arrange everything
  var originX = 0,
      originY = 0;
  if (rows.length >= 1 && rows[0].length >= 1) {
    originX = rows[0][0].artboard.frame().x();
    originY = rows[0][0].artboard.frame().y();
  }

  // there's a weird thing in sketch where using 0,0 doesn't
  // always result in the artboard actually being at 0,0
  // see:
  // https://github.com/romannurik/Sketch-ArtboardTricks/issues/1

  var y = originY;
  rows.forEach(function (metasInRow, r) {
    var x = originX;
    metasInRow.forEach(function (meta) {
      var frame = meta.artboard.frame();
      frame.setX(x);
      frame.setY(y);
      x += frame.width() + currentPrefs.xSpacing;
    });
    y += rowHeights[r] + currentPrefs.ySpacing;
  });

  // update artboard position in the sidebar
  var artboards = [];
  rows.forEach(function (metasInRow) {
    metasInRow.forEach(function (meta) {
      artboards.push(meta.artboard);
    });
  });

  artboards.reverse();
  artboards.forEach(function (artboard) {
    page.removeLayer(artboard);
    page.addLayers(NSArray.arrayWithObject(artboard));
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
