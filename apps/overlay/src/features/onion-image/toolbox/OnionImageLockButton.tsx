import { useOnionImageToggleLock } from "@/features/onion-image/hooks/useOnionImageToggleLock";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { type IOnionImage } from "../types";

export function OnionImageLockButton({ id }: { id: IOnionImage["id"] }) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const { toggleLock } = useOnionImageToggleLock();

  const handleClick = () => {
    if (onionImage) {
      toggleLock(onionImage);
    }
  };

  return (
    <ToolButton
      activated={onionImage?.locked}
      enabled={true}
      Icon={onionImage?.locked ? <IconLock /> : <IconLockOpen />}
      onClick={handleClick}
    />
  );
}
