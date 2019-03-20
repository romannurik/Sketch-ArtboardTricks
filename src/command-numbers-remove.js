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
  let artboards = common.collectTargetArtboards(context);

  // update artboard names
  artboards.forEach(artboard => {
    // strip off current digits and dots
    let nameParts = common.parseCurrentArtboardName(artboard.name(), resolvedPrefs);
    nameParts.row = 0;

    // reset the name
    artboard.setName(common.composeArtboardName(nameParts, resolvedPrefs, {}));
  });
}
