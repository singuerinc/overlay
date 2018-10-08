import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface IProps {
  opacity: number;
  inverted: boolean;
  locked: boolean;
  setInverted: (value: boolean) => void;
  setOpacity: (value: number) => void;
  toggleLock: () => void;
  remove: () => void;
}

export const OnionToolbox = ({
  inverted,
  opacity,
  locked,
  setInverted,
  setOpacity,
  toggleLock,
  remove
}: IProps) => (
  <MiniToolboxWrapper>
    <MiniToolboxItem
      title={`Set opacity to ${opacity !== 1 ? '1' : '0.5'}`}
      onClick={() => setOpacity(opacity !== 1 ? 1 : 0.5)}
    >
      <MiniToolboxIcon icon="percent" />
    </MiniToolboxItem>
    <MiniToolboxItem
      title="Invert colors"
      onClick={() => setInverted(!inverted)}
    >
      <MiniToolboxIcon icon={inverted ? 'sun' : 'moon'} />
    </MiniToolboxItem>
    <MiniToolboxItem title={locked ? 'Lock' : 'Unlock'} onClick={toggleLock}>
      <MiniToolboxIcon icon={locked ? 'lock' : 'unlock'} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
