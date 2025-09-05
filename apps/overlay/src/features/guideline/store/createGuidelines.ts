import type { IGuidelineStore } from "@/features/guideline/types";

export function createGuidelines(props?: Partial<IGuidelineStore>) {
  return {
    guidelines: [],
    visible: true,
    locked: false,
    ...props,
  };
}
