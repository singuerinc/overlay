import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../../utils/Color';
import { MiniToolboxColor } from './MiniToolboxColor';
import { MiniToolboxItem } from './MiniToolboxItem';

const ColorsGroupIcon = styled.li`
  list-style-type: none;
  width: 40px;
  height: 36px;
`;
const ColorsList = styled.ul``;

interface Props {
  setColor: (color: Color) => void;
}

interface State {
  isOpen: boolean;
  colorList: ColorWithLabel[];
}

interface ColorWithLabel {
  color: Color;
  label: string;
}

export class MiniToolboxColors extends React.Component<Props, State> {
  state = {
    isOpen: false,
    colorList: [
      { color: Color.RED, label: 'Red' },
      { color: Color.ORANGE, label: 'Orange' },
      { color: Color.INDIGO, label: 'Blue' },
      { color: Color.LIME, label: 'Green' },
      { color: Color.YELLOW, label: 'Yellow' }
    ]
  };

  setMainColor = (color: Color) => {
    const selected: ColorWithLabel = this.state.colorList.find(
      (c) => c.color === color
    ) as ColorWithLabel;
    const filtered: ColorWithLabel[] = this.state.colorList.filter(
      (c) => c.color !== color
    );

    this.setState({
      colorList: [selected, ...filtered]
    });
  };

  render() {
    const { setColor } = this.props;
    const [first, ...others] = this.state.colorList;
    return (
      <ColorsGroupIcon
        onMouseEnter={() => this.setState({ isOpen: true })}
        onMouseLeave={() => this.setState({ isOpen: false })}
      >
        <ColorsList>
          <MiniToolboxItem
            title={first.label}
            placement="left"
            onClick={() => {
              setColor(first.color);
              this.setMainColor(first.color);
            }}
          >
            <MiniToolboxColor color={first.color} />
          </MiniToolboxItem>
          {this.state.isOpen && (
            <>
              {others.map((c) => (
                <MiniToolboxItem
                  title={c.label}
                  placement="left"
                  onClick={() => {
                    setColor(c.color);
                    this.setMainColor(c.color);
                  }}
                >
                  <MiniToolboxColor color={c.color} />
                </MiniToolboxItem>
              ))}
            </>
          )}
        </ColorsList>
      </ColorsGroupIcon>
    );
  }
}
