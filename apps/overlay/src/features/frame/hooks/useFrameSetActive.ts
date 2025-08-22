import { useFrameStore } from "@/features/frame/hooks/useFrameStore";

export const useFrameSetActive = () =>
  useFrameStore((state) => state.actions.setActiveFrame);
