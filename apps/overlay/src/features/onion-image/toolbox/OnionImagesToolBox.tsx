import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { OnionImagesAddButton } from "@/features/onion-image/toolbox/OnionImagesAddButton";
import { OnionImagesToggleButton } from "@/features/onion-image/toolbox/OnionImagesToggleButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function OnionImagesToolBox() {
  const { data: onionImages } = useOnionImagesQuery();
  return (
    <>
      <ToolBoxTabGrid>
        <OnionImagesToggleButton />
        <OnionImagesAddButton />
      </ToolBoxTabGrid>
      <ul className="o:flex o:flex-col o:gap-1">
        {onionImages?.onionImages?.map((imageId) => (
          <li key={imageId}>{imageId}</li>
        ))}
      </ul>
    </>
  );
}
