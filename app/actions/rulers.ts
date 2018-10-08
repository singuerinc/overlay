import { IRuler } from '../components/ruler/IRuler';

export const ADD_RULER = 'ADD_RULER';
export const REMOVE_RULER = 'REMOVE_RULER';

export const addRuler = (ruler: IRuler) => ({
  payload: ruler,
  type: ADD_RULER
});

export const removeRuler = (ruler: IRuler) => ({
  payload: ruler,
  type: REMOVE_RULER
});
