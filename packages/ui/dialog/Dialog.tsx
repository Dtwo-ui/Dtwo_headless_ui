import { createContext } from '@d_two/context';
import { useControllableState } from '@d_two/use-controllable-state';
import { useContext } from 'react';

import { Portal } from './Portal';

/* TODO: ContextValue에 forceMount 관련 추가 */
// type DialogPortalContextValueT = {};
// const [DialogPortalProvider, useDialogPortalContext] =
//   createContext<DialogPortalContextValueT>('DIALOG_PORTAL_PROVIDER');

type DialogPortalProps = React.ComponentPropsWithoutRef<typeof Portal> & {
  children?: React.ReactNode;
};

const DialogPortal = (props: DialogPortalProps) => {
  const { children, container } = props;
  return <Portal container={container}>{children}</Portal>;
};

/*-----*/

type DialogContextValueT = {
  modal: boolean;
  open: boolean;
  onOpenChange(open: boolean): void;
};

const [DialogProvider, useDialogContext] = createContext<DialogContextValueT>('DIALOG_PROVIDER');

type DialogRootProps = Partial<{
  modal: boolean;
  open: boolean;
  onOpenChange(open: boolean): void;
  children?: React.ReactNode;
}>;

const DialogRoot = ({
  modal = true,
  open = false,
  onOpenChange,
  children,
  ...props
}: DialogRootProps) => {
  const [controlledOpen, setControlledOpen] = useControllableState({
    value: open,
    defaultValue: false,
    onChange: onOpenChange,
  });

  return (
    <DialogProvider
      value={{ modal, open: controlledOpen, onOpenChange: setControlledOpen }}
      {...props}
    >
      {children}
    </DialogProvider>
  );
};

export const Dialog = { Portal: DialogPortal };
