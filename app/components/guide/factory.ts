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

interface State {
  guides: IGuide[];
}

export const addGuide = ({ guides }: State) => ({
  guides: [...guides, factory(uuid())]
});

const hasSameId = R.curry((id: string, x: IGuide) => x.id === id);

export const removeGuide = (id: string) => ({ guides }: State) => {
  const filtered: IGuide[] = R.reject(hasSameId(id), guides);

  return {
    guides: filtered
  };
};
