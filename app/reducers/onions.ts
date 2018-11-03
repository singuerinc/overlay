import * as R from 'ramda';
import { AnyAction } from 'redux';
import * as uuid from 'uuid/v1';
import {
  ADD_ONION,
  ONION_SET_LOCK,
  ONION_SET_SCALE,
  REMOVE_ONION
} from '../actions/onions';
import { SET_TOOLS_LOCKED } from '../actions/tools';
import { factory } from '../components/onionImage/factory';
import { IOnionImage } from '../components/onionImage/IOnionImage';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';
import { hasSameId, updatePropIfSameId } from '../utils/utils';

const t = track('tool', Tool.ONION);
const initialStore: IOnionImage[] = [];

export const onions = (
  store = initialStore,
  { type, payload }: AnyAction
): IOnionImage[] => {
  switch (type) {
    case ADD_ONION:
      t('add');
      return R.append(factory(uuid(), { src: payload }), store);
    case REMOVE_ONION:
      t('remove');
      return R.reject((x) => hasSameId(payload, x), store);
    case ONION_SET_LOCK:
      const { locked }: { id: string; locked: boolean } = payload;
      t(`locked/${locked}`);
      return R.map(
        (x) => updatePropIfSameId('locked', payload.id, locked, x),
        store
      );
    case ONION_SET_SCALE:
      const { scale }: { id: string; scale: number } = payload;
      t(`locked/${scale}`);
      return R.map(
        (x) => updatePropIfSameId('scale', payload.id, scale, x),
        store
      );
    case SET_TOOLS_LOCKED:
      return R.map(
        (x: IOnionImage) => ({ ...x, locked: payload.locked }),
        store
      );
  }
  return store;
};
