import { connect } from 'react-redux';
import {
  setAllLocked,
  setAlwaysOnTop,
  setVisibility
} from '../../actions/tools';
import { IAppStore } from '../../reducers';
import { GlobalKeys } from './GlobalKeys';

const mapStateToProps = (state: IAppStore, ownProps: any) => ({
  alwaysOnTop: state.tools.alwaysOnTop,
  isToolsLocked: state.tools.allLocked,
  isToolsVisible: state.tools.visible
});

const mapDispatchToProps = {
  setAllToolsLocked: setAllLocked,
  setAlwaysOnTop,
  setToolsVisibility: setVisibility
};

const GlobalKeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalKeys);

export { GlobalKeysContainer };
