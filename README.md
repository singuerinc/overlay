# Overlay

Essential tools to measure, align, and compare with pixel-perfect.

## Install

```sh
npm install @singuerinc/overlay
```

## Setup

```tsx
// import Overlay
import { Overlay } from "@singuerinc/overlay";
// import Overlay styles
import "@singuerinc/overlay/overlay.css";

// place Overlay anywhere within your React app
<App>
  <Overlay />
</App>;
```

### Container

By default, Overlay will match the `document.body` size, but you can override this behavior by passing the `anchorSelector` option.

```tsx
// somewhere in the app
<main className="container">...</main>

<Overlay anchorSelector=".container" />
```

## Features

### Guidelines

Add and move guides to snap and align elements easily.

### Crosshair

Pinpoint exact coordinates anywhere on the screen and measure distances between elements to validate spacing.

### Rules and Frames

Measure with precision, just like in professional design tools.

### Grid

Customizable patterns, colors, and spacing for perfect alignment.

### Columns

Quickly validate responsive layouts with flexible column overlays.

### Onion Image

Overlay designs on top of live builds with adjustable transparency.

### Presets

Save, switch, import, and export complete overlay setups in one click.
