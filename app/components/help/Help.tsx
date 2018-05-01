import * as React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 12px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
  }
`;

const Element = ({ className }: { className?: string }) => (
  <div className={className}>
    <h1>Keyboard shortcuts</h1>
    <div className="ruler">
      <h2>Global</h2>
      <Table>
        <tbody>
          <tr>
            <td>Change color</td>
            <td>
              <kbd>b</kbd>
              <kbd>g</kbd>
              <kbd>o</kbd>
              <kbd>r</kbd>
              <kbd>y</kbd>
            </td>
          </tr>
        </tbody>
      </Table>
      <h2>Ruler</h2>
      <Table>
        <tbody>
          <tr>
            <td>Duplicate</td>
            <td>
              <kbd>Cmd/Ctrl</kbd> <kbd>d</kbd>
            </td>
          </tr>
          <tr>
            <td>Horizontal mode</td>
            <td>
              <kbd>h</kbd>
            </td>
          </tr>
          <tr>
            <td>Vertical mode</td>
            <td>
              <kbd>v</kbd>
            </td>
          </tr>
        </tbody>
      </Table>
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
  background-color: white;
  padding: 20px 40px;
  color: #111;
`;
