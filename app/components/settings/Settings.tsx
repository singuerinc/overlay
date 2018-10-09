import * as R from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateAllSettings } from '../../actions/settings';
import { IAppStore } from '../../reducers';
import { ISettingsStore } from '../../reducers/settings';
import {
  startListeningToIgnoreMouseEvents,
  stopListeningToIgnoreMouseEvents
} from '../helpers/mouseEvents';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { Toggle } from './Toggle';

interface IProps {
  className?: string;
  settings: ISettingsStore;
  // close: () => void;
  updateAllSettings: (settings: ISettingsStore) => void;
}

class SettingsComponent extends React.Component<IProps> {
  private el: React.RefObject<HTMLDivElement> = React.createRef();

  private saveSettings = R.curry((path: string[], value: boolean) => () => {
    const settings = R.assocPath(path, value, this.props.settings);
    this.props.updateAllSettings(settings);
  });

  public componentDidMount() {
    startListeningToIgnoreMouseEvents(this.el.current);
  }

  public componentWillUnmount() {
    stopListeningToIgnoreMouseEvents(this.el.current);
  }

  public render() {
    const { className, settings } = this.props;
    return (
      <div ref={this.el} className={className}>
        <CloseButton>
          <MiniToolboxItem
            title=""
            onClick={() => {
              //
            }}
          >
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
                    onClick={this.saveSettings(['var1'], !settings.var1)}
                    checked={settings.var1}
                  />
                </td>
              </tr>
              <tr>
                <td>Setting 2</td>
                <td>
                  <Toggle
                    onClick={this.saveSettings(['var2'], !settings.var2)}
                    checked={settings.var2}
                  />
                </td>
              </tr>
              <tr>
                <td>Setting 3</td>
                <td>
                  <Toggle
                    onClick={this.saveSettings(['var3'], !settings.var3)}
                    checked={settings.var3}
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

export const Settings = connect(
  (store: IAppStore, ownProps) => ({ settings: store.settings }),
  {
    updateAllSettings
  }
)(SettingsView);
