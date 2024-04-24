import React, { useState } from 'react';

type UseControllableStateProps<T> = {
  defaultValue: T;
  value?: T;
  onChange?: (value: T) => void;
};

function useControllableState<T>({
  value,
  defaultValue,
  onChange = () => {},
}: UseControllableStateProps<T>) {
  const [unControlledValue, setUnControlledValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;

  const controllableValue = isControlled ? value : unControlledValue;

  const handleChange = isControlled
    ? (onChange as React.Dispatch<React.SetStateAction<T>>)
    : setUnControlledValue;

  return [controllableValue, handleChange] as const;
}

export { useControllableState };
