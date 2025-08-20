import { Frame } from "@/features/frame/Frame";
import { KeyboardObserver } from "@/features/keyboard/KeyboardObserver";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useWindowSize } from "usehooks-ts";
import "./index.css";

const queryClient = new QueryClient();

export function Overlay() {
  const windowSize = useWindowSize();
  return (
    <div className="h-screen w-screen pointer-events-none overflow-hidden top-0 left-0 absolute">
      <QueryClientProvider client={queryClient}>
        {/* <DocumentObserver /> */}
        <KeyboardObserver />
        <Frame
          frame={{
            id: "frame-1",
            x: 0,
            y: 0,
            width: windowSize.width,
            height: windowSize.height,
          }}
        />
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}
