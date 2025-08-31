import { useCommands } from "@/features/commands/hooks/useCommands";
import { useEffect, useRef } from "react";

export function CommandsDebugger() {
  const { list } = useCommands();
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, -ref.current.scrollHeight);
    }
  }, [list]);

  return (
    <ul
      ref={ref}
      className="o:absolute o:gap-1 o:p-2 o:flex o:flex-col-reverse o:h-1/2 o:overflow-scroll o:z-50 o:bottom-0 o:right-0 o:bg-neutral-950/80 o:text-neutral-300"
    >
      {list.map((command, idx) => (
        <li key={idx}>{command.name}</li>
      ))}
    </ul>
  );
}
