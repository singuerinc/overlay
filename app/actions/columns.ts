import { IColumn } from '../components/column/IColumn';

export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

export const addColumn = (grid: IColumn) => ({
  payload: grid,
  type: ADD_COLUMN
});

export const removeColumn = (grid: IColumn) => ({
  payload: grid,
  type: REMOVE_COLUMN
});
