import { useCoords } from "@/features/coords/hooks/useCoords";
import { FrameMeasurements } from "@/features/frames/components/FrameMeasurements";
import { useFrame } from "@/features/frames/hooks/useFrame";
import { useFrameByIdQuery } from "@/features/frames/store/useFrameByIdQuery";
import { useFramesQuery } from "@/features/frames/store/useFramesQuery";
import type { IFrame } from "@/features/frames/types";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useSizes } from "@/features/sizes/hooks/useSizes";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { zIndex } from "@/features/workspace/utils/zIndex";
import { cn } from "@/ui/cn";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/packages/react-hotkeys-hook/dist/types";
import { Rnd } from "react-rnd";
import { useOnClickOutside } from "usehooks-ts";

function Frame({ id }: { id: IFrame["id"] }) {
  const { data: workspace } = useWorkspaceQuery();
  const { data: grid } = useGridQuery();
  const { setX, setY } = useCoords();
  const { setX0, setY0, setX1, setY1 } = useSizes();
  const { data: frame } = useFrameByIdQuery(id);
  const { move, resize } = useFrame();
  const [tempResize, setTempResize] = useState({
    width: frame?.width || 0,
    height: frame?.height || 0,
  });
  const selectedTool = useSelectedTool();
  const setSelectedTool = useSetSelectedTool();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () => {
    if (selectedTool?.id === frame?.id) {
      setSelectedTool(null);
    }
  });

  const isSelected = useMemo(
    () => selectedTool?.id === frame?.id,
    [selectedTool, frame?.id]
  );

  useFrameHotkeys({ frame, isSelected });

  useEffect(() => {
    if (isSelected && frame) {
      setX(frame.x);
      setY(frame.y);
      setX0(frame.x);
      setY0(frame.y);
      setX1(frame.x + frame.width);
      setY1(frame.y + frame.height);
    }
  }, [isSelected, frame, setX, setY]);

  const handleDown = useCallback(() => {
    if (frame) {
      setSelectedTool(frame);
      setX(frame.x);
      setY(frame.y);
      setTempResize({
        width: frame.width,
        height: frame.height,
      });
    }
  }, [frame, setSelectedTool, setX, setY]);

  if (!frame || !grid || !workspace) {
    return null;
  }

  const shouldSnap = workspace.snapToGrid;
  const gridGap = grid.gapX;
  const snapGrid: [number, number] = shouldSnap ? [gridGap, gridGap] : [1, 1];

  return (
    <Rnd
      dragGrid={snapGrid}
      resizeGrid={snapGrid}
      size={{ width: frame.width, height: frame.height }}
      position={{ x: frame.x, y: frame.y }}
      onResize={(_e, _direction, ref, _delta, _position) => {
        setTempResize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setX0(frame.x);
        setY0(frame.y);
        setX1(frame.x + ref.offsetWidth);
        setY1(frame.y + ref.offsetHeight);
      }}
      onDrag={(_e, d) => {
        setX(d.x);
        setY(d.y);
        setX0(d.x);
        setY0(d.y);
        setX1(d.x + frame.width);
        setY1(d.y + frame.height);
      }}
      onResizeStart={() => {
        setSelectedTool(frame);
      }}
      onDragStart={() => {
        setSelectedTool(frame);
      }}
      onDragStop={(_e, d) => {
        move(frame.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(_e, _direction, ref, _delta, _position) => {
        resize(frame.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
      className={cn(
        "o:bg-red-600/20 o:group o:border o:border-transparent o:pointer-events-auto o:hover:border o:hover:border-neutral-600",
        {
          "o:border-neutral-600": isSelected,
        }
      )}
      style={{
        width: frame.width,
        height: frame.height,
        backgroundImage: `
          linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 0, 0, 0.1) 1px, transparent 1px)`,
        backgroundPosition: "-1px -1px",
        backgroundSize: "10px 10px",
      }}
      onMouseDown={handleDown}
    >
      <div ref={ref} className="o:h-full">
        {/* {isSelected && <FrameActions frame={frame} />} */}
        {isSelected && (
          <FrameMeasurements
            width={tempResize.width}
            height={tempResize.height}
          />
        )}
      </div>
    </Rnd>
  );
}

export function Frames() {
  const { data: frames } = useFramesQuery();
  const containerRef = useRef<HTMLDivElement>(null);

  if (!frames || !frames.visible) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        zIndex.frames,
        "o:absolute o:pointer-events-none o:top-0 o:left-0 o:w-full o:h-full"
      )}
    >
      {frames.frames.map((frameId) => (
        <Frame key={frameId} id={frameId} />
      ))}
    </div>
  );
}

function useFrameHotkeys({
  frame,
  isSelected,
}: {
  frame?: IFrame;
  isSelected: boolean;
}) {
  const { move, remove } = useFrame();
  useHotkeys(
    "backspace",
    () => {
      if (frame) {
        remove(frame);
      }
    },
    {
      enabled: isSelected,
    }
  );
  useHotkeys(
    ["up", "shift+up"],
    (_: KeyboardEvent, e: HotkeysEvent) =>
      frame && move(frame.id, { x: frame.x, y: frame.y - (e.shift ? 10 : 1) }),
    {
      enabled: isSelected && !frame?.locked,
      preventDefault: true,
    }
  );
  useHotkeys(
    ["down", "shift+down"],
    (_: KeyboardEvent, e: HotkeysEvent) =>
      frame && move(frame.id, { x: frame.x, y: frame.y + (e.shift ? 10 : 1) }),
    {
      enabled: isSelected && !frame?.locked,
      preventDefault: true,
    }
  );
  useHotkeys(
    ["left", "shift+left"],
    (_: KeyboardEvent, e: HotkeysEvent) =>
      frame && move(frame.id, { x: frame.x - (e.shift ? 10 : 1), y: frame.y }),
    {
      enabled: isSelected && !frame?.locked,
      preventDefault: true,
    }
  );
  useHotkeys(
    ["right", "shift+right"],
    (_: KeyboardEvent, e: HotkeysEvent) =>
      frame && move(frame.id, { x: frame.x + (e.shift ? 10 : 1), y: frame.y }),
    {
      enabled: isSelected && !frame?.locked,
      preventDefault: true,
    }
  );
}
