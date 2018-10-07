import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_ONION, REMOVE_ONION } from '../actions/onions';
import { IOnionImage } from '../components/onionImage/IOnionImage';

const initialStore: IOnionImage[] = [];

export const onions = (store = initialStore, { type, payload }: AnyAction) => {
  switch (type) {
    case ADD_ONION:
      return R.append(payload, store);
    case REMOVE_ONION:
      return R.reject(R.equals(payload), store);
    default:
      return store;
  }
};
