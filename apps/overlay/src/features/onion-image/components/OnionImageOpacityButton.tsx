import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircleHalf2 } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IOnionImage } from "../types";

export function OnionImageOpacityButton({
  onionImage,
}: {
  onionImage: IOnionImage;
}) {
  const { setOpacity } = useOnionImage();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setOpacity(onionImage, onionImage.opacity === 1 ? 0.5 : 1);
    },
    [onionImage, setOpacity]
  );

  return (
    <ToolButton
      enabled={true}
      Icon={<IconCircleHalf2 size={16} />}
      onClick={handleClick}
    />
  );
}
