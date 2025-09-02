import { IconX } from "@tabler/icons-react";

export function FrameMeasurements({ width, height }: { width: number; height: number }) {
  return (
    <div className="o:bg-neutral-950 o:pointer-events-none o:justify-center o:flex o:items-center o:-bottom-9 o:absolute o:left-1/2 o:text-xs o:-translate-1/2 o:text-neutral-50 o:rounded-xs o:px-1 o:py-0.5">
      <span>{width}</span>
      <span>
        <IconX size={12} stroke={3} />
      </span>
      <span>{height}</span>
    </div>
  );
}
