import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { IRuler } from './IRuler';

const factory = (id: string): IRuler => ({
  id,
  x: 250,
  y: 250,
  width: 400,
  height: 400,
  opacity: 0.5,
  color: Color.ORANGE,
  locked: false
});

const addRuler = ({ rulers }) => ({
  rulers: [...rulers, factory(uuid())]
});

export { addRuler };
