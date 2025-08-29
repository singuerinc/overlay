import { useOnionImagesToggle } from "@/features/onion-image/hooks/useOnionImagesToggle";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function OnionImagesToggleButton() {
  const { data: onionImages } = useOnionImagesQuery();
  const { toggle } = useOnionImagesToggle();

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={onionImages?.visible ?? false}
      onChange={() => {
        toggle();
      }}
    />
  );
}
