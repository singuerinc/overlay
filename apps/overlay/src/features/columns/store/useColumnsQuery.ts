import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
import { createColumns } from "@/features/columns/store/createColumns";
import type { IColumnsStore } from "@/features/columns/types";
import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { useQuery } from "@tanstack/react-query";

function getColumns(frameId: string): Promise<IColumnsStore> {
  return new Promise((resolve) => {
    const maybeColumns = localStorage.getItem(
      COLUMNS_KEYS.verticalColumns(frameId).join("-")
    );

    if (maybeColumns === null) {
      const columns = createColumns();
      localStorage.setItem(
        COLUMNS_KEYS.verticalColumns(frameId).join("-"),
        JSON.stringify(columns)
      );
      resolve(columns);
    } else {
      resolve(JSON.parse(maybeColumns));
    }
  });
}

export function useColumnsQuery() {
  const frameId = useFrameActiveId();
  return useQuery({
    queryKey: COLUMNS_KEYS.verticalColumns(frameId),
    queryFn: () => getColumns(frameId),
  });
}
