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
  <div className="h-screen w-screen pointer-events-none">
    <QueryClientProvider client={queryClient}>
      <ToolBar>
        <div className="flex gap-x-2">
          <Undo />
          <GuidelinesToolbar />
        </div>
      </ToolBar>
      <DocumentObserver />
      <GuidelinesRoot />
    </QueryClientProvider>
  </div>
);
