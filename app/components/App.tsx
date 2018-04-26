import * as React from 'react';
import OnionImage from '../components/onionImage/OnionImage';
import Guide from '../components/guide/Guide';
import Ruler from '../components/ruler/Ruler';
import Grid from '../components/grid/Grid';

const screen1 = require('./screen1.png');
const screen2 = require('./screen2.jpg');

export default () => (
  <>
    <Grid />
    <Ruler x={50} y={50} width={400} height={100} />
    <OnionImage src={screen1} />
    <OnionImage src={screen2} />
    <Guide />
    <Guide />
  </>
);
