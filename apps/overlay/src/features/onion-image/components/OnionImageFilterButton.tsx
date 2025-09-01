import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { ToolButton } from "@/ui/ToolButton";
import { IconContrastFilled } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IOnionImage } from "../types";

export function OnionImageFilterButton({
  onionImage,
}: {
  onionImage: IOnionImage;
}) {
  const { cycleFilter } = useOnionImage();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      cycleFilter(onionImage);
    },
    [onionImage, cycleFilter]
  );

  return (
    <ToolButton
      enabled={true}
      Icon={<IconContrastFilled />}
      onClick={handleClick}
    />
  );
}
