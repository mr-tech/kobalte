import { MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuIcon, MenuItem, MenuItemDescription, MenuItemIndicator, MenuItemLabel, MenuPortal, MenuRadioGroup, MenuRadioItem, MenuSub, MenuSubContent, MenuSubTrigger, useMenuRootContext, MenuContent, MenuRoot, useMenuContext } from './CHVSKBAO.js';
import { SeparatorRoot } from './STGRFJHZ.js';
import { PopperArrow } from './4X2EKUJ3.js';
import { useLocale } from './XHJPQEZP.js';
import { createDisclosureState } from './7LCANGHD.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, isServer } from 'solid-js/web';
import { splitProps, createContext, createUniqueId, createSignal, onCleanup, useContext } from 'solid-js';
import { mergeDefaultProps, mergeRefs, callHandler } from '@kobalte/utils';
import { combineStyle } from '@solid-primitives/props';

// src/context-menu/index.tsx
var context_menu_exports = {};
__export(context_menu_exports, {
  Arrow: () => PopperArrow,
  CheckboxItem: () => MenuCheckboxItem,
  Content: () => ContextMenuContent,
  ContextMenu: () => ContextMenu,
  Group: () => MenuGroup,
  GroupLabel: () => MenuGroupLabel,
  Icon: () => MenuIcon,
  Item: () => MenuItem,
  ItemDescription: () => MenuItemDescription,
  ItemIndicator: () => MenuItemIndicator,
  ItemLabel: () => MenuItemLabel,
  Portal: () => MenuPortal,
  RadioGroup: () => MenuRadioGroup,
  RadioItem: () => MenuRadioItem,
  Root: () => ContextMenuRoot,
  Separator: () => SeparatorRoot,
  Sub: () => MenuSub,
  SubContent: () => MenuSubContent,
  SubTrigger: () => MenuSubTrigger,
  Trigger: () => ContextMenuTrigger
});
function ContextMenuContent(props) {
  const rootContext = useMenuRootContext();
  const [local, others] = splitProps(props, ["onCloseAutoFocus", "onInteractOutside"]);
  let hasInteractedOutside = false;
  const onCloseAutoFocus = (e) => {
    local.onCloseAutoFocus?.(e);
    if (!e.defaultPrevented && hasInteractedOutside) {
      e.preventDefault();
    }
    hasInteractedOutside = false;
  };
  const onInteractOutside = (e) => {
    local.onInteractOutside?.(e);
    if (!e.defaultPrevented && !rootContext.isModal()) {
      hasInteractedOutside = true;
    }
  };
  return createComponent(MenuContent, mergeProps({
    onCloseAutoFocus,
    onInteractOutside
  }, others));
}
var ContextMenuContext = createContext();
function useOptionalContextMenuContext() {
  return useContext(ContextMenuContext);
}
function useContextMenuContext() {
  const context = useOptionalContextMenuContext();
  if (context === void 0) {
    throw new Error("[kobalte]: `useContextMenuContext` must be used within a `ContextMenu` component");
  }
  return context;
}

// src/context-menu/context-menu-root.tsx
function ContextMenuRoot(props) {
  const defaultId = `contextmenu-${createUniqueId()}`;
  const {
    direction
  } = useLocale();
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    placement: direction() === "rtl" ? "left-start" : "right-start",
    gutter: 2,
    shift: 2
  }, props);
  const [local, others] = splitProps(mergedProps, ["onOpenChange"]);
  const [anchorRect, setAnchorRect] = createSignal({
    x: 0,
    y: 0
  });
  const disclosureState = createDisclosureState({
    defaultOpen: false,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const context = {
    setAnchorRect
  };
  return createComponent(ContextMenuContext.Provider, {
    value: context,
    get children() {
      return createComponent(MenuRoot, mergeProps({
        get open() {
          return disclosureState.isOpen();
        },
        get onOpenChange() {
          return disclosureState.setIsOpen;
        },
        getAnchorRect: anchorRect
      }, others));
    }
  });
}
function ContextMenuTrigger(props) {
  const rootContext = useMenuRootContext();
  const menuContext = useMenuContext();
  const context = useContextMenuContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId("trigger")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "disabled", "onContextMenu", "onPointerDown", "onPointerMove", "onPointerCancel", "onPointerUp"]);
  let longPressTimoutId = 0;
  const clearLongPressTimeout = () => {
    if (isServer) {
      return;
    }
    window.clearTimeout(longPressTimoutId);
  };
  onCleanup(() => {
    clearLongPressTimeout();
  });
  const onContextMenu = (e) => {
    if (local.disabled) {
      callHandler(e, local.onContextMenu);
      return;
    }
    clearLongPressTimeout();
    e.preventDefault();
    e.stopPropagation();
    context.setAnchorRect({
      x: e.clientX,
      y: e.clientY
    });
    if (menuContext.isOpen()) {
      menuContext.focusContent();
    } else {
      menuContext.open(true);
    }
  };
  const isTouchOrPen = (e) => e.pointerType === "touch" || e.pointerType === "pen";
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    if (!local.disabled && isTouchOrPen(e)) {
      clearLongPressTimeout();
      context.setAnchorRect({
        x: e.clientX,
        y: e.clientY
      });
      longPressTimoutId = window.setTimeout(() => menuContext.open(false), 700);
    }
  };
  const onPointerMove = (e) => {
    callHandler(e, local.onPointerMove);
    if (!local.disabled && isTouchOrPen(e)) {
      clearLongPressTimeout();
    }
  };
  const onPointerCancel = (e) => {
    callHandler(e, local.onPointerCancel);
    if (!local.disabled && isTouchOrPen(e)) {
      clearLongPressTimeout();
    }
  };
  const onPointerUp = (e) => {
    callHandler(e, local.onPointerUp);
    if (!local.disabled && isTouchOrPen(e)) {
      clearLongPressTimeout();
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(menuContext.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get style() {
      return combineStyle({
        // prevent iOS context menu from appearing
        "-webkit-touch-callout": "none"
      }, local.style);
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : void 0;
    },
    onContextMenu,
    onPointerDown,
    onPointerMove,
    onPointerCancel,
    onPointerUp
  }, () => menuContext.dataset(), others));
}

// src/context-menu/index.tsx
var ContextMenu = Object.assign(ContextMenuRoot, {
  Arrow: PopperArrow,
  CheckboxItem: MenuCheckboxItem,
  Content: ContextMenuContent,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Icon: MenuIcon,
  Item: MenuItem,
  ItemDescription: MenuItemDescription,
  ItemIndicator: MenuItemIndicator,
  ItemLabel: MenuItemLabel,
  Portal: MenuPortal,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Separator: SeparatorRoot,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger,
  Trigger: ContextMenuTrigger
});

export { ContextMenu, ContextMenuContent, ContextMenuRoot, ContextMenuTrigger, context_menu_exports };
