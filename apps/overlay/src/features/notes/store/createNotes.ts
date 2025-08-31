import type { INotes } from "@/features/notes/types";

export function createNotes(
  props?: Partial<Exclude<INotes, "id" | "type">>
): INotes {
  return {
    id: "notes",
    type: "notes",
    content: props?.content ?? "",
  };
}
