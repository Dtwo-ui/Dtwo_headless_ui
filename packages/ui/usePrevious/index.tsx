import { useRef } from 'react';

const usePrevious = <T extends NonNullable<unknown>>(value: T) => {
  const ref = useRef<{ curr: T; prev: T }>({ curr: value, prev: value });

  if (ref.current.curr !== value) {
    ref.current.prev = ref.current.curr;
    ref.current.curr = value;
    return ref.current.prev;
  }

  // this because first input current, prev sholud be same value
  return value;
};

export { usePrevious };
