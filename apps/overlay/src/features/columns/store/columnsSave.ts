import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
import type { IColumnsStore } from "@/features/columns/types";

export async function columnsSave(presetId: string, columns: IColumnsStore) {
  localStorage.setItem(
    COLUMNS_KEYS.verticalColumns(presetId).join("-"),
    JSON.stringify(columns)
  );
}
