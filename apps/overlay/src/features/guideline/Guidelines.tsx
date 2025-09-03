import { Guideline } from "@/features/guideline/Guideline";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { zIndex } from "@/features/workspace/utils/zIndex";
import { cn } from "@/ui/cn";

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
      className={cn(
        "o:h-full o:w-full o:absolute o:top-0 o:left-0",
        zIndex.guidelines
      )}
    >
      {guidelines.guidelines.map((guidelineId) => (
        <Guideline key={guidelineId} id={guidelineId} style="solid" />
      ))}
    </div>
  );
}
