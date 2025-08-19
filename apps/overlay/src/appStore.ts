import { create } from "zustand";

type State = {
  activeFrameId: string;
  actions: {
    setActiveFrameId: (frame: string) => void;
  };
};

const useAppStore = create<State>()((set) => ({
  activeFrameId: "frame-1",
  actions: {
    setActiveFrameId: (frameId: string) => set({ activeFrameId: frameId }),
  },
}));

export const useActiveFrameId = () =>
  useAppStore((state) => state.activeFrameId);

export const useSetActiveFrameId = () =>
  useAppStore((state) => state.actions.setActiveFrameId);
