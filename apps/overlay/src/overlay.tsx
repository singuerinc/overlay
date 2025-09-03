import { KeyboardObserver } from "@/features/keyboard/KeyboardObserver";
import { Workspace } from "@/features/workspace/Workspace";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import "./index.css";

const queryClient = new QueryClient();

export function Overlay({ anchorSelector }: { anchorSelector?: string }) {
  useEffect(() => {
    const anchorEl = anchorSelector
      ? (document.querySelector(anchorSelector) ?? document.body)
      : document.body;

    anchorEl.classList.add("overlay-anchor");
    return () => {
      anchorEl.classList.remove("overlay-anchor");
    };
  }, [anchorSelector]);

  return (
    <div id="overlay-app" className="o:pointer-events-none o:z-[99999]">
      <QueryClientProvider client={queryClient}>
        <KeyboardObserver />
        <Workspace />
      </QueryClientProvider>
    </div>
  );
}
