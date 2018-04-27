import styled from 'styled-components';

export const MiniToolboxWrapper = styled.ul`
  position: absolute;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
`;

// export const MiniToolboxWrapper = styled.ul.attrs<{
//   x: number;
//   y: number;
// }>({
//   x: (props) => props.x,
//   y: (props) => props.y
// })`
//   position: fixed;
//   background-color: transparent;
//   display: flex;
//   flex-direction: row;
//   margin: 0;
//   padding: 0;
//   top: ${({ y }) => y}px;
//   left: ${({ x }) => x}px;
// `;
