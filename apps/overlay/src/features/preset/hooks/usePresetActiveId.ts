import { usePresetStore } from "@/features/preset/hooks/usePresetStore";

export const usePresetActiveId = () =>
  usePresetStore((state) => state.activePresetId);
