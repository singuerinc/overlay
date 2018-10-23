import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setVisibility as setHelpVisibility } from '../../actions/help';
import { setVisibility as setSettingsVisibility } from '../../actions/settings';
import { setAllowAnalytics } from '../../actions/settings';
import { setVisibility as setToolsVisibility } from '../../actions/tools';
import { ISettingsStore } from '../../reducers/settings';
import {
  onMouseLeave,
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { Toggle } from './Toggle';

interface IProps {
  className?: string;
  settings: ISettingsStore;
  setAllowAnalytics: (value: boolean) => void;
  setHelpVisibility: (value: boolean) => void;
  setSettingsVisibility: (value: boolean) => void;
  setToolsVisibility: (value: boolean) => void;
}

class SettingsComponent extends React.Component<IProps> {
  private el: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    startListeningToIgnoreMouseEvents(this.el.current);
  }

  public componentWillUnmount() {
    stopListeningToIgnoreMouseEvents(this.el.current);
    onMouseLeave();
  }

  public render() {
    const { className, settings } = this.props;
    return (
      <div ref={this.el} className={className}>
        <CloseButton>
          <MiniToolboxItem title="" onClick={() => this.close()}>
            <MiniToolboxIcon icon="x" />
          </MiniToolboxItem>
        </CloseButton>
        <h1>Settings</h1>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Allow analytics</h3>
                  <p>
                    Help us improve Overlay by sending anonymous usage stats
                  </p>
                </td>
                <td>
                  <Toggle
                    onClick={() =>
                      this.props.setAllowAnalytics(!settings.allowAnalytics)
                    }
                    checked={settings.allowAnalytics}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  private close() {
    this.props.setSettingsVisibility(false);
    this.props.setToolsVisibility(true);
    this.props.setHelpVisibility(false);
  }
}

const CloseButton = styled.ul`
  position: absolute;
  top: -36px;
  left: 0;
`;

const SettingsView = styled(SettingsComponent)`
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
  box-shadow: 0px 0px 2rem 0px rgba(0, 0, 0, 0.5);

  h1,
  h2,
  h3 {
    margin: 10px 0;
    padding: 0;
    color: #495057;
  }

  h3 {
    margin: 0;
    padding: 0;
    color: #495057;
  }

  p {
    font-size: 0.9rem;
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

export const Settings = connect(
  ({ settings }: { settings: ISettingsStore }, ownProps) => ({ settings }),
  {
    setAllowAnalytics,
    setHelpVisibility,
    setSettingsVisibility,
    setToolsVisibility
  }
)(SettingsView);
