import { useDeleteGuideline } from "@/features/guideline/hooks/useDeleteGuideline";
import { ToolButton } from "@/ui/ToolButton";
import { IconTrash } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function RemoveGuidelineButton({
  guideline,
}: {
  guideline: IGuideline;
}) {
  const { deleteGuideline } = useDeleteGuideline();
  return (
    <ToolButton
      enabled={true}
      Icon={<IconTrash />}
      onClick={() => {
        deleteGuideline(guideline);
      }}
    />
  );
}
