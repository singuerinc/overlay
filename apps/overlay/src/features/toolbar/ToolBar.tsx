import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ColumnsToolBox } from "@/features/columns/toolbox/ColumnsToolBox";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCrosshair } from "@/features/crosshair/hooks/useCrosshair";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { GridToolBox } from "@/features/grid/toolbox/GridToolBox";
import { useGuidelines } from "@/features/guideline/hooks/useGuidelines";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { useOnionImages } from "@/features/onion-image/hooks/useOnionImages";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { useRuler } from "@/features/rulers/hooks/useRuler";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { ToolBoxRoot } from "@/features/toolbox/components/ToolBox";
import { useToolBox } from "@/features/toolbox/hooks/useToolBox";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { DndContext } from "@dnd-kit/core";
import {
  IconArrowBackUp,
  IconChevronUp,
  IconColumns,
  IconCrosshair,
  IconEye,
  IconEyeOff,
  IconGrid4x4,
  IconLock,
  IconLockOpen,
  IconPhoto,
  IconPhotoPlus,
  IconRuler,
  IconSquarePlus2,
  IconTable,
  IconTablePlus,
} from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

function ToolBarButton({
  onClick,
  Icon,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  Icon: React.ReactNode;
}) {
  const variants = cva(
    [
      "o:cursor-pointer",
      "o:rounded-md o:p-1",
      "o:bg-transparent o:text-neutral-50",
      "o:hover:bg-neutral-600 o:active:bg-white o:active:text-neutral-950 o:active:scale-90",
    ],
    {
      variants: {},
    }
  );

  return (
    <button className={variants({})} onClick={onClick}>
      {Icon}
    </button>
  );
}

function ToolBarToggleButton({
  enabled = true,
  selected = false,
  active = false,
  onClick,
  Icon,
}: {
  enabled?: boolean;
  selected?: boolean;
  active?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  Icon: React.ReactNode;
}) {
  const variants = cva(
    [
      "o:relative",
      "o:cursor-pointer",
      "o:transition-colors",
      "o:rounded-md o:p-1 o:gap-y-0.5",
      "o:flex o:flex-col o:justify-center o:items-center",
    ],
    {
      variants: {
        enabled: {
          true: "",
          false: "o:opacity-50",
        },
        selected: {
          true: "",
          false: "",
        },
        active: {
          true: "",
          false: "o:bg-transparent o:text-neutral-50 o:hover:bg-neutral-600",
        },
      },
      compoundVariants: [
        {
          selected: false,
          active: false,
          class: "",
        },
        {
          selected: true,
          active: true,
          class: " o:bg-red-400",
        },
        {
          selected: false,
          active: true,
          class: "o:bg-white o:hover:bg-white o:text-neutral-950",
        },
      ],
    }
  );

  return (
    <button
      disabled={!enabled}
      className={variants({ active, enabled, selected })}
      onClick={onClick}
    >
      {Icon}
    </button>
  );
}

function ToolBarSeparator() {
  return <div className="o:w-px o:bg-neutral-400" />;
}

function ToolBarConfigPanel({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="o:bg-white o:p-2 o:shadow o:rounded-md o:absolute o:-top-2 o:-translate-y-full o:-translate-x-1/2">
      <div className="o:flex o:flex-col o:w-full">{children}</div>
    </div>
  );
}

function ToolBarButtonWithConfigButton({
  children,
  ConfigPanel,
}: {
  children: React.ReactNode;
  ConfigPanel: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  useOnClickOutside(containerRef, () => setOpen(false));
  return (
    <div
      ref={containerRef}
      className="o:flex o:items-center o:gap-1 o:cursor-pointer"
    >
      {children}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="o:text-neutral-400 o:hover:text-white o:cursor-pointer o:h-full"
      >
        <IconChevronUp size={12} />
      </button>
      {open && ConfigPanel}
    </div>
  );
}

export function ToolBar() {
  const { data: toolBox } = useToolBoxQuery();
  const { move: toolBoxMove } = useToolBox();

  if (!toolBox) {
    return null;
  }

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        toolBoxMove(toolBox.x + delta.x, toolBox.y + delta.y);
      }}
    >
      <ToolBoxRoot x={toolBox.x} y={toolBox.y}>
        <div className="o:bg-neutral-950 o:shadow-lg o:flex o:gap-2 o:pointer-events-auto o:rounded-md o:p-1">
          <CrosshairToolBarButton />
          <RulersToolBarButton />
          <OnionImageAddToolBarButton />
          <GuidelineAddToolBarButton />
          <ToolBarSeparator />
          <RulerToolBarButton />
          <GuidelinesToolBarButton />
          <OnionImagesToolBarButton />
          <GridToolBarButton />
          <ColumnsToolBarButton />
          <ToolBarSeparator />
          <WorkspaceToggleVisibilityToolBarButton />
          <WorkspaceLockToolBarButton />
          <UndoToolBarButton />
        </div>
      </ToolBoxRoot>
    </DndContext>
  );
}

