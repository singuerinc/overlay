import { GuideOrientation } from './GuideOrientation';

export const rotate = (orientation: GuideOrientation) => ({
  x,
  y
}: {
  x: number;
  y: number;
}) => {
  const newType =
    orientation === GuideOrientation.HORIZONTAL
      ? GuideOrientation.VERTICAL
      : GuideOrientation.HORIZONTAL;

  // FIXME: it should be inverted, not centered
  if (orientation === GuideOrientation.VERTICAL) {
    y = Math.floor(window.screen.height * 0.5);
    x = 0;
  } else {
    x = Math.floor(window.screen.width * 0.5);
    y = 0;
  }

  return { x, y, orientation: newType };
};
