import React, { createContext, useContext, useState, ReactNode } from "react";

type CacheContextType = {
  cache: { [key: string]: any };
  setCache: (key: string, value: any) => void;
  getCache: (key: string) => any;
};

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cache, setCacheState] = useState<{ [key: string]: any }>({});

  const setCache = (key: string, value: any) => {
    setCacheState((prevCache) => ({ ...prevCache, [key]: value }));
  };

  const getCache = (key: string) => {
    return cache[key];
  };

  return (
    <CacheContext.Provider value={{ cache, setCache, getCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error("useCache must be used within a CacheProvider");
  }
  return context;
};
