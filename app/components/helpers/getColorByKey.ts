import { Color } from '../../utils/Color';

export const COLOR_KEYS: string[] = ['b', 'g', 'o', 'r', 'y'];

export const getColorByKey = (key: string) => {
  switch (key) {
    case 'r':
      return Color.RED;
    case 'g':
      return Color.GREEN;
    case 'b':
      return Color.BLUE;
    case 'o':
      return Color.ORANGE;
    case 'y':
      return Color.YELLOW;
    default:
      return Color.RED;
  }
};
