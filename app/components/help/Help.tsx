import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../../utils/Color';

const Shortcut = styled.span`
  background-color: #999;
  color: navajowhite;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 12px;
  border: 1px solid #777;
`;

const Element = ({ className }: { className?: string }) => (
  <div className={className}>
    <h1>Keyboard shortcuts</h1>
    <div className="ruler">
      <h2>Ruler</h2>
      <table>
        <tr>
          <td>
            <Shortcut>backspace</Shortcut>
          </td>
          <td>Remove</td>
        </tr>
        <tr>
          <td>
            <Shortcut>b/g/o/r/y</Shortcut>
          </td>
          <td>Change color: blue, green, orange, red, yellow</td>
        </tr>
        <tr>
          <td>
            <Shortcut>0-9</Shortcut>
          </td>
          <td>Change opacity</td>
        </tr>
      </table>
    </div>
  </div>
);

export const Help = styled(Element)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  display: block;
  align-items: center;
  justify-content: center;
  background-color: ${Color.GRAY};
  padding: 20px 40px;
  color: #111;
`;
