import { IGuideDirection, GuideDirection } from './IGuideDirection';
import { Color } from '../../utils/Color';

export const rotate = (type: IGuideDirection) => ({
  x,
  y
}: {
  x: number;
  y: number;
}) => {
  const newType =
    type === GuideDirection.HORIZONTAL
      ? GuideDirection.VERTICAL
      : GuideDirection.HORIZONTAL;

  // FIXME: it should be inverted, not centered
  if (type === GuideDirection.VERTICAL) {
    y = Math.floor(window.screen.height * 0.5);
    x = 0;
  } else {
    x = Math.floor(window.screen.width * 0.5);
    y = 0;
  }

  return { x, y, type: newType };
};

export const move = (x: number, y: number) => () => ({
  x,
  y
});

export const setColor = (color: Color) => () => ({ color });

export const toggleLock = (state) => ({
  locked: !state.locked
});
