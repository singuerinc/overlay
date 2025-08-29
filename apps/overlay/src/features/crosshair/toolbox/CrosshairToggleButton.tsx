import { useCrosshairToggle } from "@/features/crosshair/hooks/useCrosshairToggle";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function CrosshairToggleButton() {
  const { data: crosshair } = useCrosshairQuery();
  const { visible, toggle } = useCrosshairToggle();
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
