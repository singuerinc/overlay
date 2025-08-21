import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useCrosshairToggleCommand } from "@/features/crosshair/store/useCrosshairToggleCommand";
import { IconFocus2 } from "@tabler/icons-react";
import { ToolButton } from "../../../ui/ToolButton";

export function CrosshairToggleButton() {
  const { data: crosshair } = useCrosshairQuery();
  const toggleCrosshairCommand = useCrosshairToggleCommand();

  if (!crosshair) {
    return null;
  }

  return (
    <div className="flex gap-x-1">
      <ToolButton
        activated={crosshair.visible}
        enabled={true}
        Icon={<IconFocus2 />}
        onClick={() => {
          toggleCrosshairCommand.execute(!crosshair.visible);
        }}
      />
    </div>
  );
}
