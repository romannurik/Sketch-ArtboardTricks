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


export default function(context) {
  let artboards = context.document.currentPage().artboards();

  // update artboard names
  for (let i = 0; i < artboards.count(); i++) {
    let artboard = artboards.objectAtIndex(i);

    // strip off current digits and dots
    let fullName = artboard.name();
    let currentNamePath = fullName.substring(0, fullName.lastIndexOf('/') + 1);
    let currentName = fullName.slice(currentNamePath.length);
    currentName = currentName.replace(/^[\d.]*[-_]?/, '');

    // reset the name
    artboard.setName(currentNamePath + currentName);
  }
}
