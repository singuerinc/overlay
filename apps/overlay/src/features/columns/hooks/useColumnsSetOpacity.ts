import { useColumnsSetOpacityCommand } from "@/features/columns/store/useColumnsSetOpacityCommand";

export function useColumnsSetOpacity() {
  const setOpacity = useColumnsSetOpacityCommand();

  return {
    set: (opacity: number) => {
      setOpacity.execute(opacity);
    },
  };
}
