// Common functionality across related commands

import * as util from './sketch-util';


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
    if (selectedArtboards.length) {
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
