import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_RULER, REMOVE_RULER, RULER_SET_LOCK } from '../actions/rulers';
import { factory } from '../components/ruler/factory';
import { IRuler } from '../components/ruler/IRuler';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';

const t = track('tool', Tool.RULER);
const initialStore: IRuler[] = [];

const evolveIfEqual = (prop: string, id: string, value: any) =>
  R.when<IRuler, IRuler>(
    R.compose(
      R.equals(id),
      R.prop('id')
    ),
    R.evolve({
      [prop]: R.always(value)
    })
  );

export const rulers = (
  store = initialStore,
  { type, payload }: AnyAction
): IRuler[] => {
  switch (type) {
    case ADD_RULER:
      t('add');
      return R.append(factory(), store);
    case REMOVE_RULER:
      t('remove');
      return R.reject(R.equals(payload), store);
    case RULER_SET_LOCK:
      const { id, locked }: { id: string; locked: boolean } = payload;
      t(`locked/${locked}`);
      return R.map(evolveIfEqual('locked', id, locked), store);
  }
  return store;
};
