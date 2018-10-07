import { ADD_GUIDE, REMOVE_GUIDE } from '../actions/app';
import { IGuide } from '../components/guide/IGuide';
import * as R from 'ramda';
import { AnyAction } from 'redux';

const initialStore: IGuide[] = [];

export const guides = (store = initialStore, { type, payload }: AnyAction) => {
  switch (type) {
    case ADD_GUIDE:
      return R.append(payload.guide, store);
    case REMOVE_GUIDE:
      return R.reject(R.equals(payload.guide), store);
    default:
      return store;
  }
};
