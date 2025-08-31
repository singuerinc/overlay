import { useNotesSetContentCommand } from "@/features/notes/store/useNotesSetContentCommand";
import type { INotes } from "@/features/notes/types";

export function useNotes() {
  const setContentCmd = useNotesSetContentCommand();

  return {
    setContent: (content: INotes["content"]) => setContentCmd.execute(content),
  };
}
