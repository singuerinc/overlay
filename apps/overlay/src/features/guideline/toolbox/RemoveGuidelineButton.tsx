import { useGuidelineDelete } from "@/features/guideline/hooks/useGuidelineDelete";
import { useGetGuidelineByIdQuery } from "@/features/guideline/store/useGetGuidelineByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTrash } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function RemoveGuidelineButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGetGuidelineByIdQuery(id);
  const { delete: deleteGuideline } = useGuidelineDelete();
  return (
    <ToolButton
      enabled={true}
      Icon={<IconTrash />}
      onClick={() => {
        if (guideline) {
          deleteGuideline(guideline);
        }
      }}
    />
  );
}
