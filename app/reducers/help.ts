import { AnyAction } from 'redux';
import { TOGGLE_HELP_VISIBILITY } from '../actions/help';

export interface HelpStore {
  visible: boolean;
}

const initialStore: HelpStore = {
  visible: false
};

export const help = (
  store = initialStore,
  { type, payload }: AnyAction
): HelpStore => {
  switch (type) {
    case TOGGLE_HELP_VISIBILITY:
      return {
        ...store,
        visible: !store.visible
      };
  }

  return store;
};
