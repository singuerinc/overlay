import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useNotesMutation } from "@/features/notes/store/useNotesMutation";
import type { INotes } from "@/features/notes/types";

export function useNotesSetContentCommand() {
  const { execute: executeCommand } = useCommands();
  const updateNotes = useNotesMutation();

  return {
    execute: (content: INotes["content"]) => {
      const command = new Command(
        "Notes - Set content",
        () =>
          updateNotes.mutateAsync({
            content,
          }),
        () => Promise.resolve()
      );
      executeCommand(command, true);
    },
  };
}
