import { Guideline } from "./Guideline";
import { useGetGuidelinesQuery } from "./store/useGetGuidelinesQuery";
import { GUIDELINE_HORIZONTAL, GUIDELINE_VERTICAL } from "./types";

export function GuidelinesRoot() {
  // const mouseSensor = useSensor(MouseSensor, {
  //   activationConstraint: {
  //     tolerance: 10,
  //     delay: 100,
  //   },
  // });
  // const touchSensor = useSensor(TouchSensor);
  // const keyboardSensor = useSensor(KeyboardSensor, {});
  // const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { data: guidelines, isLoading, isError } = useGetGuidelinesQuery();
  // const command = useMoveGuidelineCommand();
  // const setSelectedTool = useSetSelectedTool();

  if (isLoading || isError || !guidelines) {
    return null;
  }

  // const handleDragStart = (event: DragStartEvent) => {
  //   const { active } = event;
  //   const activeItem = guidelines.find((item) => item.id === active.id);
  //   if (activeItem) {
  //     setSelectedTool(activeItem);
  //   }
  // };

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, delta } = event;
  //   const activeItem = guidelines.find((item) => item.id === active.id);
  //   if (activeItem) {
  //     command.execute(activeItem.id, delta);
  //   }
  // };

  return (
    <div className="h-screen w-screen pointer-events-none absolute top-0 left-0">
      {/* <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      > */}
      {guidelines
        .filter((item) => item.type === GUIDELINE_HORIZONTAL)
        .map((item) => (
          <Guideline key={item.id} id={item.id} />
        ))}
      {/* </DndContext>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      > */}
      {guidelines
        .filter((item) => item.type === GUIDELINE_VERTICAL)
        .map((item) => (
          <Guideline key={item.id} id={item.id} />
        ))}
      {/* </DndContext> */}
    </div>
  );
}
