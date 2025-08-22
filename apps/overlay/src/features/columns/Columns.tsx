import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";

export function Columns() {
  const { data: columns } = useColumnsQuery();

  if (!columns || !columns.visible) {
    return null;
  }

  const columnsObj = Array.from({ length: columns.numColumns }, () => ({}));

  return (
    <div
      className="overlay:w-full overlay:h-full overlay:flex"
      style={{
        gap: `${columns.gap}px`,
      }}
    >
      {columnsObj.map((_, index) => (
        <div
          key={index}
          className="overlay:bg-cyan-600/10 overlay:w-24 overlay:h-full"
          style={{
            width: columns.size,
          }}
        ></div>
      ))}
    </div>
  );
}
