import { cva } from "class-variance-authority";
import * as React from "react";

const variants = cva(["overlay:rounded-sm overlay:p-1"], {
  variants: {
    enabled: {
      true: [
        "overlay:opacity-100 overlay:cursor-pointer overlay:active:scale-95 overlay:transition-transform",
        "",
      ],
      false: "overlay:opacity-20 overlay:cursor-auto",
    },
    activated: {
      true: " overlay:text-neutral-900",
      false: "overlay:text-neutral-400 ",
    },
  },
  compoundVariants: [
    {
      enabled: true,
      activated: true,
      class: "overlay:bg-white",
    },
    {
      enabled: true,
      activated: false,
      class: "overlay:hover:bg-neutral-100 overlay:hover:text-neutral-600",
    },
  ],
  defaultVariants: {
    enabled: true,
    activated: false,
  },
});

export function ToolButton({
  activated = false,
  enabled = true,
  onClick,
  Icon,
}: {
  activated?: boolean;
  enabled?: boolean;
  onClick: () => void;
  Icon: React.ReactNode;
}) {
  return (
    <button
      disabled={!enabled}
      className={variants({ activated, enabled })}
      onClick={onClick}
    >
      {Icon}
    </button>
  );
}
