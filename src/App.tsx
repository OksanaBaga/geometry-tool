import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RootStoreProvider } from './context/AppStateContext';
import Layout from './components/Layout/Layout';
import NotFoundPage from './pages/NotFoundPage';
import AppPage from './pages/AppPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RootStoreProvider>
        <Layout>
          <Routes>
            <Route index path="/" element={<AppPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </RootStoreProvider>
    </BrowserRouter>
  );
}

export default App;
