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
  {
    label: 'Numbering: Row/column separator',
    key: 'rowColSeparator',
    onDisplayValueForPlaceholder: displayValueForChar,
    onParse: onParseString,
  },
  {
    label: 'Numbering: Number/title separator',
    key: 'numberTitleSeparator',
    onDisplayValueForPlaceholder: displayValueForChar,
    onParse: onParseString,
  }
];


export default function(context) {
  let page = context.document.currentPage();

  let defaultPrefs = {};
  let pagePrefs = {};
  let invalidatePrefs = () => {
    defaultPrefs = Object.assign({}, prefs.getDefaultPrefs(), prefs.getUserPrefs(context));
    pagePrefs = prefs.getPagePrefs(context, page);;
  };

  invalidatePrefs();

  let alert = NSAlert.alloc().init();

  // set up alert widgets
  let stackView = NSStackView.alloc().init();
  let widgets = WIDGET_CONFIGS.map(config => addPrefWidget(config));

  stackView.setSpacing(10);
  stackView.setOrientation(NSUserInterfaceLayoutOrientationVertical);
  stackView.setFrame(CGRectMake(0, 0, 200, 300));
  stackView.setAlignment(NSLayoutAttributeLeft);
  stackView.setTranslatesAutoresizingMaskIntoConstraints(true);
  stackView.updateConstraintsForSubtreeIfNeeded();
  alert.setAccessoryView(stackView);
  alert.window().setAutorecalculatesKeyViewLoop(true);
  alert.window().setInitialFirstResponder(widgets[0].fieldView);

  // set up alert basics
  alert.setMessageText(`Artboard Tricks Preferences for page '${page.name()}'`);
  alert.addButtonWithTitle('OK');
  alert.addButtonWithTitle('Cancel');
  delegate.setOnButtonClick(alert.addButtonWithTitle('Set Defaults'), () => {
    prefs.setUserPrefs(context, readWidgetValues());
    prefs.setPagePrefs(context, page, {}); // remove page prefs, i.e. use defaults
    invalidatePrefs();
    widgets.forEach(widget => widget.update());
    context.document.showMessage('Saved default preferences.');
  });

  if (alert.runModal() == NSAlertFirstButtonReturn) {
    prefs.setPagePrefs(context, page, readWidgetValues());
    context.document.showMessage('Saved preferences.');
  }

  function readWidgetValues() {
    let prefs = {};
    widgets.forEach(widget => {
      let v = widget.getStorableValue();
      if (v !== null) {
        prefs[widget.config.key] = v;
      }
    });
    return prefs;
  }

  // TODO: refactor
  function addPrefWidget(config) {
    let displayValueForPlaceholder = config.onDisplayValueForPlaceholder || (s => s);

    let fieldView = NSTextField.alloc().initWithFrame(CGRectMake(0, 0, 200, 25));

    let labelView = NSTextField.labelWithString(config.label);
    labelView.setFont(NSFont.labelFontOfSize(11));

    stackView.addView_inGravity_(labelView, NSStackViewGravityTop);
    stackView.addView_inGravity_(fieldView, NSStackViewGravityTop);

    let updateFieldView = () => {
      fieldView.cell().setPlaceholderString(String(displayValueForPlaceholder(defaultPrefs[config.key])));
      fieldView.setStringValue(String(pagePrefs[config.key] || ''));  
    };

    updateFieldView();

    return {
      config,
      fieldView,
      getStorableValue: () => {
        let v = String(fieldView.stringValue());
        return config.onParse ? config.onParse(v) : v;
      },
      update: () => updateFieldView(),
    };
  }
}


function onParseString(val) {
  if (val === '') {
    return null;
  }

  return val;
}


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
