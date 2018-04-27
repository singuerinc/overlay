import * as React from 'react';
import { icons } from 'feather-icons';
import styled from 'styled-components';

const Wrapper = styled.span`
  display: flex;
`;

export const MiniToolboxIcon = ({ icon }: { icon: string }) => {
  return (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: icons[icon].toSvg()
      }}
    />
  );
};
