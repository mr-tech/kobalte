import {
  createEscapeKeyDown
} from "./IGYOA2ZZ.jsx";
import {
  createInteractOutside
} from "./BMMCQ7YJ.jsx";
import {
  layerStack
} from "./3NI6FTA2.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";

// src/dismissable-layer/dismissable-layer.tsx
import { contains, getDocument, mergeRefs } from "@kobalte/utils";
import {
  createEffect,
  on,
  onCleanup,
  onMount,
  splitProps
} from "solid-js";

// src/dismissable-layer/dismissable-layer-context.tsx
import { createContext, useContext } from "solid-js";
var DismissableLayerContext = createContext();
function useOptionalDismissableLayerContext() {
  return useContext(DismissableLayerContext);
}

// src/dismissable-layer/dismissable-layer.tsx
function DismissableLayer(props) {
  let ref;
  const parentContext = useOptionalDismissableLayerContext();
  const [local, others] = splitProps(props, [
    "ref",
    "disableOutsidePointerEvents",
    "excludedElements",
    "onEscapeKeyDown",
    "onPointerDownOutside",
    "onFocusOutside",
    "onInteractOutside",
    "onDismiss",
    "bypassTopMostLayerCheck"
  ]);
  const nestedLayers = /* @__PURE__ */ new Set([]);
  const registerNestedLayer = (element) => {
    nestedLayers.add(element);
    const parentUnregister = parentContext?.registerNestedLayer(element);
    return () => {
      nestedLayers.delete(element);
      parentUnregister?.();
    };
  };
  const shouldExcludeElement = (element) => {
    if (!ref) {
      return false;
    }
    return local.excludedElements?.some((node) => contains(node(), element)) || [...nestedLayers].some((layer) => contains(layer, element));
  };
  const onPointerDownOutside = (e) => {
    if (!ref || layerStack.isBelowPointerBlockingLayer(ref)) {
      return;
    }
    if (!local.bypassTopMostLayerCheck && !layerStack.isTopMostLayer(ref)) {
      return;
    }
    local.onPointerDownOutside?.(e);
    local.onInteractOutside?.(e);
    if (!e.defaultPrevented) {
      local.onDismiss?.();
    }
  };
  const onFocusOutside = (e) => {
    local.onFocusOutside?.(e);
    local.onInteractOutside?.(e);
    if (!e.defaultPrevented) {
      local.onDismiss?.();
    }
  };
  createInteractOutside(
    {
      shouldExcludeElement,
      onPointerDownOutside,
      onFocusOutside
    },
    () => ref
  );
  createEscapeKeyDown({
    ownerDocument: () => getDocument(ref),
    onEscapeKeyDown: (e) => {
      if (!ref || !layerStack.isTopMostLayer(ref)) {
        return;
      }
      local.onEscapeKeyDown?.(e);
      if (!e.defaultPrevented && local.onDismiss) {
        e.preventDefault();
        local.onDismiss();
      }
    }
  });
  onMount(() => {
    if (!ref) {
      return;
    }
    layerStack.addLayer({
      node: ref,
      isPointerBlocking: local.disableOutsidePointerEvents,
      dismiss: local.onDismiss
    });
    const unregisterFromParentLayer = parentContext?.registerNestedLayer(ref);
    layerStack.assignPointerEventToLayers();
    layerStack.disableBodyPointerEvents(ref);
    onCleanup(() => {
      if (!ref) {
        return;
      }
      layerStack.removeLayer(ref);
      unregisterFromParentLayer?.();
      layerStack.assignPointerEventToLayers();
      layerStack.restoreBodyPointerEvents(ref);
    });
  });
  createEffect(
    on(
      [() => ref, () => local.disableOutsidePointerEvents],
      ([ref2, disableOutsidePointerEvents]) => {
        if (!ref2) {
          return;
        }
        const layer = layerStack.find(ref2);
        if (layer && layer.isPointerBlocking !== disableOutsidePointerEvents) {
          layer.isPointerBlocking = disableOutsidePointerEvents;
          layerStack.assignPointerEventToLayers();
        }
        if (disableOutsidePointerEvents) {
          layerStack.disableBodyPointerEvents(ref2);
        }
        onCleanup(() => {
          layerStack.restoreBodyPointerEvents(ref2);
        });
      },
      {
        defer: true
      }
    )
  );
  const context = {
    registerNestedLayer
  };
  return <DismissableLayerContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs((el) => ref = el, local.ref)}
    {...others}
  /></DismissableLayerContext.Provider>;
}

export {
  DismissableLayer
};
