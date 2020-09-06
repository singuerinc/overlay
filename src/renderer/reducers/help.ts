import { AnyAction } from 'redux';
import { SET_HELP_VISIBILITY } from '../actions/help';
import { track } from '../utils/analytics';

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
    case SET_HELP_VISIBILITY:
      track('app', 'help', `visibility/${payload}`);
      return {
        ...store,
        visible: payload
      };
  }

  return store;
};
