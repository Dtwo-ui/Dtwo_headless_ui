import React, { useState, forwardRef, ElementRef } from 'react';
import { Primitive } from '@dtwo/primitive';
import { createContext } from '@dtwo/context';
import { useControllableState } from '@dtwo/use-controllable-state';
// 1. context

// 2. Switch

// 3. Thumb

type SwitchContextValueT = {
  checked?: boolean;
  disabled: boolean;
};

// type SwitchContextT = {
//   contextValue: SwitchContextValueT;
//   setContextValue: React.Dispatch<SwitchContextValueT>;
// };

const [SwitchProvider, useSwitchContext] = createContext<SwitchContextValueT>('SWITCH');

type ButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
type SwitchProps = ButtonProps & {
  checked?: boolean;
  disabled?: boolean;
  onChangeSwitch?: (value: { checked?: boolean } | undefined) => void;
};

export const Switch = forwardRef<ElementRef<typeof Primitive.button>, SwitchProps>(
  ({ checked, disabled = false, onChangeSwitch, ...props }: SwitchProps, ref) => {
    const { children } = props;

    const [switchValue, setSwitchValue] = useControllableState({
      value: checked,
      defaultValue: false,
      onChange: onChangeSwitch,
    });

    return (
      <SwitchProvider value={{ ...switchValue, disabled }}>
        <div>테스트</div>
        <Primitive.button
          ref={ref}
          onClick={() => {
            setSwitchValue(prevState => {
              console.log('이전 상태', prevState);
              return !prevState;
            });
            console.log(switchValue);
          }}
          {...props}
        ></Primitive.button>
        {children}
      </SwitchProvider>
    );
  },
);

export const SwitchThumb = () => {
  const { checked, disabled } = useSwitchContext('SWITCH_THUMB');

  return <input type="checkbox" checked={checked} disabled={disabled} />;
};

Switch.displayName = 'SWITCH';
