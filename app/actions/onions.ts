import { IOnionImage } from '../components/onionImage/IOnionImage';

export const ADD_ONION = 'ADD_ONION';
export const REMOVE_ONION = 'REMOVE_ONION';

export const addOnion = (onion: IOnionImage) => ({
  payload: onion,
  type: ADD_ONION
});

export const removeOnion = (onion: IOnionImage) => ({
  payload: onion,
  type: REMOVE_ONION
});
