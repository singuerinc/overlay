import { cn } from "@/ui/cn";
import { ToolButton } from "@/ui/ToolButton";

export function ToolBoxLabeledButton({
  label,
  onClick,
  Icon,
  enabled = true,
  className = "",
}: {
  className?: string;
  enabled?: boolean;
  label: string;
  onClick: () => void;
  Icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "o:flex o:flex-col o:text-neutral-600 o:rounded-md o:gap-1 o:items-start",
        className
      )}
    >
      <span className="o:text-xs o:font-semibold o:select-none">{label}</span>
      <ToolButton enabled={enabled} Icon={Icon} onClick={onClick} />
    </div>
  );
}
