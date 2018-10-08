import * as R from 'ramda';
import { AnyAction } from 'redux';
import { ADD_COLUMN, REMOVE_COLUMN } from '../actions/columns';
import { IColumn } from '../components/column/IColumn';

const initialStore: IColumn[] = [];

export const columns = (
  store = initialStore,
  { type, payload }: AnyAction
): IColumn[] => {
  switch (type) {
    case ADD_COLUMN:
      return R.append(payload, store);
    case REMOVE_COLUMN:
      return R.reject(R.equals(payload), store);
  }

  return store;
};
