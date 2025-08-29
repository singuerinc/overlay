import { useOnionImageCycleFilter } from "@/features/onion-image/hooks/useOnionImageCycleFilter";
import { ToolButton } from "@/ui/ToolButton";
import { IconContrastFilled } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IOnionImage } from "../types";

export function OnionImageFilterButton({ id }: { id: IOnionImage["id"] }) {
  const { cycle } = useOnionImageCycleFilter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      cycle(id);
    },
    [id, cycle]
  );

  return (
    <ToolButton
      enabled={true}
      Icon={<IconContrastFilled size={16} />}
      onClick={handleClick}
    />
  );
}
