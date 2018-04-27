import * as React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  x: number;
  y: number;
}

class Element extends React.Component<Props, {}> {
  render() {
    const { x, y } = this.props;
    return (
      <span className={this.props.className}>
        {x}:{y}
      </span>
    );
  }
}

export const Coords = styled(Element)`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  z-index: 1;
  font-size: 12px;
  font-family: sans-serif;
  padding: 3px 6px;
  margin: 3px 0 0 3px;
`;
