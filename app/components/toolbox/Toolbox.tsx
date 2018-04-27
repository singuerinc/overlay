import * as React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  background-color: black;
  display: flex;
  flex: 1 1 auto;
  border-right: 2px solid #222;
  border-bottom: 2px solid #222;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  padding: 5px 15px;
  font-size: 12px;
  text-transform: uppercase;

  &:hover {
    background-color: #333;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
  }
`;

const Element = styled.ul.attrs<{
  x: number;
  y: number;
}>({
  x: (props) => props.x,
  y: (props) => props.y
})`
  position: fixed;
  background-color: black;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

export type Tool = 'guide' | 'ruler' | 'onion' | 'grid';

interface Props {
  create: Function;
}

class Toolbox extends React.Component<Props> {
  render() {
    return (
      <Element x={0} y={0}>
        <Item onClick={() => this.props.create('guide')}>Guide</Item>
        <Item onClick={() => this.props.create('guide')}>Ruler</Item>
        <Item onClick={() => this.props.create('guide')}>Onion</Item>
        <Item onClick={() => this.props.create('guide')}>Grid</Item>
      </Element>
    );
  }
}

export default Toolbox;
