import {
  useCoordsPositionX,
  useCoordsPositionY,
  useCoordsSetPositionX,
  useCoordsSetPositionY,
} from "@/features/coords/store/CoordsStore";

export function useCoords() {
  const x = useCoordsPositionX();
  const y = useCoordsPositionY();

  const setX = useCoordsSetPositionX();
  const setY = useCoordsSetPositionY();

  return {
    x,
    y,
    setX,
    setY,
  };
}
