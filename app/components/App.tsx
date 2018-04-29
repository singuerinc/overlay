import * as React from 'react';
import OnionImage from '../components/onionImage/OnionImage';
import Guide from '../components/guide/Guide';
import Ruler from '../components/ruler/Ruler';
import Grid from '../components/grid/Grid';
import { Toolbox } from '../components/toolbox/Toolbox';
import { Help } from './help/Help';
import { IRuler } from './ruler/IRuler';
import { IOnionImage } from './onionImage/IOnionImage';
import { IGuide } from './guide/IGuide';
import { IGrid } from './grid/IGrid';
import { ToolType, Tool } from './toolbox/Tool';
import { injectGlobal } from 'styled-components';
import { default as guide } from './guide/guideObj';
import { default as ruler } from './ruler/rulerObj';
import { default as grid } from './grid/gridObj';
import { default as onion } from './onionImage/onionObj';
import * as uuid from 'uuid/v1';

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

interface State {
  guides: IGuide[];
  grids: IGrid[];
  onions: IOnionImage[];
  rulers: IRuler[];
  isStuffVisible: boolean;
  helpVisible: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    guides: [],
    grids: [],
    onions: [],
    rulers: [],
    isStuffVisible: true,
    helpVisible: false
  };

  toggle(tool: ToolType) {
    if (this.state.grids.length > 0) {
      this.setState({
        grids: []
      });
    } else {
      const newGrid: IGrid = {
        ...grid,
        id: uuid()
      };

      this.setState({
        grids: [newGrid]
      });
    }
  }

  create(tool: ToolType) {
    switch (tool) {
      case Tool.GUIDE:
        const newGuide: IGuide = {
          ...guide,
          id: uuid()
        };
        this.setState({
          guides: [...this.state.guides, newGuide]
        });
        break;
      case Tool.RULER:
        const newRuler: IRuler = {
          ...ruler,
          id: uuid()
        };
        this.setState({
          rulers: [...this.state.rulers, newRuler]
        });
        break;
      case Tool.ONION:
        const newOnion: IOnionImage = {
          ...onion,
          id: uuid()
        };
        this.setState({
          onions: [...this.state.onions, newOnion]
        });
        break;
    }
  }

  setVisibility = (value: boolean) => {
    this.setState({
      isStuffVisible: value
    });
  };

  toggleHelp() {
    this.setState({
      helpVisible: !this.state.helpVisible
    });
  }

  removeGuide = (id: string) => {
    const filtered: IGuide[] = this.state.guides.filter(
      (guide: IGuide) => guide.id !== id
    );
    this.setState({
      guides: filtered
    });
  };

  removeRuler = (id: string) => {
    const filtered: IRuler[] = this.state.rulers.filter(
      (ruler: IOnionImage) => ruler.id !== id
    );
    this.setState({
      rulers: filtered
    });
  };

  removeOnion = (id: string) => {
    const filtered: IOnionImage[] = this.state.onions.filter(
      (onion: IOnionImage) => onion.id !== id
    );
    this.setState({
      onions: filtered
    });
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
    return (
      <>
        {helpVisible && <Help />}
        {isStuffVisible && (
          <>
            {grids.map((props: IGrid) => <Grid key={props.id} {...props} />)}
            {rulers.map((props: IRuler) => (
              <Ruler
                key={props.id}
                {...props}
                remove={() => this.removeRuler(props.id)}
              />
            ))}
            {onions.map((props: IOnionImage) => (
              <OnionImage
                key={props.id}
                {...props}
                remove={() => this.removeOnion(props.id)}
              />
            ))}
            {guides.map((props: IGuide) => (
              <Guide
                key={props.id}
                {...props}
                remove={() => this.removeGuide(props.id)}
              />
            ))}
          </>
        )}
        <Toolbox
          x={20}
          y={20}
          setVisibility={(visible: boolean) => this.setVisibility(visible)}
          isStuffVisible={isStuffVisible}
          create={(tool: Tool) => this.create(tool)}
          toggle={(tool: Tool) => this.toggle(tool)}
          toggleHelp={() => this.toggleHelp()}
        />
      </>
    );
  }
}

export default App;
