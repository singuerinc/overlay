import { useColumnsSetGap } from "@/features/columns/hooks/useColumnsSetGap";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { IconSpacingHorizontal } from "@tabler/icons-react";

export function ColumnsGapSetInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetGap();

  if (!columns) {
    return null;
  }

  return (
    <div className="flex text-neutral-600 rounded-md gap-x-1 px-2 py-0.5 items-center">
      <IconSpacingHorizontal size={16} stroke={2} />
      <input
        name="columns-gap"
        type="number"
        min={0}
        step={1}
        className="overlay-step-num border-0 outline-0 w-6"
        defaultValue={columns.gap}
        onChange={(e) => set(Number(e.target.value))}
      />
    </div>
  );
}
