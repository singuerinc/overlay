export const ADD_ONION = 'ADD_ONION';
export const REMOVE_ONION = 'REMOVE_ONION';
export const ONION_SET_LOCK = 'ONION_SET_LOCK';

export const addOnion = (path: string) => ({
  payload: path,
  type: ADD_ONION
});

export const removeOnion = (id: string) => ({
  payload: id,
  type: REMOVE_ONION
});

export const setLockOnion = (id: string, locked: boolean) => ({
  payload: { id, locked },
  type: ONION_SET_LOCK
});
