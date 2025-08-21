import { useCrosshairToggle } from "@/features/crosshair/hooks/useCrosshairToggle";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { IconCrosshair } from "@tabler/icons-react";
import { ToolButton } from "../../../ui/ToolButton";

export function CrosshairToggleButton() {
  const { data: crosshair } = useCrosshairQuery();
  const { visible, toggle } = useCrosshairToggle();
  const setSelectedTool = useSetSelectedTool();

  return (
    <div className="flex gap-x-1">
      <ToolButton
        activated={visible}
        enabled={true}
        Icon={<IconCrosshair />}
        onClick={() => {
          setSelectedTool(!visible ? (crosshair ?? null) : null);
          toggle();
        }}
      />
    </div>
  );
}
