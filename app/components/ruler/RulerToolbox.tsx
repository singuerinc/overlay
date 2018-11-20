import * as React from 'react';
import { Color } from '../../utils/Color';
import { MiniToolboxColors } from '../miniToolbox/MiniToolboxColors';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface IProps {
  color: Color;
  remove: () => void;
  setColor: (color: Color) => void;
  splitHorizontally: () => void;
  splitVertically: () => void;
}

export const RulerToolbox = ({
  remove,
  color,
  setColor,
  splitHorizontally,
  splitVertically
}: IProps) => (
  <MiniToolboxWrapper>
    <MiniToolboxColors setColor={setColor} color={color} />
    <MiniToolboxItem title="Split vertically" onClick={splitVertically}>
      <MiniToolboxIcon icon="pause" />
    </MiniToolboxItem>
    <MiniToolboxItem title="Split horizontally" onClick={splitHorizontally}>
      <MiniToolboxIcon icon="pause" />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
