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
import { Guideline } from "./Guideline";

import { useGetGuidelinesQuery } from "../guideline/store/useGetGuidelinesQuery";
import { useMoveGuidelineCommand } from "../guideline/store/useMoveGuidelineCommand";
import { GUIDELINE_HORIZONTAL, GUIDELINE_VERTICAL } from "../guideline/types";

export function GuidelinesRoot() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      tolerance: 10,
      delay: 100,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { data: guidelines, isLoading, isError } = useGetGuidelinesQuery();
  const command = useMoveGuidelineCommand();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const activeItem = guidelines.find((item) => item.id === active.id);
    command.execute(activeItem.id, delta);
  };

  if (isLoading || isError) {
    return null;
  }

  return (
    <div className="h-screen w-screen relative">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        {guidelines
          .filter((item) => item.type === GUIDELINE_HORIZONTAL)
          .map((item) => (
            <Guideline key={item.id} tool={item} />
          ))}
      </DndContext>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        {guidelines
          .filter((item) => item.type === GUIDELINE_VERTICAL)
          .map((item) => (
            <Guideline key={item.id} tool={item} />
          ))}
      </DndContext>
    </div>
  );
}
