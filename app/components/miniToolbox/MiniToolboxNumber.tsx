import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  display: flex;
`;

export const MiniToolboxNumber = ({ value }: { value: number }) => {
  return <Wrapper>{value}</Wrapper>;
};
