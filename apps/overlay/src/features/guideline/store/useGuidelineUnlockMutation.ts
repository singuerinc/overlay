import { useCoords } from "@/features/coords/hooks/useCoords";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import {
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "@/features/guideline/types";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useGuidelineUnlockMutation() {
  const { setX, setY } = useCoords();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    mutate: (id: IGuideline["id"]) =>
      mutation
        .mutateAsync({
          id,
          locked: false,
        })
        .then((g) => {
          if (g) {
            setSelectedTool(g);
            if (g.type === GUIDELINE_VERTICAL) {
              setX(g.x);
              setY(null);
            }
            if (g.type !== GUIDELINE_VERTICAL) {
              setX(null);
              setY(g.y);
            }
          }
        }),
  };
}
