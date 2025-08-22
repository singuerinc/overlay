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
    <div className="overlay:flex overlay:text-neutral-600 overlay:rounded-md overlay:gap-x-1 overlay:px-2 overlay:py-0.5 overlay:items-center">
      <IconColumns3Filled size={16} stroke={2} />
      <input
        name="columns-num"
        type="number"
        min={0}
        step={1}
        className="overlay-step-num overlay:border-0 overlay:outline-0 overlay:w-6"
        defaultValue={columns.numColumns}
        onChange={(e) => set(Number(e.target.value))}
      />
    </div>
  );
}
