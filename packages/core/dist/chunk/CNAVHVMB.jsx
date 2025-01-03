import {
  Popper,
  PopperArrow
} from "./KFH362HI.jsx";
import {
  DismissableLayer
} from "./5OEKFZ5A.jsx";
import {
  createDisclosureState
} from "./E53DB7BS.jsx";
import {
  createRegisterId
} from "./JNCCF6MP.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

// src/tooltip/index.tsx
var tooltip_exports = {};
__export(tooltip_exports, {
  Arrow: () => PopperArrow,
  Content: () => TooltipContent,
  Portal: () => TooltipPortal,
  Root: () => TooltipRoot,
  Tooltip: () => Tooltip,
  Trigger: () => TooltipTrigger
});

// src/tooltip/tooltip-content.tsx
import { mergeDefaultProps, mergeRefs } from "@kobalte/utils";
import {
  Show,
  createEffect,
  onCleanup,
  splitProps
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";

// src/tooltip/tooltip-context.tsx
import { createContext, useContext } from "solid-js";
var TooltipContext = createContext();
function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useTooltipContext` must be used within a `Tooltip` component"
    );
  }
  return context;
}

// src/tooltip/tooltip-content.tsx
function TooltipContent(props) {
  const context = useTooltipContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("content")
    },
    props
  );
  const [local, others] = splitProps(mergedProps, ["ref", "style"]);
  createEffect(() => onCleanup(context.registerContentId(others.id)));
  return <Show when={context.contentPresent()}><Popper.Positioner><DismissableLayer
    ref={mergeRefs((el) => {
      context.setContentRef(el);
    }, local.ref)}
    role="tooltip"
    disableOutsidePointerEvents={false}
    style={combineStyle(
      {
        "--kb-tooltip-content-transform-origin": "var(--kb-popper-content-transform-origin)",
        position: "relative"
      },
      local.style
    )}
    onFocusOutside={(e) => e.preventDefault()}
    onDismiss={() => context.hideTooltip(true)}
    {...context.dataset()}
    {...others}
  /></Popper.Positioner></Show>;
}

// src/tooltip/tooltip-portal.tsx
import { Show as Show2 } from "solid-js";
import { Portal } from "solid-js/web";
function TooltipPortal(props) {
  const context = useTooltipContext();
  return <Show2 when={context.contentPresent()}><Portal {...props} /></Show2>;
}

// src/tooltip/tooltip-root.tsx
import {
  contains,
  createGenerateId,
  getDocument,
  getEventPoint,
  getWindow,
  isPointInPolygon,
  mergeDefaultProps as mergeDefaultProps2
} from "@kobalte/utils";
import {
  createEffect as createEffect2,
  createMemo,
  createSignal,
  createUniqueId,
  onCleanup as onCleanup2,
  splitProps as splitProps2
} from "solid-js";
import { isServer } from "solid-js/web";
import createPresence from "solid-presence";

// src/tooltip/utils.ts
function getTooltipSafeArea(placement, anchorEl, floatingEl) {
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

// src/tooltip/tooltip-root.tsx
var tooltips = {};
var tooltipsCounter = 0;
var globalWarmedUp = false;
var globalWarmUpTimeout;
var globalCoolDownTimeout;
var globalSkipDelayTimeout;
function TooltipRoot(props) {
  const defaultId = `tooltip-${createUniqueId()}`;
  const tooltipId = `${++tooltipsCounter}`;
  const mergedProps = mergeDefaultProps2(
    {
      id: defaultId,
      openDelay: 700,
      closeDelay: 300,
      skipDelayDuration: 300
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, [
    "id",
    "open",
    "defaultOpen",
    "onOpenChange",
    "disabled",
    "triggerOnFocusOnly",
    "openDelay",
    "closeDelay",
    "skipDelayDuration",
    "ignoreSafeArea",
    "forceMount"
  ]);
  let closeTimeoutId;
  const [contentId, setContentId] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [currentPlacement, setCurrentPlacement] = createSignal(
    others.placement
  );
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const { present: contentPresent } = createPresence({
    show: () => local.forceMount || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const ensureTooltipEntry = () => {
    tooltips[tooltipId] = hideTooltip;
  };
  const closeOpenTooltips = () => {
    for (const hideTooltipId in tooltips) {
      if (hideTooltipId !== tooltipId) {
        tooltips[hideTooltipId](true);
        delete tooltips[hideTooltipId];
      }
    }
  };
  const hideTooltip = (immediate = false) => {
    if (isServer) {
      return;
    }
    if (immediate || local.closeDelay && local.closeDelay <= 0) {
      window.clearTimeout(closeTimeoutId);
      closeTimeoutId = void 0;
      disclosureState.close();
    } else if (!closeTimeoutId) {
      closeTimeoutId = window.setTimeout(() => {
        closeTimeoutId = void 0;
        disclosureState.close();
      }, local.closeDelay);
    }
    window.clearTimeout(globalWarmUpTimeout);
    globalWarmUpTimeout = void 0;
    if (local.skipDelayDuration && local.skipDelayDuration >= 0) {
      globalSkipDelayTimeout = window.setTimeout(() => {
        window.clearTimeout(globalSkipDelayTimeout);
        globalSkipDelayTimeout = void 0;
      }, local.skipDelayDuration);
    }
    if (globalWarmedUp) {
      window.clearTimeout(globalCoolDownTimeout);
      globalCoolDownTimeout = window.setTimeout(() => {
        delete tooltips[tooltipId];
        globalCoolDownTimeout = void 0;
        globalWarmedUp = false;
      }, local.closeDelay);
    }
  };
  const showTooltip = () => {
    if (isServer) {
      return;
    }
    clearTimeout(closeTimeoutId);
    closeTimeoutId = void 0;
    closeOpenTooltips();
    ensureTooltipEntry();
    globalWarmedUp = true;
    disclosureState.open();
    window.clearTimeout(globalWarmUpTimeout);
    globalWarmUpTimeout = void 0;
    window.clearTimeout(globalCoolDownTimeout);
    globalCoolDownTimeout = void 0;
    window.clearTimeout(globalSkipDelayTimeout);
    globalSkipDelayTimeout = void 0;
  };
  const warmupTooltip = () => {
    if (isServer) {
      return;
    }
    closeOpenTooltips();
    ensureTooltipEntry();
    if (!disclosureState.isOpen() && !globalWarmUpTimeout && !globalWarmedUp) {
      globalWarmUpTimeout = window.setTimeout(() => {
        globalWarmUpTimeout = void 0;
        globalWarmedUp = true;
        showTooltip();
      }, local.openDelay);
    } else if (!disclosureState.isOpen()) {
      showTooltip();
    }
  };
  const openTooltip = (immediate = false) => {
    if (isServer) {
      return;
    }
    if (!immediate && local.openDelay && local.openDelay > 0 && !closeTimeoutId && !globalSkipDelayTimeout) {
      warmupTooltip();
    } else {
      showTooltip();
    }
  };
  const cancelOpening = () => {
    if (isServer) {
      return;
    }
    window.clearTimeout(globalWarmUpTimeout);
    globalWarmUpTimeout = void 0;
    globalWarmedUp = false;
  };
  const cancelClosing = () => {
    if (isServer) {
      return;
    }
    window.clearTimeout(closeTimeoutId);
    closeTimeoutId = void 0;
  };
  const isTargetOnTooltip = (target) => {
    return contains(triggerRef(), target) || contains(contentRef(), target);
  };
  const getPolygonSafeArea = (placement) => {
    const triggerEl = triggerRef();
    const contentEl = contentRef();
    if (!triggerEl || !contentEl) {
      return;
    }
    return getTooltipSafeArea(placement, triggerEl, contentEl);
  };
  const onHoverOutside = (event) => {
    const target = event.target;
    if (isTargetOnTooltip(target)) {
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
    hideTooltip();
  };
  createEffect2(() => {
    if (isServer) {
      return;
    }
    if (!disclosureState.isOpen()) {
      return;
    }
    const doc = getDocument();
    doc.addEventListener("pointermove", onHoverOutside, true);
    onCleanup2(() => {
      doc.removeEventListener("pointermove", onHoverOutside, true);
    });
  });
  createEffect2(() => {
    const trigger = triggerRef();
    if (!trigger || !disclosureState.isOpen()) {
      return;
    }
    const handleScroll = (event) => {
      const target = event.target;
      if (contains(target, trigger)) {
        hideTooltip(true);
      }
    };
    const win = getWindow();
    win.addEventListener("scroll", handleScroll, { capture: true });
    onCleanup2(() => {
      win.removeEventListener("scroll", handleScroll, { capture: true });
    });
  });
  onCleanup2(() => {
    clearTimeout(closeTimeoutId);
    const tooltip = tooltips[tooltipId];
    if (tooltip) {
      delete tooltips[tooltipId];
    }
  });
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    isDisabled: () => local.disabled ?? false,
    triggerOnFocusOnly: () => local.triggerOnFocusOnly ?? false,
    contentId,
    contentPresent,
    openTooltip,
    hideTooltip,
    cancelOpening,
    generateId: createGenerateId(() => mergedProps.id),
    registerContentId: createRegisterId(setContentId),
    isTargetOnTooltip,
    setTriggerRef,
    setContentRef
  };
  return <TooltipContext.Provider value={context}><Popper
    anchorRef={triggerRef}
    contentRef={contentRef}
    onCurrentPlacementChange={setCurrentPlacement}
    {...others}
  /></TooltipContext.Provider>;
}

// src/tooltip/tooltip-trigger.tsx
import { callHandler, getDocument as getDocument2, mergeRefs as mergeRefs2 } from "@kobalte/utils";
import { onCleanup as onCleanup3, splitProps as splitProps3 } from "solid-js";
import { isServer as isServer2 } from "solid-js/web";
function TooltipTrigger(props) {
  let ref;
  const context = useTooltipContext();
  const [local, others] = splitProps3(props, [
    "ref",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerDown",
    "onClick",
    "onFocus",
    "onBlur"
  ]);
  let isPointerDown = false;
  let isHovered = false;
  let isFocused = false;
  const handlePointerUp = () => {
    isPointerDown = false;
  };
  const handleShow = () => {
    if (!context.isOpen() && (isHovered || isFocused)) {
      context.openTooltip(isFocused);
    }
  };
  const handleHide = (immediate) => {
    if (context.isOpen() && !isHovered && !isFocused) {
      context.hideTooltip(immediate);
    }
  };
  const onPointerEnter = (e) => {
    callHandler(e, local.onPointerEnter);
    if (e.pointerType === "touch" || context.triggerOnFocusOnly() || context.isDisabled() || e.defaultPrevented) {
      return;
    }
    isHovered = true;
    handleShow();
  };
  const onPointerLeave = (e) => {
    callHandler(e, local.onPointerLeave);
    if (e.pointerType === "touch") {
      return;
    }
    isHovered = false;
    isFocused = false;
    if (context.isOpen()) {
      handleHide();
    } else {
      context.cancelOpening();
    }
  };
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    isPointerDown = true;
    getDocument2(ref).addEventListener("pointerup", handlePointerUp, {
      once: true
    });
  };
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (e.defaultPrevented || "pointerType" in e && e.pointerType === "touch") {
      return;
    }
    isHovered = false;
    isFocused = false;
    handleHide(true);
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    if (context.isDisabled() || e.defaultPrevented || isPointerDown) {
      return;
    }
    isFocused = true;
    handleShow();
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    const relatedTarget = e.relatedTarget;
    if (context.isTargetOnTooltip(relatedTarget)) {
      return;
    }
    isHovered = false;
    isFocused = false;
    handleHide(true);
  };
  onCleanup3(() => {
    if (isServer2) {
      return;
    }
    getDocument2(ref).removeEventListener("pointerup", handlePointerUp);
  });
  return <Polymorphic
    as="button"
    ref={mergeRefs2((el) => {
      context.setTriggerRef(el);
      ref = el;
    }, local.ref)}
    aria-describedby={context.isOpen() ? context.contentId() : void 0}
    onPointerEnter={onPointerEnter}
    onPointerLeave={onPointerLeave}
    onPointerDown={onPointerDown}
    onClick={onClick}
    onFocus={onFocus}
    onBlur={onBlur}
    {...context.dataset()}
    {...others}
  />;
}

// src/tooltip/index.tsx
var Tooltip = Object.assign(TooltipRoot, {
  Arrow: PopperArrow,
  Content: TooltipContent,
  Portal: TooltipPortal,
  Trigger: TooltipTrigger
});

export {
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
  Tooltip,
  tooltip_exports
};
