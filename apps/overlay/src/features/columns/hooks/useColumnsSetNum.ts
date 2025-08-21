import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { useColumnsSetNumCommand } from "@/features/columns/store/useColumnsSetNumCommand";

export function useColumnsSetNum() {
  const { data: columns } = useColumnsQuery();
  const setNumColumns = useColumnsSetNumCommand();

  return {
    addOne: () => {
      if (columns) {
        setNumColumns.execute(columns.numColumns + 1);
      }
    },
    removeOne: () => {
      if (columns) {
        setNumColumns.execute(columns.numColumns - 1);
      }
    },
    set: (numColumns: number) => {
      setNumColumns.execute(numColumns);
    },
  };
}
