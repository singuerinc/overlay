import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";
import { useToggleCrosshairCommand } from "@/features/crosshair/store/useToggleCrosshairCommand";
import { IconFocus2 } from "@tabler/icons-react";
import { ToolButton } from "../../../ui/ToolButton";

export function CrosshairToolbar() {
  const { data: crosshair } = useGetCrosshairQuery();
  const toggleCrosshairCommand = useToggleCrosshairCommand();

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
