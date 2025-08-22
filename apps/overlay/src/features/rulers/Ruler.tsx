import { HorizontalRuler } from "@/features/rulers/components/HorizontalRuler";
import { VerticalRuler } from "@/features/rulers/components/VerticalRuler";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { HotkeysProvider } from "react-hotkeys-hook";

export function Ruler() {
  const { data: ruler } = useRulerQuery();

  if (!ruler || ruler.visible === false) {
    return null;
  }

  return (
    <HotkeysProvider>
      <div
        className="overlay:absolute overlay:top-0 overlay:left-0 overlay:pointer-events-none"
        style={{
          width: `${ruler.width}`,
          height: `${ruler.height}`,
        }}
      >
        <VerticalRuler origin={ruler.originY} />
        <HorizontalRuler origin={ruler.originX} />
        <div
          className="overlay:w-px overlay:h-full overlay:border-r overlay:border-dashed overlay:border-neutral-600/30 overlay:absolute"
          style={{
            transform: `translateX(${ruler.originX}px)`,
          }}
        />
        <div
          className="overlay:h-px overlay:w-full overlay:border-t overlay:border-dashed overlay:border-neutral-600/30 overlay:absolute"
          style={{
            transform: `translateY(${ruler.originY}px)`,
          }}
        />
      </div>
    </HotkeysProvider>
  );
}
