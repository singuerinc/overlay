import { AnyAction } from 'redux';
import { TOGGLE_TOOLS_VISIBILITY } from '../actions/tools';

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
    case TOGGLE_TOOLS_VISIBILITY:
      return {
        ...store,
        visible: !store.visible
      };
  }

  return store;
};
