import { IGrid } from '../components/grid/IGrid';

export const ADD_GRID = 'ADD_GRID';
export const REMOVE_GRID = 'REMOVE_GRID';

export const addGrid = () => ({
  type: ADD_GRID
});

export const removeGrid = (grid: IGrid) => ({
  payload: grid,
  type: REMOVE_GRID
});
