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
  required?: boolean;
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
      required,
      ...props
    }: SwitchProps,
    forwardRef,
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const ref = useComposeRefs(forwardRef, buttonRef);
    const bubbleInputChange = React.useRef(false);

    const [controlledChecked, setControlledChecked] = useControllableState({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onChangeSwitch,
    });
    console.log(controlledChecked);
    return (
      <SwitchProvider value={{ checked: controlledChecked, disabled }}>
        <Primitive.button
          role="switch"
          aria-checked={controlledChecked}
          aria-required={required}
          ref={ref}
          onClick={composeEventHandler(props.onClick, e => {
            e.stopPropagation();
            setControlledChecked(prevState => !prevState);
            bubbleInputChange.current = !bubbleInputChange.current;
          })}
          disabled={disabled}
          data-state={controlledChecked}
          {...props}
        />
        {isFormControl && (
          <FakeInput
            isBubbleChange={bubbleInputChange.current}
            name={props.name}
            aria-hidden={true}
            tabIndex={-1}
          />
        )}
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

    const inputCheckedSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'checked',
    )!.set;

    if (inputCheckedSetter) {
      inputCheckedSetter.call(input, isBubbleChange);

      const fakeClickEvent = new Event('click', { bubbles: true });
      input.dispatchEvent(fakeClickEvent);
    }
  }, [isBubbleChange]);

  return (
    <input
      type="checkbox"
      ref={inputRef}
      {...props}
      style={{ position: 'absolute', pointerEvents: 'none', opacity: 0, margin: 0 }}
    />
  );
};

type SwitchThumbProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
export const SwitchThumb = (props: SwitchThumbProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { checked } = useSwitchContext('SWITCH_THUMB');

  return <Primitive.span {...props} />;
};

Switch.displayName = 'SWITCH';
