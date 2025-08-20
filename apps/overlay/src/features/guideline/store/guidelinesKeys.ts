export const GUIDELINES_KEYS = {
  guidelines: (frameId: string) => ["overlay", frameId, "guidelines"],
  guideline: (frameId: string, guidelineId: string) => [
    "overlay",
    frameId,
    "guidelines",
    guidelineId,
  ],
};
