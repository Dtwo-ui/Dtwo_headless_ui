import { createContext, ReactNode, useContext, useState } from 'react';

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
export const Switch = ({
  checked = false,
  disabled = false,
  ...props
}: SwitchProps) => {
  const { children } = props;

  return (
    <SwitchProvider checked={checked} disabled={disabled}>
      <div>테스트</div>
      {children}
    </SwitchProvider>
  );
};

export const SwitchThumb = () => {
  const { contextValue } = useContext(SwitchContext) as SwitchContextT;

  return (
    <input
      type="checkbox"
      checked={contextValue.checked}
      disabled={contextValue.disabled}
    />
  );
};

Switch.displayName = 'SWITCH';
