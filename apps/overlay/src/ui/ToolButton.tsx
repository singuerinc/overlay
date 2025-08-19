import { cva } from "class-variance-authority";
import * as React from "react";

const variants = cva(["rounded-sm p-1"], {
  variants: {
    enabled: {
      true: [
        "opacity-100 cursor-pointer active:scale-95 transition-transform",
        "",
      ],
      false: "opacity-40 cursor-auto",
    },
    activated: {
      true: "bg-white text-neutral-900",
      false: "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600",
    },
  },
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
