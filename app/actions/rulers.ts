export const ADD_RULER = 'ADD_RULER';
export const REMOVE_RULER = 'REMOVE_RULER';
export const RULER_SET_LOCK = 'RULER_SET_LOCK';
export const RULER_SET_COLOR = 'RULER_SET_COLOR';

export const add = () => ({
  type: ADD_RULER
});

export const remove = (id: string) => ({
  payload: { id },
  type: REMOVE_RULER
});

export const setLock = (id: string, locked: boolean) => ({
  payload: { id, locked },
  type: RULER_SET_LOCK
});

export const setColor = (id: string, color: string) => ({
  payload: { id, color },
  type: RULER_SET_COLOR
});
