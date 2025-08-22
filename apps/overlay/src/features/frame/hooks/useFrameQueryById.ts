import { FRAME_KEYS } from "@/features/frame/hooks/frameKeys";
import type { IFrame } from "@/features/frame/types";
import { useWorkspaceId } from "@/features/workspace/hooks/useWorkspaceId";
import { useQuery } from "@tanstack/react-query";

function getFrame(workspaceId: string, id: IFrame["id"]): Promise<IFrame> {
  return new Promise((resolve, reject) => {
    const maybeFrame = localStorage.getItem(
      FRAME_KEYS.frame(workspaceId, id).join("-")
    );

    if (maybeFrame === null) {
      reject();
    } else {
      resolve(JSON.parse(maybeFrame));
    }
  });
}

export function useFrameQueryById({ id }: { id: IFrame["id"] }) {
  const workspaceId = useWorkspaceId();
  return useQuery({
    queryKey: FRAME_KEYS.frame(workspaceId, id),
    queryFn: () => getFrame(workspaceId, id),
  });
}
