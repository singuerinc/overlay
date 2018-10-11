import { AnyAction } from 'redux';
import { SET_TOOLS_VISIBILITY } from '../actions/tools';
import { track } from '../utils/analytics';

export interface IToolsStore {
  visible: boolean;
}

const initialStore: IToolsStore = {
  visible: true
};

export const tools = (
  store = initialStore,
  { type, payload }: AnyAction
): IToolsStore => {
  switch (type) {
    case SET_TOOLS_VISIBILITY:
      track('app', 'tools', `visibility/${payload}`);
      return {
        ...store,
        visible: payload
      };
  }

  return store;
};
