import { ToolBoxCommandHistory } from "@/features/toolbox/components/ToolBoxCommandHistory";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { ToolButton } from "@/ui/ToolButton";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  IconArrowsMove,
  IconEye,
  IconEyeOff,
  IconLock,
  IconLockOpen,
} from "@tabler/icons-react";
import { type PropsWithChildren } from "react";

export function ToolBoxTab({ children }: PropsWithChildren) {
  return (
    <div className="o:flex o:flex-col o:gap-x-1 o:px-4 o:py-2 o:w-full">
      {children}
    </div>
  );
}

export function ToolBoxButtons({ children }: PropsWithChildren) {
  return (
    <div className="o:flex o:justify-between o:items-center">{children}</div>
  );
}

export function ToolBoxIndicator({
  toolIsVisible,
}: {
  toolIsVisible: boolean;
}) {
  return (
    <div
      className={`o:bg-red-500 o:w-2 o:h-2 o:rounded-full ${toolIsVisible ? "o:block" : "o:hidden"}`}
    />
  );
}

export function ToolBoxTabs({ children }: PropsWithChildren) {
  return (
    <div className="o:flex o:bg-white o:rounded-r-md o:rounded-b-md o:gap-x-1 o:items-start o:w-96">
      {children}
    </div>
  );
}

export function ToolBoxTabTitle({ children }: PropsWithChildren) {
  return (
    <div className="o:bg-white o:flex o:items-center o:pr-2 o:select-none o:hidden">
      {children}
    </div>
  );
}

export function ToolBoxSeparator() {
  return <div className="o:h-6 o:border-l o:border-neutral-300" />;
}

export function ToolBoxGridTitle({ children }: PropsWithChildren) {
  return (
    <div className="o:col-span-6 o:first:mt-0 o:mt-2 o:border-b o:font-semibold o:text-xs o:pb-1 o:border-neutral-300">
      {children}
    </div>
  );
}

export function ToolBoxTabGrid({ children }: PropsWithChildren) {
  return (
    <div className="o:grid o:grid-cols-6 o:gap-2 o:items-start o:w-full">
      {children}
    </div>
  );
}

export function ToolBoxRoot({
  children,
  x,
  y,
}: PropsWithChildren<{ x: number; y: number }>) {
  const { data: workspace } = useWorkspaceQuery();
  const { setVisible: setWorkspaceVisible, setLocked: setWorkspaceLocked } =
    useWorkspace();
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

  if (!workspace) {
    return null;
  }

  return (
    <div
      id="toolBox"
      className="o:flex o:shadow o:bg-neutral-950/80 o:p-1 o:z-50 o:absolute o:rounded-sm o:pointer-events-auto"
      ref={setNodeRef}
      style={style}
    >
      <div className="o:flex o:flex-col o:items-center o:py-1 o:justify-between o:gap-2">
        <div
          {...listeners}
          // {...attributes}
          className="o:cursor-grab o:active:cursor-grabbing o:grow"
        >
          <IconArrowsMove className="o:text-white" size={18} />
        </div>
        <div className="o:flex o:flex-col o:items-center o:gap-2">
          <ToolBoxCommandHistory />
          <ToolBoxLockToggle
            isLocked={workspace.locked}
            setIsLocked={setWorkspaceLocked}
          />
          <ToolBoxVisibilityToggle
            isOpen={workspace.visible}
            setIsOpen={setWorkspaceVisible}
          />
        </div>
      </div>
      {workspace.visible && (
        <div className="o:flex o:flex-col o:ml-1">{children}</div>
      )}
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
