import { cn } from "@/ui/cn";
import { useEffect, useRef, useState } from "react";

export function Coords() {
  const offset = { x: 0, y: 0 };

  const ref = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      const x = event.clientX - (rect?.left || 0) + offset.x;
      const y = event.clientY - (rect?.top || 0) + offset.y;
      setMouseCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "o:absolute o:left-0 o:top-0",
        "o:w-full o:h-full o:px-1",
        "o:text-neutral-950 o:text-[9px] o:tabular-nums"
      )}
      style={{
        top: offset.y,
        left: offset.x,
      }}
    >
      <div
        className="o:absolute o:w-12 o:h-5 o:flex o:justify-start o:border-l o:bg-gradient-to-r o:from-white o:to-transparent"
        style={{ left: mouseCoords.x, top: 0 }}
      >
        <span className="o:absolute o:left-2">{mouseCoords.x}</span>
      </div>
      <div
        className="o:absolute o:w-5 o:h-16 o:bg-gradient-to-b o:from-white o:to-transparent o:border-t o:inline-block"
        style={{ left: 0, top: mouseCoords.y }}
      >
        <span className="o:absolute o:top-2 o:w-5 o:h-5 o:pt-0.5 o:flex o:justify-end o:-rotate-90">
          {mouseCoords.y}
        </span>
      </div>
    </div>
  );
}
