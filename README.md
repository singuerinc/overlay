# Overlay

Overlay is a set of tools for developers and designers to measure, align and overlay on-screen graphics and layouts. Similar to [xScope](https://xscopeapp.com/) but with a simple interface, limited functionality and open source.

[Download](https://github.com/singuerinc/overlay/releases) (Mac only)

## Goals

- Minimal interface
- Simple to use
- Extensible via plugins (not implemented)
- Free always

## Toolbox

![](resources/images/toolbox.png)

From the toolbox you can manage add tools, display the help page and show or hide all the items in the screen.

### Guide

Horizontal and vertical guides are useful when you need to align several items in the same axis.

![](resources/images/guides.png)

### Ruler

Rulers are great to measure objects, they are semi-transparent, in different colors, and can be cloned.

![](resources/images/rulers.png)

### Onion image

The onion image serve as a visual guide to match a layout. Opacity and inverted colors can be applied.

![](resources/images/inverted-only.png)

![](resources/images/inverted-browser.png)

### Grid

The grid is similar to the ruler but covers the whole screen. It is a 10x10 pixels fixed grid but that value can be defined in the settings.

![](resources/images/grid.png)

### Columns

In progress. Not ready yet.

## Keyboard shortcuts

## Known issues

1. There is a bug in Electron (you cannot click through the transparent background) that renders the application a bit annoying, since we need to cover the whole screen, anytime you click on any point, the application gains focus.

> We are working on addressing this issue by creating several windows for each tool.