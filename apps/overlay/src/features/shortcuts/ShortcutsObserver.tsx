import { useColumnsToggle } from "@/features/columns/hooks/useColumnsToggle";
import { useUndo } from "@/features/commands/hooks/useUndo";
import { useCrosshairToggle } from "@/features/crosshair/hooks/useCrosshairToggle";
import { useGridToggle } from "@/features/grid/hooks/useGridToggle";
import { useRulerToggle } from "@/features/rulers/hooks/useRulerToggle";
import { useHotkeys } from "react-hotkeys-hook";

export const ShortcutsObserver: React.FC = () => {
  const undo = useUndo();
  const { toggle: toggleGrid } = useGridToggle();
  const { toggle: toggleRuler } = useRulerToggle();
  const { toggle: toggleColumns } = useColumnsToggle();
  const { toggle: toggleCrosshair } = useCrosshairToggle();

  useHotkeys(["mod+z"], undo, { preventDefault: true });
  useHotkeys(["o>c"], toggleColumns, { preventDefault: true });
  useHotkeys(["o>x"], toggleCrosshair, { preventDefault: true });
  useHotkeys(["o>g"], toggleGrid, { preventDefault: true });
  useHotkeys(["o>r"], toggleRuler, { preventDefault: true });

  return null;
};
