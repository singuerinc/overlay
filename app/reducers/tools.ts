import { AnyAction } from 'redux';
import {
  SET_ALWAYS_ON_TOP,
  SET_TOOLS_LOCKED,
  SET_TOOLS_VISIBILITY
} from '../actions/tools';
import { track } from '../utils/analytics';

export interface IToolsStore {
  allLocked: boolean;
  alwaysOnTop: boolean;
  visible: boolean;
}

const initialStore: IToolsStore = {
  allLocked: false,
  alwaysOnTop: false,
  visible: true
};

export const tools = (
  store = initialStore,
  { type, payload }: AnyAction
): IToolsStore => {
  switch (type) {
    case SET_ALWAYS_ON_TOP:
      track('app', 'tools', `always-on-top/${payload}`);
      return {
        ...store,
        alwaysOnTop: payload
      };
    case SET_TOOLS_VISIBILITY:
      track('app', 'tools', `visibility/${payload}`);
      return {
        ...store,
        visible: payload
      };
    case SET_TOOLS_LOCKED:
      track('app', 'tools', `visibility/${payload}`);
      return {
        ...store,
        allLocked: payload
      };
  }

  return store;
};
