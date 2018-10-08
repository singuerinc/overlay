import { combineReducers } from 'redux';
import { IGrid } from '../components/grid/IGrid';
import { IGuide } from '../components/guide/IGuide';
import { IOnionImage } from '../components/onionImage/IOnionImage';
import { IRuler } from '../components/ruler/IRuler';
import { grids } from './grids';
import { guides } from './guides';
import { onions } from './onions';
import { rulers } from './rulers';
import { tools, ToolsStore } from './tools';

export interface AppStore {
  grids: IGrid[];
  guides: IGuide[];
  onions: IOnionImage[];
  rulers: IRuler[];
  tools: ToolsStore;
}

const rootReducer = combineReducers<AppStore>({
  grids,
  guides,
  onions,
  rulers,
  tools
});

export default rootReducer;
