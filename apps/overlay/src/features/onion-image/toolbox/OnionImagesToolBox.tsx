import { OnionImagesAddButton } from "@/features/onion-image/toolbox/OnionImagesAddButton";
import { OnionImagesToggleButton } from "@/features/onion-image/toolbox/OnionImagesToggleButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function OnionImagesToolBox() {
  return (
    <ToolBoxTabGrid>
      <OnionImagesToggleButton />
      <OnionImagesAddButton />
    </ToolBoxTabGrid>
  );
}
