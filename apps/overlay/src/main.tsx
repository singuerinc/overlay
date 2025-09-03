import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Overlay } from "./overlay";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Overlay /> */}
    <Overlay anchorSelector=".my-anchor" />
  </StrictMode>
);
