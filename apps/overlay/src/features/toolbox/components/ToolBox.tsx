import type { ToolBoxTabNameType } from "@/features/toolbox/types";
import { cn } from "@/ui/cn";
import { type PropsWithChildren } from "react";

export function ToolBoxTab({ children }: PropsWithChildren) {
  return (
    <div className="o:flex o:flex-col o:min-h-18 o:gap-x-1 o:px-4 o:py-2 o:w-full">
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
    <div className="o:flex o:gap-2 o:items-start o:w-full">{children}</div>
  );
}
