import React from 'react';

import { Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { AppBarStyled } from './Header.styles';

interface IHeaderProps {
  open?: boolean;
  onClick?: () => void;
}

function Header({ open, onClick }: IHeaderProps): JSX.Element {
  return (
    <AppBarStyled position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
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

export default Header;
