import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";

export function Columns() {
  const { data: columns } = useColumnsQuery();

  if (!columns || !columns.visible) {
    return null;
  }

  const columnsObj = Array.from({ length: columns.numColumns }, () => ({}));

  return (
    <div
      className="w-full h-full flex"
      style={{
        gap: `${columns.gap}px`,
      }}
    >
      {columnsObj.map((_, index) => (
        <div
          key={index}
          className="bg-cyan-600/10 w-24 h-full"
          style={{
            width: columns.size,
          }}
        ></div>
      ))}
    </div>
  );
}
