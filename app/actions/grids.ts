import { IGrid } from '../components/grid/IGrid';

export const ADD_GRID = 'ADD_GRID';
export const REMOVE_GRID = 'REMOVE_GRID';

export const addGrid = (grid: IGrid) => ({
  type: ADD_GRID,
  payload: grid
});

export const removeGrid = (grid: IGrid) => ({
  type: REMOVE_GRID,
  payload: grid
});
