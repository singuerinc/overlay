import * as React from 'react';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Color } from '../../utils/Color';
import { MiniToolboxColor } from '../miniToolbox/MiniToolboxColor';

interface Props {
  duplicate: () => void;
  remove: () => void;
  setColor: (color: Color) => void;
}

export const RulerToolbox = ({ remove, duplicate, setColor }: Props) => (
  <MiniToolboxWrapper>
    <MiniToolboxItem onClick={() => setColor(Color.RED)}>
      <MiniToolboxColor color={Color.RED} />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => setColor(Color.ORANGE)}>
      <MiniToolboxColor color={Color.ORANGE} />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => setColor(Color.INDIGO)}>
      <MiniToolboxColor color={Color.INDIGO} />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => setColor(Color.LIME)}>
      <MiniToolboxColor color={Color.LIME} />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => setColor(Color.YELLOW)}>
      <MiniToolboxColor color={Color.YELLOW} />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => duplicate()}>
      <MiniToolboxIcon icon="copy" />
    </MiniToolboxItem>
    <MiniToolboxItem onClick={() => remove()}>
      <MiniToolboxIcon icon="trash-2" />
    </MiniToolboxItem>
  </MiniToolboxWrapper>
);
