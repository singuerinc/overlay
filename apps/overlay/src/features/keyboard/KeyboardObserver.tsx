import { useUndoCommand } from "@/features/commands/store/commands";
import { useHotkeys } from "react-hotkeys-hook";

export const KeyboardObserver: React.FC = () => {
  const undo = useUndoCommand();

  useHotkeys(["mod+z"], undo, { preventDefault: true });

  return null;
};
