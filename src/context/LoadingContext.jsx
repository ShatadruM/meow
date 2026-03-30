import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // NEW: Track if this is the very first time they opened the site
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, isInitialLoad, setIsInitialLoad }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);