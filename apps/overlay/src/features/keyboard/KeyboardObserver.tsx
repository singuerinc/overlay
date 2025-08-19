import { useUndoCommand } from "@/features/commands/store/commands";
import mousetrap, { type ExtendedKeyboardEvent } from "mousetrap";
import { useCallback, useEffect } from "react";

export const KeyboardObserver: React.FC = () => {
  const undo = useUndoCommand();
  const handleUndo = useCallback(
    (e: ExtendedKeyboardEvent) => {
      e.preventDefault();
      undo();
    },
    [undo]
  );

  useEffect(() => {
    mousetrap.bind(`command+z`, handleUndo);

    return () => {
      mousetrap.unbind(`command+z`);
    };
  }, [handleUndo]);

  return null;
};
