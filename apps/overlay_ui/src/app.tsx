import { Crosshair } from "@/features/crosshair/Crosshair";
import { CrosshairToolbar } from "@/features/crosshair/toolbar/CrosshairToolbar";
import { KeyboardObserver } from "@/features/keyboard/KeyboardObserver";
import { RulersRoot } from "@/features/rulers/RulersRoot";
import { CenterOriginRulerButton } from "@/features/rulers/toolbar/CenterOriginRulerButton";
import { ToggleRulerButton } from "@/features/rulers/toolbar/ToggleRulerButton";
import { ToolSelectedToolBar } from "@/features/toolbar/ToolSelectedToolBar";
import { DocumentObserver } from "@/ui/DocumentObserver";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { GuidelinesRoot } from "./features/guideline/GuidelinesRoot";
import { GuidelinesToolbar } from "./features/guideline/toolbar/GuidelinesToolbar";
import { ToolBar } from "./features/toolbar/ToolBar";
import { Undo } from "./features/undo/toolbar/Undo";

const queryClient = new QueryClient();

export function App() {
  return (
    <div className="h-screen w-screen pointer-events-none relative">
      <QueryClientProvider client={queryClient}>
        <ToolBar initX={20} initY={20}>
          <Undo />
          <ToggleRulerButton />
          <GuidelinesToolbar />
          <CrosshairToolbar />
          <CenterOriginRulerButton />
        </ToolBar>
        <ToolSelectedToolBar />
        <DocumentObserver />
        <KeyboardObserver />
        <GuidelinesRoot />
        <RulersRoot />
        <Crosshair />
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}
