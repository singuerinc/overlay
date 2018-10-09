export const SET_TOOLS_VISIBILITY = 'SET_TOOLS_VISIBILITY';

export const setVisibility = (value: boolean) => ({
  payload: value,
  type: SET_TOOLS_VISIBILITY
});
