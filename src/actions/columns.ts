import { IColumn } from '../components/column/IColumn';

export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

export const add = () => ({
  type: ADD_COLUMN
});

export const remove = (grid: IColumn) => ({
  payload: grid,
  type: REMOVE_COLUMN
});
