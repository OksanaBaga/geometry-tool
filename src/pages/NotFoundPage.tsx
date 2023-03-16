import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(() => ({
  '&.MuiContainer-root': {
    width: '100vw',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Heading = styled(Typography)(() => ({
  fontSize: '4rem',
  fontWeight: 'bold',
  marginBottom: '16px',
  textAlign: 'center',
}));

const Message = styled(Typography)(() => ({
  fontSize: '1.5rem',
  marginBottom: '16px',
  textAlign: 'center',
}));

function NotFoundPage(): JSX.Element {
  return (
    <StyledContainer>
      <Heading variant="h2">Oops! Page not found.</Heading>
      <Message variant="body1">
        The page you are looking for does not exist. Please check the URL or go
        back to the <Link to="/">home page</Link>.
      </Message>
    </StyledContainer>
  );
}

export default NotFoundPage;
