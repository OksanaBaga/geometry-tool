import React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

import { IAction } from '../../types';

interface IActionItemProps extends IAction {
  open?: boolean;
}

const ActionItem = (props: IActionItemProps): JSX.Element => {
  const { open, title, iconElement, handler } = props;

  return (
    <ListItem disablePadding sx={{ display: 'block' }} onClick={handler}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {iconElement}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default ActionItem;
