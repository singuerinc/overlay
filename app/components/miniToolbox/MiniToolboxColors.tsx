import * as R from 'ramda';
import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../../utils/Color';
import { MiniToolboxColor } from './MiniToolboxColor';
import { MiniToolboxItem } from './MiniToolboxItem';

const updateColorList = (color: Color) => ({ colorList }) => {
  const sameColor = R.curry((color, c) => c.color === color);
  const diffColor = R.curry((color, c) => c.color !== color);
  const selected: ColorWithLabel = R.find(sameColor(color), colorList);
  const filtered: ColorWithLabel[] = R.filter(diffColor(color), colorList);

  return {
    colorList: [selected, ...filtered]
  };
};

interface Props {
  setColor: (color: Color) => void;
}

interface ColorWithLabel {
  color: Color;
  label: string;
}

interface State {
  isOpen: boolean;
  colorList: ColorWithLabel[];
}

const open = () => ({ isOpen: true });
const close = () => ({ isOpen: false });

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

  render() {
    const { setColor } = this.props;
    const { colorList } = this.state;
    const [first, ...others] = colorList;
    return (
      <ColorsGroupIcon
        onMouseEnter={() => this.setState(open)}
        onMouseLeave={() => this.setState(close)}
      >
        <ColorsList>
          <MiniToolboxItem
            title={first.label}
            placement="left"
            onClick={() => {
              setColor(first.color);
              this.setState(updateColorList(first.color));
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
                    this.setState(updateColorList(c.color));
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

const ColorsGroupIcon = styled.li`
  list-style-type: none;
  width: 40px;
  height: 36px;
`;

const ColorsList = styled.ul``;
