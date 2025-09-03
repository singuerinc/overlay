import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ColumnsToolBox } from "@/features/columns/toolbox/ColumnsToolBox";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCrosshair } from "@/features/crosshair/hooks/useCrosshair";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useFrames } from "@/features/frames/hooks/useFrames";
import { useFramesQuery } from "@/features/frames/store/useFramesQuery";
import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { GridToolBox } from "@/features/grid/toolbox/GridToolBox";
import { GuidelineActions } from "@/features/guideline/components/GuidelineActions";
import { useGuidelines } from "@/features/guideline/hooks/useGuidelines";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { useOnionImages } from "@/features/onion-image/hooks/useOnionImages";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { PresetCreateButton } from "@/features/preset/components/toolbox/PresetCreateButton";
import { PresetDuplicateButton } from "@/features/preset/components/toolbox/PresetDuplicateButton";
import { PresetRemoveButton } from "@/features/preset/components/toolbox/PresetRemoveButton";
import { PresetSelect } from "@/features/preset/components/toolbox/PresetSelect";
import { PresetUpdateNameButton } from "@/features/preset/components/toolbox/PresetUpdateNameButton";
import { useRuler } from "@/features/rulers/hooks/useRuler";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { useToolBox } from "@/features/toolbox/hooks/useToolBox";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { useExportWorkspace } from "@/features/workspace/utils/useExportWorkspace";
import { zIndex } from "@/features/workspace/utils/zIndex";
import { cn } from "@/ui/cn";
import {
  IconArrowBackUp,
  IconChevronUp,
  IconColumns,
  IconCrosshair,
  IconEye,
  IconEyeOff,
  IconGrid4x4,
  IconGripVertical,
  IconLock,
  IconLockOpen,
  IconMagnet,
  IconMagnetOff,
  IconPhoto,
  IconPhotoPlus,
  IconRuler,
  IconSquare,
  IconSquarePlus2,
  IconTable,
  IconTablePlus,
  IconUpload,
} from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useCopyToClipboard, useOnClickOutside } from "usehooks-ts";

