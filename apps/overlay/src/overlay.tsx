import { KeyboardObserver } from "@/features/keyboard/KeyboardObserver";
import { Workspace } from "@/features/workspace/Workspace";
import { DocumentObserver } from "@/ui/DocumentObserver";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import "./index.css";

const queryClient = new QueryClient();

export function Overlay() {
  useEffect(() => {
    const hasAnchorEl = document.querySelector(".overlay-anchor") !== null;
    if (!hasAnchorEl) {
      document.body.classList.add("overlay-anchor");
    }
    return () => {
      document.body.classList.remove("overlay-anchor");
    };
  }, []);

  return (
    <div id="overlay-app" className="o:pointer-events-none o:z-[99999]">
      <QueryClientProvider client={queryClient}>
        <DocumentObserver />
        <KeyboardObserver />
        <Workspace />
      </QueryClientProvider>
    </div>
  );
}
