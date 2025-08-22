import { RulerToggleButton } from "@/features/rulers/toolbox/RulerToggleButton";

export function RulerToolBox() {
  // const { data: ruler } = useRulerQuery();
  // const isVisible = ruler?.visible ?? false;

  return (
    <>
      <RulerToggleButton />
      {/* {isVisible && <RulerTopLeftOriginButton />}
      {isVisible && <RulerCenterOriginButton />} */}
    </>
  );
}
