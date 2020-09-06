export const ADD_ONION = 'ADD_ONION';
export const REMOVE_ONION = 'REMOVE_ONION';
export const ONION_SET_LOCK = 'ONION_SET_LOCK';
export const ONION_SET_SCALE = 'ONION_SET_SCALE';

export const add = (path: string) => ({
  payload: path,
  type: ADD_ONION
});

export const setScale = (id: string, scale: number) => ({
  payload: { id, scale },
  type: ONION_SET_SCALE
});
export const remove = (id: string) => ({
  payload: id,
  type: REMOVE_ONION
});

export const setLock = (id: string, locked: boolean) => ({
  payload: { id, locked },
  type: ONION_SET_LOCK
});
