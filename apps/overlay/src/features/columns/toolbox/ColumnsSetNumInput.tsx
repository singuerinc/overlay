import { useColumnsSetNum } from "@/features/columns/hooks/useColumnsSetNum";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { IconColumns3Filled } from "@tabler/icons-react";

export function ColumnsSetNumInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetNum();

  if (!columns) {
    return null;
  }

  return (
    <div className="flex text-neutral-600 rounded-md gap-x-1 px-2 py-0.5 items-center">
      <IconColumns3Filled size={16} stroke={2} />
      <input
        name="columns-num"
        type="number"
        min={0}
        step={1}
        className="overlay-step-num border-0 outline-0 w-6"
        defaultValue={columns.numColumns}
        onChange={(e) => set(Number(e.target.value))}
      />
    </div>
  );
}
