import { useRulerPositionX } from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";

export function NormalizedPositionX() {
  const { data: ruler } = useGetRulerQuery();
  const x = useRulerPositionX();
  const normalizedX = x ?? 0;

  if (x === null) {
    return null;
  }

  return (
    <div
      style={{
        transform: `translateX(${normalizedX + (ruler?.originX ?? 0)}px)`,
      }}
      className="absolute -translate-x-1/2 z-50 w-[75px] select-none text-[9px] h-full whitespace-nowrap tabular-nums"
    >
      <div className="absolute flex flex-col w-full h-full">
        <div className="h-1.5 w-full" />
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
          <span className="text-red-600">{normalizedX}</span>
        </div>
      </div>
      <div className="bg-blend-multiply bg-gradient-to-b from-transparent via-neutral-100 to-transparent -z-10 h-full" />
    </div>
  );
}
