// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import grid from './grid.png';

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

export default class Grid extends Component<Props> {
  render() {
    return <GridElement />;
  }
}
