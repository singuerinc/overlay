import { useNotes } from "@/features/notes/hooks/useNotes";
import { useNotesQuery } from "@/features/notes/store/useNotesQuery";
import { useDebounceCallback } from "usehooks-ts";

export function Notes() {
  const { data: notes } = useNotesQuery();
  const { setContent } = useNotes();
  const debounced = useDebounceCallback(setContent, 500);

  return (
    <div className="o:w-full o:h-full o:p-2">
      <textarea
        name="notes"
        id="notes"
        className="o:w-full o:resize-none o:box-border o:focus:outline-none"
        placeholder="Write your notes"
        defaultValue={notes?.content}
        rows={4}
        onChange={(e) => debounced(e.target.value)}
      />
    </div>
  );
}
