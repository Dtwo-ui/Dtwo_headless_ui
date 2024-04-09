import { MutableRefObject, Ref, useCallback } from 'react';

/** Reference : https://github.com/toss/slash/blob/main/packages/react/react/src/hooks/useCombinedRefs.ts */

type CallbackRef<T> = (ref: T | null) => void;

export function useComposeRefs<T>(...refs: Ref<T>[] | CallbackRef<T>[]): Ref<T> {
  return useCallback((value: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null || ref !== undefined) {
        (ref as MutableRefObject<T>).current = value;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
