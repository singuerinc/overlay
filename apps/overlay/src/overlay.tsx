import { CommandMenu } from "@/features/command-menu/components/CommandMenu";
import { Frame } from "@/features/frame/Frame";
import { KeyboardObserver } from "@/features/keyboard/KeyboardObserver";
import { ShortcutsObserver } from "@/features/shortcuts/ShortcutsObserver";
import { DocumentObserver } from "@/ui/DocumentObserver";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "sonner";
import "./index.css";

const queryClient = new QueryClient();

export function Overlay() {
  useEffect(() => {
    document.body.classList.add("overlay-anchor");
    return () => {
      document.body.classList.remove("overlay-anchor");
    };
  }, []);

  return (
    <div id="overlay-app" className="pointer-events-none">
      <QueryClientProvider client={queryClient}>
        <DocumentObserver />
        <KeyboardObserver />
        <ShortcutsObserver />
        <CommandMenu />
        <Frame
          frame={{
            id: "frame-1",
          }}
        />
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}
