# Artboard Tricks plugin for Sketch
[![Download from Sketchpacks.com](https://badges.sketchpacks.com/plugins/net.nurik.roman.sketch.artboardtricks/version.svg)](https://api.sketchpacks.com/v1/plugins/net.nurik.roman.sketch.artboardtricks/download) [![Compatible Sketch Version](https://badges.sketchpacks.com/plugins/net.nurik.roman.sketch.artboardtricks/compatibility.svg)](https://sketchpacks.com/romannurik/Sketch-ArtboardTricks)

Contains a set of artboard tricks for Sketch. See below for more.

# Installation

Drop the .sketchplugin folder into your Sketch plugins folder (**Plugins > Reveal Plugins Folder** to find it).

# The Commands

## Select Artboards Containing Selection

Selects the artboard(s) that contain your selection. Useful if you want to select multiple artboards quickly
(click and drag to select a bunch of layers, then run this script to select the container artboards).

## Rearrange Artboards Into Grid

Automatically rearranges your artboards into rows containing an arbitrary number of columns.
This is useful for organizing your artboards into distinct "flows", where each row corresponds to a flow.

![Demo Screencap](https://raw.githubusercontent.com/romannurik/Sketch-ArtboardTricks/master/art/rearrange.gif)

Rows are 400px apart and columns are 100px apart (might be configurable in the future).

The command also re-orders the list of artboards in the sidenav according to its position. 

Note that there are no current configuration options, everything is automatic. The arrangement is based on
the current position of each artboard.

## Prefix Artboard Names With Numbers

Prefixes each artboard in your page with a number such as 01.02, 03.00, 05.17, etc. based on X and Y position.

This is designed to be used with the "Rearrange Artboards Into Grid" command. The first two digit are the row, the second 2 digits are the column, like so:

```
00.00 00.01 00.02

01.00 01.01 00.02

02.00 02.01 00.02
```

## Magic

With these command you can trigger both 'Rearrange Artboards Into Grid' and 'Prefix Artboard Names With Numers' in one single shortcut with '⌘ + <'