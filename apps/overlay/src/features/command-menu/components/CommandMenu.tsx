import { useColumnsSetNum } from "@/features/columns/hooks/useColumnsSetNum";
import { useColumnsToggle } from "@/features/columns/hooks/useColumnsToggle";
import {
  useCanUndoCommand,
  useUndoCommand,
} from "@/features/commands/store/commands";
import { useCrosshairToggle } from "@/features/crosshair/hooks/useCrosshairToggle";
import { useGridToggle } from "@/features/grid/hooks/useGridToggle";
import { useGuidelineAddHorizontal } from "@/features/guideline/hooks/useGuidelineAddHorizontal";
import { useGuidelineAddVertical } from "@/features/guideline/hooks/useGuidelineAddVertical";
import { useGuidelineDelete } from "@/features/guideline/hooks/useGuidelineDelete";
import { useGuidelineRotate } from "@/features/guideline/hooks/useGuidelineRotate";
import { useGuidelinesToggle } from "@/features/guideline/hooks/useGuidelinesToggle";
import { useGuidelineToggleLock } from "@/features/guideline/hooks/useGuidelineToggleLock";
import { type IGuideline } from "@/features/guideline/types";
import { isGuideline } from "@/features/guideline/utils/isGuideline";
import { useRulerToggle } from "@/features/rulers/hooks/useRulerToggle";
import { useSetOriginRuler } from "@/features/rulers/hooks/useSetOriginRuler";
import { useSetPositionRuler } from "@/features/rulers/hooks/useSetPositionRuler";
import { useSelectedTool } from "@/features/tools/store/tools";
import { Command } from "cmdk";
import { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useHotkeys("mod+k", (event) => {
    event.preventDefault();
    setOpen(true);
  });

  const undo = useUndoCommand();
  const canUndo = useCanUndoCommand();

  const selectedTool = useSelectedTool();

  const { toggle: toggleGrid } = useGridToggle();
  const { toggle: toggleGuidelines } = useGuidelinesToggle();
  const { add: addHorizontalGuideline } = useGuidelineAddHorizontal();
  const { add: addVerticalGuideline } = useGuidelineAddVertical();
  const { rotate: rotateGuideline } = useGuidelineRotate();
  const { toggleLock: toggleLockGuideline } = useGuidelineToggleLock();
  const { delete: deleteGuideline } = useGuidelineDelete();
  const { toggle: toggleCrosshair } = useCrosshairToggle();
  const { toggle: toggleRuler } = useRulerToggle();
  const { resetOrigin, centerOrigin } = useSetOriginRuler();
  const { setPositionRuler } = useSetPositionRuler();
  const { toggle: toggleColumns } = useColumnsToggle();
  const { addColumn, removeColumn } = useColumnsSetNum();

  const handleUndo = useCallback(() => {
    undo();
    setOpen(false);
  }, [undo]);

  const handleToggleGrid = useCallback(() => {
    toggleGrid();
  }, [toggleGrid]);

  const handleToggleGuidelines = useCallback(() => {
    toggleGuidelines();
  }, [toggleGuidelines]);

  const handleCreateVerticalGuideline = useCallback(() => {
    addVerticalGuideline();
    setOpen(false);
  }, [addVerticalGuideline]);

  const handleCreateHorizontalGuideline = useCallback(() => {
    addHorizontalGuideline();
    setOpen(false);
  }, [addHorizontalGuideline]);

  const handleRotateGuideline = useCallback(
    (guideline: IGuideline) => {
      rotateGuideline(guideline);
      setOpen(false);
    },
    [rotateGuideline]
  );

  const handleLockGuideline = useCallback(
    (guideline: IGuideline) => {
      toggleLockGuideline(guideline);
      setOpen(false);
    },
    [toggleLockGuideline]
  );

  const handleDeleteGuideline = useCallback(
    (guideline: IGuideline) => {
      deleteGuideline(guideline);
      setOpen(false);
    },
    [deleteGuideline]
  );

  const handleToggleCrosshair = useCallback(() => {
    toggleCrosshair();
    setOpen(false);
  }, [toggleCrosshair]);

  const handleToggleRuler = useCallback(() => {
    toggleRuler();
  }, [toggleRuler]);

  const handleRulerResetOrigin = useCallback(() => {
    resetOrigin();
  }, [resetOrigin]);

  const handleRulerCenterOrigin = useCallback(() => {
    centerOrigin();
  }, [centerOrigin]);

  const handleRulerPositionBottomRight = useCallback(() => {
    setPositionRuler("bottom-right");
  }, [setPositionRuler]);

  const handleRulerPositionTopLeft = useCallback(() => {
    setPositionRuler("top-left");
  }, [setPositionRuler]);

  const handleToggleColumns = useCallback(() => {
    toggleColumns();
  }, [toggleColumns]);

  const handleAddOneColumn = useCallback(() => {
    addColumn();
  }, [addColumn]);

  const handleRemoveOneColumn = useCallback(() => {
    removeColumn();
  }, [removeColumn]);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        {isGuideline(selectedTool) && (
          <Command.Group heading="Selected guideline">
            <Item
              value="rotate-guideline"
              onSelect={() => handleRotateGuideline(selectedTool as IGuideline)}
            >
              Rotate Guideline
            </Item>
            <Item
              value="lock-guideline"
              onSelect={() => handleLockGuideline(selectedTool as IGuideline)}
            >
              Lock Guideline
            </Item>
            <Item
              value="delete-guideline"
              onSelect={() => handleDeleteGuideline(selectedTool as IGuideline)}
            >
              Delete Guideline
            </Item>
          </Command.Group>
        )}
        <Command.Group heading="General">
          <Item disabled={!canUndo} onSelect={handleUndo}>
            Undo
          </Item>
        </Command.Group>
        <Command.Group heading="Ruler">
          <Item onSelect={handleToggleRuler} value="ruler-visibility">
            Toggle
          </Item>
          <Item onSelect={handleRulerResetOrigin} value="ruler-reset-origin">
            Reset offset to 0, 0
          </Item>
          <Item onSelect={handleRulerCenterOrigin} value="ruler-center-origin">
            Center offset to center of the viewport
          </Item>
          <Item
            onSelect={handleRulerPositionTopLeft}
            value="ruler-set-position-top-left"
          >
            Set Position: top-left
          </Item>
          <Item
            onSelect={handleRulerPositionBottomRight}
            value="ruler-set-position-bottom-right"
          >
            Set Position: bottom-right
          </Item>
        </Command.Group>
        <Command.Group heading="Grid">
          <Item onSelect={handleToggleGrid} value="grid-visibility">
            Toggle
          </Item>
        </Command.Group>
        <Command.Group heading="Guidelines">
          <Item onSelect={handleToggleGuidelines} value="guideline-visibility">
            Toggle
          </Item>
          <Item onSelect={handleCreateVerticalGuideline}>
            Create Vertical Guideline
          </Item>
          <Item onSelect={handleCreateHorizontalGuideline}>
            Create Horizontal Guideline
          </Item>
        </Command.Group>
        <Command.Group heading="Crosshair">
          <Item onSelect={handleToggleCrosshair} value="crosshair-visibility">
            Toggle
          </Item>
        </Command.Group>
        <Command.Group heading="Columns">
          <Item onSelect={handleToggleColumns} value="columns-visibility">
            Toggle
          </Item>
          <Item onSelect={handleAddOneColumn} value="columns-add-one">
            Add 1 Column
          </Item>
          <Item onSelect={handleRemoveOneColumn} value="columns-remove-one">
            Remove 1 Column
          </Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Item({
  children,
  disabled,
  value,
  shortcut,
  onSelect = () => {},
}: {
  children: React.ReactNode;
  disabled?: boolean;
  value?: string;
  shortcut?: string;
  onSelect?: (value: string) => void;
}) {
  return (
    <Command.Item disabled={disabled} onSelect={onSelect} value={value}>
      {children}
      {shortcut && (
        <div cmdk-vercel-shortcuts="">
          {shortcut.split(" ").map((key) => {
            return <kbd key={key}>{key}</kbd>;
          })}
        </div>
      )}
    </Command.Item>
  );
}
