import * as React from 'react';
import { Color } from '../../utils/Color';
import { MiniToolboxColors } from '../miniToolbox/MiniToolboxColors';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface IProps {
  rotate: () => void;
  remove: () => void;
  setColor: (color: Color) => void;
  toggleLock: () => void;
  locked: boolean;
}

export const GuideToolbox = ({
  remove,
  rotate,
  setColor,
  toggleLock,
  locked
}: IProps) => (
  <MiniToolboxWrapper>
    <MiniToolboxColors setColor={setColor} />
    <MiniToolboxItem title="Rotate" onClick={rotate}>
      <MiniToolboxIcon icon="rotate-cw" />
    </MiniToolboxItem>
    <MiniToolboxItem title={locked ? 'Lock' : 'Unlock'} onClick={toggleLock}>
      <MiniToolboxIcon icon={locked ? 'lock' : 'unlock'} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
