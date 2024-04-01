import React, { useState, forwardRef, ElementRef } from 'react';
import { Primitive } from '@dtwo/primitive';
import { createContext } from '@dtwo/context';
// 1. context

// 2. Switch

// 3. Thumb

type SwitchContextValueT = {
  checked: boolean;
  disabled: boolean;
};

type SwitchContextT = {
  contextValue: SwitchContextValueT;
  setContextValue: React.Dispatch<SwitchContextValueT>;
};

const [SwitchProvider, useSwitchContext] = createContext<SwitchContextT>('SWITCH');

type ButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
type SwitchProps = ButtonProps & {
  checked?: boolean;
  disabled?: boolean;
};

export const Switch = forwardRef<ElementRef<typeof Primitive.button>, SwitchProps>(
  ({ checked = false, disabled = false, ...props }: SwitchProps, ref) => {
    const { children } = props;
    const [contextValue, setContextValue] = useState<SwitchContextValueT>({
      checked,
      disabled,
    });
    return (
      <SwitchProvider value={{ contextValue, setContextValue }}>
        <div>테스트</div>
        <Primitive.button ref={ref} {...props}></Primitive.button>
        {children}
      </SwitchProvider>
    );
  },
);

export const SwitchThumb = () => {
  const {
    contextValue: { checked, disabled },
  } = useSwitchContext('SWITCH_THUMB');

  return <input type="checkbox" checked={checked} disabled={disabled} />;
};

Switch.displayName = 'SWITCH';
