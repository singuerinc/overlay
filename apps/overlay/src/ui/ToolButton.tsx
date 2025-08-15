import { cva } from "class-variance-authority";
import * as React from "react";

const variants = cva(["text-white rounded-sm p-1"], {
  variants: {
    enabled: {
      true: "opacity-100 hover:text-black cursor-pointer active:scale-95 transition-transform hover:bg-neutral-100",
      false: "opacity-40 cursor-auto",
    },
  },
  defaultVariants: {
    enabled: true,
  },
});

export function ToolButton({
  enabled = true,
  onClick,
  Icon,
}: {
  enabled: boolean;
  onClick: () => void;
  Icon: React.ReactNode;
}) {
  return (
    <button
      disabled={!enabled}
      className={variants({ enabled })}
      onClick={onClick}
    >
      {Icon}
    </button>
  );
}
