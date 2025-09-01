import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { type IOnionImage } from "../types";

export function OnionImageLockButton({ id }: { id: IOnionImage["id"] }) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const { toggleLock } = useOnionImage();

  if (!onionImage) {
    return null;
  }

  return (
    <ToolButton
      activated={onionImage?.locked}
      enabled={true}
      Icon={
        onionImage?.locked ? <IconLock size={16} /> : <IconLockOpen size={16} />
      }
      onClick={() => toggleLock(onionImage)}
    />
  );
}
