import { Key } from '../../utils/Key';

export const ARROW_KEYS = [
  Key.UP,
  `${Key.SHIFT}+${Key.UP}`,
  Key.DOWN,
  `${Key.SHIFT}+${Key.DOWN}`,
  Key.LEFT,
  `${Key.SHIFT}+${Key.LEFT}`,
  Key.RIGHT,
  `${Key.SHIFT}+${Key.RIGHT}`
];

export const getPositionByKey = (key, x, y, value) => {
  if (key === 'ArrowUp') {
    return { y: y - value, x };
  } else if (key === 'ArrowDown') {
    return { y: y + value, x };
  } else if (key === 'ArrowLeft') {
    return { x: x - value, y };
  } else if (key === 'ArrowRight') {
    return { x: x + value, y };
  }
  return { x, y };
};
