import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_GRID, REMOVE_GRID } from '../actions/grids';
import { IGrid } from '../components/grid/IGrid';

const initialStore: IGrid[] = [];

export const grids = (
  store = initialStore,
  { type, payload }: AnyAction
): IGrid[] => {
  switch (type) {
    case ADD_GRID:
      return R.append(payload, store);
    case REMOVE_GRID:
      return R.reject(R.equals(payload), store);
  }

  return store;
};
