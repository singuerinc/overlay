import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { type IOnionImage } from "../types";

export function OnionImageToggleVisibilityButton({
  id,
}: {
  id: IOnionImage["id"];
}) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const { toggleVisibility } = useOnionImage();

  if (!onionImage) {
    return null;
  }

  return (
    <ToolButton
      activated={onionImage?.locked}
      enabled={true}
      Icon={
        onionImage?.visible ? <IconEye size={16} /> : <IconEyeOff size={16} />
      }
      onClick={() => toggleVisibility(onionImage)}
    />
  );
}
