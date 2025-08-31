import { useUndo } from "@/features/commands/hooks/useUndo";
import { useUndoAvailable } from "@/features/commands/hooks/useUndoAvailable";
import { ToolButton } from "@/ui/ToolButton";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  IconArrowBackUp,
  IconEye,
  IconEyeOff,
  IconGripVertical,
  IconLock,
  IconLockOpen,
} from "@tabler/icons-react";
import { useState, type PropsWithChildren } from "react";

export function ToolBoxTab({ children }: PropsWithChildren) {
  return (
    <div className="o:flex o:flex-col o:gap-x-1 o:px-4 o:py-2 o:w-full">
      {children}
    </div>
  );
}

export function ToolBoxButtons({ children }: PropsWithChildren) {
  return <div className="o:flex o:gap-1">{children}</div>;
}

export function ToolBoxTabs({ children }: PropsWithChildren) {
  return (
    <div className="o:flex o:bg-white o:rounded-r-md o:rounded-b-md o:gap-x-1 o:items-start o:w-96">
      {children}
    </div>
  );
}

export function ToolBoxTabTitle({ children }: PropsWithChildren) {
  return <h3 className="o:text-lg o:font-light o:mb-2 o:hidden">{children}</h3>;
}

export function ToolBoxSeparator() {
  return <div className="o:h-6 o:border-l o:border-neutral-300" />;
}

export function ToolBoxTabGrid({ children }: PropsWithChildren) {
  return (
    <div className="o:grid o:grid-cols-4 o:gap-2 o:items-start o:w-full">
      {children}
    </div>
  );
}

export function ToolBoxRoot({
  children,
  x,
  y,
}: PropsWithChildren<{ x: number; y: number }>) {
  const [open, setOpen] = useState(true);
  const [locked, setLocked] = useState(false);
  const { listeners, setNodeRef, transform } = useDraggable({
    id: "tools",
  });

  const style = {
    transform: transform
      ? CSS.Translate.toString({
          x: transform.x + x,
          y: transform.y + y,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({ x, y, scaleX: 1, scaleY: 1 }),
  };
  return (
    <div
      id="toolBox"
      className="o:flex o:shadow o:bg-neutral-200 o:p-1 o:z-50 o:absolute o:rounded-sm o:pointer-events-auto"
      ref={setNodeRef}
      style={style}
    >
      <div className="o:flex o:flex-col o:items-center o:py-1 o:pr-1 o:justify-between o:gap-2">
        <IconGripVertical
          {...listeners}
          // {...attributes}
          className="o:cursor-grab o:active:cursor-grabbing o:text-neutral-400"
        />
        <div className="o:flex o:flex-col o:items-center o:gap-2">
          <ToolBoxLockToggle isLocked={locked} setIsLocked={setLocked} />
          <ToolBoxVisibilityToggle isOpen={open} setIsOpen={setOpen} />
          <ToolBoxCommandHistory />
        </div>
      </div>
      {open && <div className="o:flex o:flex-col">{children}</div>}
    </div>
  );
}

function ToolBoxLockToggle({
  isLocked,
  setIsLocked,
}: {
  isLocked: boolean;
  setIsLocked: (isLocked: boolean) => void;
}) {
  return (
    <ToolButton
      activated={isLocked}
      Icon={!isLocked ? <IconLockOpen size={16} /> : <IconLock size={16} />}
      onClick={() => setIsLocked(!isLocked)}
    />
  );
}

function ToolBoxVisibilityToggle({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <ToolButton
      activated={isOpen}
      Icon={!isOpen ? <IconEyeOff size={16} /> : <IconEye size={16} />}
      onClick={() => setIsOpen(!isOpen)}
    />
  );
}

function ToolBoxCommandHistory() {
  const undo = useUndo();
  const canUndo = useUndoAvailable();
  return (
    <ToolButton
      enabled={canUndo}
      Icon={<IconArrowBackUp size={16} />}
      onClick={() => undo()}
    />
  );
}
