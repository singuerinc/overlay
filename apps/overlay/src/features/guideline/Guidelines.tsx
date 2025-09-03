import { Guideline } from "@/features/guideline/Guideline";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";

export function Guidelines() {
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
      className="o:h-full o:w-full o:absolute o:top-0 o:left-0"
    >
      {guidelines.guidelines.map((guidelineId) => (
        <Guideline key={guidelineId} id={guidelineId} style="solid" />
      ))}
    </div>
  );
}
