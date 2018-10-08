import { icons } from 'feather-icons';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span<{ active: boolean }>`
  display: flex;
  svg {
    stroke: ${({ active }) => (active ? 'white !important' : '#202A2D')};
  }
`;

export const MiniToolboxIcon = ({
  icon,
  active = false
}: {
  icon: string;
  active?: boolean;
}) => (
  <Wrapper
    active={active}
    dangerouslySetInnerHTML={{
      __html: icons[icon].toSvg()
    }}
  />
);
