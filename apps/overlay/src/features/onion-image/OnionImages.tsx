import { OnionImage } from "@/features/onion-image/components/OnionImage";
import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useCallback } from "react";

export function OnionImages() {
  const { data: onionImages, isLoading, isError } = useOnionImagesQuery();
  const { move } = useOnionImage();

  const handleDragEnd = useCallback(
    (ev: DragEndEvent) => {
      const onionImageId = onionImages?.onionImages.find(
        (x) => x === ev.active.id
      );
      if (!onionImageId) return;

      move(onionImageId, {
        x: (ev.active.data.current?.x ?? 0) + ev.delta.x,
        y: (ev.active.data.current?.y ?? 0) + ev.delta.y,
      });
    },
    [onionImages]
  );

  if (isLoading || isError || !onionImages) {
    return null;
  }

  if (!onionImages.visible) {
    return null;
  }

  return (
    <div
      data-overlay-tool-type="onion-images"
      className="o:h-0 o:w-0 o:pointer-events-none o:absolute o:top-0 o:left-0"
    >
      <DndContext onDragEnd={handleDragEnd}>
        {onionImages.onionImages.map((imageId) => (
          <OnionImage key={imageId} id={imageId} />
        ))}
      </DndContext>
    </div>
  );
}
