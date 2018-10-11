export const ADD_RULER = 'ADD_RULER';
export const REMOVE_RULER = 'REMOVE_RULER';
export const RULER_SET_LOCK = 'RULER_SET_LOCK';

export const addRuler = () => ({
  type: ADD_RULER
});

export const removeRuler = (id: string) => ({
  payload: id,
  type: REMOVE_RULER
});

export const setLockRuler = (id: string, locked: boolean) => ({
  payload: { id, locked },
  type: RULER_SET_LOCK
});
