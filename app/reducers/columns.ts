import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_COLUMN, REMOVE_COLUMN } from '../actions/columns';
import { IColumn } from '../components/column/IColumn';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';

const initialStore: IColumn[] = [];

export const columns = (
  store = initialStore,
  { type, payload }: AnyAction
): IColumn[] => {
  switch (type) {
    case ADD_COLUMN:
      track('tool', Tool.COLUMN, 'add');
      return R.append(payload, store);
    case REMOVE_COLUMN:
      track('tool', Tool.COLUMN, 'remove');
      return R.reject(R.equals(payload), store);
  }

  return store;
};
