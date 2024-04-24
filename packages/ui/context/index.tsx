/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

function createContext<T>(displayName: string, defaultContextValue?: T) {
  const Context = React.createContext<T | undefined>(defaultContextValue);

  const Provider = (props: { value?: T; children: React.ReactNode }) => {
    const { value, children } = props;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  Provider.displayName = displayName + 'Provider';

  const useContext = (componentName: string) => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(`${componentName} must be used within ${displayName}Provider`);
    }
    return context;
  };

  return [Provider, useContext] as const;
}

export { createContext };
