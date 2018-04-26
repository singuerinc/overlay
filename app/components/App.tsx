import * as React from 'react';
import OnionImage from '../components/onionImage/OnionImage';
import Guide from '../components/guide/Guide';
import Ruler from '../components/ruler/Ruler';
import Grid from '../components/grid/Grid';

const onionImages: string[] = [
  require('./screen1.png'),
  require('./screen2.jpg')
];

export default () => (
  <>
    <Grid />
    <Ruler
      x={Math.round(Math.random() * 500)}
      y={Math.round(Math.random() * 500)}
      width={Math.round(Math.random() * 500)}
      height={Math.round(Math.random() * 500)}
    />
    {onionImages.map((image) => (
      <OnionImage
        src={image}
        x={Math.round(Math.random() * 500)}
        y={Math.round(Math.random() * 500)}
        width={Math.round(Math.random() * 500)}
        height={Math.round(Math.random() * 500)}
      />
    ))}

    <Guide />
    <Guide />
  </>
);
