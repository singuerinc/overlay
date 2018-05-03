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
  colorList: { color: Color; label: string }[];
}

export class MiniToolboxColors extends React.Component<Props, State> {
  state = {
    isOpen: false,
    colorList: [{ color: Color.RED, label: 'Red' }]
  };
  render() {
    const { setColor } = this.props;
    return (
      <ColorsGroupIcon
        onMouseEnter={() => this.setState({ isOpen: true })}
        onMouseLeave={() => this.setState({ isOpen: false })}
      >
        <ColorsList>
          <MiniToolboxItem
            title="Red"
            placement="left"
            onClick={() => setColor(Color.RED)}
          >
            <MiniToolboxColor color={Color.RED} />
          </MiniToolboxItem>
          {this.state.isOpen && (
            <>
              <MiniToolboxItem
                title="Orange"
                placement="left"
                onClick={() => setColor(Color.ORANGE)}
              >
                <MiniToolboxColor color={Color.ORANGE} />
              </MiniToolboxItem>
              <MiniToolboxItem
                title="Blue"
                placement="left"
                onClick={() => setColor(Color.INDIGO)}
              >
                <MiniToolboxColor color={Color.INDIGO} />
              </MiniToolboxItem>
              <MiniToolboxItem
                title="Green"
                placement="left"
                onClick={() => setColor(Color.LIME)}
              >
                <MiniToolboxColor color={Color.LIME} />
              </MiniToolboxItem>
              <MiniToolboxItem
                title="Yellow"
                placement="left"
                onClick={() => setColor(Color.YELLOW)}
              >
                <MiniToolboxColor color={Color.YELLOW} />
              </MiniToolboxItem>
            </>
          )}
        </ColorsList>
      </ColorsGroupIcon>
    );
  }
}
