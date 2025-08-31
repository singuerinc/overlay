import { ColumnsColor } from "@/features/columns/ColumnsColor";
import { useColumnsColorCommand } from "@/features/columns/commands/useColumnsColorCommand";
import { useColumnsSetGapCommand } from "@/features/columns/commands/useColumnsSetGapCommand";
import { useColumnsSetNumCommand } from "@/features/columns/commands/useColumnsSetNumCommand";
import { useColumnsSetOpacityCommand } from "@/features/columns/commands/useColumnsSetOpacityCommand";
import { useColumnsSetSizeCommand } from "@/features/columns/commands/useColumnsSetSizeCommand";
import { useColumnsToggleCommand } from "@/features/columns/commands/useColumnsToggleCommand";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import type { IColumns } from "@/features/columns/types";

export function useColumns() {
  const { data: columns } = useColumnsQuery();

  const sizeCmd = useColumnsSetSizeCommand();
  const opacityCmd = useColumnsSetOpacityCommand();
  const numColsCmd = useColumnsSetNumCommand();
  const gapCmd = useColumnsSetGapCommand();
  const colorCmd = useColumnsColorCommand();
  const visibilityCmd = useColumnsToggleCommand();

  return {
    toggleVisibility: () => {
      if (columns) {
        visibilityCmd.execute(!columns?.visible);
      }
    },
    setSize: (size: IColumns["size"]) => {
      sizeCmd.execute(size);
    },
    setOpacity: (opacity: IColumns["opacity"]) => {
      opacityCmd.execute(opacity);
    },
    addOneCol: () => {
      if (columns) {
        numColsCmd.execute(columns.numColumns + 1);
      }
    },
    removeOneCol: () => {
      if (columns) {
        numColsCmd.execute(columns.numColumns - 1);
      }
    },
    setNumCols: (numColumns: IColumns["numColumns"]) => {
      numColsCmd.execute(numColumns);
    },
    increaseGap: (amount: number = 1) => {
      if (columns) {
        gapCmd.execute(columns.gap + amount);
      }
    },
    decreaseGap: (amount: number = 1) => {
      if (columns) {
        gapCmd.execute(columns.gap - amount);
      }
    },
    setGap: (gap: IColumns["gap"]) => {
      gapCmd.execute(gap);
    },
    cycleColor: () => {
      if (columns) {
        const newColor =
          ColumnsColor[
            (ColumnsColor.indexOf(columns.color) + 1) % ColumnsColor.length
          ];

        colorCmd.execute(columns, newColor);
      }
    },
  };
}
