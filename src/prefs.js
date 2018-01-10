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

import * as pluginUserPrefs from './lib/plugin-user-prefs';


const PREFS_LAYER_KEY = 'artboard_tricks_spacing'; // for backward compatibility, don't change the key name


const DEFAULTS = {
  xSpacing: 100,
  ySpacing: 400,
  rowColSeparator: '',
  numberTitleSeparator: '_',
};


export function resolvePagePrefs(context, page) {
  return Object.assign(
      getDefaultPrefs(),
      getUserPrefs(context),
      getPagePrefs(context, page));
}


export function getDefaultPrefs() {
  return Object.assign({}, DEFAULTS);
}


export function getUserPrefs(context) {
  return pluginUserPrefs.get(context, PREFS_LAYER_KEY, {});
}


export function setUserPrefs(context, prefs) {
  pluginUserPrefs.set(context, PREFS_LAYER_KEY, prefs);
}


export function getPagePrefs(context, page) {
  let v = context.command.valueForKey_onLayer_(PREFS_LAYER_KEY, page) || {};
  // convert v to a more pure JS object by serializing to JSON in Cocoa
  let jsonData = NSJSONSerialization.dataWithJSONObject_options_error_(v, 0, null);
  let jsonString = NSString.alloc().initWithData_encoding_(jsonData, NSUTF8StringEncoding);
  return JSON.parse(jsonString);
}


export function setPagePrefs(context, page, prefs) {
  context.command.setValue_forKey_onLayer_(prefs, PREFS_LAYER_KEY, page);
}
