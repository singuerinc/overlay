import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_GUIDE, REMOVE_GUIDE } from '../actions/guides';
import { IGuide } from '../components/guide/IGuide';

const initialStore: IGuide[] = [];

export const guides = (
  store = initialStore,
  { type, payload }: AnyAction
): IGuide[] => {
  switch (type) {
    case ADD_GUIDE:
      return R.append(payload, store);
    case REMOVE_GUIDE:
      return R.reject(R.equals(payload), store);
  }
  return store;
};
