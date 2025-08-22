import { useFrameStore } from "@/features/frame/hooks/useFrameStore";

export const useFrameSetActiveId = () =>
  useFrameStore((state) => state.actions.setActiveId);
