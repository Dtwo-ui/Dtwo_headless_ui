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

const SwitchProvider = (
  props: object & {
    children: ReactNode;
    checked: boolean;
    disabled: boolean;
  },
) => {
  const { checked, disabled } = props;
  const [contextValue, setContextValue] = useState<SwitchContextValueT>({
    checked,
    disabled,
  });

  return (
    <SwitchContext.Provider
      {...props}
      value={{
        contextValue,
        setContextValue,
      }}
    />
  );
};

SwitchProvider.displayName = 'SWITCH_PROVIDER';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;
type SwitchProps = ButtonProps & {
  checked?: boolean;
  disabled?: boolean;
};

/**
 * TODO: forwardRef, SwitchProps 정해야함
 * */
export const Switch = ({ checked = false, disabled = false }: SwitchProps) => {
  return (
    <SwitchProvider checked={checked} disabled={disabled}>
      <div>테스트</div>
      <input type="checkbox" checked={checked} disabled={disabled} />
    </SwitchProvider>
  );
};

Switch.displayName = 'SWITCH';
