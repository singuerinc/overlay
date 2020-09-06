import * as React from 'react';
import { Color } from '../../utils/Color';
import { MiniToolboxColors } from '../miniToolbox/MiniToolboxColors';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface IProps {
  color: Color;
  rotate: () => void;
  remove: () => void;
  setColor: (color: Color) => void;
}

export const GuideToolbox = ({ color, remove, rotate, setColor }: IProps) => (
  <MiniToolboxWrapper>
    <MiniToolboxColors color={color} setColor={setColor} />
    <MiniToolboxItem title="Rotate" onClick={rotate}>
      <MiniToolboxIcon icon="rotate-cw" />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
