import { CrosshairRoot } from "@/features/crosshair/CrosshairRoot";
import { CrosshairToolbar } from "@/features/crosshair/toolbar/CrosshairToolbar";
import { KeyboardObserver } from "@/features/keyboard/KeyboardObserver";
import { ToolSelectedToolBar } from "@/features/toolbar/ToolSelectedToolBar";
import { DocumentObserver } from "@/ui/DocumentObserver";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { GuidelinesRoot } from "./features/guideline/GuidelinesRoot";
import { GuidelinesToolbar } from "./features/guideline/toolbar/GuidelinesToolbar";
import { ToolBar } from "./features/toolbar/ToolBar";
import { Undo } from "./features/undo/toolbar/Undo";

const queryClient = new QueryClient();

const root = createRoot(document.body);
root.render(
  <div className="h-screen w-screen pointer-events-none relative">
    <QueryClientProvider client={queryClient}>
      <ToolBar initX={20} initY={20}>
        <Undo />
        <GuidelinesToolbar />
        <CrosshairToolbar />
      </ToolBar>
      <ToolSelectedToolBar />
      <DocumentObserver />
      <KeyboardObserver />
      <GuidelinesRoot />
      <CrosshairRoot />
    </QueryClientProvider>
  </div>
);
