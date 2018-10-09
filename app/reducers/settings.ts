import { AnyAction } from 'redux';
import { UPDATE_ALL_SETTINGS } from '../actions/settings';

export interface ISettingsStore {
  var1: boolean;
  var2: boolean;
  var3: boolean;
}

const initialStore: ISettingsStore = {
  var1: true,
  var2: true,
  var3: false
};

export const settings = (
  store = initialStore,
  { type, payload }: AnyAction
): ISettingsStore => {
  switch (type) {
    case UPDATE_ALL_SETTINGS:
      const newStore = {
        ...store,
        ...payload
      };
      console.log('yay!', store, payload, newStore);
      return newStore;
  }

  return store;
};
