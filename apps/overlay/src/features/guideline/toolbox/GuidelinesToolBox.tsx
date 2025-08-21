import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { GuidelinesAddButton } from "@/features/guideline/toolbox/GuidelinesAddButton";
import { GuidelinesSnapToGridButton } from "@/features/guideline/toolbox/GuidelinesSnapToGridButton";
import { GuidelinesToggleButton } from "@/features/guideline/toolbox/GuidelinesToggleButton";
import { GuidelineToolBox } from "@/features/guideline/toolbox/GuidelineToolBox";

export function GuidelinesToolBox() {
  const { data: guidelines } = useGuidelinesQuery();
  const isVisible = guidelines?.visible ?? false;

  return (
    <>
      <GuidelinesToggleButton />
      {isVisible && <GuidelinesSnapToGridButton />}
      {isVisible && <GuidelinesAddButton />}
      {isVisible && <GuidelineToolBox />}
    </>
  );
}
