import { PopperArrow, Popper } from './4X2EKUJ3.js';
import { DismissableLayer } from './7KU4OSOB.js';
import { LinkRoot } from './3QQCO6IA.js';
import { createDisclosureState } from './7LCANGHD.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, Portal, isServer } from 'solid-js/web';
import { mergeRefs, mergeDefaultProps, createGlobalListeners, isPointInPolygon, getEventPoint, callHandler, contains } from '@kobalte/utils';
import { createContext, splitProps, Show, createUniqueId, createSignal, createEffect, onCleanup, createMemo, useContext } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';
import createPresence from 'solid-presence';

// src/hover-card/index.tsx
var hover_card_exports = {};
__export(hover_card_exports, {
  Arrow: () => PopperArrow,
  Content: () => HoverCardContent,
  HoverCard: () => HoverCard,
  Portal: () => HoverCardPortal,
  Root: () => HoverCardRoot,
  Trigger: () => HoverCardTrigger
});
var HoverCardContext = createContext();
function useHoverCardContext() {
  const context = useContext(HoverCardContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useHoverCardContext` must be used within a `HoverCard` component");
  }
  return context;
}

// src/hover-card/hover-card-content.tsx
function HoverCardContent(props) {
  const context = useHoverCardContext();
  const [local, others] = splitProps(props, ["ref", "style"]);
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Popper.Positioner, {
        get children() {
          return createComponent(DismissableLayer, mergeProps({
            ref(r$) {
              const _ref$ = mergeRefs((el) => {
                context.setContentRef(el);
              }, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            disableOutsidePointerEvents: false,
            get style() {
              return combineStyle({
                "--kb-hovercard-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                position: "relative"
              }, local.style);
            },
            onFocusOutside: (e) => e.preventDefault(),
            get onDismiss() {
              return context.close;
            }
          }, () => context.dataset(), others));
        }
      });
    }
  });
}
function HoverCardPortal(props) {
  const context = useHoverCardContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}

// src/hover-card/utils.ts
function getHoverCardSafeArea(placement, anchorEl, floatingEl) {
  const basePlacement = placement.split("-")[0];
  const anchorRect = anchorEl.getBoundingClientRect();
  const floatingRect = floatingEl.getBoundingClientRect();
  const polygon = [];
  const anchorCenterX = anchorRect.left + anchorRect.width / 2;
  const anchorCenterY = anchorRect.top + anchorRect.height / 2;
  switch (basePlacement) {
    case "top":
      polygon.push([anchorRect.left, anchorCenterY]);
      polygon.push([floatingRect.left, floatingRect.bottom]);
      polygon.push([floatingRect.left, floatingRect.top]);
      polygon.push([floatingRect.right, floatingRect.top]);
      polygon.push([floatingRect.right, floatingRect.bottom]);
      polygon.push([anchorRect.right, anchorCenterY]);
      break;
    case "right":
      polygon.push([anchorCenterX, anchorRect.top]);
      polygon.push([floatingRect.left, floatingRect.top]);
      polygon.push([floatingRect.right, floatingRect.top]);
      polygon.push([floatingRect.right, floatingRect.bottom]);
      polygon.push([floatingRect.left, floatingRect.bottom]);
      polygon.push([anchorCenterX, anchorRect.bottom]);
      break;
    case "bottom":
      polygon.push([anchorRect.left, anchorCenterY]);
      polygon.push([floatingRect.left, floatingRect.top]);
      polygon.push([floatingRect.left, floatingRect.bottom]);
      polygon.push([floatingRect.right, floatingRect.bottom]);
      polygon.push([floatingRect.right, floatingRect.top]);
      polygon.push([anchorRect.right, anchorCenterY]);
      break;
    case "left":
      polygon.push([anchorCenterX, anchorRect.top]);
      polygon.push([floatingRect.right, floatingRect.top]);
      polygon.push([floatingRect.left, floatingRect.top]);
      polygon.push([floatingRect.left, floatingRect.bottom]);
      polygon.push([floatingRect.right, floatingRect.bottom]);
      polygon.push([anchorCenterX, anchorRect.bottom]);
      break;
  }
  return polygon;
}

// src/hover-card/hover-card-root.tsx
function HoverCardRoot(props) {
  const defaultId = `hovercard-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    openDelay: 700,
    closeDelay: 300
  }, props);
  const [local, others] = splitProps(mergedProps, ["id", "open", "defaultOpen", "onOpenChange", "openDelay", "closeDelay", "ignoreSafeArea", "forceMount"]);
  let openTimeoutId;
  let closeTimeoutId;
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [currentPlacement, setCurrentPlacement] = createSignal(others.placement);
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const {
    present: contentPresent
  } = createPresence({
    show: () => local.forceMount || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const {
    addGlobalListener,
    removeGlobalListener
  } = createGlobalListeners();
  const openWithDelay = () => {
    if (isServer) {
      return;
    }
    openTimeoutId = window.setTimeout(() => {
      openTimeoutId = void 0;
      disclosureState.open();
    }, local.openDelay);
  };
  const closeWithDelay = () => {
    if (isServer) {
      return;
    }
    closeTimeoutId = window.setTimeout(() => {
      closeTimeoutId = void 0;
      disclosureState.close();
    }, local.closeDelay);
  };
  const cancelOpening = () => {
    if (isServer) {
      return;
    }
    window.clearTimeout(openTimeoutId);
    openTimeoutId = void 0;
  };
  const cancelClosing = () => {
    if (isServer) {
      return;
    }
    window.clearTimeout(closeTimeoutId);
    closeTimeoutId = void 0;
  };
  const isTargetOnHoverCard = (target) => {
    return contains(triggerRef(), target) || contains(contentRef(), target);
  };
  const getPolygonSafeArea = (placement) => {
    const triggerEl = triggerRef();
    const contentEl = contentRef();
    if (!triggerEl || !contentEl) {
      return;
    }
    return getHoverCardSafeArea(placement, triggerEl, contentEl);
  };
  const onHoverOutside = (event) => {
    const target = event.target;
    if (isTargetOnHoverCard(target)) {
      cancelClosing();
      return;
    }
    if (!local.ignoreSafeArea) {
      const polygon = getPolygonSafeArea(currentPlacement());
      if (polygon && isPointInPolygon(getEventPoint(event), polygon)) {
        cancelClosing();
        return;
      }
    }
    if (closeTimeoutId) {
      return;
    }
    closeWithDelay();
  };
  createEffect(() => {
    if (!disclosureState.isOpen()) {
      return;
    }
    addGlobalListener(document, "pointermove", onHoverOutside, true);
    onCleanup(() => {
      removeGlobalListener(document, "pointermove", onHoverOutside, true);
    });
  });
  onCleanup(() => {
    cancelOpening();
    cancelClosing();
  });
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    contentPresent,
    openWithDelay,
    closeWithDelay,
    cancelOpening,
    cancelClosing,
    close: disclosureState.close,
    isTargetOnHoverCard,
    setTriggerRef,
    setContentRef
  };
  return createComponent(HoverCardContext.Provider, {
    value: context,
    get children() {
      return createComponent(Popper, mergeProps({
        anchorRef: triggerRef,
        contentRef,
        onCurrentPlacementChange: setCurrentPlacement
      }, others));
    }
  });
}
function HoverCardTrigger(props) {
  const context = useHoverCardContext();
  const [local, others] = splitProps(props, ["ref", "onPointerEnter", "onPointerLeave", "onFocus", "onBlur"]);
  const onPointerEnter = (e) => {
    callHandler(e, local.onPointerEnter);
    if (e.pointerType === "touch" || others.disabled || e.defaultPrevented) {
      return;
    }
    context.cancelClosing();
    if (!context.isOpen()) {
      context.openWithDelay();
    }
  };
  const onPointerLeave = (e) => {
    callHandler(e, local.onPointerLeave);
    if (e.pointerType === "touch") {
      return;
    }
    context.cancelOpening();
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    if (others.disabled || e.defaultPrevented) {
      return;
    }
    context.cancelClosing();
    if (!context.isOpen()) {
      context.openWithDelay();
    }
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    context.cancelOpening();
    const relatedTarget = e.relatedTarget;
    if (context.isTargetOnHoverCard(relatedTarget)) {
      return;
    }
    context.closeWithDelay();
  };
  onCleanup(context.cancelOpening);
  return createComponent(LinkRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur
  }, () => context.dataset(), others));
}

// src/hover-card/index.tsx
var HoverCard = Object.assign(HoverCardRoot, {
  Arrow: PopperArrow,
  Content: HoverCardContent,
  Portal: HoverCardPortal,
  Trigger: HoverCardTrigger
});

export { HoverCard, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger, hover_card_exports };
