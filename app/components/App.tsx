import * as React from 'react';
import OnionImage from '../components/onionImage/OnionImage';
import Guide from '../components/guide/Guide';
import Ruler from '../components/ruler/Ruler';
import Grid from '../components/grid/Grid';
import { Toolbox } from '../components/toolbox/Toolbox';
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
}

class App extends React.Component<{}, State> {
  state = {
    guides: [],
    grids: [],
    onions: [],
    rulers: []
  };

  create(tool: ToolType) {
    switch (tool) {
      case Tool.GUIDE:
        this.setState({
          ...this.state,
          guides: [...this.state.guides, { ...guide }]
        });
        break;
      case Tool.RULER:
        this.setState({
          ...this.state,
          rulers: [...this.state.rulers, { ...ruler }]
        });
        break;
      case Tool.ONION:
        this.setState({
          ...this.state,
          onions: [...this.state.onions, { ...onion }]
        });
        break;
      case Tool.GRID:
        this.setState({
          ...this.state,
          grids: [...this.state.grids, { ...grid }]
        });
        break;
    }
  }

  render() {
    const { grids, rulers, onions, guides } = this.state;
    return (
      <>
        {grids.map((props) => <Grid {...props} />)}
        {rulers.map((props) => <Ruler {...props} />)}
        {onions.map((props) => <OnionImage {...props} />)}
        {guides.map((props) => <Guide {...props} />)}
        <Toolbox x={20} y={20} create={(tool: Tool) => this.create(tool)} />
      </>
    );
  }
}

export default App;
