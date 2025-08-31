# Overlay

## Install from NPM

```
pnpm add @singuerinc/overlay
# or with npm
npm install @singuerinc/overlay
```

## Setup Overlay

```tsx
// import Overlay
import { Overlay } from "@singuerinc/overlay";
// import Overlay styles
import "@singuerinc/overlay/overlay.css";

// place Overlay anywhere inside the body
<body>
    <!-- your app -->
    <Overlay />
</body>
```

## Next.js

Wrap `<Overlay />` in a client component

```tsx
// overlay-wrapper.tsx
"use client";
import { Overlay } from "@singuerinc/overlay";
import "@singuerinc/overlay/overlay.css";

export function OverlayWrapper() {
  return <Overlay />;
}

// somewhere
<OverlayWrapper />;
```
