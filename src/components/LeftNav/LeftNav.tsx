import React from 'react';

import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { observer } from 'mobx-react-lite';

import { DrawerHeader, DrawerStyled } from './LeftNav.styles';
import EditionToolList from '../EditionToolList/EditionToolList';
import AdditionToolList from '../AdditionToolList/AdditionToolList';
import { useRootStore } from '../../context/AppStateContext';
import SaveButton from '../SaveButton/SaveButton';

const LeftNav = (): JSX.Element => {
  const theme = useTheme();
  const { uiStore } = useRootStore();

  return (
    <DrawerStyled variant="permanent" open={uiStore.isLeftNavOpen}>
      <DrawerHeader>
        <IconButton onClick={() => uiStore.setLeftNavOpen(false)}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <EditionToolList />

      <Divider />

      <AdditionToolList />

      <Divider />

      <SaveButton />
    </DrawerStyled>
  );
};

export default observer(LeftNav);
