import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { HorizontalGuideline } from "./HorizontalGuideline";
import { VerticalGuideline } from "./VerticalGuideline";

import { create } from "zustand";

type IHorizontalGuideline = {
  id: string;
  y: number;
};

type IVerticalGuideline = {
  id: string;
  x: number;
};

interface GuidelineState {
  hGuidelines: IHorizontalGuideline[];
  vGuidelines: IVerticalGuideline[];
  setHorizontalGuidelines: (guidelines: IHorizontalGuideline[]) => void;
  setVerticalGuidelines: (guidelines: IVerticalGuideline[]) => void;
}

const useStore = create<GuidelineState>()((set) => ({
  hGuidelines: [
    { id: "gride-h-0", y: 100 },
    { id: "gride-h-1", y: 200 },
  ],
  setHorizontalGuidelines: (guidelines: IHorizontalGuideline[]) =>
    set(() => ({ hGuidelines: guidelines })),
  vGuidelines: [
    { id: "gride-v-0", x: 100 },
    { id: "gride-v-1", x: 200 },
  ],
  setVerticalGuidelines: (guidelines: IVerticalGuideline[]) =>
    set(() => ({ vGuidelines: guidelines })),
}));

export function GuidelinesRoot() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const hGuidelines = useStore((state) => state.hGuidelines);
  const vGuidelines = useStore((state) => state.vGuidelines);
  const setHorizontalGuidelines = useStore(
    (state) => state.setHorizontalGuidelines
  );
  const setVerticalGuidelines = useStore(
    (state) => state.setVerticalGuidelines
  );

  const handleHorizontalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setHorizontalGuidelines(
      hGuidelines.map((item) =>
        item.id === active.id ? { ...item, y: item.y + delta.y } : item
      )
    );
  };

  const handleVerticalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setVerticalGuidelines(
      vGuidelines.map((item) =>
        item.id === active.id ? { ...item, x: item.x + delta.x } : item
      )
    );
  };

  return (
    <div className="h-screen w-screen relative">
      <DndContext
        sensors={sensors}
        onDragEnd={handleHorizontalDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        {hGuidelines.map((item) => (
          <HorizontalGuideline key={item.id} {...item} />
        ))}
      </DndContext>
      <DndContext
        sensors={sensors}
        onDragEnd={handleVerticalDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        {vGuidelines.map((item) => (
          <VerticalGuideline key={item.id} {...item} />
        ))}
      </DndContext>
    </div>
  );
}
