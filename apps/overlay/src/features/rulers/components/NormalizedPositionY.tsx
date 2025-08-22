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
      className="o:absolute -translate-y-1/2 h-[75px] select-none text-[9px] w-full whitespace-nowrap tabular-nums"
    >
      <div className="o:absolute o:flex o:flex-row o:w-full o:h-full">
        <div className="o:w-1.5 o:h-full" />
        <div className="o:w-full o:h-full o:overflow-hidden o:flex o:items-center o:justify-center">
          <span className="o:-rotate-90 o:text-red-600">{normalizedY}</span>
        </div>
      </div>
      <div className="o:bg-gradient-to-b o:from-transparent o:via-neutral-100 o:to-transparent o:h-full" />
    </div>
  );
}
