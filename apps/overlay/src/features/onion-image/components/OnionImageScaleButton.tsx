import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconWindowMaximize } from "@tabler/icons-react";
import { useCallback } from "react";
import { OnionImageScale, type IOnionImage } from "../types";

export function OnionImageScaleButton({ id }: { id: IOnionImage["id"] }) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const { setScale } = useOnionImage();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!onionImage) return;

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
      Icon={<IconWindowMaximize size={16} />}
      onClick={handleClick}
    />
  );
}
