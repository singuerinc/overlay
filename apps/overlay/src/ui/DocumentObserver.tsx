import { useSetSelectedTool } from "@/features/tools/store/tools";
import React, { useEffect } from "react";

export const DocumentObserver: React.FC = () => {
  const setSelectedTool = useSetSelectedTool();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      console.log("click", event.target);
      if (event.target === document.querySelector(".overlay-root")) {
        setSelectedTool(null);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [setSelectedTool]);

  return null;
};
