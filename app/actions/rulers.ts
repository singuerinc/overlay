import { IRuler } from '../components/ruler/IRuler';

export const ADD_RULER = 'ADD_RULER';
export const REMOVE_RULER = 'REMOVE_RULER';

export const addRuler = (ruler: IRuler) => ({
  type: ADD_RULER,
  payload: ruler
});

export const removeRuler = (ruler: IRuler) => ({
  type: REMOVE_RULER,
  payload: ruler
});
