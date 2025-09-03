import { useCoords } from "@/features/coords/hooks/useCoords";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import type { IGuideline } from "@/features/guideline/types";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useGuidelineLockMutation() {
  const { setX, setY } = useCoords();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    mutate: (id: IGuideline["id"]) =>
      mutation
        .mutateAsync({
          id,
          locked: true,
        })
        .then(() => {
          setSelectedTool(null);
          setX(null);
          setY(null);
        }),
  };
}
