import * as R from 'ramda';
import { AnyAction } from 'redux';
import * as uuid from 'uuid/v1';
import { ADD_ONION, REMOVE_ONION } from '../actions/onions';
import { factory } from '../components/onionImage/factory';
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
      return R.append(factory(uuid(), { src: payload }), store);
    case REMOVE_ONION:
      track('tool', Tool.ONION, 'remove');
      return R.reject(R.equals(payload), store);
  }
  return store;
};
