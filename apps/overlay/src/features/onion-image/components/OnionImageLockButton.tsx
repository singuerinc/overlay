import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IOnionImage } from "../types";

export function OnionImageLockButton({ id }: { id: IOnionImage["id"] }) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const { toggleLock } = useOnionImage();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (onionImage) {
        toggleLock(onionImage);
      }
    },
    [onionImage, toggleLock]
  );

  return (
    <ToolButton
      activated={onionImage?.locked}
      enabled={true}
      Icon={
        onionImage?.locked ? <IconLock size={16} /> : <IconLockOpen size={16} />
      }
      onClick={handleClick}
    />
  );
}
