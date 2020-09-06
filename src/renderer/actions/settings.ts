import { ISettingsStore } from '../reducers/settings';

export const SET_SETTING_ALLOW_ANALYTICS = 'SET_SETTING_ALLOW_ANALYTICS';
export const SET_SETTINGS_VISIBILITY = 'SET_SETTINGS_VISIBILITY';
export const UPDATE_ALL_SETTINGS = 'UPDATE_ALL_SETTINGS';

export const setAllowAnalytics = (value: boolean) => ({
  payload: value,
  type: SET_SETTING_ALLOW_ANALYTICS
});

export const updateAll = (settings: ISettingsStore) => ({
  payload: settings,
  type: UPDATE_ALL_SETTINGS
});

export const setVisibility = (value: boolean) => ({
  payload: value,
  type: SET_SETTINGS_VISIBILITY
});
