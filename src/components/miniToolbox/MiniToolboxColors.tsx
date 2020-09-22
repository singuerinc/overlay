import * as React from 'react';
import { Color } from '../../utils/Color';
import { MiniToolboxColor } from './MiniToolboxColor';
import { MiniToolboxItem } from './MiniToolboxItem';

interface IProps {
  color: Color;
  setColor: (color: Color) => void;
}

interface IColorWithLabel {
  color: Color;
  label: string;
}

interface IState {
  colorIndex: number;
}

const COLOR_LIST: IColorWithLabel[] = [
  { color: Color.RED, label: 'Red' },
  { color: Color.ORANGE, label: 'Orange' },
  { color: Color.INDIGO, label: 'Blue' },
  { color: Color.LIME, label: 'Green' },
  { color: Color.YELLOW, label: 'Yellow' }
];

export class MiniToolboxColors extends React.Component<IProps, IState> {
  public static getDerivedStateFromProps(props: IProps, state: IState) {
    return {
      colorIndex: COLOR_LIST.findIndex(
        (c: IColorWithLabel) => c.color === props.color
      )
    };
  }

  public state = {
    colorIndex: 0
  };

  public render() {
    const { colorIndex } = this.state;
    const color: IColorWithLabel = COLOR_LIST[colorIndex];
    return (
      <MiniToolboxItem
        title={color.label}
        placement="left"
        onClick={this.nextColor((colorIndex + 1) % COLOR_LIST.length)}
      >
        <MiniToolboxColor color={color.color} />
      </MiniToolboxItem>
    );
  }

  private nextColor = (colorIndex: number) => () => {
    const color: IColorWithLabel = COLOR_LIST[colorIndex];
    this.props.setColor(color.color);
  }
}
