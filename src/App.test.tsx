import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

// TODO: Add more tests
test('renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Geometry tool/i);
  expect(titleElement).toBeInTheDocument();
});
