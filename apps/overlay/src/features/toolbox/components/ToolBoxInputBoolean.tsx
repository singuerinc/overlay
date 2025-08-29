import { cn } from "@/ui/cn";

export function ToolBoxInputBoolean({
  label,
  defaultValue,
  onChange,
}: {
  label: string;
  defaultValue: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="o:flex o:flex-col o:text-neutral-600 o:rounded-md o:gap-1 o:items-start">
      <div className="o:flex o:flex-col">
        <span className="o:text-xs o:font-semibold">{label}</span>
        <input
          type="checkbox"
          className="overlay-step-num o:border-0 o:outline-0 o:text-center o:hidden"
          defaultChecked={defaultValue}
        />
      </div>
      <div className="o:h-7 o:flex o:flex-col o:justify-center o:cursor-pointer">
        <div
          className={cn(
            "o:w-8 o:rounded-full o:bg-neutral-300 o:p-0.5 o:flex",
            {
              "o:bg-neutral-900 o:justify-end": defaultValue,
            }
          )}
          onClick={() => onChange(!defaultValue)}
        >
          <div className={cn("o:size-3 o:rounded-full o:bg-neutral-50")} />
        </div>
      </div>
    </div>
  );
}
