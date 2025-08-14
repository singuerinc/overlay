import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function HorizontalGuideline({ id, y }: { id: string; y: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    height: "9px",
    transform: transform
      ? CSS.Translate.toString({
          x: 0,
          y: transform.y + y - 4,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({ x: 0, y: y - 4, scaleX: 1, scaleY: 1 }),
  };

  return (
    <div
      className="w-screen flex flex-col justify-center hover:cursor-move group top-0 left-0 absolute"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="w-full h-px bg-amber-600/25 group-hover:bg-amber-600/100"></div>
    </div>
  );
}
