// Common functionality across related commands

import * as util from './sketch-util';


const COL_LENGTH = 2; // # of digits for the column


/**
 * Returns an array of all the artboards to target for grid operations
 * (e.g. re-number, rearrange, etc)
 */
export function collectTargetArtboards(context) {
  if (context.selection.count()) {
    // if there's an active selection inside an artboard, consider
    // the artboards containing the selection the target
    let selectedArtboards = util.arrayFromNSArray(context.selection)
        .map(layer => util.getContainingArtboard(layer))
        .filter(layer => !!layer);
    if (selectedArtboards.length >= 2) {
      return selectedArtboards;
    }
  }

  // otherwise, all artboards on the page
  return util.arrayFromNSArray(context.document.currentPage().artboards());
}


/**
 * Generates artboard metadata (primarily the object and frame)
 */
export function generateArtboardMetas(artboards) {
  return artboards.map(artboard => {
    let frame = artboard.frame();
    return {
      artboard,
      l: Number(frame.minX()),
      t: Number(frame.minY()),
      r: Number(frame.maxX()),
      b: Number(frame.maxY())
    };
  });
}


/**
 * Parses the given artboard name based on the given resolved preferences.
 */
export function parseCurrentArtboardName(fullName, resolvedPrefs) {
  let {numberTitleSeparator} = resolvedPrefs;
  let path = fullName.substring(0, fullName.lastIndexOf('/') + 1);
  let currentName = fullName.slice(path.length);
  let [_, rowCol, subCol, baseName] = currentName.match(new RegExp(
      '^(?:(\\d+)(?:\.(\\d+))?)?' + // row/col/subcol
      '(?:' + escapeRegExp(numberTitleSeparator) + ')?' + // separator
      '(.+?)?$')); // basename

  subCol = Number(subCol || 0);
  let row = 0;
  let col = -1;
  if (rowCol) {
    row = Number(rowCol.slice(0, -COL_LENGTH));
    col = Number(rowCol.slice(-COL_LENGTH));
  }

  return {path, row, col, subCol, baseName};
}

/**
 * Creates a new artboard name based on the given pieces and resolved preferences.
 */
export function composeArtboardName(parts, resolvedPrefs, {numRows = 1} = {}) {
  let {numberTitleSeparator} = resolvedPrefs;
  let {path, row, col, subCol, baseName} = parts;

  let name = path || '';

  // create prefix (e.g. "301" and "415.4" with subflows)
  let hasNumber = row && (col >= 0);
  if (hasNumber) {
    name += zeropad(row, numRows >= 10 ? 2 : 1)
        // + String(rowColSeparator)
        + zeropad(col, COL_LENGTH)
        + (subCol ? ('.' + String(subCol)) : '');
  }

  if (baseName) {
    name += (hasNumber ? numberTitleSeparator : '') + baseName;
  }

  return name;
}


/**
 * Left-pads the given string with zeros to the given length.
 */
function zeropad(s, length = 1) {
  s = String(s) || '';
  while (s.length < length) {
    s = '0' + s;
  }
  return s;
}


/**
 * Escape a string for use in a regex
 * From https://stackoverflow.com/a/6969486/102703
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}