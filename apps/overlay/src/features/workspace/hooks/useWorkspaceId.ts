import { useWorkspaceStore } from "@/features/workspace/hooks/useWorkspaceStore";

export const useWorkspaceId = () => useWorkspaceStore((state) => state.id);
