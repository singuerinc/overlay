import { useNotes } from "@/features/notes/hooks/useNotes";
import { useNotesQuery } from "@/features/notes/store/useNotesQuery";
import { useCallback, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export function Notes() {
  const { data: notes } = useNotesQuery();
  const { setContent: notesSetContent } = useNotes();
  const debounced = useDebounceCallback(notesSetContent, 500);

  return notes && <TextArea lastContent={notes.content} save={debounced} />;
}

function TextArea({
  lastContent,
  save,
}: {
  lastContent: string;
  save: (content: string) => void;
}) {
  const [content, setContent] = useState(lastContent);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      save(e.target.value);
      setContent(e.target.value);
    },
    []
  );
  return (
    <div className="o:w-full o:h-full o:p-2">
      <textarea
        name="notes"
        id="notes"
        className="o:w-full o:resize-none o:box-border o:focus:outline-none"
        placeholder="Write your notes"
        value={content}
        rows={4}
        onChange={handleChange}
      />
    </div>
  );
}
