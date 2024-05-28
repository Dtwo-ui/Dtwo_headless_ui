import { Primitive } from '@d_two/primitive';
import React from 'react';
import ReactDOM from 'react-dom';

type PortalElement = React.ElementRef<typeof Primitive.div>;
type PortalProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
  container?: HTMLElement | null;
};

const Portal = React.forwardRef<PortalElement, PortalProps>((props, forwardRef) => {
  const { container = globalThis?.document?.body, ...portalProps } = props;
  return container
    ? ReactDOM.createPortal(<Primitive.div {...portalProps} ref={forwardRef} />, container)
    : null;
});

Portal.displayName = 'PORTAL';

export { Portal };
export type { PortalProps };
