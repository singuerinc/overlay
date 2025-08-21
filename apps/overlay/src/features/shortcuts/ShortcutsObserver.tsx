import { useUndo } from "@/features/commands/hooks/useUndo";
import { useGridToggle } from "@/features/grid/hooks/useGridToggle";
import { useHotkeys } from "react-hotkeys-hook";

export const ShortcutsObserver: React.FC = () => {
  const undo = useUndo();
  const { toggle: toggleGrid } = useGridToggle();

  useHotkeys(["mod+z"], undo, { preventDefault: true });
  useHotkeys(["o g"], toggleGrid, { preventDefault: true });

  return null;
};
