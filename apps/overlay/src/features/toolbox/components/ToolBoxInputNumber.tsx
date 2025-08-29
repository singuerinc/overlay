export function ToolBoxInputNumber({
  Icon,
  defaultValue,
  set,
  min,
  max,
  step,
}: {
  Icon: React.ReactNode;
  defaultValue: number;
  set: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="o:flex o:text-neutral-600 o:rounded-md o:gap-x-1 o:px-2 o:py-0.5 o:items-center">
      {Icon}
      <input
        type="number"
        min={min ?? 0}
        max={max ?? undefined}
        step={step ?? 1}
        className="overlay-step-num o:border-0 o:outline-0 o:text-center"
        style={{ width: `${String(defaultValue).length * 16}px` }}
        defaultValue={defaultValue}
        onChange={(e) => set(Number(e.target.value))}
      />
    </div>
  );
}
