import * as React from 'react';
import { Color } from '../../utils/Color';
import { MiniToolboxColors } from '../miniToolbox/MiniToolboxColors';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface IProps {
  remove: () => void;
  setColor: (color: Color) => void;
}

export const RulerToolbox = ({ remove, setColor }: IProps) => (
  <MiniToolboxWrapper>
    <MiniToolboxColors setColor={setColor} />
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
