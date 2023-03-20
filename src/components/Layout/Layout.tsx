import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import LeftNav from '../LeftNav/LeftNav';
import Header from '../Header/Header';
import { LayoutWrapper } from './Layout.styles';
import { DrawerHeader } from '../LeftNav/LeftNav.styles';

interface ILayoutProps {
  children: JSX.Element;
}

function Layout(props: ILayoutProps): JSX.Element {
  const { children } = props;

  return (
    <LayoutWrapper>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Header />

        <LeftNav />

        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </LayoutWrapper>
  );
}

export default Layout;
