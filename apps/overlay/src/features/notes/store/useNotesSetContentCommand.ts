import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useNotesMutation } from "@/features/notes/store/useNotesMutation";
import { useNotesQuery } from "@/features/notes/store/useNotesQuery";
import type { INotes } from "@/features/notes/types";

export function useNotesSetContentCommand() {
  const { data: notes } = useNotesQuery();
  const executeCommand = useCommandExecute();
  const updateNotes = useNotesMutation();

  return {
    execute: (content: INotes["content"]) => {
      const prevContent = notes?.content;
      const command = new Command(
        "Notes - Set content",
        () => {
          updateNotes.mutate({
            content,
          });
        },
        () => {
          updateNotes.mutate({
            content: prevContent,
          });
        }
      );
      executeCommand(command);
    },
  };
}
