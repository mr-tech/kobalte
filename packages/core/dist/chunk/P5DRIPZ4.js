import { PopperArrow, Popper } from './4X2EKUJ3.js';
import { createFocusScope } from './ISKHZMHS.js';
import { createHideOutside } from './TZGE2AQH.js';
import { DismissableLayer } from './7KU4OSOB.js';
import { createDisclosureState } from './7LCANGHD.js';
import { ButtonRoot } from './7OVKXYPU.js';
import { createRegisterId } from './E4R2EMM4.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo, Portal } from 'solid-js/web';
import { mergeRefs, mergeDefaultProps, createGenerateId, callHandler, focusWithoutScrolling, contains } from '@kobalte/utils';
import { createContext, splitProps, createEffect, onCleanup, Show, createUniqueId, createSignal, createMemo, useContext } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';
import createPreventScroll from 'solid-prevent-scroll';
import createPresence from 'solid-presence';

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
var PopoverContext = createContext();
function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `usePopoverContext` must be used within a `Popover` component");
  }
  return context;
}

// src/popover/popover-anchor.tsx
function PopoverAnchor(props) {
  const context = usePopoverContext();
  const [local, others] = splitProps(props, ["ref"]);
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setDefaultAnchorRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    }
  }, () => context.dataset(), others));
}
function PopoverCloseButton(props) {
  const context = usePopoverContext();
  const [local, others] = splitProps(props, ["aria-label", "onClick"]);
  const onClick = (e) => {
    callHandler(e, local.onClick);
    context.close();
  };
  return createComponent(ButtonRoot, mergeProps({
    get ["aria-label"]() {
      return local["aria-label"] || context.translations().dismiss;
    },
    onClick
  }, () => context.dataset(), others));
}
function PopoverContent(props) {
  let ref;
  const context = usePopoverContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("content")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "onOpenAutoFocus", "onCloseAutoFocus", "onPointerDownOutside", "onFocusOutside", "onInteractOutside"]);
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
  createFocusScope({
    trapFocus: () => context.isOpen() && context.isModal(),
    onMountAutoFocus: local.onOpenAutoFocus,
    onUnmountAutoFocus: onCloseAutoFocus
  }, () => ref);
  createEffect(() => onCleanup(context.registerContentId(others.id)));
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
                ref = el;
              }, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            role: "dialog",
            tabIndex: -1,
            get disableOutsidePointerEvents() {
              return memo(() => !!context.isOpen())() && context.isModal();
            },
            get excludedElements() {
              return [context.triggerRef];
            },
            get style() {
              return combineStyle({
                "--kb-popover-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                position: "relative"
              }, local.style);
            },
            get ["aria-labelledby"]() {
              return context.titleId();
            },
            get ["aria-describedby"]() {
              return context.descriptionId();
            },
            onPointerDownOutside,
            onFocusOutside,
            onInteractOutside,
            get onDismiss() {
              return context.close;
            }
          }, () => context.dataset(), others));
        }
      });
    }
  });
}
function PopoverDescription(props) {
  const context = usePopoverContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerDescriptionId(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "p",
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function PopoverPortal(props) {
  const context = usePopoverContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}

// src/popover/popover.intl.ts
var POPOVER_INTL_TRANSLATIONS = {
  // `aria-label` of Popover.CloseButton.
  dismiss: "Dismiss"
};

// src/popover/popover-root.tsx
function PopoverRoot(props) {
  const defaultId = `popover-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    modal: false,
    translations: POPOVER_INTL_TRANSLATIONS
  }, props);
  const [local, others] = splitProps(mergedProps, ["translations", "id", "open", "defaultOpen", "onOpenChange", "modal", "preventScroll", "forceMount", "anchorRef"]);
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
  const {
    present: contentPresent
  } = createPresence({
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
  return createComponent(PopoverContext.Provider, {
    value: context,
    get children() {
      return createComponent(Popper, mergeProps({
        anchorRef,
        contentRef
      }, others));
    }
  });
}
function PopoverTitle(props) {
  const context = usePopoverContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("title")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerTitleId(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "h2",
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function PopoverTrigger(props) {
  const context = usePopoverContext();
  const [local, others] = splitProps(props, ["ref", "onClick", "onPointerDown"]);
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    e.preventDefault();
  };
  const onClick = (e) => {
    callHandler(e, local.onClick);
    context.toggle();
  };
  return createComponent(ButtonRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    "aria-haspopup": "dialog",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo(() => !!context.isOpen())() ? context.contentId() : void 0;
    },
    onPointerDown,
    onClick
  }, () => context.dataset(), others));
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

export { Popover, PopoverAnchor, PopoverCloseButton, PopoverContent, PopoverDescription, PopoverPortal, PopoverRoot, PopoverTitle, PopoverTrigger, popover_exports };
