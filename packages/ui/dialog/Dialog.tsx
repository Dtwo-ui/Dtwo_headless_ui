// import { createContext } from '@d_two/context';

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

export const Dialog = { Portal: DialogPortal };
