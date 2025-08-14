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
import { useState } from "react";
import { HorizontalGuideline } from "./HorizontalGuideline";
import { VerticalGuideline } from "./VerticalGuideline";

export function GuidelinesRoot() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const [hItems, setHorizontalItems] = useState([
    { id: "gride-h-0", y: 100 },
    { id: "gride-h-1", y: 200 },
  ]);

  const [vItems, setVerticalItems] = useState([
    { id: "gride-v-0", x: 100 },
    { id: "gride-v-1", x: 200 },
  ]);

  const handleHorizontalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setHorizontalItems((prev) =>
      prev.map((item) =>
        item.id === active.id ? { ...item, x: 0, y: item.y + delta.y } : item
      )
    );
  };

  const handleVerticalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setVerticalItems((prev) =>
      prev.map((item) =>
        item.id === active.id ? { ...item, x: item.x + delta.x, y: 0 } : item
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
        {hItems.map((item) => (
          <HorizontalGuideline key={item.id} {...item} />
        ))}
      </DndContext>
      <DndContext
        sensors={sensors}
        onDragEnd={handleVerticalDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        {vItems.map((item) => (
          <VerticalGuideline key={item.id} {...item} />
        ))}
      </DndContext>
    </div>
  );
}
