import { type ColumnsColorType } from "@/features/columns/ColumnsColor";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { cn } from "@/ui/cn";

export function Columns() {
  const { data: columns } = useColumnsQuery();

  if (!columns || !columns.visible) {
    return null;
  }

  const columnsObj = Array.from({ length: columns.numColumns }, () => ({}));
  const color = columns.color;

  const colors = {
    neutral: "o:bg-neutral-600",
    cyan: "o:bg-cyan-600",
    green: "o:bg-green-600",
    red: "o:bg-red-600",
  } satisfies Record<ColumnsColorType, string>;

  return (
    <div
      className="o:h-full o:flex o:mx-auto o:pointer-events-none"
      style={{
        width: columns.size,
        maxWidth: "100%",
        gap: `${columns.gap}px`,
      }}
    >
      {columnsObj.map((_, index) => (
        <div
          key={index}
          style={{ opacity: columns.opacity }}
          className={cn("o:w-full o:h-full", colors[color])}
        ></div>
      ))}
    </div>
  );
}
