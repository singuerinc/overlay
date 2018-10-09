import { ISettingsStore } from '../reducers/settings';

export const SET_SETTING_ALLOW_ANALYTICS = 'SET_SETTING_ALLOW_ANALYTICS';
export const TOGGLE_SETTINGS_VISIBILITY = 'TOGGLE_SETTINGS_VISIBILITY';
export const UPDATE_ALL_SETTINGS = 'UPDATE_ALL_SETTINGS';

export const setAllowAnalytics = (value: boolean) => ({
  payload: value,
  type: SET_SETTING_ALLOW_ANALYTICS
});

export const updateAllSettings = (settings: ISettingsStore) => ({
  payload: settings,
  type: UPDATE_ALL_SETTINGS
});

export const toggleVisibility = () => ({
  type: TOGGLE_SETTINGS_VISIBILITY
});
