import React, { useEffect } from 'react';
import { Primitive } from '@dtwo/primitive';
import { createContext } from '@dtwo/context';
import { useControllableState } from '@dtwo/use-controllable-state';
import { useComposeRefs } from '@dtwo/use-compose-refs';
import { composeEventHandler } from '@dtwo/utils';

/**
 * Bubble Input
 * 1. formControl 여부
 * 2. formControl 적용시 Bubble Input 생성
 * 3.
 * */
// 1. context done

// 2. Switch doing

// 3. Thumb X

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
  isFormControl?: boolean;
};

export const Switch = React.forwardRef<React.ElementRef<typeof Primitive.button>, SwitchProps>(
  (
    {
      checked,
      disabled = false,
      defaultChecked = false,
      onChangeSwitch,
      isFormControl = true,
      ...props
    }: SwitchProps,
    forwardRef,
  ) => {
    const { children } = props;
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const ref = useComposeRefs(forwardRef, buttonRef);
    const bubbleInputChange = React.useRef(false);

    const [switchValue, setSwitchValue] = useControllableState({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onChangeSwitch,
    });

    return (
      <SwitchProvider value={{ checked: switchValue, disabled }}>
        <Primitive.button
          ref={ref}
          onClick={composeEventHandler(props.onClick, e => {
            e.stopPropagation();
            setSwitchValue(prevState => !prevState);
            bubbleInputChange.current = !bubbleInputChange.current;
          })}
          {...props}
        />
        {isFormControl && (
          <FakeInput isBubbleChange={bubbleInputChange.current} name={props.name} />
        )}
        {children}
      </SwitchProvider>
    );
  },
);

type FakeInputProps = React.ComponentPropsWithoutRef<'input'> & {
  isBubbleChange: boolean;
};
const FakeInput = (props: FakeInputProps) => {
  const { isBubbleChange } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;

    input.click();
    input.checked = isBubbleChange;
  }, [isBubbleChange]);

  return <input type="checkbox" ref={inputRef} {...props} />;
};

type SwitchThumbProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
export const SwitchThumb = (props: SwitchThumbProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { checked } = useSwitchContext('SWITCH_THUMB');

  return <Primitive.span {...props} />;
};

Switch.displayName = 'SWITCH';
