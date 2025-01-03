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

// src/dialog/index.tsx
var dialog_exports = {};
__export(dialog_exports, {
  CloseButton: () => DialogCloseButton,
  Content: () => DialogContent,
  Description: () => DialogDescription,
  Dialog: () => Dialog,
  Overlay: () => DialogOverlay,
  Portal: () => DialogPortal,
  Root: () => DialogRoot,
  Title: () => DialogTitle,
  Trigger: () => DialogTrigger
});

// src/dialog/dialog-close-button.tsx
import { callHandler } from "@kobalte/utils";
import {
  splitProps
} from "solid-js";

// src/dialog/dialog-context.tsx
import {
  createContext,
  useContext
} from "solid-js";
var DialogContext = createContext();
function useDialogContext() {
  const context = useContext(DialogContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useDialogContext` must be used within a `Dialog` component"
    );
  }
  return context;
}

// src/dialog/dialog-close-button.tsx
function DialogCloseButton(props) {
  const context = useDialogContext();
  const [local, others] = splitProps(props, [
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
    {...others}
  />;
}

// src/dialog/dialog-content.tsx
import {
  contains,
  focusWithoutScrolling,
  mergeDefaultProps,
  mergeRefs
} from "@kobalte/utils";
import {
  Show,
  createEffect,
  onCleanup,
  splitProps as splitProps2
} from "solid-js";
import createPreventScroll from "solid-prevent-scroll";
function DialogContent(props) {
  let ref;
  const context = useDialogContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("content")
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, [
    "ref",
    "onOpenAutoFocus",
    "onCloseAutoFocus",
    "onPointerDownOutside",
    "onFocusOutside",
    "onInteractOutside"
  ]);
  let hasInteractedOutside = false;
  let hasPointerDownOutside = false;
  const onPointerDownOutside = (e) => {
    local.onPointerDownOutside?.(e);
    if (context.modal() && e.detail.isContextMenu) {
      e.preventDefault();
    }
  };
  const onFocusOutside = (e) => {
    local.onFocusOutside?.(e);
    if (context.modal()) {
      e.preventDefault();
    }
  };
  const onInteractOutside = (e) => {
    local.onInteractOutside?.(e);
    if (context.modal()) {
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
  const onCloseAutoFocus = (e) => {
    local.onCloseAutoFocus?.(e);
    if (context.modal()) {
      e.preventDefault();
      focusWithoutScrolling(context.triggerRef());
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
  createHideOutside({
    isDisabled: () => !(context.isOpen() && context.modal()),
    targets: () => ref ? [ref] : []
  });
  createPreventScroll({
    element: () => ref ?? null,
    enabled: () => context.contentPresent() && context.preventScroll()
  });
  createFocusScope(
    {
      trapFocus: () => context.isOpen() && context.modal(),
      onMountAutoFocus: local.onOpenAutoFocus,
      onUnmountAutoFocus: onCloseAutoFocus
    },
    () => ref
  );
  createEffect(() => onCleanup(context.registerContentId(others.id)));
  return <Show when={context.contentPresent()}><DismissableLayer
    ref={mergeRefs((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref)}
    role="dialog"
    tabIndex={-1}
    disableOutsidePointerEvents={context.modal() && context.isOpen()}
    excludedElements={[context.triggerRef]}
    aria-labelledby={context.titleId()}
    aria-describedby={context.descriptionId()}
    data-expanded={context.isOpen() ? "" : void 0}
    data-closed={!context.isOpen() ? "" : void 0}
    onPointerDownOutside={onPointerDownOutside}
    onFocusOutside={onFocusOutside}
    onInteractOutside={onInteractOutside}
    onDismiss={context.close}
    {...others}
  /></Show>;
}

// src/dialog/dialog-description.tsx
import { mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import {
  createEffect as createEffect2,
  onCleanup as onCleanup2,
  splitProps as splitProps3
} from "solid-js";
function DialogDescription(props) {
  const context = useDialogContext();
  const mergedProps = mergeDefaultProps2(
    {
      id: context.generateId("description")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, ["id"]);
  createEffect2(() => onCleanup2(context.registerDescriptionId(local.id)));
  return <Polymorphic
    as="p"
    id={local.id}
    {...others}
  />;
}

// src/dialog/dialog-overlay.tsx
import { callHandler as callHandler2, mergeRefs as mergeRefs2 } from "@kobalte/utils";
import { Show as Show2, splitProps as splitProps4 } from "solid-js";
import { combineStyle } from "@solid-primitives/props";
function DialogOverlay(props) {
  const context = useDialogContext();
  const [local, others] = splitProps4(props, [
    "ref",
    "style",
    "onPointerDown"
  ]);
  const onPointerDown = (e) => {
    callHandler2(e, local.onPointerDown);
    if (e.target === e.currentTarget) {
      e.preventDefault();
    }
  };
  return <Show2 when={context.overlayPresent()}><Polymorphic
    as="div"
    ref={mergeRefs2(context.setOverlayRef, local.ref)}
    style={combineStyle({ "pointer-events": "auto" }, local.style)}
    data-expanded={context.isOpen() ? "" : void 0}
    data-closed={!context.isOpen() ? "" : void 0}
    onPointerDown={onPointerDown}
    {...others}
  /></Show2>;
}

// src/dialog/dialog-portal.tsx
import { Show as Show3 } from "solid-js";
import { Portal } from "solid-js/web";
function DialogPortal(props) {
  const context = useDialogContext();
  return <Show3 when={context.contentPresent() || context.overlayPresent()}><Portal {...props} /></Show3>;
}

// src/dialog/dialog-root.tsx
import { createGenerateId, mergeDefaultProps as mergeDefaultProps3 } from "@kobalte/utils";
import { createSignal, createUniqueId } from "solid-js";
import createPresence from "solid-presence";

// src/dialog/dialog.intl.ts
var DIALOG_INTL_TRANSLATIONS = {
  // `aria-label` of Dialog.CloseButton.
  dismiss: "Dismiss"
};

// src/dialog/dialog-root.tsx
function DialogRoot(props) {
  const defaultId = `dialog-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps3(
    {
      id: defaultId,
      modal: true,
      translations: DIALOG_INTL_TRANSLATIONS
    },
    props
  );
  const [contentId, setContentId] = createSignal();
  const [titleId, setTitleId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [overlayRef, setOverlayRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const disclosureState = createDisclosureState({
    open: () => mergedProps.open,
    defaultOpen: () => mergedProps.defaultOpen,
    onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
  });
  const shouldMount = () => mergedProps.forceMount || disclosureState.isOpen();
  const { present: overlayPresent } = createPresence({
    show: shouldMount,
    element: () => overlayRef() ?? null
  });
  const { present: contentPresent } = createPresence({
    show: shouldMount,
    element: () => contentRef() ?? null
  });
  const context = {
    translations: () => mergedProps.translations ?? DIALOG_INTL_TRANSLATIONS,
    isOpen: disclosureState.isOpen,
    modal: () => mergedProps.modal ?? true,
    preventScroll: () => mergedProps.preventScroll ?? context.modal(),
    contentId,
    titleId,
    descriptionId,
    triggerRef,
    overlayRef,
    setOverlayRef,
    contentRef,
    setContentRef,
    overlayPresent,
    contentPresent,
    close: disclosureState.close,
    toggle: disclosureState.toggle,
    setTriggerRef,
    generateId: createGenerateId(() => mergedProps.id),
    registerContentId: createRegisterId(setContentId),
    registerTitleId: createRegisterId(setTitleId),
    registerDescriptionId: createRegisterId(setDescriptionId)
  };
  return <DialogContext.Provider value={context}>{mergedProps.children}</DialogContext.Provider>;
}

// src/dialog/dialog-title.tsx
import { mergeDefaultProps as mergeDefaultProps4 } from "@kobalte/utils";
import {
  createEffect as createEffect3,
  onCleanup as onCleanup3,
  splitProps as splitProps5
} from "solid-js";
function DialogTitle(props) {
  const context = useDialogContext();
  const mergedProps = mergeDefaultProps4(
    {
      id: context.generateId("title")
    },
    props
  );
  const [local, others] = splitProps5(mergedProps, ["id"]);
  createEffect3(() => onCleanup3(context.registerTitleId(local.id)));
  return <Polymorphic as="h2" id={local.id} {...others} />;
}

// src/dialog/dialog-trigger.tsx
import { callHandler as callHandler3, mergeRefs as mergeRefs3 } from "@kobalte/utils";
import {
  splitProps as splitProps6
} from "solid-js";
function DialogTrigger(props) {
  const context = useDialogContext();
  const [local, others] = splitProps6(props, [
    "ref",
    "onClick"
  ]);
  const onClick = (e) => {
    callHandler3(e, local.onClick);
    context.toggle();
  };
  return <ButtonRoot
    ref={mergeRefs3(context.setTriggerRef, local.ref)}
    aria-haspopup="dialog"
    aria-expanded={context.isOpen()}
    aria-controls={context.isOpen() ? context.contentId() : void 0}
    data-expanded={context.isOpen() ? "" : void 0}
    data-closed={!context.isOpen() ? "" : void 0}
    onClick={onClick}
    {...others}
  />;
}

// src/dialog/index.tsx
var Dialog = Object.assign(DialogRoot, {
  CloseButton: DialogCloseButton,
  Content: DialogContent,
  Description: DialogDescription,
  Overlay: DialogOverlay,
  Portal: DialogPortal,
  Title: DialogTitle,
  Trigger: DialogTrigger
});

export {
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Dialog,
  dialog_exports
};
