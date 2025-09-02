import { useFrame } from "@/features/frames/hooks/useFrame";
import { useFrameByIdQuery } from "@/features/frames/store/useFrameByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTrash } from "@tabler/icons-react";
import { type IFrame } from "../types";

export function FrameRemoveButton({ id }: { id: IFrame["id"] }) {
  const { data: frame } = useFrameByIdQuery(id);
  const { remove } = useFrame();
  return (
    <ToolButton
      enabled={true}
      Icon={<IconTrash size={16} />}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (frame) {
          remove(frame);
        }
      }}
    />
  );
}
