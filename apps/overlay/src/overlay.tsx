import { useAnchor } from "@/features/anchor/hooks/useAnchor";
import { KeyboardObserver } from "@/features/keyboard/KeyboardObserver";
import { Workspace } from "@/features/workspace/Workspace";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

export function Overlay({ anchorSelector }: { anchorSelector?: string }) {
  useAnchor({ anchorSelector });

  return (
    <div id="overlay-app" className="o:pointer-events-none o:z-[99999]">
      <QueryClientProvider client={queryClient}>
        <KeyboardObserver />
        <Workspace />
      </QueryClientProvider>
    </div>
  );
}
