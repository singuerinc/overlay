import { combineReducers } from 'redux';
import { guides } from './guides';
import { onions } from './onions';
import { rulers } from './rulers';

const rootReducer = combineReducers({
  guides,
  onions,
  rulers
});

export default rootReducer;
