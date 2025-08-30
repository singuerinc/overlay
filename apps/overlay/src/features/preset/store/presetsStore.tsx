import type { IPreset } from "@/features/preset/types";
import { createContext, useState } from "react";
import { createStore, type StoreApi } from "zustand";

export type PresetStore = {
  activePresetId: IPreset["id"];
};

export const PresetContext = createContext<StoreApi<PresetStore> | null>(null);

export function PresetContextProvider({
  activePresetId,
  children,
}: {
  activePresetId: IPreset["id"];
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<PresetStore>(() => ({
      activePresetId,
    }))
  );

  return (
    <PresetContext.Provider value={store}>{children}</PresetContext.Provider>
  );
}
