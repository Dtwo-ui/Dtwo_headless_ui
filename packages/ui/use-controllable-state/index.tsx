import React, { useState } from 'react';

type UseControllableStateProps<T> = {
  defaultValue: T;
  value?: T;
  onChange?: (value?: T) => void;
};

// 만약 value가 들어오면 controlled 로 취급한다.
// controlled 라면 -> 외부 value와 onChange를 기반으로 상태를 변경한다.
// unControlled 라면 -> 내부 상태 값
const useControllableState = <T extends object>({
  value,
  defaultValue,
  onChange = () => {},
}: UseControllableStateProps<T>) => {
  const [unControlledValue, setUnControlledValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const handleChange = isControlled
    ? onChange
    : (setUnControlledValue as React.Dispatch<React.SetStateAction<T | undefined>>);

  if (isControlled) {
    return [value, handleChange];
  }
  console.log('언컨트롤 실행');
  return [unControlledValue, handleChange];
};

export { useControllableState };
