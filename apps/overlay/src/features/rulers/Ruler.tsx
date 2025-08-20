import { HorizontalRuler } from "@/features/rulers/components/HorizontalRuler";
import { VerticalRuler } from "@/features/rulers/components/VerticalRuler";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { HotkeysProvider } from "react-hotkeys-hook";

export function Ruler() {
  const { data: ruler } = useGetRulerQuery();

  if (!ruler || ruler.visible === false) {
    return null;
  }

  return (
    <HotkeysProvider>
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: `${ruler.width}`,
          height: `${ruler.height}`,
        }}
      >
        <VerticalRuler origin={ruler.originY} />
        <HorizontalRuler origin={ruler.originX} />
        <div
          className="w-px h-full border-r border-dashed border-neutral-600/30 absolute"
          style={{
            transform: `translateX(${ruler.originX}px)`,
          }}
        />
        <div
          className="h-px w-full border-t border-dashed border-neutral-600/30 absolute"
          style={{
            transform: `translateY(${ruler.originY}px)`,
          }}
        />
      </div>
    </HotkeysProvider>
  );
}
