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

import * as common from './common';
import * as prefs from './prefs';


export default function(context) {
  let page = context.document.currentPage();
  let resolvedPrefs = prefs.resolvePagePrefs(context, page);
  let artboardMetas = common.generateArtboardMetas(
      common.collectTargetArtboards(context));

  let uniqueYPositions = new Set(artboardMetas.map(meta => meta.t));
  let numRows = uniqueYPositions.size;

  // sort artboards top-down then left-right
  artboardMetas.sort((a, b) => {
    if (a.t == b.t) {
      return a.l - b.l;
    } else {
      return a.t - b.t;
    }
  });

  // update artboard names
  let row = 0;
  let col = -1;
  let subCol = 0;
  let lastMetaT = null;
  artboardMetas.forEach(meta => {
    // strip off current digits and dots
    let fullName = meta.artboard.name();
    let nameParts = common.parseCurrentArtboardName(fullName, resolvedPrefs);

    if (lastMetaT === null || lastMetaT != meta.t) {
      lastMetaT = meta.t;
      ++row;
      subCol = 0;
      col = -1;
    }

    if (nameParts.subCol) {
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

    nameParts.row = row;
    nameParts.col = col;
    nameParts.subCol = subCol;

    // add prefix to the name
    meta.artboard.setName(common.composeArtboardName(nameParts, resolvedPrefs, {numRows}));
  });
}

