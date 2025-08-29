import { OnionImagesAddButton } from "@/features/onion-image/toolbox/OnionImagesAddButton";
import { OnionImagesToggleButton } from "@/features/onion-image/toolbox/OnionImagesToggleButton";
import { OnionImageToolBox } from "@/features/onion-image/toolbox/OnionImageToolBox";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function OnionImagesToolBox() {
  return (
    <ToolBoxTabGrid>
      <OnionImagesToggleButton />
      <div />
      <div />
      <div />
      <OnionImagesAddButton />
      <div />
      <div />
      <div />
      <OnionImageToolBox />
    </ToolBoxTabGrid>
  );
}
