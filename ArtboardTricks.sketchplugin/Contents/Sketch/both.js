
@import 'add_number_identifiers_to_artboards.cocoascript'
@import 'rearrange_artboards_into_grid.cocoascript'
var onRun = function(context) {
  rearrangeArtboardsIntoGrid(context);
  prependNumbersToArtboards(context);
};