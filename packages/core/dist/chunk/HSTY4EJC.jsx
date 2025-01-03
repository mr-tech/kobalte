import {
  Popper,
  PopperArrow
} from "./KFH362HI.jsx";
import {
  createFocusScope
} from "./7A3GDF4Y.jsx";
import {
  createHideOutside
} from "./P6XU75ZG.jsx";
import {
  DismissableLayer
} from "./5OEKFZ5A.jsx";
import {
  ButtonRoot
} from "./UKTBL2JL.jsx";
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

// src/popover/index.tsx
var popover_exports = {};
__export(popover_exports, {
  Anchor: () => PopoverAnchor,
  Arrow: () => PopperArrow,
  CloseButton: () => PopoverCloseButton,
  Content: () => PopoverContent,
  Description: () => PopoverDescription,
  Popover: () => Popover,
  Portal: () => PopoverPortal,
  Root: () => PopoverRoot,
  Title: () => PopoverTitle,
  Trigger: () => PopoverTrigger
});

// src/popover/popover-anchor.tsx
import { mergeRefs } from "@kobalte/utils";
import { splitProps } from "solid-js";

// src/popover/popover-context.tsx
import { createContext, useContext } from "solid-js";
var PopoverContext = createContext();
function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `usePopoverContext` must be used within a `Popover` component"
    );
  }
  return context;
}

// src/popover/popover-anchor.tsx
function PopoverAnchor(props) {
  const context = usePopoverContext();
  const [local, others] = splitProps(props, ["ref"]);
  return <Polymorphic
    as="div"
    ref={mergeRefs(context.setDefaultAnchorRef, local.ref)}
    {...context.dataset()}
    {...others}
  />;
}

// src/popover/popover-close-button.tsx
import { callHandler } from "@kobalte/utils";
import {
  splitProps as splitProps2
} from "solid-js";
function PopoverCloseButton(props) {
  const context = usePopoverContext();
  const [local, others] = splitProps2(props, [
    "aria-label",
    "onClick"
  ]);
  const onClick = (e) => {
    callHandler(e, local.onClick);
    context.close();
  };
  return <ButtonRoot
    aria-label={local["aria-label"] || context.translations().dismiss}
    onClick={onClick}
    {...context.dataset()}
    {...others}
  />;
}

