import {
  useSizesSetX0,
  useSizesSetX1,
  useSizesSetY0,
  useSizesSetY1,
  useSizesX0,
  useSizesX1,
  useSizesY0,
  useSizesY1,
} from "@/features/sizes/store/SizesStore";

export function useSizes() {
  const x0 = useSizesX0();
  const y0 = useSizesY0();
  const x1 = useSizesX1();
  const y1 = useSizesY1();

  const setX0 = useSizesSetX0();
  const setY0 = useSizesSetY0();
  const setX1 = useSizesSetX1();
  const setY1 = useSizesSetY1();

  return {
    x0,
    y0,
    x1,
    y1,
    setX0,
    setY0,
    setX1,
    setY1,
  };
}
