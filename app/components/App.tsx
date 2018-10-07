import * as ipc from 'electron-better-ipc';
import * as R from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { addGuide, removeGuide } from '../actions/guides';
import { addOnion, removeOnion } from '../actions/onions';
import { Grid } from '../components/grid/Grid';
import Guide from '../components/guide/Guide';
import OnionImage from '../components/onionImage/OnionImage';
import Ruler from '../components/ruler/Ruler';
import { Toolbox } from '../components/toolbox/Toolbox';
import { initializeAnalytics, track } from './core/analytics';
import { setStuffVisibility, toggleHelp } from './core/reducer';
import { addGrid, removeGrid } from './grid/factory';
import { IGrid } from './grid/IGrid';
import { factory as GuideFactory } from './guide/factory';
import { IGuide } from './guide/IGuide';
import { Help } from './help/Help';
import { factory as OnionFactory } from './onionImage/factory';
import { IOnionImage } from './onionImage/IOnionImage';
import { addRuler, duplicateRuler, removeRuler } from './ruler/factory';
import { IRuler } from './ruler/IRuler';
import { Tool } from './toolbox/Tool';

interface State {
  grids: IGrid[];
  rulers: IRuler[];
  isStuffVisible: boolean;
  isGridVisible: boolean;
  helpVisible: boolean;
}

interface Props {
  guides: IGuide[];
  onions: IOnionImage[];
  addGuide: (guide: IGuide) => void;
  removeGuide: (guide: IGuide) => void;
  addOnion: (onion: IOnionImage) => void;
  removeOnion: (onion: IOnionImage) => void;
}

class AppView extends React.Component<Props, State> {
  public state = {
    grids: [],
    rulers: [],
    isStuffVisible: true,
    isGridVisible: false,
    helpVisible: false
  };

  constructor(props) {
    super(props);
    initializeAnalytics();
  }

  async showOpenDialogImage(): Promise<string[]> {
    track('dialog', 'open-file', 'onion');
    return await ipc.callMain('show-open-dialog-image');
  }

  create = async (tool: Tool) => {
    switch (tool) {
      case Tool.GUIDE:
        this.props.addGuide(GuideFactory());
        track('tool', 'guide', 'add');
        break;
      case Tool.RULER:
        this.setState(addRuler, () => {
          track('tool', 'ruler', 'add');
        });
        break;
      case Tool.ONION:
        const paths: string[] | null = await this.showOpenDialogImage();
        if (paths) {
          R.map((path: string) => {
            const onion: IOnionImage = OnionFactory();
            onion.src = path;
            this.props.addOnion(onion);
            track('tool', 'onion', 'add');
          }, paths);
        }
        break;
    }
  };

  render() {
    const { grids, rulers, isStuffVisible, helpVisible } = this.state;
    const { guides, onions } = this.props;
    const isGridVisible = grids.length > 0;

    return (
      <>
        {isStuffVisible && (
          <div>
            {grids.map((props: IGrid) => (
              <Grid key={props.id} {...props} />
            ))}
            {rulers.map((props: IRuler) => (
              <Ruler
                key={props.id}
                {...props}
                duplicate={(rulerInfo) =>
                  this.setState(duplicateRuler(rulerInfo), () => {
                    track('tool', 'ruler', 'duplicate');
                  })
                }
                remove={() =>
                  this.setState(removeRuler(props.id), () => {
                    track('tool', 'ruler', 'remove');
                  })
                }
              />
            ))}
            {onions.map((onion: IOnionImage) => (
              <OnionImage
                key={onion.id}
                {...onion}
                remove={() => {
                  this.props.removeOnion(onion);
                  track('tool', 'onion', 'remove');
                }}
              />
            ))}
            {guides.map((guide: IGuide) => (
              <Guide
                key={guide.id}
                {...guide}
                remove={() => {
                  this.props.removeGuide(guide);
                  track('tool', 'guide', 'remove');
                }}
              />
            ))}
          </div>
        )}
        {helpVisible && <Help close={this._toggleHelp} />}
        <Toolbox
          x={10}
          y={10}
          setVisibility={this._setVisible}
          isStuffVisible={isStuffVisible}
          isGridVisible={isGridVisible}
          create={this.create}
          toggle={this._toggleGrid}
          toggleHelp={this._toggleHelp}
        />
      </>
    );
  }

  private _toggleGrid = () => {
    const hasGrid = this.state.grids.length > 0;
    const action = hasGrid ? removeGrid : addGrid;
    this.setState(action, () => {
      track('tool', 'grid', hasGrid ? 'remove' : 'add');
    });
  };

  private _setVisible = (visible) =>
    this.setState(setStuffVisibility(visible), () => {
      track('app', 'tools', `visibility/${this.state.isStuffVisible}`);
    });
  private _toggleHelp = () =>
    this.setState(toggleHelp, () => {
      track('app', 'help', `visibility/${this.state.helpVisible}`);
    });
}

const App = connect(
  (
    { guides, onions }: { guides: IGuide[]; onions: IOnionImage[] },
    ownProps
  ) => ({
    guides,
    onions
  }),
  { addGuide, removeGuide, addOnion, removeOnion }
)(AppView);

export { App };
