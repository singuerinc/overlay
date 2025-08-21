import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useGuidelineAddCommand } from "@/features/guideline/store/useGuidelineAddCommand";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { IconTablePlus } from "@tabler/icons-react";
import { ToolButton } from "../../../ui/ToolButton";

export function GuidelinesToolBox() {
  const { data: guidelines } = useGuidelinesQuery();
  const addGuidelineCommand = useGuidelineAddCommand();

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
