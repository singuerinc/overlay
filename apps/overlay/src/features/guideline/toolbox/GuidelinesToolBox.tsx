import { IconTablePlus } from "@tabler/icons-react";

import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useAddGuidelineCommand } from "../../../features/guideline/store/useAddGuidelineCommand";
import { ToolButton } from "../../../ui/ToolButton";

export function GuidelinesToolBox() {
  const { data: guidelines } = useGetGuidelinesQuery();
  const addGuidelineCommand = useAddGuidelineCommand();

  return (
    <>
      <ToolButton
        enabled={guidelines?.visible}
        Icon={<IconTablePlus />}
        onClick={() => {
          const guideline = createHorizontalGuideline({
            y: window.innerHeight / 2,
          });
          addGuidelineCommand.execute(guideline);
        }}
      />
      {/* <ToolButton
        enabled={true}
        Icon={<IconBorderVertical />}
        onClick={() => {
          const guideline = createVerticalGuideline({
            x: window.innerWidth / 2,
          });
          addGuidelineCommand.execute(guideline);
        }}
      /> */}
    </>
  );
}
