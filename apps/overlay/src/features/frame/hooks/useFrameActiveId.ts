import { useFrameStore } from "@/features/frame/hooks/useFrameStore";

export const useFrameActiveId = () => useFrameStore((state) => state.activeId);
