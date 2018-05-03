import styled, { injectGlobal } from 'styled-components';
import * as React from 'react';
import Tooltip from 'tooltip.js';

injectGlobal`
  .tooltip {
    position: absolute;
    background: #111;
    color: #eee;
    width: auto;
    border-radius: 3px;
    padding: 5px 10px;
    font-size: 12px;
    text-align: center;
  }
  .tooltip[x-placement^='bottom'] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      border-color: #111;
      position: absolute;
      margin: 5px;
  }
`;

export const Element = styled.li`
  background-color: #111;
  color: #f4f4f4;
  display: inline-block;
  text-align: center;
  justify-content: center;
  padding: 6px 8px;
  margin: 0;

  &:hover {
    cursor: pointer;
    background-color: #333;
  }
`;

interface Props {
  title: string;
  onClick: () => void;
}

export class MiniToolboxItem extends React.Component<Props> {
  private el;
  private tooltip: Tooltip;

  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  componentDidMount() {
    this.tooltip = new Tooltip(this.el.current, {
      placement: 'bottom',
      container: this.el.current,
      title: this.props.title,
      offset: '0, 5'
    });
  }

  componentWillUpdate(nextProps, nextState) {
    this.tooltip.updateTitleContent(nextProps.title);
  }

  componentWillUnmount() {
    this.tooltip.dispose();
  }

  render() {
    const { onClick, children } = this.props;

    return (
      <Element innerRef={this.el} onClick={onClick}>
        {children}
      </Element>
    );
  }
}
