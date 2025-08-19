import { IconBorderHorizontal, IconBorderVertical } from "@tabler/icons-react";

import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { createVerticalGuideline } from "@/features/guideline/store/createVerticalGuideline";
import { useAddGuidelineCommand } from "../../../features/guideline/store/useAddGuidelineCommand";
import { ToolButton } from "../../../ui/ToolButton";

export function GuidelinesToolbar() {
  const addGuidelineCommand = useAddGuidelineCommand();

  return (
    <div className="flex gap-x-1">
      <ToolButton
        enabled={true}
        Icon={<IconBorderHorizontal />}
        onClick={() => {
          const guideline = createHorizontalGuideline({
            y: window.innerHeight / 2,
          });
          addGuidelineCommand.execute(guideline);
        }}
      />
      <ToolButton
        enabled={true}
        Icon={<IconBorderVertical />}
        onClick={() => {
          const guideline = createVerticalGuideline({
            x: window.innerWidth / 2,
          });
          addGuidelineCommand.execute(guideline);
        }}
      />
    </div>
  );
}
