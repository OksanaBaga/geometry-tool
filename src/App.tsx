import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import NotFoundPage from './pages/NotFoundPage';
import AppPage from './pages/AppPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path="/" element={<AppPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
