import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface Props {
  x: number;
  y: number;
  inverted: boolean;
  setInverted: (value: boolean) => void;
  remove: () => void;
}

export const OnionToolbox = ({
  x,
  y,
  inverted,
  setInverted,
  remove
}: Props) => (
  <MiniToolboxWrapper>
    <MiniToolboxItem onClick={() => setInverted(!inverted)}>
      <MiniToolboxIcon icon={inverted ? 'sun' : 'moon'} />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => remove()}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
