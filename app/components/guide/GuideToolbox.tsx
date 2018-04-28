import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';

interface Props {
  rotate: () => void;
  remove: () => void;
}

export const GuideToolbox = ({ remove, rotate }: Props) => (
  <MiniToolboxWrapper>
    <MiniToolboxItem onClick={() => rotate()}>
      <MiniToolboxIcon icon="rotate-cw" />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => remove()}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
