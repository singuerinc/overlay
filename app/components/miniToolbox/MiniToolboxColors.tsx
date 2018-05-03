import React = require('react');
import { MiniToolboxItem } from './MiniToolboxItem';
import { MiniToolboxColor } from './MiniToolboxColor';
import { Color } from '../../utils/Color';

export const MiniToolboxColors = ({ setColor }) => (
  <>
    <MiniToolboxItem title="Red" onClick={() => setColor(Color.RED)}>
      <MiniToolboxColor color={Color.RED} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Orange" onClick={() => setColor(Color.ORANGE)}>
      <MiniToolboxColor color={Color.ORANGE} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Blue" onClick={() => setColor(Color.INDIGO)}>
      <MiniToolboxColor color={Color.INDIGO} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Green" onClick={() => setColor(Color.LIME)}>
      <MiniToolboxColor color={Color.LIME} />
    </MiniToolboxItem>
    <MiniToolboxItem title="Yellow" onClick={() => setColor(Color.YELLOW)}>
      <MiniToolboxColor color={Color.YELLOW} />
    </MiniToolboxItem>
  </>
);
