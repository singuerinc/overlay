import { ToolBoxLockToggle } from "@/features/toolbox/components/ToolBoxLockToggle";
import { ToolBoxVisibilityToggle } from "@/features/toolbox/components/ToolBoxVisibilityToggle";
import type { ToolBoxTabNameType } from "@/features/toolbox/types";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { cn } from "@/ui/cn";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconArrowsMove } from "@tabler/icons-react";
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

export function ToolBoxTabs({
  activeTab,
  children,
}: PropsWithChildren<{ activeTab: ToolBoxTabNameType }>) {
  return (
    <div
      className={cn(
        "o:flex o:bg-white o:rounded-md o:gap-x-1 o:items-start o:w-96",
        {
          "o:rounded-l-none": activeTab === "ruler",
        }
      )}
    >
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
      className="o:flex o:opacity-15 o:hover:opacity-100 o:transition-opacity o:hover:delay-75 o:hover:duration-300 o:duration-500 o:delay-1000 o:shadow o:bg-neutral-950/80 o:p-1 o:z-50 o:fixed o:rounded-sm o:pointer-events-auto"
      ref={setNodeRef}
      style={style}
    >
      <div className="o:flex o:flex-col o:items-center o:py-1 o:justify-between o:gap-2">
        <div {...listeners} className="o:cursor-grab o:active:cursor-grabbing">
          <IconArrowsMove size={18} className="o:text-neutral-400" />
        </div>
        <div className="o:flex o:flex-col o:items-center o:gap-2">
          {/* <ToolBoxCommandHistory /> */}
          <ToolBoxLockToggle />
          <ToolBoxVisibilityToggle />
        </div>
      </div>
      <div className="o:flex o:flex-col o:ml-1">{children}</div>
    </div>
  );
}
