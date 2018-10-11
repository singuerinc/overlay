import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_GRID, REMOVE_GRID } from '../actions/grids';
import { IGrid } from '../components/grid/IGrid';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';

const initialStore: IGrid[] = [];

export const grids = (
  store = initialStore,
  { type, payload }: AnyAction
): IGrid[] => {
  switch (type) {
    case ADD_GRID:
      track('tool', Tool.GRID, 'add');
      return R.append(payload, store);
    case REMOVE_GRID:
      track('tool', Tool.GRID, 'remove');
      return R.reject(R.equals(payload), store);
  }

  return store;
};
