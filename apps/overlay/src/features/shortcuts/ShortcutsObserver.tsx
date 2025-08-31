import { useColumns } from "@/features/columns/hooks/useColumns";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCrosshair } from "@/features/crosshair/hooks/useCrosshair";
import { useGrid } from "@/features/grid/hooks/useGrid";
import { useRuler } from "@/features/rulers/hooks/useRuler";
import { useHotkeys } from "react-hotkeys-hook";

export const ShortcutsObserver: React.FC = () => {
  const { undo } = useCommands();
  const { toggle: toggleGrid } = useGrid();
  const { toggle: toggleRuler } = useRuler();
  const { toggleVisibility: toggleColumns } = useColumns();
  const { toggle: toggleCrosshair } = useCrosshair();

  useHotkeys(["mod+z"], undo, { preventDefault: true });
  useHotkeys(["o>c"], toggleColumns, { preventDefault: true });
  useHotkeys(["o>x"], toggleCrosshair, { preventDefault: true });
  useHotkeys(["o>g"], toggleGrid, { preventDefault: true });
  useHotkeys(["o>r"], toggleRuler, { preventDefault: true });

  return null;
};
