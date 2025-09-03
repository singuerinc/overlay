export function App() {
  return (
    <main className="w-full gap-12 flex flex-col max-w-6xl min-h-screen mx-auto font-sans text-neutral-800">
      <section className="flex gap-2 flex-col justify-center w-full pt-12 grow-0">
        <h1 className="text-6xl self-center relative font-extrabold">
          Overlay 2
          <span className="text-xl absolute -rotate-6 font-normal px-2 bg-amber-300">
            alpha
          </span>
        </h1>
        <h2 className="self-center text-3xl">
          Pixel-perfect precision, right in your browser.
        </h2>
        <h3 className="self-center text-xl font-semibold">
          Measure, align, and compare without leaving your site while
          developing.
        </h3>
      </section>
      <section className="flex-1 flex justify-center grow-0">
        <pre className="bg-neutral-100 py-2 px-4 rounded-xs">
          pnpm install @singuerinc/overlay
        </pre>
      </section>
      <section className="grow-0">
        <h2 className="mx-24 text-4xl mb-6">Features</h2>
        <ul className="grid grid-cols-10 gap-4 mx-24">
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Guidelines</h3>
            <p>Add and move guides to snap and align elements easily.</p>
          </li>
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Crosshair</h3>
            <p>
              Pinpoint exact coordinates anywhere on the screen and measure
              distances between elements to validate spacing.
            </p>
          </li>
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Frames</h3>
            <p>Define and measure a specific region or element visually.</p>
          </li>
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Rules</h3>
            <p>
              Give you coordinates and reference points across the entire
              canvas.
            </p>
          </li>
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Grid</h3>
            <p>
              Customizable patterns, colors, and spacing for perfect alignment.
            </p>
          </li>
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Columns</h3>
            <p>
              Quickly validate responsive layouts with flexible column overlays.
            </p>
          </li>
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Onion Image</h3>
            <p>
              Overlay designs on top of live builds with adjustable
              transparency.
            </p>
          </li>
          <li className="col-span-10 md:col-span-5">
            <h3 className="text-2xl mb-3 text-red-600">Presets</h3>
            <p>
              Save, switch, import, and export complete overlay setups in one
              click.
            </p>
          </li>
        </ul>
      </section>
      <section className="grow"></section>
    </main>
  );
}

export function ExampleSetup() {
  return (
    <>
      <pre className="rounded-md bg-slate-300 p-12 mx-24">
        npm install @singuerinc/overlay
      </pre>
      <pre className="rounded-md bg-slate-300 p-12 mx-24">
        {/* import { Overlay } from "@singuerinc/overlay"; */}
        {/* import "@singuerinc/overlay/overlay.css"; */}
        {/* <Overlay /> */};
      </pre>
    </>
  );
}
