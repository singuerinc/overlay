import { NOTES_KEYS } from "@/features/notes/store/notesKeys";
import type { INotesStore } from "@/features/notes/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useNotesMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<INotesStore, "id">>) => {
      const notes = queryClient.getQueryData<INotesStore>(
        NOTES_KEYS.notes(presetId)
      );

      const updatedNotes = produce(notes, (draftState: INotesStore) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        NOTES_KEYS.notes(presetId).join("-"),
        JSON.stringify(updatedNotes)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTES_KEYS.notes(presetId) });
    },
  });
}
