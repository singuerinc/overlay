import { IGrid } from '../components/grid/IGrid';

export const ADD_GRID = 'ADD_GRID';
export const REMOVE_GRID = 'REMOVE_GRID';

export const add = () => ({
  type: ADD_GRID
});

export const remove = (grid: IGrid) => ({
  payload: grid,
  type: REMOVE_GRID
});
