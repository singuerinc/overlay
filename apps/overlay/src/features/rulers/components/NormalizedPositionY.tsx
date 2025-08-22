import { useRulerPositionY } from "@/features/rulers/store/rulerStore";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";

export function NormalizedPositionY() {
  const { data: ruler } = useRulerQuery();
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
      className="overlay:absolute -translate-y-1/2 h-[75px] select-none text-[9px] w-full whitespace-nowrap tabular-nums"
    >
      <div className="overlay:absolute overlay:flex overlay:flex-row overlay:w-full overlay:h-full">
        <div className="overlay:w-1.5 overlay:h-full" />
        <div className="overlay:w-full overlay:h-full overlay:overflow-hidden overlay:flex overlay:items-center overlay:justify-center">
          <span className="overlay:-rotate-90 overlay:text-red-600">
            {normalizedY}
          </span>
        </div>
      </div>
      <div className="overlay:bg-gradient-to-b overlay:from-transparent overlay:via-neutral-100 overlay:to-transparent overlay:h-full" />
    </div>
  );
}
