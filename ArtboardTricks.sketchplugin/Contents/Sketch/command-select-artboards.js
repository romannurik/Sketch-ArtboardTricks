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
  if (context.selection.count() == 0) {
    context.document.showMessage('Please select some objects.');
    return;
  }

  var selectedArtboards = new Set(util.arrayFromNSArray(context.selection).map(function (layer) {
    return util.getContainingArtboard(layer);
  }).filter(function (layer) {
    return !!layer;
  }));

  util.setSelection(context, Array.from(selectedArtboards));
};

var _sketchUtil = __webpack_require__(1);

var util = _interopRequireWildcard(_sketchUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArtboard = isArtboard;
exports.getContainingArtboard = getContainingArtboard;
exports.setSelection = setSelection;
exports.arrayFromNSArray = arrayFromNSArray;
exports.reorderLayers = reorderLayers;
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
 * Returns true if the given layer is an artboard-like object (i.e. an artboard
 * or a symbol master).
 */
function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}

/**
 * Returns the artboard containing the given layer, null if the layer isn't
 * contained within an artboard, or the layer if it is itself an artboard.
 */
function getContainingArtboard(layer) {
  while (layer && !isArtboard(layer)) {
    layer = layer.parentGroup();
  }

  return layer;
}

/**
 * Replaces the current selection with the given set of layers.
 */
function setSelection(context, layers) {
  context.document.currentPage().changeSelectionBySelectingLayers(null);
  layers.forEach(function (l) {
    return l.select_byExpandingSelection_(true, true);
  });
}

/**
 * Returns a JavaScript array copy of the given NSArray.
 */
function arrayFromNSArray(nsArray) {
  var arr = [];
  for (var i = 0; i < nsArray.count(); i++) {
    arr.push(nsArray.objectAtIndex(i));
  }
  return arr;
}

/**
 * Reorders the given layers in the layer list based on their position in the array.
 * If they're in different containing groups, reorders locally within that group.
 */
function reorderLayers(layers) {
  // rearrange in layer list
  var indexesInParents = {};

  layers.forEach(function (layer, index) {
    var parent = layer.parentGroup();
    var parentId = String(parent.objectID());
    if (!(parentId in indexesInParents)) {
      var siblings = arrayFromNSArray(parent.layers());
      indexesInParents[parentId] = siblings.findIndex(function (l) {
        return l.parentGroup() === parent && layers.indexOf(l) >= 0;
      });
    }
    parent.removeLayer(layer);
    parent.insertLayer_atIndex_(layer, indexesInParents[parentId]);
  });
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
