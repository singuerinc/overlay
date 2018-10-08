import { AnyAction } from 'redux';
import { TOGGLE_HELP_VISIBILITY } from '../actions/help';

export interface IHelpStore {
  visible: boolean;
}

const initialStore: IHelpStore = {
  visible: false
};

export const help = (
  store = initialStore,
  { type, payload }: AnyAction
): IHelpStore => {
  switch (type) {
    case TOGGLE_HELP_VISIBILITY:
      return {
        ...store,
        visible: !store.visible
      };
  }

  return store;
};
