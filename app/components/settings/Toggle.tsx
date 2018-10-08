import { icons } from 'feather-icons';
import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  onClick: () => void;
  checked: boolean;
  className?: string;
}

const ToggleIcon = ({ onClick, className, checked }: IProps) => (
  <span
    className={className}
    onClick={onClick}
    dangerouslySetInnerHTML={{
      __html: icons[checked ? 'check-square' : 'square'].toSvg()
    }}
  />
);

export const Toggle = styled(ToggleIcon)`
  cursor: pointer;
`;
