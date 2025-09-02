import { cva } from "class-variance-authority";
import * as React from "react";

const variants = cva(["o:p-1"], {
  variants: {
    enabled: {
      true: [
        "o:opacity-100 o:bg-neutral-950 o:cursor-pointer o:active:scale-95 o:transition-transform",
        "",
      ],
      false: "o:opacity-20 o:cursor-auto",
    },
    activated: {
      true: " o:text-neutral-900",
      false: "o:text-neutral-400",
    },
    inTab: {
      true: "o:rounded-t-md",
      false: "",
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
  inTab = false,
  activated = false,
  enabled = true,
  onClick,
  Icon,
}: {
  inTab?: boolean;
  activated?: boolean;
  enabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  Icon: React.ReactNode;
}) {
  return (
    <button
      disabled={!enabled}
      className={variants({ activated, inTab, enabled })}
      onMouseDown={onClick}
    >
      {Icon}
    </button>
  );
}
