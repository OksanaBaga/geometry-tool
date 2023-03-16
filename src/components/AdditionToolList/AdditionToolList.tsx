import React from 'react';

import { List } from '@mui/material';
import ChangeHistoryTwoToneIcon from '@mui/icons-material/ChangeHistoryTwoTone';
import SquareTwoToneIcon from '@mui/icons-material/SquareTwoTone';
import HexagonTwoToneIcon from '@mui/icons-material/HexagonTwoTone';

import { IAction } from '../../types';
import ActionItem from '../ActionItem/ActionItem';

const AdditionToolList = ({ open }: any): JSX.Element => {
  const additionActions: IAction[] = [
    {
      title: 'Triangle',
      iconElement: <ChangeHistoryTwoToneIcon />,
      handler: () => {
        console.log('Triangle');
      },
    },
    {
      title: 'Square',
      iconElement: <SquareTwoToneIcon />,
      handler: () => {
        console.log('Square');
      },
    },
    {
      title: 'Hexagon',
      iconElement: <HexagonTwoToneIcon />,
      handler: () => {
        console.log('Hexagon');
      },
    },
  ];

  return (
    <List>
      {additionActions.map((action: IAction) => (
        <ActionItem key={action.title} open={open} {...action} />
      ))}
    </List>
  );
};

export default AdditionToolList;
