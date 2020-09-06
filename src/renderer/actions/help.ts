export const SET_HELP_VISIBILITY = 'SET_HELP_VISIBILITY';

export const setVisibility = (value: boolean) => ({
  payload: value,
  type: SET_HELP_VISIBILITY
});
