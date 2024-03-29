import { createContext, ReactNode, useState } from 'react';

// 1. context

// 2. Switch

// 3. Thumb

const SwitchContext = createContext({});

type SwitchContextT = {
  checked: boolean;
  disabled: boolean;
};
const DEFAULT_SWITCH_CONTEXT_VALUE: SwitchContextT = { checked: false, disabled: false };

const SwitchProvider = (props: object & { children: ReactNode }) => {
  const [checked, setChecked] = useState(DEFAULT_SWITCH_CONTEXT_VALUE);

  return <SwitchContext.Provider {...props} value={{ checked, setChecked }} />;
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
