
@import 'add_number_identifiers_to_artboards.js'
@import 'rearrange_artboards_into_grid.js'
var onRun = function(context) {
  rearrangeArtboardsIntoGrid(context);
  prependNumbersToArtboards(context);
};