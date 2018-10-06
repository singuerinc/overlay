import { IOnionImage } from './IOnionImage';
import * as uuid from 'uuid/v1';
import * as R from 'ramda';

const factory = (id: string): IOnionImage => ({
  id,
  src: '',
  x: 500,
  y: 100,
  width: 410,
  height: 410,
  opacity: 1,
  inverted: false,
  visible: true,
  locked: false
});

interface State {
  onions: IOnionImage[];
}

export const addOnionImage = (paths: string[]) => ({ onions }: State) => {
  if (paths) {
    const images = R.map((path) => {
      return {
        ...factory(uuid()),
        src: path
      };
    }, paths);

    return { onions: [...onions, ...images] };
  }

  return { onions };
};

const hasSameId = R.curry((id: string, x: IOnionImage) => x.id === id);

export const removeOnionImage = (id: string) => ({ onions }: State) => {
  const filtered: IOnionImage[] = R.reject(hasSameId(id), onions);

  return {
    onions: filtered
  };
};
