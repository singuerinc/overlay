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
        "o:flex o:items-center o:text-neutral-50 o:rounded-md o:gap-1",
        className
      )}
    >
      <ToolButton enabled={enabled} Icon={Icon} onClick={onClick} />
      <span className="o:text-xs o:font-semibold o:select-none">{label}</span>
    </div>
  );
}
