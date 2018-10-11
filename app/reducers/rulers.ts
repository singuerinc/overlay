import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_RULER, REMOVE_RULER } from '../actions/rulers';
import { IRuler } from '../components/ruler/IRuler';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';

const initialStore: IRuler[] = [];

export const rulers = (
  store = initialStore,
  { type, payload }: AnyAction
): IRuler[] => {
  switch (type) {
    case ADD_RULER:
      track('tool', Tool.RULER, 'add');
      return R.append(payload, store);
    case REMOVE_RULER:
      track('tool', Tool.RULER, 'remove');
      return R.reject(R.equals(payload), store);
  }
  return store;
};
