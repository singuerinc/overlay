import { IGuide } from '../components/guide/IGuide';

export const ADD_GUIDE = 'ADD_GUIDE';
export const REMOVE_GUIDE = 'REMOVE_GUIDE';

export const addGuide = (guide: IGuide) => ({
  payload: guide,
  type: ADD_GUIDE
});

export const removeGuide = (guide: IGuide) => ({
  payload: guide,
  type: REMOVE_GUIDE
});
