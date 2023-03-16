import React from 'react';

import { List } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import CodeIcon from '@mui/icons-material/Code';

import { IAction } from '../../types';
import ActionItem from '../ActionItem/ActionItem';

const EditionToolList = ({ open }: any): JSX.Element => {
  const editionActions: IAction[] = [
    {
      title: 'Select',
      iconElement: <NavigationIcon />,
      handler: () => {
        console.log('Select');
      },
    },
    {
      title: 'Move',
      iconElement: <ControlCameraIcon />,
      handler: () => {
        console.log('Move');
      },
    },
    {
      title: 'Closest points',
      iconElement: <CodeIcon />,
      handler: () => {
        console.log('Closest points');
      },
    },
  ];

  return (
    <List>
      {editionActions.map((action: IAction) => (
        <ActionItem key={action.title} open={open} {...action} />
      ))}
    </List>
  );
};

export default EditionToolList;
