/*
 * Copyright 2015 Google Inc.
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

@import 'util.js'

var onRun = function(context) {
  prependNumbersToArtboards(context);
};

function prependNumbersToArtboards(context) {
  var artboardMetas = [];
  var artboards = context.document.currentPage().artboards();

  var numRows = 0;

  // locally cache artboard positions
  var artboardsAtYPosition = {};
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

    var t = frame.minY();
    if (!(t in artboardsAtYPosition)) {
      artboardsAtYPosition[t] = 0;
      ++numRows;
    }
    ++artboardsAtYPosition[t];
  }

  // sort artboards top-down then left-right
  artboardMetas.sort(function(a, b) {
    if (a.t == b.t) {
      return a.l - b.l;
    } else {
      return a.t - b.t;
    }
  });

  // update artboard names
  var row = 0;
  var col = 0;
  for (var i = 0; i < artboardMetas.length; i++) {
    var meta = artboardMetas[i];

    // create prefix (e.g. "301")

    var prefix = (row) + '.' + ((col < 10) ?  '0' : '') + col; // creando 100-101,,,111
    //if (numRows >= 10 && row < 9) { // si el total de ROWS es mayor a 10
    //  prefix = '0' + prefix;
    //}

    // complete the 4 digit-code to avoid braking on 1xxx
    if(row < 10) prefix = '0' + prefix;

    // strip off current digits and dots
    var fullName = meta.artboard.name();
    var currentNamePath = fullName.substring(0, fullName.lastIndexOf('/') + 1);
    var currentName = fullName.slice(currentNamePath.length);
    currentName = currentName.replace(/^.*[_]/, '').replace(/\s/g, '.'); // added remove spaces + lowercase

    // add prefix to the name
    meta.artboard.setName(currentNamePath + prefix + '_' +  currentName);

    ++col;
    if (artboardsAtYPosition[meta.t] <= col) {
      ++row;
      col = 0;
    }
  }
}
