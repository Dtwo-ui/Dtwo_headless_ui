import { createContext, ReactNode, useState } from 'react';

// 1. context

// 2. Switch

// 3. Thumb

const SwitchContext = createContext<SwitchContextT | object>({});

type SwitchContextValueT = {
  checked: boolean;
  disabled: boolean;
};

type SwitchContextT = {
  contextValue: SwitchContextValueT;
  setContextValue: React.Dispatch<SwitchContextValueT>;
};

const DEFAULT_SWITCH_CONTEXT_VALUE: SwitchContextValueT = { checked: false, disabled: false };

const SwitchProvider = (props: object & { children: ReactNode }) => {
  const [contextValue, setContextValue] = useState<SwitchContextValueT>(
    DEFAULT_SWITCH_CONTEXT_VALUE,
  );

  return <SwitchContext.Provider {...props} value={{ contextValue, setContextValue }} />;
};

SwitchProvider.displayName = 'SWITCH_PROVIDER';

/**
 * TODO: forwardRef, SwitchProps 정해야함
 * */
export const Switch = () => {
  return (
    <SwitchProvider>
      <div>테스트</div>
    </SwitchProvider>
  );
};

Switch.displayName = 'SWITCH';
