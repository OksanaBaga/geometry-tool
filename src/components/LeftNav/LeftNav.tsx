import React from 'react';

import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { DrawerHeader, DrawerStyled } from './LeftNav.styles';
import EditionToolList from '../EditionToolList/EditionToolList';
import AdditionToolList from '../AdditionToolList/AdditionToolList';

interface ILeftNavProps {
  open?: boolean;
  onClose?: () => void;
}

const LeftNav = ({ open, onClose }: ILeftNavProps): JSX.Element => {
  const theme = useTheme();

  return (
    <DrawerStyled variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <EditionToolList open={open} />

      <Divider />

      <AdditionToolList open={open} />
    </DrawerStyled>
  );
};

export default LeftNav;
