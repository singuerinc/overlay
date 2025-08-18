import { useSetSelectedTool } from "@/features/tools/store/tools";
import React, { useEffect } from "react";

export const DocumentObserver: React.FC = () => {
  const setSelectedTool = useSetSelectedTool();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.target === document.body) {
        setSelectedTool(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
};
