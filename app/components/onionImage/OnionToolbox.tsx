import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface IProps {
  opacity: number;
  inverted: boolean;
  scale: number;
  setInverted: (value: boolean) => void;
  setOpacity: (value: number) => void;
  setScale: (value: number) => void;
  remove: () => void;
}

export const OnionToolbox = ({
  inverted,
  opacity,
  scale,
  setInverted,
  setOpacity,
  setScale,
  remove
}: IProps) => (
  <MiniToolboxWrapper>
    <MiniToolboxItem
      title={`Set opacity to ${opacity === 0.5 ? '1' : '0.5'}`}
      onClick={() => setOpacity(opacity === 0.5 ? 1 : 0.5)}
    >
      <MiniToolboxIcon icon="percent" />
    </MiniToolboxItem>
    <MiniToolboxItem
      title="Invert colors"
      onClick={() => setInverted(!inverted)}
    >
      <MiniToolboxIcon icon={inverted ? 'sun' : 'moon'} />
    </MiniToolboxItem>
    <MiniToolboxItem
      title="Scale"
      onClick={() => setScale(scale === 1 ? 0.5 : 1)}
    >
      <MiniToolboxIcon icon={scale === 1 ? 'zoom-out' : 'zoom-in'} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Remove" onClick={remove}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
