# Overlay

Essential tools to measure, align, and compare with pixel-perfect.

## Features

### Grid

- Rulers – Measure with precision, just like in professional design tools.
- Grid – Customizable patterns, colors, and spacing for perfect alignment.
- Columns – Quickly validate responsive layouts with flexible column overlays.
- Onion Image – Overlay designs on top of live builds with adjustable transparency.
- Notes – Leave comments and reminders directly on the workspace.
- Crosshair – Pinpoint exact coordinates anywhere on the screen.
  - Measure distances between elements to validate spacing.

![images/tool-crosshair.png]()

- Guidelines – Add and move guides to snap and align elements easily.
- Presets – Save, switch, import, and export complete overlay setups in one click.

## Install

```sh
pnpm add @singuerinc/overlay
# or with npm
npm install @singuerinc/overlay
```

## Setup

```tsx
// import Overlay
import { Overlay } from "@singuerinc/overlay";
// import Overlay styles
import "@singuerinc/overlay/overlay.css";

// place Overlay anywhere inside the body
<body>
    <!-- app -->
    <Overlay />
</body>
```
