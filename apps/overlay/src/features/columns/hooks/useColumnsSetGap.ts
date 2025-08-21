import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { useColumnsSetGapCommand } from "@/features/columns/store/useColumnsSetGapCommand";

export function useColumnsSetGap() {
  const { data: columns } = useColumnsQuery();
  const cmd = useColumnsSetGapCommand();

  return {
    increase: (amount: number = 1) => {
      if (columns) {
        cmd.execute(columns.gap + amount);
      }
    },
    decrease: (amount: number = 1) => {
      if (columns) {
        cmd.execute(columns.gap - amount);
      }
    },
    set: (gap: number) => {
      cmd.execute(gap);
    },
  };
}
