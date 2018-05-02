import styled from 'styled-components';
import { Color } from '../../utils/Color';

export const ToolItem = styled.li`
  background-color: ${Color.GRAY};
  display: flex;
  flex: 1 1 auto;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  padding: 6px 8px;
  margin: 0;

  &:hover {
    cursor: pointer;
    background-color: ${Color.ORANGE};
  }
`;
