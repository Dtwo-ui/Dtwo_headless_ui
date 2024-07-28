import { Primitive } from '@d_two/primitive';
import { useComposeRefs } from '@d_two/use-compose-refs';
import React, { forwardRef, useContext, useEffect, useRef } from 'react';

import type { PrimitivesType } from '@d_two/primitive';

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;
type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

type DismissableLayerElement = React.ElementRef<PrimitivesType['div']>;
type DismissableLayerProps = {
  disableOutsideInteraction?: boolean;

  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  onFocusOutside?: (event: FocusOutsideEvent) => void;

  onDismiss?: () => void;
} & React.ComponentPropsWithoutRef<PrimitivesType['div']>;

const dismissableContext = React.createContext({
  layer: new Set<DismissableLayerElement>(),
  outSideInteractionDisabledLayer: new Set<DismissableLayerElement>(),
});

let ORIGINAL_DOCUMENT_POINTER_EVENTS: string;

export const DismissableLayer = forwardRef<DismissableLayerElement, DismissableLayerProps>(
  (props, forwardRef) => {
    const {
      disableOutsideInteraction = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      // dismiss의 개념을 잘 모르겠음
      onDismiss,
      ...layerProps
    } = props;

    const context = useContext(dismissableContext);
    const layerRef = useRef<DismissableLayerElement | null>(null);
    const currentLayer = layerRef.current;
    const composedRef = useComposeRefs(forwardRef, layerRef);

    const [, force] = React.useState({});

    const layers = [...context.layer];
    const outsideInteractionDisabledLayer = [...context.outSideInteractionDisabledLayer];
    const [highestOutsideInteractionDisabledLayer] = outsideInteractionDisabledLayer.slice(-1);
    const highestOutsideInteractionDisabledLayerIndex = layers.indexOf(
      highestOutsideInteractionDisabledLayer,
    );
    const currentLayerIndex = currentLayer ? layers.indexOf(currentLayer) : -1;

    const isDocumentsInteractionDisabled = context.outSideInteractionDisabledLayer.size > 0;
    const isContentsInteractionEnabled =
      currentLayerIndex >= highestOutsideInteractionDisabledLayerIndex;

    useEffect(() => {
      if (!currentLayer) return;

      if (disableOutsideInteraction) {
        if (context.outSideInteractionDisabledLayer.size === 0) {
          ORIGINAL_DOCUMENT_POINTER_EVENTS = document.body.style.pointerEvents;
          document.body.style.pointerEvents = 'none';
        }
        context.outSideInteractionDisabledLayer.add(currentLayer);
      }

      context.layer.add(currentLayer);

      return () => {
        if (disableOutsideInteraction && context.outSideInteractionDisabledLayer.size === 1) {
          document.body.style.pointerEvents = ORIGINAL_DOCUMENT_POINTER_EVENTS;
        }
      };
    }, [currentLayer, document, disableOutsideInteraction, context]);

    useEffect(() => {
      return () => {
        if (!currentLayer) return;

        context.layer.delete(currentLayer);
        context.outSideInteractionDisabledLayer.delete(currentLayer);
      };
    }, [currentLayer, context]);
    return (
      <Primitive.div
        {...layerProps}
        style={{
          pointerEvents: isDocumentsInteractionDisabled
            ? isContentsInteractionEnabled
              ? 'auto'
              : 'none'
            : undefined,
          ...layerProps.style,
        }}
        ref={composedRef}
      >
        dd
      </Primitive.div>
    );
  },
);

DismissableLayer.displayName = 'DisMissableLayer';
