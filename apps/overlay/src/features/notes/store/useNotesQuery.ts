import { createNotes } from "@/features/notes/store/createNotes";
import { NOTES_KEYS } from "@/features/notes/store/notesKeys";
import type { INotesStore } from "@/features/notes/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";

function getNotes(presetId: IPreset["id"]): Promise<INotesStore> {
  return new Promise((resolve) => {
    const maybeNotes = localStorage.getItem(
      NOTES_KEYS.notes(presetId).join("-")
    );

    if (maybeNotes === null) {
      const notes = createNotes();
      localStorage.setItem(
        NOTES_KEYS.notes(presetId).join("-"),
        JSON.stringify(notes)
      );
      resolve(notes);
    } else {
      resolve(JSON.parse(maybeNotes));
    }
  });
}

export function useNotesQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: NOTES_KEYS.notes(presetId),
    queryFn: () => getNotes(presetId),
  });
}