function CrosshairToolBarButton() {
  const setSelectedTool = useSetSelectedTool();
  const { data: crosshair } = useCrosshairQuery();
  const { toggle } = useCrosshair();

  if (!crosshair) return null;

  return (
    <ToolBarToggleButton
      active={crosshair.visible ?? false}
      selected={crosshair.visible ?? false}
      onClick={() => {
        toggle()?.then(() => {
          if (crosshair.visible) {
            setSelectedTool(crosshair);
          } else {
            setSelectedTool(null);
          }
        });
      }}
      Icon={<IconCrosshair stroke={1} />}
    />
  );
}

function OnionImageAddToolBarButton() {
  const { data: onionImages } = useOnionImagesQuery();
  const { addImage, toggle } = useOnionImages();

  if (!onionImages) return null;

  return (
    <ToolBarButton
      onClick={() => {
        addImage().then(() => {
          if (!onionImages.visible) {
            toggle();
          }
        });
      }}
      Icon={<IconPhotoPlus stroke={1} />}
    />
  );
}

function GuidelineAddToolBarButton() {
  const { data: guidelines } = useGuidelinesQuery();
  const { addHorizontal, toggle, visible } = useGuidelines();

  if (!guidelines) return null;

  return (
    <ToolBarButton
      onClick={() => {
        addHorizontal().then(() => {
          if (!visible) {
            toggle();
          }
        });
      }}
      Icon={<IconTablePlus stroke={1} />}
    />
  );
}

function RulersToolBarButton() {
  // const { data: ruler } = useRulerQuery();
  // const { toggle } = useRuler();

  // if (!ruler) return null;

  return (
    <ToolBarToggleButton
      enabled={false}
      active={false}
      onClick={() => {}}
      Icon={<IconSquarePlus2 stroke={1} />}
    />
  );
}

function RulerToolBarButton() {
  const { data: ruler } = useRulerQuery();
  const { toggle } = useRuler();

  if (!ruler) return null;

  return (
    <ToolBarToggleButton
      active={ruler.visible ?? false}
      onClick={() => {
        toggle();
      }}
      Icon={<IconRuler stroke={1} />}
    />
  );
}

function GridToolBarButton() {
  const { data: grid } = useGridQuery();
  const { toggle } = useGrid();

  if (!grid) return null;

  return (
    <ToolBarButtonWithConfigButton
      ConfigPanel={
        <ToolBarConfigPanel title="Grid">
          <GridToolBox />
        </ToolBarConfigPanel>
      }
    >
      <ToolBarToggleButton
        active={grid.visible ?? false}
        onClick={() => {
          toggle();
        }}
        Icon={<IconGrid4x4 stroke={1} />}
      />
    </ToolBarButtonWithConfigButton>
  );
}

function ColumnsToolBarButton() {
  const { data: columns } = useColumnsQuery();
  const { toggleVisibility } = useColumns();

  if (!columns) return null;

  return (
    <ToolBarButtonWithConfigButton
      ConfigPanel={
        <ToolBarConfigPanel title="Columns">
          <ColumnsToolBox />
        </ToolBarConfigPanel>
      }
    >
      <ToolBarToggleButton
        active={columns.visible ?? false}
        onClick={() => {
          toggleVisibility();
        }}
        Icon={<IconColumns stroke={1} />}
      />
    </ToolBarButtonWithConfigButton>
  );
}

function GuidelinesToolBarButton() {
  const { data: guidelines } = useGuidelinesQuery();
  const { toggle } = useGuidelines();

  if (!guidelines) return null;

  return (
    <ToolBarToggleButton
      active={guidelines.visible ?? false}
      onClick={() => {
        toggle();
      }}
      Icon={<IconTable stroke={1} />}
    />
  );
}

function OnionImagesToolBarButton() {
  const { data: onionImages } = useOnionImagesQuery();
  const { toggle } = useOnionImages();

  if (!onionImages) return null;

  return (
    <ToolBarToggleButton
      active={onionImages.visible ?? false}
      onClick={() => {
        toggle();
      }}
      Icon={<IconPhoto stroke={1} />}
    />
  );
}

function WorkspaceLockToolBarButton() {
  const { data: workspace } = useWorkspaceQuery();
  const { setLocked } = useWorkspace();

  if (!workspace) return null;

  return (
    <ToolBarToggleButton
      active={workspace.locked ?? false}
      onClick={() => {
        setLocked(!workspace.locked);
      }}
      Icon={
        workspace.locked ? <IconLock stroke={1} /> : <IconLockOpen stroke={1} />
      }
    />
  );
}

function WorkspaceToggleVisibilityToolBarButton() {
  const { data: workspace } = useWorkspaceQuery();
  const { setVisible } = useWorkspace();

  if (!workspace) return null;

  return (
    <ToolBarToggleButton
      active={workspace.visible ?? false}
      onClick={() => {
        setVisible(!workspace.visible);
      }}
      Icon={
        workspace.visible ? <IconEye stroke={1} /> : <IconEyeOff stroke={1} />
      }
    />
  );
}

function UndoToolBarButton() {
  const { undo, hasCommands } = useCommands();

  return (
    <ToolBarToggleButton
      enabled={hasCommands}
      active={false}
      onClick={() => undo()}
      Icon={<IconArrowBackUp stroke={1} />}
    />
  );
}
