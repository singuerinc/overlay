import { combineReducers } from 'redux';
import { guides } from './guides';
import { onions } from './onions';

const rootReducer = combineReducers({
  guides,
  onions
});

export default rootReducer;
