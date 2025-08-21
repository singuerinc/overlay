import { useGetColumnsQuery } from "@/features/columns/store/useGetColumnsQuery";
import { useSetNumColumnsCommand } from "@/features/columns/store/useSetNumColumnsCommand";

export function useColumnsSetNum() {
  const { data: columns } = useGetColumnsQuery();
  const setNumColumns = useSetNumColumnsCommand();

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
