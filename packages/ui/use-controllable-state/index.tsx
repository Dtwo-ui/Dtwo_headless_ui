import { useState } from 'react';

type UseControllableStateProps<T> = {
  defaultValue: T;
  value?: T;
  onChange?: (value?: T) => void;
};

const useControllableState = <T extends object>({
  value,
  defaultValue,
  onChange = () => {},
}: UseControllableStateProps<T>) => {
  const [unControlledValue, setUnControlledValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const handleChange = isControlled ? onChange : setUnControlledValue;

  if (isControlled) {
    return [value, onChange] as const;
  }
  console.log('언컨트롤 실행');
  return [unControlledValue, setUnControlledValue] as const;
};

export { useControllableState };
