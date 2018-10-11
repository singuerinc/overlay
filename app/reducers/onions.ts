import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_ONION, REMOVE_ONION } from '../actions/onions';
import { IOnionImage } from '../components/onionImage/IOnionImage';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';

const initialStore: IOnionImage[] = [];

export const onions = (
  store = initialStore,
  { type, payload }: AnyAction
): IOnionImage[] => {
  switch (type) {
    case ADD_ONION:
      track('tool', Tool.ONION, 'add');
      return R.append(payload, store);
    case REMOVE_ONION:
      track('tool', Tool.ONION, 'remove');
      return R.reject(R.equals(payload), store);
  }
  return store;
};
