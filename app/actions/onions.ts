import { IOnionImage } from '../components/onionImage/IOnionImage';

export const ADD_ONION = 'ADD_ONION';
export const REMOVE_ONION = 'REMOVE_ONION';

export const addOnion = (onion: IOnionImage) => ({
  type: ADD_ONION,
  payload: onion
});

export const removeOnion = (onion: IOnionImage) => ({
  type: REMOVE_ONION,
  payload: onion
});
