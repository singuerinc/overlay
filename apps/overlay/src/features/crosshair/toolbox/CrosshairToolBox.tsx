import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { CrosshairColorButton } from "@/features/crosshair/toolbox/CrosshairColorButton";
import { CrosshairToggleButton } from "@/features/crosshair/toolbox/CrosshairToggleButton";

export function CrosshairToolBox() {
  const { data: crosshair } = useCrosshairQuery();

  const isVisible = crosshair?.visible ?? false;

  return (
    <>
      <CrosshairToggleButton />
      {isVisible && <CrosshairColorButton />}
    </>
  );
}
