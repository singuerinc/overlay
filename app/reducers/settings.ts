import { AnyAction } from 'redux';
import {
  SET_SETTING_ALLOW_ANALYTICS,
  TOGGLE_SETTINGS_VISIBILITY,
  UPDATE_ALL_SETTINGS
} from '../actions/settings';

export interface ISettingsStore {
  visible: boolean;
  allowAnalytics: boolean;
}

const initialStore: ISettingsStore = {
  allowAnalytics: true,
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
