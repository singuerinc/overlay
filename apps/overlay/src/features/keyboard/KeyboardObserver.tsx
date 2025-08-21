import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const KeyboardObserver: React.FC = () => {
  const toggleOverlay = useCallback(() => {
    document.getElementById("overlay-app")!.classList.toggle("hidden");
  }, []);

  useHotkeys(["o>o"], toggleOverlay, { preventDefault: true });

  return null;
};
