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

export function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}

export function setSelection(context, layers) {
  context.document.currentPage().changeSelectionBySelectingLayers(null);
  layers.forEach(l => l.select_byExpandingSelection_(true, true));
}

export function nsArrayToArray(nsArray) {
  let arr = [];
  for (let i = 0; i < nsArray.count(); i++) {
    arr.push(nsArray.objectAtIndex(i));
  }
  return arr;
}

export function zeropad(s, length = 1) {
  s = String(s);
  s = s || '';
  while (s.length < length) {
    s = '0' + s;
  }
  return s;
}
