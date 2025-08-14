import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function VerticalGuideline({ id, x }: { id: string; x: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    width: "9px",
    transform: transform
      ? CSS.Translate.toString({
          x: transform.x + x - 4,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({ x: x - 4, y: 0, scaleX: 1, scaleY: 1 }),
  };

  return (
    <div
      className="h-screen flex flex-row justify-center group hover:cursor-move  top-0 left-0 absolute"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="h-full w-px bg-amber-600/25 group-hover:bg-amber-600/100"></div>
    </div>
  );
}
