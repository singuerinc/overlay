import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { GuideOrientation } from './GuideOrientation';
import { IGuide } from './IGuide';

export const factory = (id: string = uuid(), props = {}): IGuide => ({
  color: Color.RED,
  id,
  locked: false,
  orientation: GuideOrientation.HORIZONTAL,
  x: 0,
  y: 100,
  ...props
});
