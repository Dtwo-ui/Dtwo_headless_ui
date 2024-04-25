import { createContext } from '@dtwo/context';
import { Primitive } from '@dtwo/primitive';
import { useComposeRefs } from '@dtwo/use-compose-refs';
import { useControllableState } from '@dtwo/use-controllable-state';
import { usePrevious } from '@dtwo/use-previous';
import { composeEventHandler } from '@dtwo/utils';
import React from 'react';

type SwitchContextValueT = {
  checked?: boolean;
  disabled: boolean;
};

const [SwitchProvider, useSwitchContext] = createContext<SwitchContextValueT>('SWITCH_PROVIDER');

type ButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
type SwitchProps = ButtonProps & {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  defaultChecked?: boolean;
  onChangeSwitch?: (value: boolean) => void;
  isFormControl?: boolean;
};

const SwitchRoot = React.forwardRef<React.ElementRef<typeof Primitive.button>, SwitchProps>(
  (
    {
      checked,
      disabled = false,
      defaultChecked = false,
      onChangeSwitch,
      isFormControl = true,
      required = false,
      ...props
    }: SwitchProps,
    forwardRef,
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const ref = useComposeRefs(forwardRef, buttonRef);

    const [controlledChecked, setControlledChecked] = useControllableState({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onChangeSwitch,
    });

    return (
      <SwitchProvider value={{ checked: controlledChecked, disabled }}>
        <Primitive.button
          {...props}
          role="switch"
          aria-checked={controlledChecked}
          aria-required={required}
          ref={ref}
          onClick={composeEventHandler(props.onClick, e => {
            e.stopPropagation();
            setControlledChecked(prevState => !prevState);
          })}
          disabled={disabled}
          data-state={controlledChecked}
        />
        {isFormControl && (
          <FakeInput
            checked={controlledChecked}
            name={props.name}
            aria-hidden={true}
            tabIndex={-1}
            required={required}
          />
        )}
      </SwitchProvider>
    );
  },
);

SwitchRoot.displayName = 'SWITCH_ROOT';

type FakeInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'checked'> & {
  checked: boolean;
};
const FakeInput = ({ checked, ...props }: FakeInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const prevChecked = usePrevious(checked);

  React.useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    const inputCheckedSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'checked',
    )!.set;

    if (inputCheckedSetter && prevChecked !== checked) {
      inputCheckedSetter.call(input, checked);

      const fakeClickEvent = new Event('click', { bubbles: true });
      input.dispatchEvent(fakeClickEvent);
    }
  }, [checked, prevChecked]);

  return (
    <input
      type="checkbox"
      ref={inputRef}
      defaultChecked={checked}
      style={{ position: 'absolute', pointerEvents: 'none', opacity: 0, margin: 0 }}
      {...props}
    />
  );
};

type SwitchThumbProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

const SwitchThumb = React.forwardRef<React.ElementRef<typeof Primitive.span>, SwitchThumbProps>(
  (props: SwitchThumbProps, forwardRef) => {
    const { checked, disabled } = useSwitchContext('SWITCH_THUMB');

    return (
      <Primitive.span data-state={checked} data-disabled={disabled} ref={forwardRef} {...props} />
    );
  },
);

SwitchThumb.displayName = 'SWITCH_THUMB';

export const Switch = {
  Root: SwitchRoot,
  Thumb: SwitchThumb,
};
