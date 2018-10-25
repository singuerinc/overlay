import * as R from 'ramda';
import { AnyAction } from 'redux';
import {
  ADD_RULER,
  REMOVE_RULER,
  RULER_SET_COLOR,
  RULER_SET_LOCK
} from '../actions/rulers';
import { SET_TOOLS_LOCKED } from '../actions/tools';
import { factory } from '../components/ruler/factory';
import { IRuler } from '../components/ruler/IRuler';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';
import { hasSameId, updatePropIfSameId } from '../utils/utils';

interface IPayload extends IRuler {}

const t = track('tool', Tool.RULER);
const initialStore: IRuler[] = [];

export const rulers = (
  store = initialStore,
  { type, payload }: AnyAction & { payload: IPayload }
): IRuler[] => {
  switch (type) {
    case ADD_RULER:
      t('add');
      return R.append(factory(), store);
    case REMOVE_RULER:
      t('remove');
      return R.reject((x) => hasSameId(payload.id, x), store);
    case RULER_SET_LOCK:
      t(`locked/${payload.locked}`);
      return R.map(
        (x: IRuler) =>
          updatePropIfSameId('locked', payload.id, payload.locked, x),
        store
      );
    case RULER_SET_COLOR:
      t(`color/${payload.color}`);
      return R.map(
        (x: IRuler) =>
          updatePropIfSameId('color', payload.id, payload.color, x),
        store
      );
    case SET_TOOLS_LOCKED:
      return R.map((x: IRuler) => ({ ...x, locked: payload.locked }), store);
  }
  return store;
};
