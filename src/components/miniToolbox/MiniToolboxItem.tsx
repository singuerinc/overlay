import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import Tooltip from 'tooltip.js';

export const Element = styled.li`
  background-color: #111;
  display: inline-block;
  text-align: center;
  justify-content: center;
  padding: 6px 8px;
  margin: 0;
  transition: background-color 100ms ease;

  &:hover {
    cursor: pointer;
    svg {
      stroke: #999;
    }
  }
`;

interface IProps {
  title: string;
  placement?: string;
  onClick?: () => void;
}

export class MiniToolboxItem extends React.Component<IProps> {
  private el: React.RefObject<HTMLLIElement> = React.createRef();
  private tooltip: Tooltip;

  public componentDidMount() {
    this.tooltip = new Tooltip(this.el.current, {
      container: this.el.current,
      offset: this.props.placement === 'bottom' ? '0, 5' : '0, 5',
      placement: this.props.placement || 'bottom',
      title: this.props.title
    });
  }

  public componentWillUpdate(nextProps, nextState) {
    this.tooltip.updateTitleContent(nextProps.title);
  }

  public componentWillUnmount() {
    this.tooltip.dispose();
  }

  public render() {
    const { onClick, children } = this.props;
    return (
      <Element innerRef={this.el} onClick={onClick}>
        {children}
      </Element>
    );
  }
}

/* tslint:disable */
injectGlobal`
  .tooltip {
    position: absolute;
    background: #030F12;
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

  .tooltip[x-placement^='left'] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[x-placement^='right'] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
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
