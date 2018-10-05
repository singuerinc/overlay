import { IGuide } from './IGuide';
import { GuideOrientation } from './GuideOrientation';
import { Color } from '../../utils/Color';

const template: IGuide = {
  id: '',
  x: 0,
  y: 100,
  type: GuideOrientation.HORIZONTAL,
  color: Color.RED,
  locked: false
};

export { template };
