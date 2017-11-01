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

const delegate = require('./lib/delegate');
const prefs = require('./prefs');


export default function(context) {
  new PreferencesDialog(context).show();
}


const WIDGET_CONFIGS = [
  {
    label: 'Horizontal Rearrange Spacing (pixels)',
    key: 'xSpacing',
    onParse: onParseNumber,
  },
  {
    label: 'Vertical Rearrange Spacing (pixels)',
    key: 'ySpacing',
    onParse: onParseNumber,
  },
  // {
  //   label: 'Numbering: Row/column separator',
  //   key: 'rowColSeparator',
  //   onDisplayValueForPlaceholder: displayValueForChar,
  //   onParse: onParseString,
  // },
  // {
  //   label: 'Numbering: Number/title separator',
  //   key: 'numberTitleSeparator',
  //   onDisplayValueForPlaceholder: displayValueForChar,
  //   onParse: onParseString,
  // }
];


class PreferencesDialog {
  constructor(context) {
    this.context = context;
    this.page = context.document.currentPage();
    this.buildAlertUi();
  }

  /**
   * Builds the NSAlert and preference widgets for
   * preferences in WIDGET_CONFIGS.
   */
  buildAlertUi() {
    // set up alert widgets in a stack view
    let stackView = NSStackView.alloc().init();

    this.widgets = WIDGET_CONFIGS.map(config => this.buildPrefWidget(stackView, config));
    
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
    this.alertObj.setMessageText(`Artboard Tricks Preferences for page '${this.page.name()}'`);
    this.alertObj.addButtonWithTitle('OK');
    this.alertObj.addButtonWithTitle('Cancel');
    delegate.setOnButtonClick(this.alertObj.addButtonWithTitle('Set Defaults'),
        () => this.storeDefaults());
  }

  /**
   * Builds a widget object for the given config.
   *
   * @param parentStackView The container.
   * @param config The config for this widget (see WIDGET_CONFIGS)
   */
  buildPrefWidget(parentStackView, config) {
    let displayValueForPlaceholder = config.onDisplayValueForPlaceholder || (s => s);
    let fieldView = NSTextField.alloc().initWithFrame(CGRectMake(0, 0, 200, 25));
    let labelView = NSTextField.labelWithString(config.label);
    labelView.setFont(NSFont.labelFontOfSize(11));
    parentStackView.addView_inGravity_(labelView, NSStackViewGravityTop);
    parentStackView.addView_inGravity_(fieldView, NSStackViewGravityTop);

    let updateFieldView = () => {
      fieldView.cell().setPlaceholderString(String(displayValueForPlaceholder(this.defaultPrefs[config.key])));
      fieldView.setStringValue(String(this.pagePrefs[config.key] || ''));
    };

    updateFieldView();

    return {
      config,
      getParsedValue: () => {
        let v = String(fieldView.stringValue());
        return config.onParse ? config.onParse(v) : v;
      },
      update: () => updateFieldView(),
    };
  }

  /**
   * Shows the preferences alert and returns true if the user pressed OK
   * and preferences were saved.
   */
  show() {
    if (this.alertObj.runModal() == NSAlertFirstButtonReturn) {
      prefs.setPagePrefs(this.context, this.page, this.readWidgetValues());
      this.context.document.showMessage('Saved preferences.');
      return true;
    }

    return false;
  }

  /**
   * Returns a dictionary of each widget's parsed value.
   */
  readWidgetValues() {
    let p = {};
    this.widgets.forEach(widget => {
      let v = widget.getParsedValue();
      if (v !== null) {
        p[widget.config.key] = v;
      }
    });
    return p;
  }

  /**
   * Saves the default config.
   */
  storeDefaults() {
    prefs.setUserPrefs(this.context, Object.assign(prefs.getUserPrefs(this.context), this.readWidgetValues()));
    prefs.setPagePrefs(this.context, this.page, {}); // remove page prefs, i.e. use defaults
    this.invalidatePrefs();
    this.widgets.forEach(widget => widget.update());
    context.document.showMessage('Saved default preferences.');
  }

  get defaultPrefs() {
    if (!this._defaultPrefs) {
      this._defaultPrefs = Object.assign({}, prefs.getDefaultPrefs(), prefs.getUserPrefs(this.context));
    }
    return this._defaultPrefs;
  }

  get pagePrefs() {
    if (!this._pagePrefs) {
      this._pagePrefs = prefs.getPagePrefs(this.context, this.page);
    }
    return this._pagePrefs;
  }

  invalidatePrefs() {
    this._pagePrefs = null;
    this._defaultPrefs = null;
  }
}


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

  let v = Number(val);
  if (isNaN(v)) {
    return null;
  }

  return v;
}


function displayValueForChar(val) {
  switch (val) {
    case '': return '(none)';
    case '_': return '(underscore)';
  }

  return val;
}
