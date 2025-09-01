import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { ToolButton } from "@/ui/ToolButton";
import { IconWindowMaximize } from "@tabler/icons-react";
import { useCallback } from "react";
import { OnionImageScale, type IOnionImage } from "../types";

export function OnionImageScaleButton({
  onionImage,
}: {
  onionImage: IOnionImage;
}) {
  const { setScale } = useOnionImage();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const nextScale =
        OnionImageScale[
          (OnionImageScale.indexOf(onionImage.scale) + 1) %
            OnionImageScale.length
        ];
      setScale(onionImage, nextScale);
    },
    [onionImage, setScale]
  );

  return (
    <ToolButton
      enabled={true}
      Icon={<IconWindowMaximize />}
      onClick={handleClick}
    />
  );
}
