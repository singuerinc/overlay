import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";

export function Columns() {
  const { data: columns } = useColumnsQuery();

  if (!columns || !columns.visible) {
    return null;
  }

  const columnsObj = Array.from({ length: columns.numColumns }, () => ({}));

  return (
    <div
      className="o:h-full o:flex o:mx-auto"
      style={{
        width: columns.size,
        maxWidth: "100%",
        gap: `${columns.gap}px`,
      }}
    >
      {columnsObj.map((_, index) => (
        <div key={index} className="o:bg-cyan-600/20 o:w-full o:h-full"></div>
      ))}
    </div>
  );
}
