import { Overlay } from "@singuerinc/overlay";
import "@singuerinc/overlay/overlay.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Overlay anchorSelector="main" />
  </StrictMode>
);
