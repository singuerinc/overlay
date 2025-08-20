import { useGetColumnsQuery } from "@/features/columns/store/useGetColumnsQuery";
import { useToggleColumnsCommand } from "@/features/columns/store/useToggleColumnsCommand";

export function useToggleColumns() {
  const { data: columns } = useGetColumnsQuery();
  const command = useToggleColumnsCommand();

  return {
    toggle: () => {
      if (columns) {
        command.execute(!columns?.visible);
      }
    },
  };
}
