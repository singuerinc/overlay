import { useGetGridQuery } from "@/features/grid/store/useGetGridQuery";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";

export function Grid() {
  const { data: grid } = useGetGridQuery();
  const { data: ruler } = useGetRulerQuery();

  if (!ruler || !grid || !grid.visible) {
    return null;
  }

  const styles = {
    solid: {
      backgroundImage:
        "linear-gradient(to right, rgba(255,0,0,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,0,0.3) 1px, transparent 1px)",
    },
    dotted: {
      backgroundImage:
        "radial-gradient(circle, rgba(255,0,0,0.3) 1px, transparent 1px)",
    },
  };

  return (
    <>
      <div
        className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
        style={{
          backgroundPosition: `${ruler.originX + grid.gapX / 2}px ${ruler.originY + grid.gapY / 2}px`,
          backgroundSize: `${grid.gapX}px ${grid.gapY}px`,
          ...styles.dotted,
        }}
      />
    </>
  );
}
