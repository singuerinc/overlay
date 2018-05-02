export const ARROW_KEYS = [
  'up',
  'shift+up',
  'down',
  'shift+down',
  'left',
  'shift+left',
  'right',
  'shift+right'
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
