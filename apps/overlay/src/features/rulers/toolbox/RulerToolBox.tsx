import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { RulerCenterOriginButton } from "@/features/rulers/toolbox/RulerCenterOriginButton";
import { RulerToggleButton } from "@/features/rulers/toolbox/RulerToggleButton";
import { RulerTopLeftOriginButton } from "@/features/rulers/toolbox/RulerTopLeftOriginButton";

export function RulerToolBox() {
  const { data: ruler } = useRulerQuery();

  const isVisible = ruler?.visible ?? false;

  return (
    <>
      <RulerToggleButton />
      {isVisible && <RulerTopLeftOriginButton />}
      {isVisible && <RulerCenterOriginButton />}
    </>
  );
}
