import { cva } from "class-variance-authority";
import * as React from "react";

const variants = cva(["o:rounded-sm o:p-1"], {
  variants: {
    enabled: {
      true: [
        "o:opacity-100 o:cursor-pointer o:active:scale-95 o:transition-transform",
        "",
      ],
      false: "o:opacity-20 o:cursor-auto",
    },
    activated: {
      true: " o:text-neutral-900",
      false: "o:text-neutral-400 ",
    },
  },
  compoundVariants: [
    {
      enabled: true,
      activated: true,
      class: "o:bg-white",
    },
    {
      enabled: true,
      activated: false,
      class: "o:hover:bg-neutral-100 o:hover:text-neutral-600",
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
