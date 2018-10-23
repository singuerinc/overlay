export const SET_ALWAYS_ON_TOP = 'SET_ALWAYS_ON_TOP';
export const SET_TOOLS_VISIBILITY = 'SET_TOOLS_VISIBILITY';
export const SET_TOOLS_LOCKED = 'SET_TOOLS_LOCKED';

export const setAlwaysOnTop = (value: boolean) => ({
  payload: value,
  type: SET_ALWAYS_ON_TOP
});

export const setVisibility = (value: boolean) => ({
  payload: value,
  type: SET_TOOLS_VISIBILITY
});

export const setAllLocked = (locked: boolean) => ({
  payload: locked,
  type: SET_TOOLS_LOCKED
});
