import * as ipc from "electron-better-ipc";
import * as React from "react";
import { injectGlobal } from "styled-components";
import * as uuid from "uuid/v1";
import Grid from "../components/grid/Grid";
import Guide from "../components/guide/Guide";
import OnionImage from "../components/onionImage/OnionImage";
import Ruler from "../components/ruler/Ruler";
import { Toolbox } from "../components/toolbox/Toolbox";
import { IGrid } from "./grid/IGrid";
import { default as grid } from "./grid/gridObj";
import { IGuide } from "./guide/IGuide";
import { default as guide } from "./guide/guideObj";
import { Help } from "./help/Help";
import { IOnionImage } from "./onionImage/IOnionImage";
import { default as onion } from "./onionImage/onionObj";
import { IRuler } from "./ruler/IRuler";
import { default as ruler } from "./ruler/rulerObj";
import { Tool, ToolType } from "./toolbox/Tool";

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
  constructor(props) {
    super(props);

    this.state = {
      guides: [],
      grids: [],
      onions: [],
      rulers: [],
      isStuffVisible: true,
      isGridVisible: false,
      helpVisible: false
    };
  }

  toggle = (tool: ToolType) => {
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
  };

  async showOpenDialogImage(): Promise<string[]> {
    return await ipc.callMain("show-open-dialog-image");
  }

  create = async (tool: ToolType) => {
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
        const paths: string[] | null = await this.showOpenDialogImage();

        if (paths) {
          const onions: IOnionImage[] = paths.map((path: string) => {
            return {
              ...onion,
              src: path,
              id: uuid()
            };
          });

          this.setState({
            onions: [...this.state.onions, ...onions]
          });
        }
        break;
    }
  };

  setVisibility = (value: boolean) => {
    this.setState({
      isStuffVisible: value
    });
  };

  toggleHelp = () => {
    this.setState({
      helpVisible: !this.state.helpVisible
    });
  };

  removeGuide = (id: string) => {
    const filtered: IGuide[] = this.state.guides.filter(
      (guide: IGuide) => guide.id !== id
    );
    this.setState({
      guides: filtered
    });
  };

  duplicateRuler = (ruler: IRuler) => {
    this.setState({
      rulers: [...this.state.rulers, ruler]
    });
  };

  removeRuler = (id: string) => {
    const filtered: IRuler[] = this.state.rulers.filter(
      (ruler: IRuler) => ruler.id !== id
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
    const isGridVisible = grids.length > 0;

    return (
      <>
        {isStuffVisible && (
          <>
            {grids.map((props: IGrid) => (
              <Grid key={props.id} {...props} />
            ))}
            {rulers.map((props: IRuler) => (
              <Ruler
                key={props.id}
                {...props}
                duplicate={this.duplicateRuler}
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
        {helpVisible && <Help close={this.toggleHelp} />}
        <Toolbox
          x={0}
          y={0}
          setVisibility={this.setVisibility}
          isStuffVisible={isStuffVisible}
          isGridVisible={isGridVisible}
          create={this.create}
          toggle={this.toggle}
          toggleHelp={this.toggleHelp}
        />
      </>
    );
  }
}

export { App };
