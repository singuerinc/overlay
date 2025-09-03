import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGuidelineLockMutation } from "@/features/guideline/store/useGuidelineLockMutation";
import { useGuidelineUnlockMutation } from "@/features/guideline/store/useGuidelineUnlockMutation";
import { type IGuideline } from "../types";

export function useGuidelineUnlockCommand() {
  const { execute: executeCommand } = useCommands();
  const { mutate: unlockMutate } = useGuidelineUnlockMutation();
  const { mutate: lockMutate } = useGuidelineLockMutation();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        "Guideline - Unlock",
        () => unlockMutate(guideline.id),
        () => lockMutate(guideline.id)
      );
      return executeCommand(command);
    },
  };
}
