import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { GridCyclePatternButton } from "@/features/grid/toolbox/GridCyclePatternButton";
import { GridToggleButton } from "@/features/grid/toolbox/GridToggleButton";

export function GridToolBox() {
  const { data: grid } = useGridQuery();

  const isVisible = grid?.visible ?? false;

  return (
    <>
      <GridToggleButton />
      {isVisible && <GridCyclePatternButton />}
    </>
  );
}
