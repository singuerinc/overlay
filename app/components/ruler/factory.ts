import * as R from 'ramda';
import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { IRuler } from './IRuler';

const factory = (id: string): IRuler => ({
  id,
  x: 250,
  y: 250,
  width: 400,
  height: 400,
  opacity: 0.5,
  color: Color.RED,
  locked: false
});

interface State {
  rulers: IRuler[];
}

const addRuler = ({ rulers }: State) => ({
  rulers: [...rulers, factory(uuid())]
});

const duplicateRuler = (rulerInfo: object) => ({ rulers }: State) => ({
  rulers: [
    ...rulers,
    {
      ...rulerInfo,
      id: uuid()
    } as IRuler
  ]
});

const removeRuler = (id: string) => ({ rulers }: { rulers: IRuler[] }) => {
  const hasSameId = (id: string) => (x: IRuler) => x.id === id;
  const filtered: IRuler[] = R.reject(hasSameId(id), rulers);

  return {
    rulers: filtered
  };
};

export { addRuler, duplicateRuler, removeRuler };
