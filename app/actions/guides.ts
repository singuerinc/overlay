export const ADD_GUIDE = 'ADD_GUIDE';
export const REMOVE_GUIDE = 'REMOVE_GUIDE';
export const GUIDE_SET_LOCK = 'GUIDE_SET_LOCK';

export const addGuide = () => ({
  type: ADD_GUIDE
});

export const removeGuide = (id: string) => ({
  payload: id,
  type: REMOVE_GUIDE
});

export const setLockGuide = (id: string, locked: boolean) => ({
  payload: { id, locked },
  type: GUIDE_SET_LOCK
});
