import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { useCrosshair } from "@/features/crosshair/hooks/useCrosshair";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useGuidelines } from "@/features/guideline/hooks/useGuidelines";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { useOnionImages } from "@/features/onion-image/hooks/useOnionImages";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { useRuler } from "@/features/rulers/hooks/useRuler";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import {
  IconColumns,
  IconCrosshair,
  IconGrid3x3,
  IconPhoto,
  IconPhotoPlus,
  IconRuler,
  IconTable,
  IconTablePlus,
} from "@tabler/icons-react";
import { cva } from "class-variance-authority";

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
  selected = false,
  active = false,
  onClick,
  Icon,
}: {
  selected?: boolean;
  active?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  Icon: React.ReactNode;
}) {
  const variants = cva(["o:cursor-pointer", "o:rounded-md o:p-1"], {
    variants: {
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
        class: "o:text-red-600",
      },
      {
        selected: false,
        active: true,
        class: "o:bg-white o:text-neutral-950",
      },
    ],
  });

  return (
    <button className={variants({ active, selected })} onClick={onClick}>
      {Icon}
    </button>
  );
}

function ToolBarSeparator() {
  return <div className="o:w-px o:bg-neutral-400" />;
}

export function ToolBar() {
  return (
    <div className="o:bg-neutral-950 o:z-[201] o:shadow-lg o:flex o:gap-2 o:pointer-events-auto o:fixed o:bottom-12 o:rounded-md o:p-1 o:left-1/2 o:-translate-x-1/2">
      <CrosshairToolBarButton />
      <OnionImageAddToolBarButton />
      <GuidelineAddToolBarButton />
      <ToolBarSeparator />
      <RulerToolBarButton />
      <GridToolBarButton />
      <ColumnsToolBarButton />
      <GuidelinesToolBarButton />
      <OnionImagesToolBarButton />
    </div>
  );
}

function CrosshairToolBarButton() {
  const { data: crosshair } = useCrosshairQuery();
  const { toggle } = useCrosshair();

  if (!crosshair) return null;

  return (
    <ToolBarToggleButton
      active={crosshair.visible ?? false}
      selected={crosshair.visible ?? false}
      onClick={() => {
        toggle();
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
    <ToolBarToggleButton
      active={grid.visible ?? false}
      onClick={() => {
        toggle();
      }}
      Icon={<IconGrid3x3 stroke={1} />}
    />
  );
}

function ColumnsToolBarButton() {
  const { data: columns } = useColumnsQuery();
  const { toggleVisibility } = useColumns();

  if (!columns) return null;

  return (
    <ToolBarToggleButton
      active={columns.visible ?? false}
      onClick={() => {
        toggleVisibility();
      }}
      Icon={<IconColumns stroke={1} />}
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
