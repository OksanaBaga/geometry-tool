import React from 'react';

import { Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../context/AppStateContext';
import { AppBarStyled } from './Header.styles';

function Header(): JSX.Element {
  const { uiStore } = useRootStore();
  return (
    <AppBarStyled position="fixed" open={uiStore.isLeftNavOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => uiStore.setLeftNavOpen(true)}
          edge="start"
          sx={{
            marginRight: 5,
            ...(uiStore.isLeftNavOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Geometry tool
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );
}

export default observer(Header);
