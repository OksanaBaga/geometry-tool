import React from 'react';

import RootStore from '../stores/RootStore';

let store: RootStore;

const StoreContext = React.createContext<RootStore | undefined>(undefined);
StoreContext.displayName = 'StoreContext';

const useRootStore = (): RootStore => {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within RootStoreProvider!');
  }

  return context;
};

function initializeStore(): RootStore {
  return store ?? new RootStore();
}

interface RootStoreProviderProps {
  children: React.ReactNode;
}

const RootStoreProvider = ({
  children,
}: RootStoreProviderProps): JSX.Element => {
  const rootStore = initializeStore();

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export { useRootStore, RootStoreProvider };
