import { GuideOrientation } from './GuideOrientation';
import { Color } from '../../utils/Color';

export const rotate = (type: GuideOrientation) => ({
  x,
  y
}: {
  x: number;
  y: number;
}) => {
  const newType =
    type === GuideOrientation.HORIZONTAL
      ? GuideOrientation.VERTICAL
      : GuideOrientation.HORIZONTAL;

  // FIXME: it should be inverted, not centered
  if (type === GuideOrientation.VERTICAL) {
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
