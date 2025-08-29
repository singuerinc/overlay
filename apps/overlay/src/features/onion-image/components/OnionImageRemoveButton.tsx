import { useOnionImageDelete } from "@/features/onion-image/hooks/useOnionImageDelete";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTrash } from "@tabler/icons-react";
import { type IOnionImage } from "../types";

export function OnionImageRemoveButton({ id }: { id: IOnionImage["id"] }) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const { delete: deleteOnionImage } = useOnionImageDelete();
  return (
    <ToolButton
      enabled={true}
      Icon={<IconTrash size={16} />}
      onClick={() => {
        if (onionImage) {
          deleteOnionImage(onionImage);
        }
      }}
    />
  );
}
