import { useGetColumnsQuery } from "@/features/columns/store/useGetColumnsQuery";

export function Columns() {
  const { data: columns } = useGetColumnsQuery();

  if (!columns || !columns.visible) {
    return null;
  }

  const columnsObj = Array.from({ length: columns.numColumns }, (_, i) => ({}));

  return (
    <div className="w-full h-full flex gap-4">
      {columnsObj.map((_, index) => (
        <div
          key={index}
          className="bg-cyan-600/10 w-24 h-full"
          style={{ width: `${columns.size}px` }}
        ></div>
      ))}
    </div>
  );
}
