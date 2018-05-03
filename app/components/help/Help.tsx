import * as React from 'react';
import styled from 'styled-components';
import { MiniToolboxIcon } from '../miniToolbox/MiniToolboxIcon';
import { MiniToolboxItem } from '../miniToolbox/MiniToolboxItem';

const Element = ({
  className,
  close
}: {
  className?: string;
  close: () => void;
}) => (
  <div className={className}>
    <ul>
      <MiniToolboxItem title="" onClick={close}>
        <MiniToolboxIcon icon="x" />
      </MiniToolboxItem>
    </ul>
    <h1>Keyboard shortcuts</h1>
    <div>
      <h2>Global</h2>
      <table>
        <tbody>
          <tr>
            <td>Show/Hide tools</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>
          <tr>
            <td>Show/Hide all</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>
          <tr>
            <td>Always on top on/off</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>
          <tr>
            <td>Change tool color (when hover)</td>
            <td>
              <kbd>b</kbd>
              <kbd>g</kbd>
              <kbd>o</kbd>
              <kbd>r</kbd>
              <kbd>y</kbd>
            </td>
          </tr>
          <tr>
            <td>Delete</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>
          <tr>
            <td>Duplicate</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>{' '}
        </tbody>
      </table>
      <h2>Grid</h2>
      <table>
        <tbody>
          <tr>
            <td>Add column</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>
          <tr>
            <td>Remove column</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Guide</h2>
      <table>
        <tbody>
          <tr>
            <td>Rotate</td>
            <td>
              <kbd>unassigned</kbd>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Image</h2>
      <table>
        <tbody>
          <tr>
            <td>Invert colors</td>
            <td>
              <kbd>i</kbd>
            </td>
          </tr>
          <tr>
            <td>Change opacity 0% to 100%</td>
            <td>
              <kbd>0</kbd> - <kbd>9</kbd>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Ruler</h2>
      <table>
        <tbody>
          <tr>
            <td>a</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const Help = styled(Element)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  display: block;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 40px 40px;
  color: #111;

  h1,
  h2,
  h3 {
    margin: 10px 0;
    padding: 0;
  }

  table {
    width: 100%;
  }

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

  tr {
    display: flex;
  }
  tr td {
    flex: 1 0 50%;
  }
`;
