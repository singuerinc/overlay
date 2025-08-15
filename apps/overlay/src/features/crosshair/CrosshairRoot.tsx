import { Crosshair } from "@/features/crosshair/Crosshair";
import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";

export function CrosshairRoot() {
  const { data: crosshairList, isLoading, isError } = useGetCrosshairQuery();

  if (isLoading || isError) {
    return null;
  }

  return (
    <div className="h-screen w-screen pointer-events-none absolute top-0 left-0 overflow-hidden">
      {crosshairList
        .filter((item) => item.visible)
        .map((item) => (
          <Crosshair key={item.id} tool={item} />
        ))}
    </div>
  );
}
