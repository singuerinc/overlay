import * as React from 'react';
import OnionImage from '../components/onionImage/OnionImage';
import Guide from '../components/guide/Guide';
import Ruler from '../components/ruler/Ruler';
import Grid from '../components/grid/Grid';
import { IRuler } from './ruler/IRuler';
import { IOnionImage } from './onionImage/IOnionImage';
import { IGuide } from './guide/IGuide';
import { IGrid } from './grid/IGrid';

const grids: IGrid[] = [
  {
    size: 10,
    color: 'red',
    type: 'solid',
    opacity: 0.3
  }
];

const images: IOnionImage[] = [
  {
    src: require('./screen1.png'),
    x: 100,
    y: 100,
    width: 50,
    height: 50
  },
  {
    src: require('./screen2.jpg'),
    x: 500,
    y: 500,
    width: 50,
    height: 50
  }
];

const rulers: IRuler[] = [
  {
    x: 100,
    y: 100,
    width: 50,
    height: 50
  },
  {
    x: 200,
    y: 200,
    width: 100,
    height: 100
  }
];

const guides: IGuide[] = [
  {
    x: 0,
    y: 100,
    type: 'h',
    color: 'red'
  },
  {
    x: 200,
    y: 0,
    type: 'v',
    color: 'green'
  }
];

export default () => (
  <>
    {grids.map((props) => <Grid {...props} />)}
    {rulers.map((props) => <Ruler {...props} />)}
    {images.map((props) => <OnionImage {...props} />)}
    {guides.map((props) => <Guide {...props} />)}
  </>
);
