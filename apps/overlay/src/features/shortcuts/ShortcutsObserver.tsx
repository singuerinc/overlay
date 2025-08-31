import { useColumns } from "@/features/columns/hooks/useColumns";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCrosshairToggle } from "@/features/crosshair/hooks/useCrosshairToggle";
import { useGridToggle } from "@/features/grid/hooks/useGridToggle";
import { useRulerToggle } from "@/features/rulers/hooks/useRulerToggle";
import { useHotkeys } from "react-hotkeys-hook";

export const ShortcutsObserver: React.FC = () => {
  const { undo } = useCommands();
  const { toggle: toggleGrid } = useGridToggle();
  const { toggle: toggleRuler } = useRulerToggle();
  const { toggleVisibility: toggleColumns } = useColumns();
  const { toggle: toggleCrosshair } = useCrosshairToggle();

  useHotkeys(["mod+z"], undo, { preventDefault: true });
  useHotkeys(["o>c"], toggleColumns, { preventDefault: true });
  useHotkeys(["o>x"], toggleCrosshair, { preventDefault: true });
  useHotkeys(["o>g"], toggleGrid, { preventDefault: true });
  useHotkeys(["o>r"], toggleRuler, { preventDefault: true });

  return null;
};
