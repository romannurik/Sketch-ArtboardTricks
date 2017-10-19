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

const util = require('./sketch-util');
const prefs = require('./prefs');


export default function(context) {
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
  rowStarterArtboardMetas.sort(function(a, b) {
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
      rowStarterMeta._tmpDistance = Math.abs(
          (rowStarterMeta.t + rowStarterMeta.b) / 2 - (meta.t + meta.b) / 2);
    }

    var tmp = rowStarterArtboardMetas.slice();
    tmp.sort(function(a, b) {
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
    metasInRow.sort(function(a, b) {
      return a.l - b.l;
    });
  }

  // finally, arrange everything
  var originX = 0, originY = 0;
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
  artboards.forEach(function(a) {
    page.removeLayer(a);
    page.addLayers(NSArray.arrayWithObject(a));
  });
}
