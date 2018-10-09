import { AnyAction } from 'redux';
import {
  SET_SETTING_ALLOW_ANALYTICS,
  TOGGLE_SETTINGS_VISIBILITY,
  UPDATE_ALL_SETTINGS
} from '../actions/settings';
import { track } from '../components/core/analytics';
import { store as appStore, StoreKey } from '../components/core/AppStore';

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
      appStore.set(StoreKey.SETTING_ALLOW_ANALYTICS, payload);
      return {
        ...store,
        allowAnalytics: payload
      };
    case TOGGLE_SETTINGS_VISIBILITY:
      return {
        ...store,
        visible: !store.visible
      };
  }

  return store;
};
