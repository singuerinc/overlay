import * as R from 'ramda';
import { AnyAction } from 'redux';
import {
  ADD_GUIDE,
  GUIDE_SET_COLOR,
  GUIDE_SET_LOCK,
  REMOVE_GUIDE
} from '../actions/guides';
import { SET_TOOLS_LOCKED } from '../actions/tools';
import { factory } from '../components/guide/factory';
import { IGuide } from '../components/guide/IGuide';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';
import { hasSameId, updatePropIfSameId } from '../utils/utils';

const t = track('tool', Tool.GUIDE);
const initialStore: IGuide[] = [];

export const guides = (
  store = initialStore,
  { type, payload }: AnyAction
): IGuide[] => {
  switch (type) {
    case ADD_GUIDE:
      t('add');
      return R.append(factory(), store);
    case REMOVE_GUIDE:
      t('remove');
      return R.reject((x) => hasSameId(payload, x), store);
    case GUIDE_SET_COLOR:
      t(`color/${payload.color}`);
      return R.map(
        (x: IGuide) =>
          updatePropIfSameId('color', payload.id, payload.color, x),
        store
      );
    case GUIDE_SET_LOCK:
      const { id, locked }: { id: string; locked: boolean } = payload;
      t(`locked/${locked}`);
      return R.map((x) => updatePropIfSameId('locked', id, locked, x), store);
    case SET_TOOLS_LOCKED:
      return R.map((x: IGuide) => ({ ...x, locked: payload.locked }), store);
  }
  return store;
};
