import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  forwardRef,
  ElementRef,
} from 'react';
import type { ComponentPropsWithoutRef } from '@dtwo/primitive';
import { Primitive } from '@dtwo/primitive';
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
  props: SwitchContextValueT & {
    children: ReactNode;
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

type ButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
type SwitchProps = ButtonProps & {
  checked?: boolean;
  disabled?: boolean;
};

/**
 * TODO: forwardRef, SwitchProps 정해야함
 * */
export const Switch = forwardRef<ElementRef<typeof Primitive.button>, SwitchProps>(
  ({ checked = false, disabled = false, ...props }: SwitchProps, ref) => {
    const { children } = props;
    return (
      <SwitchProvider checked={checked} disabled={disabled}>
        <div>테스트</div>
        <Primitive.button ref={ref} {...props}></Primitive.button>
        {children}
      </SwitchProvider>
    );
  },
);

export const SwitchThumb = () => {
  const { contextValue } = useContext(SwitchContext) as SwitchContextT;

  return <input type="checkbox" checked={contextValue.checked} disabled={contextValue.disabled} />;
};

Switch.displayName = 'SWITCH';
