import { useSetSelectedTool } from "@/features/tools/store/tools";
import React, { useEffect } from "react";

export const DocumentObserver: React.FC = () => {
  const setSelectedTool = useSetSelectedTool();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      console.log(event.target, event.currentTarget);
      if (event.target === document.body) {
        setSelectedTool(null);
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [setSelectedTool]);

  return null;
};
