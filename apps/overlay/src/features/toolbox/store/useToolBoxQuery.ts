import { createToolBox } from "@/features/toolbox/store/createToolBox";
import { TOOLBOX_KEYS } from "@/features/toolbox/store/toolBoxKeys";
import type { IToolBox } from "@/features/toolbox/types";
import { useQuery } from "@tanstack/react-query";

function getToolBox(): Promise<IToolBox> {
  return new Promise((resolve) => {
    const maybeToolBox = localStorage.getItem(TOOLBOX_KEYS.toolbox().join("-"));

    if (maybeToolBox === null) {
      const toolBox = createToolBox();
      localStorage.setItem(
        TOOLBOX_KEYS.toolbox().join("-"),
        JSON.stringify(toolBox)
      );
      resolve(toolBox);
    } else {
      resolve(JSON.parse(maybeToolBox));
    }
  });
}

export function useToolBoxQuery() {
  return useQuery({
    queryKey: TOOLBOX_KEYS.toolbox(),
    queryFn: () => getToolBox(),
  });
}
