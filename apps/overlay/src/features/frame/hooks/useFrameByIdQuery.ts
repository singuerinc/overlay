import { createFrame } from "@/features/frame/store/createFrame";
import { FRAMES_KEYS } from "@/features/frame/store/framesKeys";
import type { IFrame } from "@/features/frame/types";
import { useWorkspaceId } from "@/features/workspace/hooks/useWorkspaceId";
import { useQuery } from "@tanstack/react-query";

function getFrame(workspaceId: string, id: IFrame["id"]): Promise<IFrame> {
  return new Promise((resolve) => {
    const maybeFrame = localStorage.getItem(
      FRAMES_KEYS.frame(workspaceId, id).join("-")
    );

    if (maybeFrame === null) {
      const frame = createFrame({ id });
      localStorage.setItem(
        FRAMES_KEYS.frame(workspaceId, frame.id).join("-"),
        JSON.stringify(frame)
      );
      resolve(frame);
    } else {
      resolve(JSON.parse(maybeFrame));
    }
  });
}

export function useFrameByIdQuery({ id }: { id: IFrame["id"] }) {
  const workspaceId = useWorkspaceId();
  return useQuery({
    queryKey: FRAMES_KEYS.frame(workspaceId, id),
    queryFn: () => getFrame(workspaceId, id),
  });
}
