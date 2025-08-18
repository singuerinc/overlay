import { create } from "zustand";

type Store = {
  x: number | null;
  y: number | null;
  actions: {
    setPositionX: (x: number | null) => void;
    setPositionY: (y: number | null) => void;
  };
};

const useRulerStore = create<Store>((set) => ({
  x: null,
  y: null,
  actions: {
    setPositionX: (x: number | null) => set({ x }),
    setPositionY: (y: number | null) => set({ y }),
  },
}));

export const useRulerPositionX = () => useRulerStore((state) => state.x);
export const useRulerPositionY = () => useRulerStore((state) => state.y);

export const useRulerSetPositionX = () =>
  useRulerStore((state) => state.actions.setPositionX);
export const useRulerSetPositionY = () =>
  useRulerStore((state) => state.actions.setPositionY);
