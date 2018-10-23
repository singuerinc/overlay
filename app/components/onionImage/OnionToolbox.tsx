import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface IProps {
  opacity: number;
  inverted: boolean;
  setInverted: (value: boolean) => void;
  setOpacity: (value: number) => void;
  remove: () => void;
}

export const OnionToolbox = ({
  inverted,
  opacity,
  setInverted,
  setOpacity,
  remove
}: IProps) => (
  <MiniToolboxWrapper>
    <MiniToolboxItem
      title={`Set opacity to ${Math.max(0, opacity - 0.1).toFixed(1)}`}
      onClick={() => setOpacity(Math.max(0, opacity - 0.1))}
    >
      <MiniToolboxIcon icon="minus-circle" />
    </MiniToolboxItem>
    <MiniToolboxItem
      title={`Set opacity to ${opacity === 0.5 ? '1' : '0.5'}`}
      onClick={() => setOpacity(opacity === 0.5 ? 1 : 0.5)}
    >
      <MiniToolboxIcon icon="percent" />
    </MiniToolboxItem>
    <MiniToolboxItem
      title={`Set opacity to ${Math.min(1, opacity + 0.1).toFixed(1)}`}
      onClick={() => setOpacity(Math.min(1, opacity + 0.1))}
    >
      <MiniToolboxIcon icon="plus-circle" />
    </MiniToolboxItem>
    <MiniToolboxItem
      title="Invert colors"
      onClick={() => setInverted(!inverted)}
    >
      <MiniToolboxIcon icon={inverted ? 'sun' : 'moon'} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
