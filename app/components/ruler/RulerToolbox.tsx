import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Color } from '../../utils/Color';
import { MiniToolboxColors } from '../miniToolbox/MiniToolboxColors';

interface Props {
  duplicate: () => void;
  remove: () => void;
  setColor: (color: Color) => void;
}

export const RulerToolbox = ({ remove, duplicate, setColor }: Props) => (
  <MiniToolboxWrapper>
    <MiniToolboxColors setColor={setColor} />
    <MiniToolboxItem title="Duplicate" onClick={() => duplicate()}>
      <MiniToolboxIcon icon="copy" />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={() => remove()}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
