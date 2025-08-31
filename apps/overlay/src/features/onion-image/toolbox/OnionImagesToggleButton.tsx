import { useOnionImages } from "@/features/onion-image/hooks/useOnionImages";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function OnionImagesToggleButton() {
  const { data: onionImages } = useOnionImagesQuery();
  const { toggle } = useOnionImages();

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
