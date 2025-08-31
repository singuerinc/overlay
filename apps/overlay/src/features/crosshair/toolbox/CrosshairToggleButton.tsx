import { useCrosshair } from "@/features/crosshair/hooks/useCrosshair";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function CrosshairToggleButton() {
  const { data: crosshair } = useCrosshairQuery();
  const { visible, toggle } = useCrosshair();
  const setSelectedTool = useSetSelectedTool();

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={visible ?? false}
      onChange={(visible: boolean) => {
        setSelectedTool(visible ? (crosshair ?? null) : null);
        toggle();
      }}
    />
  );
}
