import type { ITool } from "@/features/tools/ITool";

export interface INotes extends ITool<"notes"> {
  content: string;
}

export type INotesStore = INotes;
