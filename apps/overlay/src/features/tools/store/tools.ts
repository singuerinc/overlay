import { create } from "zustand";
import type { ITool } from "../ITool";

type Store = {
  selectedTool: ITool | null;
  actions: {
    setSelectedTool: (tool: ITool) => void;
  };
};

const useToolsStore = create<Store>((set) => ({
  selectedTool: null,
  actions: {
    setSelectedTool: (tool: ITool) => set({ selectedTool: tool }),
  },
}));

export const useSelectedTool = <T extends ITool>() =>
  useToolsStore((state) => state.selectedTool as T);

export const useSetSelectedTool = () =>
  useToolsStore((state) => state.actions.setSelectedTool);
