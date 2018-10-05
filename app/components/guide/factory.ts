import * as R from 'ramda';
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

const removeGuide = (id: string) => ({ guides }: { guides: IGuide[] }) => {
  const hasSameId = (id: string) => (x: IGuide) => x.id !== id;
  const filtered: IGuide[] = R.reject(hasSameId(id), guides);

  return {
    guides: filtered
  };
};

export { addGuide, removeGuide };
