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
 * Creates a delegate instance with the given selectors.
 * Similar to MochaJSDelegate.
 */
export function make(selectors) {
  // create a class name that doesn't exist yet. note that we can't reuse the same
  // definition lest Sketch will throw an MOJavaScriptException when binding the UI,
  // probably due to JavaScript context / plugin lifecycle incompatibility
  let tempClassName;
  while (true) {
    tempClassName = 'TempDelegateClass' + (1000000 * Math.random()).toFixed(0);
    if (NSClassFromString(tempClassName) == null) {
      break;
    }
  }

  let _cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(
      tempClassName, NSClassFromString('NSObject'));

  for (let selector in selectors) {
    _cls.addInstanceMethodWithSelector_function_(
      NSSelectorFromString(selector),
      selectors[selector]);
  }

  _cls.registerClass();
  return NSClassFromString(tempClassName).alloc().init();
}

export function setOnButtonClick(buttonView, fn) {
  let d = make({
    'onPress:': () => fn()
  });

  buttonView.setTarget(d);
  buttonView.setAction(NSSelectorFromString('onPress:'));
}
