import { AnyAction } from 'redux';
import {
  SET_SETTING_ALLOW_ANALYTICS,
  SET_SETTINGS_VISIBILITY,
  UPDATE_ALL_SETTINGS
} from '../actions/settings';
import { track } from '../utils/analytics';
import { PreferenceKey, preferences } from '../utils/preferences';

export interface ISettingsStore {
  visible: boolean;
  allowAnalytics: boolean;
}

const initialStore: ISettingsStore = {
  allowAnalytics: false,
  visible: false
};

export const settings = (
  store = initialStore,
  { type, payload }: AnyAction
): ISettingsStore => {
  switch (type) {
    case UPDATE_ALL_SETTINGS:
      return {
        ...store,
        ...payload
      };
    case SET_SETTING_ALLOW_ANALYTICS:
      track('settings', 'allowAnalitycs', payload);
      preferences.set(PreferenceKey.SETTING_ALLOW_ANALYTICS, payload);
      return {
        ...store,
        allowAnalytics: payload
      };
    case SET_SETTINGS_VISIBILITY:
      track('app', 'settings', `visibility/${payload}`);
      return {
        ...store,
        visible: payload
      };
  }

  return store;
};
