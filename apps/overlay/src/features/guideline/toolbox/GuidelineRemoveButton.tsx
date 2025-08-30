import { useGuidelineRemove } from "@/features/guideline/hooks/useGuidelineRemove";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTrash } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function GuidelineRemoveButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const { remove: removeGuideline } = useGuidelineRemove();
  return (
    <ToolButton
      enabled={true}
      Icon={<IconTrash />}
      onClick={() => {
        if (guideline) {
          removeGuideline(guideline);
        }
      }}
    />
  );
}
