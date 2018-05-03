import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Color } from '../../utils/Color';
import { MiniToolboxColors } from '../miniToolbox/MiniToolboxColors';

interface Props {
  rotate: () => void;
  remove: () => void;
  setColor: (color: Color) => void;
}

export const GuideToolbox = ({ remove, rotate, setColor }: Props) => (
  <MiniToolboxWrapper>
    <MiniToolboxColors setColor={setColor} />
    <MiniToolboxItem title="Rotate" onClick={() => rotate()}>
      <MiniToolboxIcon icon="rotate-cw" />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={() => remove()}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
