import React from 'react';
import { Primitive } from '@dtwo/primitive';
import { createContext } from '@dtwo/context';
import { useControllableState } from '@dtwo/use-controllable-state';
import { useComposeRefs } from '@dtwo/use-compose-refs';
// 1. context

// 2. Switch

// 3. Thumb

type SwitchContextValueT = {
  checked?: boolean;
  disabled: boolean;
};

const [SwitchProvider, useSwitchContext] = createContext<SwitchContextValueT>('SWITCH');

type ButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
type SwitchProps = ButtonProps & {
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChangeSwitch?: (value: boolean) => void;
};

export const Switch = React.forwardRef<React.ElementRef<typeof Primitive.button>, SwitchProps>(
  (
    { checked, disabled = false, defaultChecked = false, onChangeSwitch, ...props }: SwitchProps,
    forwardRef,
  ) => {
    const { children } = props;
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const ref = useComposeRefs(forwardRef, buttonRef);

    const [switchValue, setSwitchValue] = useControllableState({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onChangeSwitch,
    });

    return (
      <SwitchProvider value={{ checked: switchValue, disabled }}>
        <Primitive.button
          ref={ref}
          onClick={() => setSwitchValue(prevState => !prevState)}
          {...props}
        ></Primitive.button>
        {children}
      </SwitchProvider>
    );
  },
);

type SwitchThumbProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
export const SwitchThumb = (props: SwitchThumbProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { checked } = useSwitchContext('SWITCH_THUMB');

  return <Primitive.span {...props} />;
};

Switch.displayName = 'SWITCH';
