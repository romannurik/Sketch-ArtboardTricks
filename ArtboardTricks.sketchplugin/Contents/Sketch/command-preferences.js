var that = this;
function run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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

exports['default'] = function (context) {
  new PreferencesDialog(context).show();
};

var _delegate = __webpack_require__(1);

var delegate = _interopRequireWildcard(_delegate);

var _prefs = __webpack_require__(2);

var prefs = _interopRequireWildcard(_prefs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WIDGET_CONFIGS = [{
  label: 'Horizontal Rearrange Spacing (pixels)',
  key: 'xSpacing',
  onParse: onParseNumber
}, {
  label: 'Vertical Rearrange Spacing (pixels)',
  key: 'ySpacing',
  onParse: onParseNumber
}];

var PreferencesDialog = function () {
  function PreferencesDialog(context) {
    _classCallCheck(this, PreferencesDialog);

    this.context = context;
    this.page = context.document.currentPage();
    this.buildAlertUi();
  }

  /**
   * Builds the NSAlert and preference widgets for
   * preferences in WIDGET_CONFIGS.
   */


  _createClass(PreferencesDialog, [{
    key: 'buildAlertUi',
    value: function () {
      function buildAlertUi() {
        var _this = this;

        // set up alert widgets in a stack view
        var stackView = NSStackView.alloc().init();

        this.widgets = WIDGET_CONFIGS.map(function (config) {
          return _this.buildPrefWidget(stackView, config);
        });

        stackView.setSpacing(10);
        stackView.setOrientation(NSUserInterfaceLayoutOrientationVertical);
        stackView.setFrame(CGRectMake(0, 0, 200, 300));
        stackView.setAlignment(NSLayoutAttributeLeft);
        stackView.setTranslatesAutoresizingMaskIntoConstraints(true);
        stackView.updateConstraintsForSubtreeIfNeeded();

        // build the alert UI
        this.alertObj = NSAlert.alloc().init();
        this.alertObj.setAccessoryView(stackView);
        this.alertObj.window().setAutorecalculatesKeyViewLoop(true);
        this.alertObj.window().setInitialFirstResponder(this.widgets[0].fieldView);

        // set up alert basics
        this.alertObj.setMessageText('Artboard Tricks Preferences for page \'' + String(this.page.name()) + '\'');
        this.alertObj.addButtonWithTitle('OK');
        this.alertObj.addButtonWithTitle('Cancel');
        delegate.setOnButtonClick(this.alertObj.addButtonWithTitle('Set Defaults'), function () {
          return _this.storeDefaults();
        });
      }

      return buildAlertUi;
    }()

    /**
     * Builds a widget object for the given config.
     *
     * @param parentStackView The container.
     * @param config The config for this widget (see WIDGET_CONFIGS)
     */

  }, {
    key: 'buildPrefWidget',
    value: function () {
      function buildPrefWidget(parentStackView, config) {
        var _this2 = this;

        var displayValueForPlaceholder = config.onDisplayValueForPlaceholder || function (s) {
          return s;
        };
        var fieldView = NSTextField.alloc().initWithFrame(CGRectMake(0, 0, 200, 25));
        var labelView = this.labelWithString(config.label);
        labelView.setFont(NSFont.labelFontOfSize(11));
        parentStackView.addView_inGravity_(labelView, NSStackViewGravityTop);
        parentStackView.addView_inGravity_(fieldView, NSStackViewGravityTop);

        var updateFieldView = function () {
          function updateFieldView() {
            fieldView.cell().setPlaceholderString(String(displayValueForPlaceholder(_this2.defaultPrefs[config.key])));
            fieldView.setStringValue(String(_this2.pagePrefs[config.key] || ''));
          }

          return updateFieldView;
        }();

        updateFieldView();

        return {
          config: config,
          getParsedValue: function () {
            function getParsedValue() {
              var v = String(fieldView.stringValue());
              return config.onParse ? config.onParse(v) : v;
            }

            return getParsedValue;
          }(),
          update: function () {
            function update() {
              return updateFieldView();
            }

            return update;
          }()
        };
      }

      return buildPrefWidget;
    }()

    /**
     * Returns a label-style NSTextField with the given text.
     * Polyfill for NSTextField.labelWithString
     */

  }, {
    key: 'labelWithString',
    value: function () {
      function labelWithString(text) {
        // return NSTextField.labelWithString(text); // only available on macOS Sierra
        var textField = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 100, 20));
        textField.setStringValue(text);
        textField.setBezeled(false);
        textField.setDrawsBackground(false);
        textField.setEditable(false);
        textField.setSelectable(false);
        return textField;
      }

      return labelWithString;
    }()

    /**
     * Shows the preferences alert and returns true if the user pressed OK
     * and preferences were saved.
     */

  }, {
    key: 'show',
    value: function () {
      function show() {
        if (this.alertObj.runModal() == NSAlertFirstButtonReturn) {
          prefs.setPagePrefs(this.context, this.page, this.readWidgetValues());
          this.context.document.showMessage('Saved preferences.');
          return true;
        }

        return false;
      }

      return show;
    }()

    /**
     * Returns a dictionary of each widget's parsed value.
     */

  }, {
    key: 'readWidgetValues',
    value: function () {
      function readWidgetValues() {
        var p = {};
        this.widgets.forEach(function (widget) {
          var v = widget.getParsedValue();
          if (v !== null) {
            p[widget.config.key] = v;
          }
        });
        return p;
      }

      return readWidgetValues;
    }()

    /**
     * Saves the default config.
     */

  }, {
    key: 'storeDefaults',
    value: function () {
      function storeDefaults() {
        prefs.setUserPrefs(this.context, Object.assign(prefs.getUserPrefs(this.context), this.readWidgetValues()));
        prefs.setPagePrefs(this.context, this.page, {}); // remove page prefs, i.e. use defaults
        this.invalidatePrefs();
        this.widgets.forEach(function (widget) {
          return widget.update();
        });
        context.document.showMessage('Saved default preferences.');
      }

      return storeDefaults;
    }()
  }, {
    key: 'invalidatePrefs',
    value: function () {
      function invalidatePrefs() {
        this._pagePrefs = null;
        this._defaultPrefs = null;
      }

      return invalidatePrefs;
    }()
  }, {
    key: 'defaultPrefs',
    get: function () {
      function get() {
        if (!this._defaultPrefs) {
          this._defaultPrefs = Object.assign({}, prefs.getDefaultPrefs(), prefs.getUserPrefs(this.context));
        }
        return this._defaultPrefs;
      }

      return get;
    }()
  }, {
    key: 'pagePrefs',
    get: function () {
      function get() {
        if (!this._pagePrefs) {
          this._pagePrefs = prefs.getPagePrefs(this.context, this.page);
        }
        return this._pagePrefs;
      }

      return get;
    }()
  }]);

  return PreferencesDialog;
}();

