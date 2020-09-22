import { isHorizontalOrientation } from '../helpers/orientation';
import { GuideOrientation } from './GuideOrientation';

interface IState {
  x: number;
  y: number;
}

export const rotate = (orientation: GuideOrientation) => ({ x, y }: IState) => {
  const isHorizontal = isHorizontalOrientation(orientation);

  if (isHorizontal) {
    y = Math.floor(window.screen.height * 0.5);
    x = 0;
  } else {
    x = Math.floor(window.screen.width * 0.5);
    y = 0;
  }

  return { x, y, orientation };
};
