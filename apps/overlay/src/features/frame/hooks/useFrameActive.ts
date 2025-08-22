import { useFrameStore } from "@/features/frame/hooks/useFrameStore";

export const useFrameActive = () => useFrameStore((state) => state.activeFrame);
