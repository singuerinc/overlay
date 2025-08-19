import { Frame } from "@/features/frame/Frame";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./index.css";

const queryClient = new QueryClient();

export function Overlay() {
  return (
    <div className="h-screen w-screen pointer-events-none overflow-hidden top-0 left-0 absolute">
      <QueryClientProvider client={queryClient}>
        {/* <DocumentObserver /> */}
        {/* <KeyboardObserver /> */}
        <Frame
          frame={{
            id: "frame-1",
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        />
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}
