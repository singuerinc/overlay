import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { useColumnsSetNumCommand } from "@/features/columns/store/useColumnsSetNumCommand";

export function useColumnsSetNum() {
  const { data: columns } = useColumnsQuery();
  const setNumColumns = useColumnsSetNumCommand();

  return {
    addColumn: () => {
      if (columns) {
        setNumColumns.execute(columns.numColumns + 1);
      }
    },
    removeColumn: () => {
      if (columns) {
        setNumColumns.execute(columns.numColumns - 1);
      }
    },
    setNumColumns: (numColumns: number) => {
      setNumColumns.execute(numColumns);
    },
  };
}
