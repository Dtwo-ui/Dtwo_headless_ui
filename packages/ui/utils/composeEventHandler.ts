/* Reference : https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx */

export const composeEventHandler = <E extends NonNullable<unknown>>(
  defaultEventHandler?: (event: E) => void,
  customEventHandler?: (event: E) => void,
  { customDefaultPrevented = true } = {},
) => {
  return (event: E) => {
    defaultEventHandler?.(event);

    if (customDefaultPrevented === false || (event as unknown as Event).defaultPrevented) {
      return customEventHandler?.(event);
    }
  };
};
