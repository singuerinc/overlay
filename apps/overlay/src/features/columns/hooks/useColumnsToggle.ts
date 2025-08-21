import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { useColumnsToggleCommand } from "@/features/columns/store/useColumnsToggleCommand";

export function useColumnsToggle() {
  const { data: columns } = useColumnsQuery();
  const command = useColumnsToggleCommand();

  return {
    toggle: () => {
      if (columns) {
        command.execute(!columns?.visible);
      }
    },
  };
}
