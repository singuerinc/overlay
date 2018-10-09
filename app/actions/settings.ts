import { ISettingsStore } from '../reducers/settings';

export const UPDATE_ALL_SETTINGS = 'UPDATE_ALL_SETTINGS';

export const updateAllSettings = (settings: ISettingsStore) => ({
  payload: settings,
  type: UPDATE_ALL_SETTINGS
});
