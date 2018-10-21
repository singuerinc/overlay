export const SET_ALWAYS_ON_TOP = 'SET_ALWAYS_ON_TOP';
export const SET_TOOLS_VISIBILITY = 'SET_TOOLS_VISIBILITY';

export const setAlwaysOnTop = (value: boolean) => ({
  payload: value,
  type: SET_ALWAYS_ON_TOP
});

export const setVisibility = (value: boolean) => ({
  payload: value,
  type: SET_TOOLS_VISIBILITY
});
