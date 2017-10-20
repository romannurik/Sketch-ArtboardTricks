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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {
  var page = context.document.currentPage();
  var currentPrefs = prefs.resolvePagePrefs(context, page);

  var artboardMetas = [];
  var artboards = page.artboards();

  // locally cache artboard positions
  for (var i = 0; i < artboards.count(); i++) {
    var artboard = artboards.objectAtIndex(i);
    var frame = artboard.frame();
    artboardMetas.push({
      artboard: artboard,
      l: frame.minX(),
      t: frame.minY(),
      r: frame.maxX(),
      b: frame.maxY()
    });
  }

  var rowStarterArtboardMetas = [];

  // find row-starting artboards
  for (var i = 0; i < artboardMetas.length; i++) {
    var leftmostInRow = true;

    var meta = artboardMetas[i];
    for (var j = 0; j < artboardMetas.length; j++) {
      if (i == j) {
        continue;
      }

      var otherMeta = artboardMetas[j];
      if (otherMeta.l < meta.l) {
        if (meta.t <= otherMeta.b && otherMeta.t <= meta.b) {
          leftmostInRow = false;
          break;
        }
      }
    }

    if (leftmostInRow) {
      rowStarterArtboardMetas.push(meta);
    }
  }

  // sort list of row-starting artboards
  rowStarterArtboardMetas.sort(function (a, b) {
    return a.t - b.t;
  });

  // start a list of artboards for each row
  var rows = [];
  var rowHeights = [];

  for (var i = 0; i < rowStarterArtboardMetas.length; i++) {
    rowStarterArtboardMetas[i].row = i;
    rows[i] = [];
    rows[i].push(rowStarterArtboardMetas[i]);
    rowHeights[i] = rowStarterArtboardMetas[i].b - rowStarterArtboardMetas[i].t;
  }

  // assign all other artboards to a row by
  // computing shortest distance between artboard vertical centers
  for (var i = 0; i < artboardMetas.length; i++) {
    var meta = artboardMetas[i];
    if (rowStarterArtboardMetas.indexOf(meta) >= 0) {
      continue;
    }

    for (var j = 0; j < rowStarterArtboardMetas.length; j++) {
      var rowStarterMeta = rowStarterArtboardMetas[j];
      rowStarterMeta._tmpDistance = Math.abs((rowStarterMeta.t + rowStarterMeta.b) / 2 - (meta.t + meta.b) / 2);
    }

    var tmp = rowStarterArtboardMetas.slice();
    tmp.sort(function (a, b) {
      return a._tmpDistance - b._tmpDistance;
    });

    var artboardRow = tmp[0].row;
    rows[artboardRow].push(meta);

    // update row height
    rowHeights[artboardRow] = Math.max(rowHeights[artboardRow], meta.b - meta.t);
  }

  // sort each row by x position
  for (var i = 0; i < rows.length; i++) {
    var metasInRow = rows[i];
    metasInRow.sort(function (a, b) {
      return a.l - b.l;
    });
  }

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
  for (var r = 0; r < rows.length; r++) {
    var metasInRow = rows[r];
    var x = originX;
    for (var c = 0; c < metasInRow.length; c++) {
      var frame = metasInRow[c].artboard.frame();
      frame.setX(x);
      frame.setY(y);
      x += frame.width() + currentPrefs.xSpacing;
    }
    y += rowHeights[r] + currentPrefs.ySpacing;
  }

  // update artboard position in the sidebar
  var artboards = [];
  for (var r = 0; r < rows.length; r++) {
    var metasInRow = rows[r];
    for (var c = 0; c < metasInRow.length; c++) {
      artboards.push(metasInRow[c].artboard);
    }
  }

  artboards.reverse();
  artboards.forEach(function (a) {
    page.removeLayer(a);
    page.addLayers(NSArray.arrayWithObject(a));
  });
};

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

var util = __webpack_require__(1);
var prefs = __webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArtboard = isArtboard;
exports.setSelection = setSelection;
exports.nsArrayToArray = nsArrayToArray;
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

function setSelection(context, layers) {
  context.document.currentPage().changeSelectionBySelectingLayers(null);
  layers.forEach(function (l) {
    return l.select_byExpandingSelection_(true, true);
  });
}

function nsArrayToArray(nsArray) {
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
/* 2 */
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

var pluginUserPrefs = __webpack_require__(3);

var PREFS_LAYER_KEY = 'artboard_tricks_spacing'; // for backward compatibility, don't change the key name


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
/* 3 */
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
