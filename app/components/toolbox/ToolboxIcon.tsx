import * as React from 'react';
import { icons } from 'feather-icons';

export const ToolboxIcon = ({ icon }: { icon: string }) => {
  return <span dangerouslySetInnerHTML={{ __html: icons[icon].toSvg() }} />;
};
