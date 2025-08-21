import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";

export function useNormalizedPosition() {
  const { data: ruler } = useRulerQuery();
  const offsetX = ruler?.originX ?? 0;
  const offsetY = ruler?.originY ?? 0;

  return {
    calculate: (x: number, y: number) => {
      const normalizedX = x - offsetX;
      const normalizedY = y - offsetY;
      return [normalizedX, normalizedY];
    },
  };
}
