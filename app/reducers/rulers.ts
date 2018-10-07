import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_RULER, REMOVE_RULER } from '../actions/rulers';
import { IRuler } from '../components/ruler/IRuler';

const initialStore: IRuler[] = [];

export const rulers = (store = initialStore, { type, payload }: AnyAction) => {
  switch (type) {
    case ADD_RULER:
      return R.append(payload, store);
    case REMOVE_RULER:
      return R.reject(R.equals(payload), store);
    default:
      return store;
  }
};
