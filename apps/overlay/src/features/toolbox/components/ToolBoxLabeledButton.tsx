import { ToolButton } from "@/ui/ToolButton";

export function ToolBoxLabeledButton({
  label,
  onClick,
  Icon,
}: {
  label: string;
  onClick: () => void;
  Icon: React.ReactNode;
}) {
  return (
    <div className="o:flex o:flex-col o:text-neutral-600 o:rounded-md o:gap-1 o:items-start">
      <span className="o:text-xs o:font-semibold">{label}</span>
      <ToolButton enabled={true} Icon={Icon} onClick={onClick} />
    </div>
  );
}