/**
 * Parse a string to a string (treat empty string as an empty value) 
 */


function onParseString(val) {
  if (val === '') {
    return null;
  }

  return val;
}

/**
 * Parse a string to a number (treat empty string and invalid numbers as empty values)
 */
function onParseNumber(val) {
  if (val === '') {
    return null;
  }

  var v = Number(val);
  if (isNaN(v)) {
    return null;
  }

  return v;
}

function displayValueForChar(val) {
  switch (val) {
    case '':
      return '(none)';
    case '_':
      return '(underscore)';
  }

  return val;
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = make;
exports.setOnButtonClick = setOnButtonClick;
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
function make(selectors) {
  // create a class name that doesn't exist yet. note that we can't reuse the same
  // definition lest Sketch will throw an MOJavaScriptException when binding the UI,
  // probably due to JavaScript context / plugin lifecycle incompatibility
  var tempClassName = void 0;
  while (true) {
    tempClassName = 'TempDelegateClass' + (1000000 * Math.random()).toFixed(0);
    if (NSClassFromString(tempClassName) == null) {
      break;
    }
  }

  var _cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(tempClassName, NSClassFromString('NSObject'));

  for (var selector in selectors) {
    _cls.addInstanceMethodWithSelector_function_(NSSelectorFromString(selector), selectors[selector]);
  }

  _cls.registerClass();
  return NSClassFromString(tempClassName).alloc().init();
}

function setOnButtonClick(buttonView, fn) {
  var d = make({
    'onPress:': function () {
      function onPress() {
        return fn();
      }

      return onPress;
    }()
  });

  buttonView.setTarget(d);
  buttonView.setAction(NSSelectorFromString('onPress:'));
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePagePrefs = resolvePagePrefs;
exports.getDefaultPrefs = getDefaultPrefs;
exports.getUserPrefs = getUserPrefs;
exports.setUserPrefs = setUserPrefs;
exports.getPagePrefs = getPagePrefs;
exports.setPagePrefs = setPagePrefs;

var _pluginUserPrefs = __webpack_require__(3);

var pluginUserPrefs = _interopRequireWildcard(_pluginUserPrefs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var PREFS_LAYER_KEY = 'artboard_tricks_spacing'; // for backward compatibility, don't change the key name


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

var DEFAULTS = {
  xSpacing: 100,
  ySpacing: 400,
  rowColSeparator: '',
  numberTitleSeparator: '_'
};

function resolvePagePrefs(context, page) {
  return Object.assign(getDefaultPrefs(), getUserPrefs(context), getPagePrefs(context, page));
}

function getDefaultPrefs() {
  return Object.assign({}, DEFAULTS);
}

function getUserPrefs(context) {
  return pluginUserPrefs.get(context, PREFS_LAYER_KEY, {});
}

function setUserPrefs(context, prefs) {
  pluginUserPrefs.set(context, PREFS_LAYER_KEY, prefs);
}

function getPagePrefs(context, page) {
  var v = context.command.valueForKey_onLayer_(PREFS_LAYER_KEY, page) || {};
  // convert v to a more pure JS object by serializing to JSON in Cocoa
  var jsonData = NSJSONSerialization.dataWithJSONObject_options_error_(v, 0, null);
  var jsonString = NSString.alloc().initWithData_encoding_(jsonData, NSUTF8StringEncoding);
  return JSON.parse(jsonString);
}

function setPagePrefs(context, page, prefs) {
  context.command.setValue_forKey_onLayer_(prefs, PREFS_LAYER_KEY, page);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
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
 * Sets a preference for the plugin with the given key and value.
 */
function set(context, key, value) {
  var userDefaults = getUserDefaults(context);
  userDefaults.setObject_forKey_(JSON.stringify(value), key);
  userDefaults.synchronize(); // save
}

/**
 * Gets the value for the given preference.
 */
function get(context, key) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var userDefaults = getUserDefaults(context);
  var storedValue = userDefaults.stringForKey_(key);
  if (!storedValue) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedValue);
  } catch (e) {
    return defaultValue;
  }
}

function getUserDefaults(context) {
  var pluginId = String(context.plugin.identifier());
  return NSUserDefaults.alloc().initWithSuiteName(pluginId);
}

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