// src/popover/popover-content.tsx
import {
  contains,
  focusWithoutScrolling,
  mergeDefaultProps,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  Show,
  createEffect,
  onCleanup,
  splitProps as splitProps3
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";
import createPreventScroll from "solid-prevent-scroll";
function PopoverContent(props) {
  let ref;
  const context = usePopoverContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("content")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, [
    "ref",
    "style",
    "onOpenAutoFocus",
    "onCloseAutoFocus",
    "onPointerDownOutside",
    "onFocusOutside",
    "onInteractOutside"
  ]);
  let isRightClickOutside = false;
  let hasInteractedOutside = false;
  let hasPointerDownOutside = false;
  const onCloseAutoFocus = (e) => {
    local.onCloseAutoFocus?.(e);
    if (context.isModal()) {
      e.preventDefault();
      if (!isRightClickOutside) {
        focusWithoutScrolling(context.triggerRef());
      }
    } else {
      if (!e.defaultPrevented) {
        if (!hasInteractedOutside) {
          focusWithoutScrolling(context.triggerRef());
        }
        e.preventDefault();
      }
      hasInteractedOutside = false;
      hasPointerDownOutside = false;
    }
  };
  const onPointerDownOutside = (e) => {
    local.onPointerDownOutside?.(e);
    if (context.isModal()) {
      isRightClickOutside = e.detail.isContextMenu;
    }
  };
  const onFocusOutside = (e) => {
    local.onFocusOutside?.(e);
    if (context.isOpen() && context.isModal()) {
      e.preventDefault();
    }
  };
  const onInteractOutside = (e) => {
    local.onInteractOutside?.(e);
    if (context.isModal()) {
      return;
    }
    if (!e.defaultPrevented) {
      hasInteractedOutside = true;
      if (e.detail.originalEvent.type === "pointerdown") {
        hasPointerDownOutside = true;
      }
    }
    if (contains(context.triggerRef(), e.target)) {
      e.preventDefault();
    }
    if (e.detail.originalEvent.type === "focusin" && hasPointerDownOutside) {
      e.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => !(context.isOpen() && context.isModal()),
    targets: () => ref ? [ref] : []
  });
  createPreventScroll({
    element: () => ref ?? null,
    enabled: () => context.contentPresent() && context.preventScroll()
  });
  createFocusScope(
    {
      trapFocus: () => context.isOpen() && context.isModal(),
      onMountAutoFocus: local.onOpenAutoFocus,
      onUnmountAutoFocus: onCloseAutoFocus
    },
    () => ref
  );
  createEffect(() => onCleanup(context.registerContentId(others.id)));
  return <Show when={context.contentPresent()}><Popper.Positioner><DismissableLayer
    ref={mergeRefs2((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref)}
    role="dialog"
    tabIndex={-1}
    disableOutsidePointerEvents={context.isOpen() && context.isModal()}
    excludedElements={[context.triggerRef]}
    style={combineStyle(
      {
        "--kb-popover-content-transform-origin": "var(--kb-popper-content-transform-origin)",
        position: "relative"
      },
      local.style
    )}
    aria-labelledby={context.titleId()}
    aria-describedby={context.descriptionId()}
    onPointerDownOutside={onPointerDownOutside}
    onFocusOutside={onFocusOutside}
    onInteractOutside={onInteractOutside}
    onDismiss={context.close}
    {...context.dataset()}
    {...others}
  /></Popper.Positioner></Show>;
}

// src/popover/popover-description.tsx
import { mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import {
  createEffect as createEffect2,
  onCleanup as onCleanup2,
  splitProps as splitProps4
} from "solid-js";
function PopoverDescription(props) {
  const context = usePopoverContext();
  const mergedProps = mergeDefaultProps2(
    {
      id: context.generateId("description")
    },
    props
  );
  const [local, others] = splitProps4(mergedProps, ["id"]);
  createEffect2(() => onCleanup2(context.registerDescriptionId(local.id)));
  return <Polymorphic
    as="p"
    id={local.id}
    {...context.dataset()}
    {...others}
  />;
}

// src/popover/popover-portal.tsx
import { Show as Show2 } from "solid-js";
import { Portal } from "solid-js/web";
function PopoverPortal(props) {
  const context = usePopoverContext();
  return <Show2 when={context.contentPresent()}><Portal {...props} /></Show2>;
}

// src/popover/popover-root.tsx
import { createGenerateId, mergeDefaultProps as mergeDefaultProps3 } from "@kobalte/utils";
import {
  createMemo,
  createSignal,
  createUniqueId,
  splitProps as splitProps5
} from "solid-js";
import createPresence from "solid-presence";

// src/popover/popover.intl.ts
var POPOVER_INTL_TRANSLATIONS = {
  // `aria-label` of Popover.CloseButton.
  dismiss: "Dismiss"
};

// src/popover/popover-root.tsx
function PopoverRoot(props) {
  const defaultId = `popover-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps3(
    {
      id: defaultId,
      modal: false,
      translations: POPOVER_INTL_TRANSLATIONS
    },
    props
  );
  const [local, others] = splitProps5(mergedProps, [
    "translations",
    "id",
    "open",
    "defaultOpen",
    "onOpenChange",
    "modal",
    "preventScroll",
    "forceMount",
    "anchorRef"
  ]);
  const [defaultAnchorRef, setDefaultAnchorRef] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [contentId, setContentId] = createSignal();
  const [titleId, setTitleId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const anchorRef = () => {
    return local.anchorRef?.() ?? defaultAnchorRef() ?? triggerRef();
  };
  const { present: contentPresent } = createPresence({
    show: () => local.forceMount || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    translations: () => local.translations ?? POPOVER_INTL_TRANSLATIONS,
    dataset,
    isOpen: disclosureState.isOpen,
    isModal: () => local.modal ?? false,
    preventScroll: () => local.preventScroll ?? context.isModal(),
    contentPresent,
    triggerRef,
    contentId,
    titleId,
    descriptionId,
    setDefaultAnchorRef,
    setTriggerRef,
    setContentRef,
    close: disclosureState.close,
    toggle: disclosureState.toggle,
    generateId: createGenerateId(() => local.id),
    registerContentId: createRegisterId(setContentId),
    registerTitleId: createRegisterId(setTitleId),
    registerDescriptionId: createRegisterId(setDescriptionId)
  };
  return <PopoverContext.Provider value={context}><Popper anchorRef={anchorRef} contentRef={contentRef} {...others} /></PopoverContext.Provider>;
}

// src/popover/popover-title.tsx
import { mergeDefaultProps as mergeDefaultProps4 } from "@kobalte/utils";
import {
  createEffect as createEffect3,
  onCleanup as onCleanup3,
  splitProps as splitProps6
} from "solid-js";
function PopoverTitle(props) {
  const context = usePopoverContext();
  const mergedProps = mergeDefaultProps4(
    {
      id: context.generateId("title")
    },
    props
  );
  const [local, others] = splitProps6(mergedProps, ["id"]);
  createEffect3(() => onCleanup3(context.registerTitleId(local.id)));
  return <Polymorphic
    as="h2"
    id={local.id}
    {...context.dataset()}
    {...others}
  />;
}

// src/popover/popover-trigger.tsx
import { callHandler as callHandler2, mergeRefs as mergeRefs3 } from "@kobalte/utils";
import {
  splitProps as splitProps7
} from "solid-js";
function PopoverTrigger(props) {
  const context = usePopoverContext();
  const [local, others] = splitProps7(props, [
    "ref",
    "onClick",
    "onPointerDown"
  ]);
  const onPointerDown = (e) => {
    callHandler2(e, local.onPointerDown);
    e.preventDefault();
  };
  const onClick = (e) => {
    callHandler2(e, local.onClick);
    context.toggle();
  };
  return <ButtonRoot
    ref={mergeRefs3(context.setTriggerRef, local.ref)}
    aria-haspopup="dialog"
    aria-expanded={context.isOpen()}
    aria-controls={context.isOpen() ? context.contentId() : void 0}
    onPointerDown={onPointerDown}
    onClick={onClick}
    {...context.dataset()}
    {...others}
  />;
}

// src/popover/index.tsx
var Popover = Object.assign(PopoverRoot, {
  Anchor: PopoverAnchor,
  Arrow: PopperArrow,
  CloseButton: PopoverCloseButton,
  Content: PopoverContent,
  Description: PopoverDescription,
  Portal: PopoverPortal,
  Title: PopoverTitle,
  Trigger: PopoverTrigger
});

export {
  PopoverAnchor,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  Popover,
  popover_exports
};
