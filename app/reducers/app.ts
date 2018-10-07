import { SET_ACTIVE_GUIDE } from '../actions/app';
export default function app(state = 0, action) {
  switch (action.type) {
    case SET_ACTIVE_GUIDE:
      return state + 1;
    default:
      return state;
  }
}
