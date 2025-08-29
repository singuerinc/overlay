import { createOnionImage } from "@/features/onion-image/store/createOnionImage";
import { useOnionImageAddCommand } from "@/features/onion-image/store/useOnionImageAddCommand";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconPhotoPlus } from "@tabler/icons-react";

export function OnionImagesAddButton() {
  const cmd = useOnionImageAddCommand();

  return (
    <ToolBoxLabeledButton
      label="Add 1"
      Icon={<IconPhotoPlus />}
      onClick={() => {
        const onionImage = createOnionImage();
        cmd.execute(onionImage);
      }}
    />
  );
}
