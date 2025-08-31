import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";

export function useGetCenterPosition() {
  const { data: ruler } = useRulerQuery();
  const rulerPositionX = ruler?.originX ?? 0;
  const rulerPositionY = ruler?.originY ?? 0;

  return {
    calculate: (x: number, y: number) => {
      const normalizedX = x - rulerPositionX;
      const normalizedY = y - rulerPositionY;
      return [normalizedX, normalizedY];
    },
  };
}
