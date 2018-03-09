# Artboard Tricks plugin for Sketch

Contains a set of artboard tricks for Sketch. See below for more.

# Installation

You can install the plugin with Sketch Runner.

<a href="http://bit.ly/SketchRunnerWebsite">
  <img src="http://bit.ly/RunnerBadgeBlue" width="160">
</a>

Alternatively, just download the latest [release](https://github.com/romannurik/Sketch-FlowExporter/releases) and double-click the `.sketchplugin` file to install.

# The Commands

## Rearrange Artboards Into Grid

Automatically rearranges your artboards into rows containing an arbitrary number of columns.
This is useful for organizing your artboards into distinct "flows", where each row corresponds to a flow.

![Demo Screencap](https://raw.githubusercontent.com/romannurik/Sketch-ArtboardTricks/master/art/rearrange.gif)

Rows are 400px apart and columns are 100px apart by default (configurable per page).

The command also re-orders the list of artboards in the sidenav according to its position. 

Note that the arrangement is based on the current position of each artboard.

## Prefix Artboard Names With Numbers

Prefixes each artboard in your page with a number such as 102, 300, 517, etc. based on X and Y position.
This is designed to be used with the "Rearrange Artboards Into Grid" command. The first digit is the row,
the second 2 digits are the column, like so:

```
100 101 102
200 201
300 301 302 303 304
```

## Select Artboards Containing Selection

Selects the artboard(s) that contain your selection. Useful if you want to select multiple artboards quickly
(click and drag to select a bunch of layers, then run this script to select the container artboards).
