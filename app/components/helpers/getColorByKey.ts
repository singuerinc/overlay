import { Color } from '../../utils/Color';
import { Key } from '../core/Key';

export const COLOR_KEYS: string[] = [Key.B, Key.G, Key.O, Key.R, Key.Y];

export const getColorByKey = (key: string) => {
  switch (key) {
    case Key.R:
      return Color.RED;
    case Key.G:
      return Color.GREEN;
    case Key.B:
      return Color.BLUE;
    case Key.O:
      return Color.ORANGE;
    case Key.Y:
      return Color.YELLOW;
    default:
      return Color.RED;
  }
};
