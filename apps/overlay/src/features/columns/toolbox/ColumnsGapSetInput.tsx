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
    <div className="overlay:flex overlay:text-neutral-600 overlay:rounded-md overlay:gap-x-1 overlay:px-2 overlay:py-0.5 overlay:items-center">
      <IconSpacingHorizontal size={16} stroke={2} />
      <input
        name="columns-gap"
        type="number"
        min={0}
        step={1}
        className="overlay-step-num overlay:border-0 overlay:outline-0 overlay:w-6"
        defaultValue={columns.gap}
        onChange={(e) => set(Number(e.target.value))}
      />
    </div>
  );
}
