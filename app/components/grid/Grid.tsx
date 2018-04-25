import * as React from 'react';
import styled from 'styled-components';
const grid = require('./grid.png');

const GridElement = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${grid});
  background-repeat: repeat;
  opacity: 0.2;
`;

export default () => <GridElement />;
