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
        className="o:absolute o:top-0 o:left-0 o:pointer-events-none"
        style={{
          width: `${ruler.width}`,
          height: `${ruler.height}`,
        }}
      >
        <VerticalRuler origin={ruler.originY} />
        <HorizontalRuler origin={ruler.originX} />
        {/* <div
          className="o:w-px o:h-full o:border-r o:border-dashed o:border-neutral-600/30 o:absolute"
          style={{
            transform: `translateX(${ruler.originX}px)`,
          }}
        />
        <div
          className="o:h-px o:w-full o:border-t o:border-dashed o:border-neutral-600/30 o:absolute"
          style={{
            transform: `translateY(${ruler.originY}px)`,
          }}
        /> */}
      </div>
    </HotkeysProvider>
  );
}
