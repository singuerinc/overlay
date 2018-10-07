import * as ipc from 'electron-better-ipc';
import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { Grid } from '../components/grid/Grid';
import Guide from '../components/guide/Guide';
import OnionImage from '../components/onionImage/OnionImage';
import Ruler from '../components/ruler/Ruler';
import { Toolbox } from '../components/toolbox/Toolbox';
import { setStuffVisibility, toggleHelp } from './core/reducer';
import { addGrid, removeGrid } from './grid/factory';
import { IGrid } from './grid/IGrid';
import { addGuide, removeGuide } from './guide/factory';
import { IGuide } from './guide/IGuide';
import { Help } from './help/Help';
import { addOnionImage, removeOnionImage } from './onionImage/factory';
import { IOnionImage } from './onionImage/IOnionImage';
import { addRuler, duplicateRuler, removeRuler } from './ruler/factory';
import { IRuler } from './ruler/IRuler';
import { Tool } from './toolbox/Tool';
import { initializeAnalytics, track } from './core/analytics';

interface State {
  guides: IGuide[];
  grids: IGrid[];
  onions: IOnionImage[];
  rulers: IRuler[];
  isStuffVisible: boolean;
  isGridVisible: boolean;
  helpVisible: boolean;
}

class App extends React.Component<{}, State> {
  public state = {
    guides: [],
    grids: [],
    onions: [],
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
        this.setState(addGuide, () => {
          track('tool', 'guide', 'add');
        });
        break;
      case Tool.RULER:
        this.setState(addRuler, () => {
          track('tool', 'ruler', 'add');
        });
        break;
      case Tool.ONION:
        const paths: string[] | null = await this.showOpenDialogImage();
        if (paths) {
          this.setState(addOnionImage(paths), () => {
            track('tool', 'onion', 'add');
          });
        }
        break;
    }
  };

  render() {
    const {
      grids,
      rulers,
      onions,
      guides,
      isStuffVisible,
      helpVisible
    } = this.state;
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
            {onions.map((props: IOnionImage) => (
              <OnionImage
                key={props.id}
                {...props}
                remove={() =>
                  this.setState(removeOnionImage(props.id), () => {
                    track('tool', 'onion', 'remove');
                  })
                }
              />
            ))}
            {guides.map((props: IGuide) => (
              <Guide
                key={props.id}
                {...props}
                remove={() =>
                  this.setState(removeGuide(props.id), () => {
                    track('tool', 'guide', 'remove');
                  })
                }
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

export { App };

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;
