import React, { useState, forwardRef, ElementRef } from 'react';
import { Primitive } from '@dtwo/primitive';
import { createContext } from '@dtwo/context';
import { useControllableState } from '@dtwo/use-controllable-state';
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
    // const [contextValue, setContextValue] = useState<SwitchContextValueT>({
    //   checked,
    //   disabled,
    // });

    const [test, setTest] = useState({ checked: false, disabled: false });
    const [switchValue, setSwitchValue] = useControllableState({
      value: test,
      onChange: () => {
        console.log('컨트롤 실행');
        setTest(prevChecked => ({ ...prevChecked, checked: !prevChecked!.checked }));
      },
      defaultValue: { checked, disabled },
    });

    return (
      <SwitchProvider value={{ contextValue: switchValue, setContextValue: setSwitchValue }}>
        <div>테스트</div>
        <Primitive.button
          ref={ref}
          onClick={() => {
            setSwitchValue(prevChecked => ({ ...prevChecked, checked: !prevChecked.checked }));
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
  const {
    contextValue: { checked, disabled },
  } = useSwitchContext('SWITCH_THUMB');

  return <input type="checkbox" checked={checked} disabled={disabled} />;
};

Switch.displayName = 'SWITCH';
