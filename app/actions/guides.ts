import { IGuide } from '../components/guide/IGuide';

export const ADD_GUIDE = 'ADD_GUIDE';
export const REMOVE_GUIDE = 'REMOVE_GUIDE';

export const addGuide = (guide: IGuide) => ({
  type: ADD_GUIDE,
  payload: guide
});

export const removeGuide = (guide: IGuide) => ({
  type: REMOVE_GUIDE,
  payload: guide
});
