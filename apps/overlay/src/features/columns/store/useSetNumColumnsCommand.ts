import { useSetColumnsMutation } from "@/features/columns/store/useSetColumnsMutation";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";

export function useSetNumColumnsCommand() {
  const executeCommand = useExecuteCommand();
  const setColumns = useSetColumnsMutation();

  return {
    execute: (numColumns: number) => {
      const command = new Command(
        () => {
          setColumns.mutate({
            numColumns,
          });
        },
        () => {
          setColumns.mutate({
            numColumns: -numColumns,
          });
        }
      );
      executeCommand(command);
    },
  };
}
