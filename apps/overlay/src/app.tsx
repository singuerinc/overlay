import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { GuidelinesRoot } from "./tools/guideline/GuidelinesRoot";
import { GuidelineTool } from "./tools/guideline/GuidelineTool";
import { Tools } from "./tools/Tools";

const queryClient = new QueryClient();

const root = createRoot(document.body);
root.render(
  <div className="h-screen w-screen">
    <QueryClientProvider client={queryClient}>
      <Tools>
        <GuidelineTool />
      </Tools>
      <GuidelinesRoot />
    </QueryClientProvider>
  </div>
);
