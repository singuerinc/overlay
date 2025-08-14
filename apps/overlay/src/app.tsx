import { createRoot } from "react-dom/client";
import { GuidelinesRoot } from "./tools/guideline/GuidelinesRoot";

const root = createRoot(document.body);
root.render(
  <div className="h-screen w-screen">
    <GuidelinesRoot />
  </div>
);
