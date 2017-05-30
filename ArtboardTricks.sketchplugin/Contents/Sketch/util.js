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

function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}

function setSelection(context, layers) {
  context.document.currentPage().deselectAllLayers();
  layers.forEach(function(l) {
    [l select:true byExpandingSelection:true];
  });
}

// Returns a list of artboards
// If at least one artboard is selected, return only the selected artboards
// If no artboards are selected, then return all of the artboards on the page
function getArtboards(context, page) {
  var artboards = page.artboards();

  // If artboards are selected, then only return those artboards
  if(context.selection.count() != 0) {
    artboards.removeAllObjects()
    for (var i = 0; i < context.selection.count(); i++) {
      var layer = context.selection.objectAtIndex(i);
      if(isArtboard(layer)) {
        artboards.push(layer);
      }
    }
  }

  // If there are no artboards selected, then return all artboards on the page
  if (artboards.count() == 0) {
      artboards = page.artboards();
  }

  return artboards;
}
