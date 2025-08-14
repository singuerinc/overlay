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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IGuideLineStore } from "./types";

function getGuidelines(): Promise<IGuideLineStore> {
  return new Promise((resolve) => {
    const maybeGuidelines = localStorage.getItem("guidelines");

    if (maybeGuidelines === null) {
      resolve({
        hGuidelines: [
          { id: "gride-h-0", type: "horizontal", y: 100 },
          { id: "gride-h-1", type: "horizontal", y: 200 },
        ],
        vGuidelines: [
          { id: "gride-v-0", type: "vertical", x: 100 },
          { id: "gride-v-1", type: "vertical", x: 200 },
        ],
      });
    } else {
      resolve(JSON.parse(maybeGuidelines));
    }
  });
}

function postGuidelines(data: IGuideLineStore): Promise<void> {
  return new Promise((resolve) => {
    localStorage.setItem("guidelines", JSON.stringify(data));
    resolve();
  });
}

export function GuidelinesRoot() {
  const queryClient = useQueryClient();
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { data } = useQuery<IGuideLineStore>({
    queryKey: ["guidelines"],
    queryFn: getGuidelines,
  });

  const hGuidelines = data?.hGuidelines ?? [];
  const vGuidelines = data?.vGuidelines ?? [];

  const mutation = useMutation({
    mutationFn: postGuidelines,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guidelines"] });
    },
  });

  const handleHorizontalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    mutation.mutate({
      hGuidelines: hGuidelines.map((item) =>
        item.id === active.id ? { ...item, y: item.y + delta.y } : item
      ),
      vGuidelines,
    });
  };

  const handleVerticalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    mutation.mutate({
      hGuidelines,
      vGuidelines: vGuidelines.map((item) =>
        item.id === active.id ? { ...item, x: item.x + delta.x } : item
      ),
    });
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
