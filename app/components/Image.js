// @flow
import React, { Component } from 'react';
import styles from './Image.css';
import screen from '../screen.png';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import interactjs from 'interactjs';
import Position from './positions/Position';

type Props = {};

const Coords = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #999;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const ImageWrapper = styled.div.attrs({})`
  position: fixed;
`;

const ImageElement = styled.img.attrs({
  opacity: (props) => props.opacity,
  inverted: (props) => props.inverted
})`
  opacity: ${({ opacity }) => opacity};
  filter: invert(${({ inverted }) => (inverted ? '100%' : '0%')});
`;

export default class Image extends Component<Props> {
  props: Props;

  state = {
    opacity: 1,
    inverted: false,
    x: 0,
    y: 0
  };

  componentDidMount() {
    interactjs(this.el).draggable({
      onmove: (event) => {
        const { dx, dy, target } = event;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

        target.style.webkitTransform = target.style.transform = `translate(${x}px,${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        this.setState({
          ...this.state,
          x,
          y
        });
      }
    });

    mousetrap.bind(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], (e) => {
      const val = parseInt(e.key, 10) * 0.1;
      this.setState({
        ...this.state,
        opacity: val === 0 ? 1 : val
      });
    });

    mousetrap.bind(['=', '+', '-', '_'], (e) => {
      let value = 0.05;
      if (e.keyCode === 45 || e.keyCode === 95) {
        // - 45
        // _ 95
        value *= -1;
      } else if (e.keyCode === 61 || e.keyCode === 43) {
        // = 61
        // + 43
        value *= 1;
      }

      const { opacity } = this.state;
      const newOpacity = Math.max(0, Math.min(1, opacity + value));

      this.setState({
        ...this.state,
        opacity: newOpacity
      });
    });

    mousetrap.bind(['i'], () => {
      this.setState({
        ...this.state,
        inverted: !this.state.inverted
      });
    });
  }

  render() {
    const {
      opacity, inverted, x, y
    } = this.state;
    return (
      <Wrapper>
        <ImageWrapper
          innerRef={(el) => {
            this.el = el;
          }}
        >
          <Coords>
            {x}:{y}
          </Coords>
          <ImageElement src={screen} opacity={opacity} inverted={inverted} />
        </ImageWrapper>
      </Wrapper>
    );
  }
}
