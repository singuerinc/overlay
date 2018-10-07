import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Color } from '../../utils/Color';
import { MiniToolboxColors } from '../miniToolbox/MiniToolboxColors';

interface Props {
  locked: boolean;
  remove: () => void;
  toggleLock: () => void;
  setColor: (color: Color) => void;
}

export const RulerToolbox = ({
  locked,
  remove,
  setColor,
  toggleLock
}: Props) => (
  <MiniToolboxWrapper>
    <MiniToolboxColors setColor={setColor} />
    <MiniToolboxItem title={locked ? 'Lock' : 'Unlock'} onClick={toggleLock}>
      <MiniToolboxIcon icon={locked ? 'lock' : 'unlock'} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
