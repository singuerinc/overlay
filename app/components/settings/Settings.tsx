import * as React from 'react';
import styled from 'styled-components';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { Toggle } from './Toggle';

interface IProps {
  className?: string;
  close: () => void;
}

interface IState {
  var1: boolean;
  var2: boolean;
  var3: boolean;
}

class Element extends React.Component<IProps, IState> {
  public state = {
    var1: true,
    var2: true,
    var3: true
  };

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
        <h1>Settings</h1>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Setting 1</td>
                <td>
                  <Toggle
                    onClick={() => {
                      this.setState((state) => ({
                        var1: !state.var1
                      }));
                    }}
                    checked={this.state.var1}
                  />
                </td>
              </tr>
              <tr>
                <td>Setting 2</td>
                <td>
                  <Toggle
                    onClick={() => {
                      this.setState((state) => ({
                        var2: !state.var2
                      }));
                    }}
                    checked={this.state.var2}
                  />
                </td>
              </tr>
              <tr>
                <td>Setting 3</td>
                <td>
                  <Toggle
                    onClick={() => {
                      this.setState((state) => ({
                        var3: !state.var3
                      }));
                    }}
                    checked={this.state.var3}
                  />
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

export const Settings = styled(Element)`
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
