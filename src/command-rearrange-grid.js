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

import * as util from './sketch-util';
import * as common from './common';
import * as prefs from './prefs';


export default function(context) {
  let page = context.document.currentPage();
  let currentPrefs = prefs.resolvePagePrefs(context, page);
  let artboardMetas = common.generateArtboardMetas(
      common.collectTargetArtboards(context));

  // find row-starting artboards
  let rowStarterArtboardMetas = [];
  artboardMetas.forEach(meta => {
    let leftmostInRow = true;
    artboardMetas.forEach(otherMeta => {
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
  rowStarterArtboardMetas.sort((a, b) => a.t - b.t);

  // start a list of artboards for each row
  let rows = [];
  let rowHeights = [];

  rowStarterArtboardMetas.forEach((artboardMeta, i) => {
    artboardMeta.row = i;
    rows[i] = [];
    rows[i].push(artboardMeta);
    rowHeights[i] = artboardMeta.b - artboardMeta.t;
  });

  // assign all other artboards to a row by
  // computing shortest distance between artboard vertical centers
  artboardMetas.forEach(meta => {
    if (rowStarterArtboardMetas.indexOf(meta) >= 0) {
      return;
    }

    rowStarterArtboardMetas.forEach(rowStarterMeta => {
      rowStarterMeta._tmpDistance = Math.abs(
          (rowStarterMeta.t + rowStarterMeta.b) / 2 - (meta.t + meta.b) / 2);
    });

    let tmp = rowStarterArtboardMetas.slice();
    tmp.sort((a, b) => a._tmpDistance - b._tmpDistance);

    let artboardRow = tmp[0].row;
    rows[artboardRow].push(meta);

    // update row height
    rowHeights[artboardRow] = Math.max(rowHeights[artboardRow], meta.b - meta.t);
  });

  // sort each row by x position
  rows.forEach(metasInRow => metasInRow.sort((a, b) => a.l - b.l));

  // finally, arrange everything
  let originX = 0, originY = 0;
  if (rows.length >= 1 && rows[0].length >= 1) {
    originX = rows[0][0].artboard.frame().x();
    originY = rows[0][0].artboard.frame().y();
  }

  // there's a weird thing in sketch where using 0,0 doesn't
  // always result in the artboard actually being at 0,0
  // see:
  // https://github.com/romannurik/Sketch-ArtboardTricks/issues/1

  let y = originY;
  rows.forEach((metasInRow, r) => {
    let x = originX;
    metasInRow.forEach(meta => {
      let frame = meta.artboard.frame();
      frame.setX(x);
      frame.setY(y);
      x += frame.width() + currentPrefs.xSpacing;
    });
    y += rowHeights[r] + currentPrefs.ySpacing;
  });

  // update artboard position in the sidebar
  let artboards = [];
  rows.forEach(metasInRow => {
    metasInRow.forEach(meta => {
      artboards.push(meta.artboard);
    });
  });

  artboards.reverse();
  artboards.forEach(artboard => {
    page.removeLayer(artboard);
    page.addLayers(NSArray.arrayWithObject(artboard));
  });
}
