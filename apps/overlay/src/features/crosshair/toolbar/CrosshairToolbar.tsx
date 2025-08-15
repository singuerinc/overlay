import { IconFocus2 } from "@tabler/icons-react";

import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";
import { useToggleCrosshairCommand } from "@/features/crosshair/store/useToggleCrosshairCommand";
import { ToolButton } from "../../../ui/ToolButton";

export function CrosshairToolbar() {
  const { data: crosshairList } = useGetCrosshairQuery();
  const toggleCrosshairCommand = useToggleCrosshairCommand();

  if (!crosshairList) return null;

  const crosshair = crosshairList[0];

  return (
    <div className="flex gap-x-1">
      <ToolButton
        activated={crosshair.visible}
        enabled={true}
        Icon={<IconFocus2 />}
        onClick={() => {
          toggleCrosshairCommand.execute(crosshair, !crosshair.visible);
        }}
      />
    </div>
  );
}
