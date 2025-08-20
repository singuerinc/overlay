import { useRulerPositionY } from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";

export function NormalizedPositionY() {
  const { data: ruler } = useGetRulerQuery();
  const y = useRulerPositionY();
  const normalizedY = y ?? 0;

  if (y === null) {
    return null;
  }

  return (
    <div
      style={{
        transform: `translateY(${normalizedY + (ruler?.originY ?? 0)}px)`,
      }}
      className="absolute -translate-y-1/2 z-50 h-[75px] select-none text-[9px] w-full whitespace-nowrap tabular-nums"
    >
      <div className="absolute flex flex-row w-full h-full">
        <div className="w-1.5 h-full" />
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
          <span className="-rotate-90 text-red-600">{normalizedY}</span>
        </div>
      </div>
      <div className="bg-blend-multiply bg-gradient-to-b from-transparent via-neutral-100 to-transparent -z-10 h-full" />
    </div>
  );
}
