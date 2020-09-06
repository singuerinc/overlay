import { GuideOrientation } from '../components/guide/GuideOrientation';

export const ADD_GUIDE = 'ADD_GUIDE';
export const REMOVE_GUIDE = 'REMOVE_GUIDE';
export const GUIDE_SET_COLOR = 'GUIDE_SET_COLOR';
export const GUIDE_SET_LOCK = 'GUIDE_SET_LOCK';
export const GUIDE_SET_ORIENTATION = 'GUIDE_SET_ORIENTATION';

export const add = () => ({
  type: ADD_GUIDE
});

export const remove = (id: string) => ({
  payload: { id },
  type: REMOVE_GUIDE
});

export const setLock = (id: string, locked: boolean) => ({
  payload: { id, locked },
  type: GUIDE_SET_LOCK
});

export const setColor = (id: string, color: string) => ({
  payload: { id, color },
  type: GUIDE_SET_COLOR
});

export const setOrientation = (id: string, orientation: GuideOrientation) => ({
  payload: { id, orientation },
  type: GUIDE_SET_ORIENTATION
});
