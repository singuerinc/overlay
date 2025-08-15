import { useUndoCommand } from "@/features/commands/store/commands";
import mousetrap from "mousetrap";
import { useEffect } from "react";

export const KeyboardObserver: React.FC = () => {
  const undo = useUndoCommand();
  const handleUndo = () => {
    undo();
  };
  useEffect(() => {
    mousetrap.bind(`command+z`, handleUndo);

    return () => {
      mousetrap.unbind(`command+z`);
    };
  }, []);

  return null;
};
