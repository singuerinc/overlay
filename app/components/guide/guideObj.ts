import { IGuide } from './IGuide';
import { GuideDirection } from './IGuideDirection';
import { Color } from '../../utils/Color';

const template: IGuide = {
  id: '',
  x: 0,
  y: 100,
  type: GuideDirection.HORIZONTAL,
  color: Color.RED,
  locked: false
};

export { template };
