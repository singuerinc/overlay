import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function GuidelinesSnapToGridButton() {
  return (
    <ToolBoxInputBoolean
      defaultValue={false}
      label="Snap"
      onChange={() => {
        //
      }}
    />
  );
}
