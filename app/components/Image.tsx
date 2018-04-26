import * as React from 'react';
import * as mousetrap from 'mousetrap';
import styled from 'styled-components';
import * as interactjs from 'interactjs';

const screen = require('./screen.png');

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

interface ImageElementProps {
  opacity: number;
  inverted: boolean;
}

const ImageElement = styled.img.attrs<ImageElementProps>({
  opacity: (props: ImageElementProps) => props.opacity,
  inverted: (props: ImageElementProps) => props.inverted
})`
  opacity: ${({ opacity }) => opacity};
  filter: invert(${({ inverted }) => (inverted ? '100%' : '0%')});
`;

const setPosition = (el, x, y) => {
  el.style.webkitTransform = el.style.transform = `translate(${x}px,${y}px)`;
  el.setAttribute('data-x', x);
  el.setAttribute('data-y', y);
};

export default class Image extends React.Component {
  private el: HTMLDivElement;
  state = {
    opacity: 1,
    inverted: false,
    x: Math.round(Math.random() * 500),
    y: Math.round(Math.random() * 500)
  };

  componentDidMount() {
    setPosition(this.el, this.state.x, this.state.y);

    interactjs(this.el).draggable({
      onmove: (event) => {
        const { dx, dy, target } = event;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

        setPosition(target, x, y);

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
    const { opacity, inverted, x, y } = this.state;
    return (
      <Wrapper>
        <ImageWrapper
          innerRef={(el: HTMLDivElement) => {
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
