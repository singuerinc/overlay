import * as React from 'react';
import styled from 'styled-components';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';

interface IProps {
  className?: string;
  close: () => void;
}

class Element extends React.Component<IProps> {
  private el: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    startListeningToIgnoreMouseEvents(this.el.current);
  }

  public componentWillUnmount() {
    stopListeningToIgnoreMouseEvents(this.el.current);
  }

  public render() {
    const { className, close } = this.props;
    return (
      <div ref={this.el} className={className}>
        <CloseButton>
          <MiniToolboxItem title="" onClick={close}>
            <MiniToolboxIcon icon="x" />
          </MiniToolboxItem>
        </CloseButton>
        <h1>Keyboard shortcuts</h1>
        <div>
          <h2>Global</h2>
          <table>
            <tbody>
              <tr>
                <td>Change tool color (when mouse over)</td>
                <td>
                  <kbd>b</kbd>
                  <kbd>g</kbd>
                  <kbd>o</kbd>
                  <kbd>r</kbd>
                  <kbd>y</kbd>
                </td>
              </tr>
              <tr>
                <td>Delete tool (when mouse over)</td>
                <td>
                  <kbd>backspace</kbd>
                  <kbd>delete</kbd>
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Image</h2>
          <table>
            <tbody>
              <tr>
                <td>Invert colors</td>
                <td>
                  <kbd>i</kbd>
                </td>
              </tr>
              <tr>
                <td>Change opacity 0% to 100%</td>
                <td>
                  <kbd>0</kbd> - <kbd>9</kbd>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const CloseButton = styled.ul`
  position: absolute;
  top: -36px;
  left: 0;
`;

export const Help = styled(Element)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  display: block;
  align-items: center;
  justify-content: center;
  padding: 40px 40px;
  background-color: #f8f9fa;
  color: #495057;

  h1,
  h2,
  h3 {
    margin: 10px 0;
    padding: 0;
    color: #495057;
  }

  table {
    width: 100%;
  }

  kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 12px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
  }

  tr {
    display: flex;
  }
  tr td {
    flex: 1 0 50%;
  }
`;
