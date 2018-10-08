import { IColumn } from '../components/column/IColumn';

export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

export const addColumn = (grid: IColumn) => ({
  type: ADD_COLUMN,
  payload: grid
});

export const removeColumn = (grid: IColumn) => ({
  type: REMOVE_COLUMN,
  payload: grid
});
