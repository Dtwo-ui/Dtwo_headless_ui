import { createContext } from '@dtwo/context';
import { Primitive } from '@dtwo/primitive';
import { useComposeRefs } from '@dtwo/use-compose-refs';
import { useControllableState } from '@dtwo/use-controllable-state';
import { composeEventHandler } from '@dtwo/utils';
import React, { useEffect } from 'react';

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
    const bubbleInputChange = React.useRef(false);

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
            bubbleInputChange.current = !bubbleInputChange.current;
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

type FakeInputProps = React.ComponentPropsWithoutRef<'input'> & {};
const FakeInput = (props: FakeInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;

    const inputCheckedSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'checked',
    )!.set;

    if (inputCheckedSetter) {
      // !props.checked로 하면 변경이 감지 되긴함 뭔가 이전 체크 유무 관련 에러로 의심됨
      inputCheckedSetter.call(input, props.checked);

      const fakeClickEvent = new Event('click', { bubbles: true });
      input.dispatchEvent(fakeClickEvent);
    }
  }, [props.checked]);
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
const SwitchThumb = (props: SwitchThumbProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { checked } = useSwitchContext('SWITCH_THUMB');

  return <Primitive.span {...props} />;
};

export const Switch = {
  Root: SwitchRoot,
  Thumb: SwitchThumb,
};
