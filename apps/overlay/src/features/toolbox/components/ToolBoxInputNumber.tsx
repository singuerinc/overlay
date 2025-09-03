import { cn } from "@/ui/cn";

export function ToolBoxInputNumber({
  label,
  defaultValue,
  set,
  min,
  max,
  step,
}: {
  label: string;
  defaultValue: number;
  set: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="o:flex o:flex-col o:group o:rounded-md o:gap-1">
      <span className="o:text-xs o:font-semibold o:select-none">{label}</span>
      <input
        type="number"
        min={min ?? 0}
        max={max ?? undefined}
        step={step ?? 1}
        className={cn(
          "overlay-step-num o:grow-0 o:max-w-12 o:focus:bg-neutral-700 o:p-1 o:border-b-2 o:text-neutral-50 o:border-neutral-400 o:focus:text-neutral-200 o:focus:border-cyan-300 o:pb-1 o:outline-0 o:text-left o:min-w-8"
        )}
        defaultValue={defaultValue}
        onChange={(e) => set(Number(e.target.value))}
      />
    </div>
  );
}
