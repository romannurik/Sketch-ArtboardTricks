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
export function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}


/**
 * Returns the artboard containing the given layer, null if the layer isn't
 * contained within an artboard, or the layer if it is itself an artboard.
 */
export function getContainingArtboard(layer) {
  while (layer && !isArtboard(layer)) {
    layer = layer.parentGroup();
  }

  return layer;
}


/**
 * Replaces the current selection with the given set of layers.
 */
export function setSelection(context, layers) {
  context.document.currentPage().changeSelectionBySelectingLayers(null);
  layers.forEach(l => l.select_byExpandingSelection_(true, true));
}


/**
 * Returns a JavaScript array copy of the given NSArray.
 */
export function arrayFromNSArray(nsArray) {
  let arr = [];
  for (let i = 0; i < nsArray.count(); i++) {
    arr.push(nsArray.objectAtIndex(i));
  }
  return arr;
}


/**
 * Reorders the given layers in the layer list based on their position in the array.
 * If they're in different containing groups, reorders locally within that group.
 */
export function reorderLayers(layers) {
  // rearrange in layer list
  let indexesInParents = {};

  layers.forEach((layer, index) => {
    let parent = layer.parentGroup();
    let parentId = String(parent.objectID());
    if (!(parentId in indexesInParents)) {
      let siblings = arrayFromNSArray(parent.layers());
      indexesInParents[parentId] = siblings.findIndex(
          l => l.parentGroup() === parent && layers.indexOf(l) >= 0);
    }
    parent.removeLayer(layer);
    parent.insertLayer_atIndex_(layer, indexesInParents[parentId]);
  });
}
