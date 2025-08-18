import { create } from "zustand";

type Store = {
  x: number | null;
  y: number | null;
  actions: {
    setPosition: (x: number | null, y: number | null) => void;
    setPositionX: (x: number | null) => void;
    setPositionY: (y: number | null) => void;
  };
};

const useRulerStore = create<Store>((set) => ({
  x: null,
  y: null,
  actions: {
    setPosition: (x: number | null, y: number | null) => set({ x, y }),
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

export const useRulerSetPosition = () =>
  useRulerStore((state) => state.actions.setPosition);
