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
        "linear-gradient(to right, rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px)",
    },
    dotted: {
      backgroundImage:
        "radial-gradient(circle, rgba(255,0,0,0.1) 1px, transparent 1px)",
    },
  };

  return (
    <>
      <div
        className="absolute top-0 left-0 w-screen h-screen"
        style={{
          backgroundPosition: `${ruler.originX}px ${ruler.originY}px`,
          backgroundSize: `${grid.gapX}px ${grid.gapY}px`,
          ...styles.dotted,
        }}
      />
    </>
  );
}
