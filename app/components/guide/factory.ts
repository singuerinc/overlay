import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { GuideOrientation } from './GuideOrientation';
import { IGuide } from './IGuide';

const factory = (id: string): IGuide => ({
  id,
  x: 0,
  y: 100,
  type: GuideOrientation.HORIZONTAL,
  color: Color.RED,
  locked: false
});

const addGuide = ({ guides }) => ({
  guides: [...guides, factory(uuid())]
});

export { addGuide };