function ToolBarButton({
  onClick,
  Icon,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  Icon: React.ReactNode;
}) {
  const variants = cva(
    [
      "o:flex o:justify-center o:items-center o:size-6",
      "o:cursor-pointer",
      "o:rounded-sm o:p-1",
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
      "o:relative o:size-6",
      "o:cursor-pointer",
      "o:transition-colors",
      "o:rounded-sm o:p-1 o:gap-y-0.5",
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
  return <div className="o:w-px o:bg-neutral-400 o:h-4" />;
}

function ToolBarConfigPanel({
  children,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div
      className="o:bg-neutral-950 o:p-2 o:flex o:shadow o:rounded-md o:absolute o:-top-3 o:-translate-y-full"
      style={{
        transform: "translateX(calc(-50% + 32px))",
      }}
    >
      <div className="o:bg-neutral-950 o:w-2 o:h-2 o:absolute o:-bottom-1 o:left-1/2 o:-translate-x-1/2 o:rotate-45"></div>
      <div className="o:flex o:flex-col o:gap-1 o:w-full">{children}</div>
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
      className="o:flex o:relative o:gap-0.5 o:items-center"
    >
      {children}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="o:text-neutral-400 o:hover:text-white o:hover:bg-neutral-700 o:cursor-pointer o:rounded-sm"
      >
        <IconChevronUp size={12} stroke={3} />
      </button>
      {open && ConfigPanel}
    </div>
  );
}

export function ToolBar() {
  const selectedTool = useSelectedTool();
  const { data: toolBox } = useToolBoxQuery();
  const { move: toolBoxMove } = useToolBox();

  if (!toolBox) {
    return null;
  }

  return (
    <Rnd
      dragHandleClassName="overlay-toolbar-handler"
      className={cn(zIndex.toolbar)}
      onDragStop={(_e, d) => toolBoxMove(d.x, d.y)}
      position={{ x: toolBox.x, y: toolBox.y }}
    >
      <div className="o:flex o:items-center o:gap-1 o:bg-neutral-950 o:shadow-lg o:p-1 o:rounded-sm o:pointer-events-auto">
        <IconGripVertical
          size={16}
          stroke={1}
          className="o:text-neutral-400 overlay-toolbar-handler o:cursor-grab o:active:cursor-grabbing"
        />
        <OnionImageAddToolBarButton />
        <FrameAddToolBarButton />
        <GuidelineAddToolBarButton />
        <CrosshairToolBarButton />

        <ToolBarSeparator />

        <GridToolBarButton />
        <ColumnsToolBarButton />

        <ToolBarSeparator />

        <WorkspaceSnapToGridToolBarButton />
        <WorkspaceLockToolBarButton />
        <WorkspaceToggleVisibilityToolBarButton />
        <UndoToolBarButton />
        <WorkspaceExtrasToolBarButton />

        {selectedTool && <ToolBarSeparator />}
        <GuidelineActions />
      </div>
    </Rnd>
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
      Icon={<IconCrosshair />}
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
      Icon={<IconPhotoPlus />}
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
      Icon={<IconTablePlus />}
    />
  );
}

function FrameAddToolBarButton() {
  const { data: frames } = useFramesQuery();
  const { toggle, add, visible } = useFrames();

  if (!frames) return null;

  return (
    <ToolBarToggleButton
      active={false}
      onClick={() => {
        add({}).then(() => {
          if (!visible) {
            toggle();
          }
        });
      }}
      Icon={<IconSquarePlus2 />}
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
      Icon={<IconRuler />}
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
        Icon={<IconGrid4x4 />}
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
        Icon={<IconColumns />}
      />
    </ToolBarButtonWithConfigButton>
  );
}

function FramesToolBarButton() {
  const { data: frames } = useFramesQuery();
  const { toggle } = useFrames();

  if (!frames) return null;

  return (
    <ToolBarToggleButton
      active={frames.visible ?? false}
      onClick={() => {
        toggle();
      }}
      Icon={<IconSquare />}
    />
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
      Icon={<IconTable />}
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
      Icon={<IconPhoto />}
    />
  );
}

function WorkspaceSnapToGridToolBarButton() {
  const { data: workspace } = useWorkspaceQuery();
  const { setSnapToGrid } = useWorkspace();

  if (!workspace) return null;

  return (
    <ToolBarToggleButton
      active={workspace.snapToGrid ?? false}
      onClick={() => {
        setSnapToGrid(!workspace.snapToGrid);
      }}
      Icon={workspace.snapToGrid ? <IconMagnet /> : <IconMagnetOff />}
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
      Icon={workspace.locked ? <IconLock /> : <IconLockOpen />}
    />
  );
}

function WorkspaceToggleVisibilityToolBarButton() {
  const { data: workspace } = useWorkspaceQuery();

  if (!workspace) return null;

  return (
    <ToolBarButtonWithConfigButton
      ConfigPanel={
        <ToolBarConfigPanel title="Visibility">
          <OnionImagesToolBarButton />
          <FramesToolBarButton />
          <GuidelinesToolBarButton />
          <RulerToolBarButton />
        </ToolBarConfigPanel>
      }
    >
      <ToolBarToggleButton
        active={workspace.visible ?? false}
        onClick={() => {
          //setVisible(!workspace.visible);
        }}
        Icon={workspace.visible ? <IconEye /> : <IconEyeOff />}
      />
    </ToolBarButtonWithConfigButton>
  );
}

function ToolBarConfigPanelSeparator() {
  return <div className="o:h-px o:bg-neutral-700 o:my-1" />;
}

function WorkspaceExtrasToolBarButton() {
  const { data: workspace } = useWorkspaceQuery();
  const { exportWorkspace } = useExportWorkspace();
  const [, copy] = useCopyToClipboard();

  if (!workspace) return null;

  return (
    <ToolBarButtonWithConfigButton
      ConfigPanel={
        <ToolBarConfigPanel title="Extras">
          <ToolBoxLabeledButton
            onClick={async () => {
              const exportedWorkspace = await exportWorkspace();
              copy(JSON.stringify(exportedWorkspace, null, 2));
            }}
            Icon={<IconUpload size={18} />}
            label={"Export Workspace"}
          />
          <ToolBarConfigPanelSeparator />
          <PresetSelect />
          {workspace.activePresetId && (
            <>
              <PresetUpdateNameButton id={workspace.activePresetId} />
              <PresetDuplicateButton id={workspace.activePresetId} />
              {workspace.presets.length > 1 && (
                <PresetRemoveButton id={workspace.activePresetId} />
              )}
            </>
          )}
          <PresetCreateButton />
        </ToolBarConfigPanel>
      }
    >
      {null}
    </ToolBarButtonWithConfigButton>
  );
}

function UndoToolBarButton() {
  const { undo, hasCommands } = useCommands();

  return (
    <ToolBarToggleButton
      enabled={hasCommands}
      active={false}
      onClick={() => undo()}
      Icon={<IconArrowBackUp />}
    />
  );
}
