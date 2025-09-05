import { useEffect, useRef, useState } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";

/**
 * Because the anchor element may change size and it is not in our
 * component tree, we need to observe it for resize events and also
 * make sure we keep the class "overlay-anchor" even after re-renders
 */
export function useAnchor({ anchorSelector }: { anchorSelector?: string }) {
  const [, setResizeCount] = useState(0);

  const anchorEl = useRef(
    anchorSelector
      ? (document.querySelector(anchorSelector) ?? document.body)
      : document.body
  );

  const onResize = useDebounceCallback(() => {
    setResizeCount((c) => c + 1);
  }, 500);

  useResizeObserver({
    ref: anchorEl as React.RefObject<HTMLElement>,
    onResize,
  });

  const refMutation = useRef(
    new MutationObserver(() => {
      if (!anchorEl.current.classList.contains("overlay-anchor")) {
        anchorEl.current.classList.add("overlay-anchor");
      }
    })
  );

  useEffect(() => {
    if (!anchorEl.current.classList.contains("overlay-anchor")) {
      anchorEl.current.classList.add("overlay-anchor");
    }

    refMutation.current.observe(anchorEl.current, {
      attributeFilter: ["class"],
      attributes: true,
    });

    return () => {
      refMutation.current.disconnect();
    };
  }, [anchorSelector]);
}
