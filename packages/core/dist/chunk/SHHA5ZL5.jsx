import {
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuIcon,
  MenuItem,
  MenuItemDescription,
  MenuItemIndicator,
  MenuItemLabel,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  useMenuContext,
  useMenuRootContext
} from "./3DFIR3JI.jsx";
import {
  SeparatorRoot
} from "./T4C3DMHT.jsx";
import {
  PopperArrow
} from "./KFH362HI.jsx";
import {
  useLocale
} from "./LR7LBJN3.jsx";
import {
  createDisclosureState
} from "./E53DB7BS.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

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

// src/context-menu/context-menu-content.tsx
import { splitProps } from "solid-js";
function ContextMenuContent(props) {
  const rootContext = useMenuRootContext();
  const [local, others] = splitProps(props, [
    "onCloseAutoFocus",
    "onInteractOutside"
  ]);
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
  return <MenuContent
    onCloseAutoFocus={onCloseAutoFocus}
    onInteractOutside={onInteractOutside}
    {...others}
  />;
}

// src/context-menu/context-menu-root.tsx
import { mergeDefaultProps } from "@kobalte/utils";
import {
  createSignal,
  createUniqueId,
  splitProps as splitProps2
} from "solid-js";

// src/context-menu/context-menu-context.tsx
import { createContext, useContext } from "solid-js";
var ContextMenuContext = createContext();
function useOptionalContextMenuContext() {
  return useContext(ContextMenuContext);
}
function useContextMenuContext() {
  const context = useOptionalContextMenuContext();
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useContextMenuContext` must be used within a `ContextMenu` component"
    );
  }
  return context;
}

// src/context-menu/context-menu-root.tsx
function ContextMenuRoot(props) {
  const defaultId = `contextmenu-${createUniqueId()}`;
  const { direction } = useLocale();
  const mergedProps = mergeDefaultProps(
    {
      id: defaultId,
      placement: direction() === "rtl" ? "left-start" : "right-start",
      gutter: 2,
      shift: 2
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, ["onOpenChange"]);
  const [anchorRect, setAnchorRect] = createSignal({ x: 0, y: 0 });
  const disclosureState = createDisclosureState({
    defaultOpen: false,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const context = {
    setAnchorRect
  };
  return <ContextMenuContext.Provider value={context}><MenuRoot
    open={disclosureState.isOpen()}
    onOpenChange={disclosureState.setIsOpen}
    getAnchorRect={anchorRect}
    {...others}
  /></ContextMenuContext.Provider>;
}

// src/context-menu/context-menu-trigger.tsx
import { callHandler, mergeDefaultProps as mergeDefaultProps2, mergeRefs } from "@kobalte/utils";
import { onCleanup, splitProps as splitProps3 } from "solid-js";
import { isServer } from "solid-js/web";
import { combineStyle } from "@solid-primitives/props";
function ContextMenuTrigger(props) {
  const rootContext = useMenuRootContext();
  const menuContext = useMenuContext();
  const context = useContextMenuContext();
  const mergedProps = mergeDefaultProps2(
    {
      id: rootContext.generateId("trigger")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, [
    "ref",
    "style",
    "disabled",
    "onContextMenu",
    "onPointerDown",
    "onPointerMove",
    "onPointerCancel",
    "onPointerUp"
  ]);
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
    context.setAnchorRect({ x: e.clientX, y: e.clientY });
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
      context.setAnchorRect({ x: e.clientX, y: e.clientY });
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
  return <Polymorphic
    as="div"
    ref={mergeRefs(menuContext.setTriggerRef, local.ref)}
    style={combineStyle(
      {
        // prevent iOS context menu from appearing
        "-webkit-touch-callout": "none"
      },
      local.style
    )}
    data-disabled={local.disabled ? "" : void 0}
    onContextMenu={onContextMenu}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerCancel={onPointerCancel}
    onPointerUp={onPointerUp}
    {...menuContext.dataset()}
    {...others}
  />;
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

export {
  ContextMenuContent,
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenu,
  context_menu_exports
};
