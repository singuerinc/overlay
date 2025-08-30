import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
import { createColumns } from "@/features/columns/store/createColumns";
import type { IColumnsStore } from "@/features/columns/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";

function getColumns(presetId: IPreset["id"]): Promise<IColumnsStore> {
  return new Promise((resolve) => {
    const maybeColumns = localStorage.getItem(
      COLUMNS_KEYS.verticalColumns(presetId).join("-")
    );

    if (maybeColumns === null) {
      const columns = createColumns({ size: "1200px" });
      localStorage.setItem(
        COLUMNS_KEYS.verticalColumns(presetId).join("-"),
        JSON.stringify(columns)
      );
      resolve(columns);
    } else {
      resolve(JSON.parse(maybeColumns));
    }
  });
}

export function useColumnsQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: COLUMNS_KEYS.verticalColumns(presetId),
    queryFn: () => getColumns(presetId),
  });
}
