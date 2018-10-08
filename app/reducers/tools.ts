import { AnyAction } from 'redux';
import { TOGGLE_VISIBILITY } from '../actions/tools';

export interface ToolsStore {
  visible: boolean;
}

const initialStore: ToolsStore = {
  visible: true
};

export const tools = (
  store = initialStore,
  { type, payload }: AnyAction
): ToolsStore => {
  switch (type) {
    case TOGGLE_VISIBILITY:
      return {
        ...store,
        visible: !store.visible
      };
  }

  return store;
};
