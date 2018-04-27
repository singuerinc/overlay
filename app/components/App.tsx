import * as React from 'react';
import OnionImage from '../components/onionImage/OnionImage';
import Guide from '../components/guide/Guide';
import Ruler from '../components/ruler/Ruler';
import Grid from '../components/grid/Grid';
import Toolbox, { Tool } from '../components/toolbox/Toolbox';
import { IRuler } from './ruler/IRuler';
import { IOnionImage } from './onionImage/IOnionImage';
import { IGuide } from './guide/IGuide';
import { IGrid } from './grid/IGrid';
import { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

interface State {
  grids: IGrid[];
  images: IOnionImage[];
  rulers: IRuler[];
  guides: IGuide[];
}

class App extends React.Component<{}, State> {
  state = {
    guides: [],
    grids: [{ size: 10, color: 'red', type: 'solid', opacity: 0.3 }],

    images: [
      {
        src: require('./screen1.png'),
        x: 500,
        y: 100,
        width: 50,
        height: 50
      },
      {
        src: require('./screen2.jpg'),
        x: 800,
        y: 500,
        width: 50,
        height: 50
      }
    ],

    rulers: [
      {
        x: 100,
        y: 100,
        width: 250,
        height: 250,
        color: 'orange'
      },
      {
        x: 200,
        y: 200,
        width: 200,
        height: 200,
        color: 'purple'
      }
    ]
  };

  create(tool: Tool) {
    switch (tool) {
      case 'guide':
        this.setState({
          ...this.state,
          guides: [
            ...this.state.guides,
            {
              x: 0,
              y: 102,
              type: 'h',
              color: 'green'
            }
          ]
        });
        break;
    }
  }

  render() {
    const { grids, rulers, images, guides } = this.state;
    return (
      <>
        {grids.map((props) => <Grid {...props} />)}
        {rulers.map((props) => <Ruler {...props} />)}
        {images.map((props) => <OnionImage {...props} />)}
        {guides.map((props) => <Guide {...props} />)}
        <Toolbox create={() => this.create('guide')} />
      </>
    );
  }
}

export default App;
