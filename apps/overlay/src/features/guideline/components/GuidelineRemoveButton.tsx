import { useGuideline } from "@/features/guideline/hooks/useGuideline";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTrash } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function GuidelineRemoveButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const { remove } = useGuideline();
  return (
    <ToolButton
      enabled={true}
      Icon={<IconTrash size={16} />}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (guideline) {
          remove(guideline);
        }
      }}
    />
  );
}
