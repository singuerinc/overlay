import { AnyAction } from 'redux';
import { ADD_COLUMN } from '../actions/columns';
import { ADD_GRID } from '../actions/grids';
import { ADD_GUIDE } from '../actions/guides';
import { ADD_ONION } from '../actions/onions';
import { ADD_RULER } from '../actions/rulers';
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
  alwaysOnTop: true,
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
    case ADD_GUIDE:
    case ADD_RULER:
    case ADD_ONION:
    case ADD_GRID:
    case ADD_COLUMN:
      return {
        ...store,
        visible: true
      };
  }

  return store;
};
