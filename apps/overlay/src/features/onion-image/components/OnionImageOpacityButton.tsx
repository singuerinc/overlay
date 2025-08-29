import { useOnionImageOpacity } from "@/features/onion-image/hooks/useOnionImageOpacity";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircleHalf2 } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IOnionImage } from "../types";

export function OnionImageOpacityButton({
  onionImage,
}: {
  onionImage: IOnionImage;
}) {
  const { set } = useOnionImageOpacity();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      set(onionImage, onionImage.opacity === 1 ? 0.5 : 1);
    },
    [onionImage, set]
  );

  return (
    <ToolButton
      enabled={true}
      Icon={<IconCircleHalf2 size={16} />}
      onClick={handleClick}
    />
  );
}
