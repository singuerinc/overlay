import { Guideline } from "@/features/guideline/Guideline";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";

export function Guidelines() {
  const { data: ruler } = useRulerQuery();
  const { data: guidelines, isLoading, isError } = useGuidelinesQuery();

  if (isLoading || isError || !guidelines) {
    return null;
  }

  if (!guidelines.visible) {
    return null;
  }

  return (
    <div
      data-overlay-tool-type="guidelines"
      className="o:h-0 o:w-0 o:pointer-events-none o:absolute o:top-0 o:left-0"
    >
      {guidelines.guidelines.map((guidelineId) => (
        <Guideline
          key={guidelineId}
          id={guidelineId}
          originX={ruler?.originX ?? 0}
          originY={ruler?.originY ?? 0}
          style="solid"
        />
      ))}
    </div>
  );
}
