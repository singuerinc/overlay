import * as Mousetrap from 'mousetrap';
import * as React from 'react';

interface IPros {
  alwaysOnTop: boolean;
  isToolsLocked: boolean;
  isToolsVisible: boolean;
  setAlwaysOnTop: (value: boolean) => void;
  setAllToolsLocked: (value: boolean) => void;
  setToolsVisibility: (value: boolean) => void;
}

class GlobalKeys extends React.PureComponent<IPros> {
  public componentDidMount() {
    Mousetrap.bind('esc', () => {
      this.props.setAlwaysOnTop(!this.props.alwaysOnTop);
    });

    Mousetrap.bind('s', () => {
      this.props.setToolsVisibility(!this.props.isToolsVisible);
    });

    Mousetrap.bind('l', () => {
      this.props.setAllToolsLocked(!this.props.isToolsLocked);
    });
  }
  public render() {
    return null;
  }
}

export { GlobalKeys };
