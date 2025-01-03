import {
  Popper
} from "./KFH362HI.jsx";
import {
  createDomCollection,
  createDomCollectionItem,
  useOptionalDomCollectionContext
} from "./SOM3K36D.jsx";
import {
  createSelectableList
} from "./N3GAC5SS.jsx";
import {
  createListState,
  createSelectableItem
} from "./QZDH5R5B.jsx";
import {
  useLocale
} from "./LR7LBJN3.jsx";
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
  createToggleState
} from "./VI7QYH27.jsx";
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
  createControllableSignal
} from "./FN6EICGO.jsx";
import {
  createTagName
} from "./OYES4GOP.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";

// src/menu/menu-checkbox-item.tsx
import { mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import { splitProps as splitProps2 } from "solid-js";

// src/menu/menu-item-base.tsx
import {
  callHandler,
  composeEventHandlers,
  createGenerateId,
  focusWithoutScrolling,
  mergeDefaultProps,
  mergeRefs
} from "@kobalte/utils";
import {
  createMemo,
  createSignal,
  createUniqueId,
  splitProps
} from "solid-js";

// src/menu/menu-context.tsx
import { createContext, useContext } from "solid-js";
var MenuContext = createContext();
function useOptionalMenuContext() {
  return useContext(MenuContext);
}
function useMenuContext() {
  const context = useOptionalMenuContext();
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useMenuContext` must be used within a `Menu` component"
    );
  }
  return context;
}

// src/menu/menu-item.context.tsx
import { createContext as createContext2, useContext as useContext2 } from "solid-js";
var MenuItemContext = createContext2();
function useMenuItemContext() {
  const context = useContext2(MenuItemContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component"
    );
  }
  return context;
}

// src/menu/menu-root-context.tsx
import { createContext as createContext3, useContext as useContext3 } from "solid-js";
var MenuRootContext = createContext3();
function useMenuRootContext() {
  const context = useContext3(MenuRootContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component"
    );
  }
  return context;
}

// src/menu/menu-item-base.tsx
function MenuItemBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const menuContext = useMenuContext();
  const mergedProps = mergeDefaultProps(
    {
      id: rootContext.generateId(`item-${createUniqueId()}`)
    },
    props
  );
  const [local, others] = splitProps(mergedProps, [
    "ref",
    "textValue",
    "disabled",
    "closeOnSelect",
    "checked",
    "indeterminate",
    "onSelect",
    "onPointerMove",
    "onPointerLeave",
    "onPointerDown",
    "onPointerUp",
    "onClick",
    "onKeyDown",
    "onMouseDown",
    "onFocus"
  ]);
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [labelRef, setLabelRef] = createSignal();
  const selectionManager = () => menuContext.listState().selectionManager();
  const key = () => others.id;
  const isHighlighted = () => selectionManager().focusedKey() === key();
  const onSelect = () => {
    local.onSelect?.();
    if (local.closeOnSelect) {
      setTimeout(() => {
        menuContext.close(true);
      });
    }
  };
  createDomCollectionItem({
    getItem: () => ({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? labelRef()?.textContent ?? ref?.textContent ?? "",
      disabled: local.disabled ?? false
    })
  });
  const selectableItem = createSelectableItem(
    {
      key,
      selectionManager,
      shouldSelectOnPressUp: true,
      allowsDifferentPressOrigin: true,
      disabled: () => local.disabled
    },
    () => ref
  );
  const onPointerMove = (e) => {
    callHandler(e, local.onPointerMove);
    if (e.pointerType !== "mouse") {
      return;
    }
    if (local.disabled) {
      menuContext.onItemLeave(e);
    } else {
      menuContext.onItemEnter(e);
      if (!e.defaultPrevented) {
        focusWithoutScrolling(e.currentTarget);
        menuContext.listState().selectionManager().setFocused(true);
        menuContext.listState().selectionManager().setFocusedKey(key());
      }
    }
  };
  const onPointerLeave = (e) => {
    callHandler(e, local.onPointerLeave);
    if (e.pointerType !== "mouse") {
      return;
    }
    menuContext.onItemLeave(e);
  };
  const onPointerUp = (e) => {
    callHandler(e, local.onPointerUp);
    if (!local.disabled && e.button === 0) {
      onSelect();
    }
  };
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    if (e.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    switch (e.key) {
      case "Enter":
      case " ":
        onSelect();
        break;
    }
  };
  const ariaChecked = createMemo(() => {
    if (local.indeterminate) {
      return "mixed";
    }
    if (local.checked == null) {
      return void 0;
    }
    return local.checked;
  });
  const dataset = createMemo(() => ({
    "data-indeterminate": local.indeterminate ? "" : void 0,
    "data-checked": local.checked && !local.indeterminate ? "" : void 0,
    "data-disabled": local.disabled ? "" : void 0,
    "data-highlighted": isHighlighted() ? "" : void 0
  }));
  const context = {
    isChecked: () => local.checked,
    dataset,
    setLabelRef,
    generateId: createGenerateId(() => others.id),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId)
  };
  return <MenuItemContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs((el) => ref = el, local.ref)}
    tabIndex={selectableItem.tabIndex()}
    aria-checked={ariaChecked()}
    aria-disabled={local.disabled}
    aria-labelledby={labelId()}
    aria-describedby={descriptionId()}
    data-key={selectableItem.dataKey()}
    onPointerDown={composeEventHandlers([
      local.onPointerDown,
      selectableItem.onPointerDown
    ])}
    onPointerUp={composeEventHandlers([
      onPointerUp,
      selectableItem.onPointerUp
    ])}
    onClick={composeEventHandlers([local.onClick, selectableItem.onClick])}
    onKeyDown={composeEventHandlers([onKeyDown, selectableItem.onKeyDown])}
    onMouseDown={composeEventHandlers([
      local.onMouseDown,
      selectableItem.onMouseDown
    ])}
    onFocus={composeEventHandlers([local.onFocus, selectableItem.onFocus])}
    onPointerMove={onPointerMove}
    onPointerLeave={onPointerLeave}
    {...dataset()}
    {...others}
  /></MenuItemContext.Provider>;
}

// src/menu/menu-checkbox-item.tsx
function MenuCheckboxItem(props) {
  const mergedProps = mergeDefaultProps2(
    {
      closeOnSelect: false
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, [
    "checked",
    "defaultChecked",
    "onChange",
    "onSelect"
  ]);
  const state = createToggleState({
    isSelected: () => local.checked,
    defaultIsSelected: () => local.defaultChecked,
    onSelectedChange: (checked) => local.onChange?.(checked),
    isDisabled: () => others.disabled
  });
  const onSelect = () => {
    local.onSelect?.();
    state.toggle();
  };
  return <MenuItemBase
    role="menuitemcheckbox"
    checked={state.isSelected()}
    onSelect={onSelect}
    {...others}
  />;
}

// src/menu/menu-trigger.tsx
import {
  callHandler as callHandler2,
  mergeDefaultProps as mergeDefaultProps3,
  mergeRefs as mergeRefs2,
  scrollIntoViewport
} from "@kobalte/utils";
import {
  createEffect,
  createMemo as createMemo2,
  on,
  onCleanup,
  splitProps as splitProps3
} from "solid-js";

// src/menubar/menubar-context.tsx
import {
  createContext as createContext4,
  useContext as useContext4
} from "solid-js";
var MenubarContext = createContext4();
function useOptionalMenubarContext() {
  return useContext4(MenubarContext);
}
function useMenubarContext() {
  const context = useOptionalMenubarContext();
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useMenubarContext` must be used within a `Menubar` component"
    );
  }
  return context;
}

// src/menu/menu-trigger.tsx
var MENUBAR_KEYS = {
  next: (dir, orientation) => dir === "ltr" ? orientation === "horizontal" ? "ArrowRight" : "ArrowDown" : orientation === "horizontal" ? "ArrowLeft" : "ArrowUp",
  previous: (dir, orientation) => MENUBAR_KEYS.next(dir === "ltr" ? "rtl" : "ltr", orientation)
};
var MENU_KEYS = {
  first: (orientation) => orientation === "horizontal" ? "ArrowDown" : "ArrowRight",
  last: (orientation) => orientation === "horizontal" ? "ArrowUp" : "ArrowLeft"
};
function MenuTrigger(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const { direction } = useLocale();
  const mergedProps = mergeDefaultProps3(
    {
      id: rootContext.generateId("trigger")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, [
    "ref",
    "id",
    "disabled",
    "onPointerDown",
    "onClick",
    "onKeyDown",
    "onMouseOver",
    "onFocus"
  ]);
  let key = () => rootContext.value();
  if (optionalMenubarContext !== void 0) {
    key = () => rootContext.value() ?? local.id;
    if (optionalMenubarContext.lastValue() === void 0)
      optionalMenubarContext.setLastValue(key);
  }
  const tagName = createTagName(
    () => context.triggerRef(),
    () => "button"
  );
  const isNativeLink = createMemo2(() => {
    return tagName() === "a" && context.triggerRef()?.getAttribute("href") != null;
  });
  createEffect(
    on(
      () => optionalMenubarContext?.value(),
      (value) => {
        if (!isNativeLink())
          return;
        if (value === key())
          context.triggerRef()?.focus();
      }
    )
  );
  const handleClick = () => {
    if (optionalMenubarContext !== void 0) {
      if (!context.isOpen()) {
        if (!optionalMenubarContext.autoFocusMenu()) {
          optionalMenubarContext.setAutoFocusMenu(true);
        }
        context.open(false);
      } else {
        if (optionalMenubarContext.value() === key())
          optionalMenubarContext.closeMenu();
      }
    } else
      context.toggle(true);
  };
  const onPointerDown = (e) => {
    callHandler2(e, local.onPointerDown);
    e.currentTarget.dataset.pointerType = e.pointerType;
    if (!local.disabled && e.pointerType !== "touch" && e.button === 0) {
      handleClick();
    }
  };
  const onClick = (e) => {
    callHandler2(e, local.onClick);
    if (!local.disabled) {
      if (e.currentTarget.dataset.pointerType === "touch")
        handleClick();
    }
  };
  const onKeyDown = (e) => {
    callHandler2(e, local.onKeyDown);
    if (local.disabled) {
      return;
    }
    if (isNativeLink()) {
      switch (e.key) {
        case "Enter":
        case " ":
          return;
      }
    }
    switch (e.key) {
      case "Enter":
      case " ":
      case MENU_KEYS.first(rootContext.orientation()):
        e.stopPropagation();
        e.preventDefault();
        scrollIntoViewport(e.currentTarget);
        context.open("first");
        optionalMenubarContext?.setAutoFocusMenu(true);
        optionalMenubarContext?.setValue(key);
        break;
      case MENU_KEYS.last(rootContext.orientation()):
        e.stopPropagation();
        e.preventDefault();
        context.open("last");
        break;
      case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
        if (optionalMenubarContext === void 0)
          break;
        e.stopPropagation();
        e.preventDefault();
        optionalMenubarContext.nextMenu();
        break;
      case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
        if (optionalMenubarContext === void 0)
          break;
        e.stopPropagation();
        e.preventDefault();
        optionalMenubarContext.previousMenu();
        break;
    }
  };
  const onMouseOver = (e) => {
    callHandler2(e, local.onMouseOver);
    if (context.triggerRef()?.dataset.pointerType === "touch")
      return;
    if (!local.disabled && optionalMenubarContext !== void 0 && optionalMenubarContext.value() !== void 0) {
      optionalMenubarContext.setValue(key);
    }
  };
  const onFocus = (e) => {
    callHandler2(e, local.onFocus);
    if (optionalMenubarContext !== void 0 && e.currentTarget.dataset.pointerType !== "touch")
      optionalMenubarContext.setValue(key);
  };
  createEffect(() => onCleanup(context.registerTriggerId(local.id)));
  return <ButtonRoot
    ref={mergeRefs2(context.setTriggerRef, local.ref)}
    data-kb-menu-value-trigger={rootContext.value()}
    id={local.id}
    disabled={local.disabled}
    aria-haspopup="true"
    aria-expanded={context.isOpen()}
    aria-controls={context.isOpen() ? context.contentId() : void 0}
    data-highlighted={key() !== void 0 && optionalMenubarContext?.value() === key() ? true : void 0}
    tabIndex={optionalMenubarContext !== void 0 ? optionalMenubarContext.value() === key() || optionalMenubarContext.lastValue() === key() ? 0 : -1 : void 0}
    onPointerDown={onPointerDown}
    onMouseOver={onMouseOver}
    onClick={onClick}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    role={optionalMenubarContext !== void 0 ? "menuitem" : void 0}
    {...context.dataset()}
    {...others}
  />;
}

// src/menu/menu-content.tsx
import { mergeRefs as mergeRefs4 } from "@kobalte/utils";
import { splitProps as splitProps5 } from "solid-js";
import createPreventScroll from "solid-prevent-scroll";

// src/menu/menu-content-base.tsx
import {
  callHandler as callHandler3,
  composeEventHandlers as composeEventHandlers2,
  contains,
  mergeDefaultProps as mergeDefaultProps4,
  mergeRefs as mergeRefs3
} from "@kobalte/utils";
import {
  Show,
  createEffect as createEffect2,
  createUniqueId as createUniqueId2,
  onCleanup as onCleanup2,
  splitProps as splitProps4
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";

// src/navigation-menu/navigation-menu-context.tsx
import {
  createContext as createContext5,
  useContext as useContext5
} from "solid-js";
var NavigationMenuContext = createContext5();
function useOptionalNavigationMenuContext() {
  return useContext5(NavigationMenuContext);
}
function useNavigationMenuContext() {
  const context = useOptionalNavigationMenuContext();
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useNavigationMenuContext` must be used within a `NavigationMenu` component"
    );
  }
  return context;
}

// src/menu/menu-content-base.tsx
function MenuContentBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const { direction } = useLocale();
  const mergedProps = mergeDefaultProps4(
    {
      id: rootContext.generateId(`content-${createUniqueId2()}`)
    },
    props
  );
  const [local, others] = splitProps4(mergedProps, [
    "ref",
    "id",
    "style",
    "onOpenAutoFocus",
    "onCloseAutoFocus",
    "onEscapeKeyDown",
    "onFocusOutside",
    "onPointerEnter",
    "onPointerMove",
    "onKeyDown",
    "onMouseDown",
    "onFocusIn",
    "onFocusOut"
  ]);
  let lastPointerX = 0;
  const isRootModalContent = () => {
    return context.parentMenuContext() == null && optionalMenubarContext === void 0 && rootContext.isModal();
  };
  const selectableList = createSelectableList(
    {
      selectionManager: context.listState().selectionManager,
      collection: context.listState().collection,
      autoFocus: context.autoFocus,
      deferAutoFocus: true,
      // ensure all menu items are mounted and collection is not empty before trying to autofocus.
      shouldFocusWrap: true,
      disallowTypeAhead: () => !context.listState().selectionManager().isFocused(),
      orientation: () => rootContext.orientation() === "horizontal" ? "vertical" : "horizontal"
    },
    () => ref
  );
  createFocusScope(
    {
      trapFocus: () => isRootModalContent() && context.isOpen(),
      onMountAutoFocus: (event) => {
        if (optionalMenubarContext === void 0)
          local.onOpenAutoFocus?.(event);
      },
      onUnmountAutoFocus: local.onCloseAutoFocus
    },
    () => ref
  );
  const onKeyDown = (e) => {
    if (!contains(e.currentTarget, e.target)) {
      return;
    }
    if (e.key === "Tab" && context.isOpen()) {
      e.preventDefault();
    }
    if (optionalMenubarContext !== void 0) {
      if (e.currentTarget.getAttribute("aria-haspopup") !== "true")
        switch (e.key) {
          case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
            e.stopPropagation();
            e.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.nextMenu();
            break;
          case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
            if (e.currentTarget.hasAttribute("data-closed"))
              break;
            e.stopPropagation();
            e.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.previousMenu();
            break;
        }
    }
  };
  const onEscapeKeyDown = (e) => {
    local.onEscapeKeyDown?.(e);
    optionalMenubarContext?.setAutoFocusMenu(false);
    context.close(true);
  };
  const onFocusOutside = (e) => {
    local.onFocusOutside?.(e);
    if (rootContext.isModal()) {
      e.preventDefault();
    }
  };
  const onPointerEnter = (e) => {
    callHandler3(e, local.onPointerEnter);
    if (!context.isOpen()) {
      return;
    }
    context.parentMenuContext()?.listState().selectionManager().setFocused(false);
    context.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0);
  };
  const onPointerMove = (e) => {
    callHandler3(e, local.onPointerMove);
    if (e.pointerType !== "mouse") {
      return;
    }
    const target = e.target;
    const pointerXHasChanged = lastPointerX !== e.clientX;
    if (contains(e.currentTarget, target) && pointerXHasChanged) {
      context.setPointerDir(e.clientX > lastPointerX ? "right" : "left");
      lastPointerX = e.clientX;
    }
  };
  createEffect2(() => onCleanup2(context.registerContentId(local.id)));
  onCleanup2(() => context.setContentRef(void 0));
  const commonAttributes = {
    ref: mergeRefs3((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref),
    role: "menu",
    get id() {
      return local.id;
    },
    get tabIndex() {
      return selectableList.tabIndex();
    },
    get "aria-labelledby"() {
      return context.triggerId();
    },
    onKeyDown: composeEventHandlers2([
      local.onKeyDown,
      selectableList.onKeyDown,
      onKeyDown
    ]),
    onMouseDown: composeEventHandlers2([
      local.onMouseDown,
      selectableList.onMouseDown
    ]),
    onFocusIn: composeEventHandlers2([
      local.onFocusIn,
      selectableList.onFocusIn
    ]),
    onFocusOut: composeEventHandlers2([
      local.onFocusOut,
      selectableList.onFocusOut
    ]),
    onPointerEnter,
    onPointerMove,
    get "data-orientation"() {
      return rootContext.orientation();
    }
  };
  return <Show when={context.contentPresent()}><Show
    when={optionalNavigationMenuContext === void 0 || context.parentMenuContext() != null}
    fallback={<Polymorphic
      as="div"
      {...context.dataset()}
      {...commonAttributes}
      {...others}
    />}
  ><Popper.Positioner><DismissableLayer
    disableOutsidePointerEvents={isRootModalContent() && context.isOpen()}
    excludedElements={[context.triggerRef]}
    bypassTopMostLayerCheck
    style={combineStyle(
      {
        "--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
        position: "relative"
      },
      local.style
    )}
    onEscapeKeyDown={onEscapeKeyDown}
    onFocusOutside={onFocusOutside}
    onDismiss={context.close}
    {...context.dataset()}
    {...commonAttributes}
    {...others}
  /></Popper.Positioner></Show></Show>;
}

// src/menu/menu-content.tsx
function MenuContent(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps5(props, ["ref"]);
  createPreventScroll({
    element: () => ref ?? null,
    enabled: () => context.contentPresent() && rootContext.preventScroll()
  });
  return <MenuContentBase
    ref={mergeRefs4((el) => {
      ref = el;
    }, local.ref)}
    {...others}
  />;
}

// src/menu/menu-group.tsx
import { createGenerateId as createGenerateId2, mergeDefaultProps as mergeDefaultProps5 } from "@kobalte/utils";
import { createSignal as createSignal2, createUniqueId as createUniqueId3 } from "solid-js";

// src/menu/menu-group-context.tsx
import { createContext as createContext6, useContext as useContext6 } from "solid-js";
var MenuGroupContext = createContext6();
function useMenuGroupContext() {
  const context = useContext6(MenuGroupContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component"
    );
  }
  return context;
}

// src/menu/menu-group.tsx
function MenuGroup(props) {
  const rootContext = useMenuRootContext();
  const mergedProps = mergeDefaultProps5(
    {
      id: rootContext.generateId(`group-${createUniqueId3()}`)
    },
    props
  );
  const [labelId, setLabelId] = createSignal2();
  const context = {
    generateId: createGenerateId2(() => mergedProps.id),
    registerLabelId: createRegisterId(setLabelId)
  };
  return <MenuGroupContext.Provider value={context}><Polymorphic
    as="div"
    role="group"
    aria-labelledby={labelId()}
    {...mergedProps}
  /></MenuGroupContext.Provider>;
}

// src/menu/menu-group-label.tsx
import { mergeDefaultProps as mergeDefaultProps6 } from "@kobalte/utils";
import {
  createEffect as createEffect3,
  onCleanup as onCleanup3,
  splitProps as splitProps6
} from "solid-js";
function MenuGroupLabel(props) {
  const context = useMenuGroupContext();
  const mergedProps = mergeDefaultProps6(
    {
      id: context.generateId("label")
    },
    props
  );
  const [local, others] = splitProps6(mergedProps, ["id"]);
  createEffect3(() => onCleanup3(context.registerLabelId(local.id)));
  return <Polymorphic
    as="span"
    id={local.id}
    aria-hidden="true"
    {...others}
  />;
}

// src/menu/menu-icon.tsx
import { mergeDefaultProps as mergeDefaultProps7 } from "@kobalte/utils";
function MenuIcon(props) {
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps7(
    { children: "\u25BC" },
    props
  );
  return <Polymorphic
    as="span"
    aria-hidden="true"
    {...context.dataset()}
    {...mergedProps}
  />;
}

// src/menu/menu-item.tsx
function MenuItem(props) {
  return <MenuItemBase
    role="menuitem"
    closeOnSelect
    {...props}
  />;
}

// src/menu/menu-item-description.tsx
import { mergeDefaultProps as mergeDefaultProps8 } from "@kobalte/utils";
import {
  createEffect as createEffect4,
  onCleanup as onCleanup4,
  splitProps as splitProps7
} from "solid-js";
function MenuItemDescription(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps8(
    {
      id: context.generateId("description")
    },
    props
  );
  const [local, others] = splitProps7(mergedProps, ["id"]);
  createEffect4(() => onCleanup4(context.registerDescription(local.id)));
  return <Polymorphic
    as="div"
    id={local.id}
    {...context.dataset()}
    {...others}
  />;
}

// src/menu/menu-item-indicator.tsx
import { mergeDefaultProps as mergeDefaultProps9 } from "@kobalte/utils";
import { Show as Show2, splitProps as splitProps8 } from "solid-js";
function MenuItemIndicator(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps9(
    {
      id: context.generateId("indicator")
    },
    props
  );
  const [local, others] = splitProps8(mergedProps, ["forceMount"]);
  return <Show2 when={local.forceMount || context.isChecked()}><Polymorphic
    as="div"
    {...context.dataset()}
    {...others}
  /></Show2>;
}

// src/menu/menu-item-label.tsx
import { mergeDefaultProps as mergeDefaultProps10, mergeRefs as mergeRefs5 } from "@kobalte/utils";
import {
  createEffect as createEffect5,
  onCleanup as onCleanup5,
  splitProps as splitProps9
} from "solid-js";
function MenuItemLabel(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps10(
    {
      id: context.generateId("label")
    },
    props
  );
  const [local, others] = splitProps9(mergedProps, ["ref", "id"]);
  createEffect5(() => onCleanup5(context.registerLabel(local.id)));
  return <Polymorphic
    as="div"
    ref={mergeRefs5(context.setLabelRef, local.ref)}
    id={local.id}
    {...context.dataset()}
    {...others}
  />;
}

// src/menu/menu-portal.tsx
import { Show as Show3 } from "solid-js";
import { Portal } from "solid-js/web";
function MenuPortal(props) {
  const context = useMenuContext();
  return <Show3 when={context.contentPresent()}><Portal {...props} /></Show3>;
}

// src/menu/menu-radio-group.tsx
import { mergeDefaultProps as mergeDefaultProps11 } from "@kobalte/utils";
import {
  createUniqueId as createUniqueId4,
  splitProps as splitProps10
} from "solid-js";

// src/menu/menu-radio-group-context.tsx
import { createContext as createContext7, useContext as useContext7 } from "solid-js";
var MenuRadioGroupContext = createContext7();
function useMenuRadioGroupContext() {
  const context = useContext7(MenuRadioGroupContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component"
    );
  }
  return context;
}

// src/menu/menu-radio-group.tsx
function MenuRadioGroup(props) {
  const rootContext = useMenuRootContext();
  const defaultId = rootContext.generateId(`radiogroup-${createUniqueId4()}`);
  const mergedProps = mergeDefaultProps11(
    {
      id: defaultId
    },
    props
  );
  const [local, others] = splitProps10(mergedProps, [
    "value",
    "defaultValue",
    "onChange",
    "disabled"
  ]);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onChange?.(value)
  });
  const context = {
    isDisabled: () => local.disabled,
    isSelectedValue: (value) => value === selected(),
    setSelectedValue: setSelected
  };
  return <MenuRadioGroupContext.Provider value={context}><MenuGroup
    {...others}
  /></MenuRadioGroupContext.Provider>;
}

// src/menu/menu-radio-item.tsx
import { mergeDefaultProps as mergeDefaultProps12 } from "@kobalte/utils";
import { splitProps as splitProps11 } from "solid-js";
function MenuRadioItem(props) {
  const context = useMenuRadioGroupContext();
  const mergedProps = mergeDefaultProps12(
    { closeOnSelect: false },
    props
  );
  const [local, others] = splitProps11(mergedProps, ["value", "onSelect"]);
  const onSelect = () => {
    local.onSelect?.();
    context.setSelectedValue(local.value);
  };
  return <MenuItemBase
    role="menuitemradio"
    checked={context.isSelectedValue(local.value)}
    onSelect={onSelect}
    {...others}
  />;
}

// src/menu/menu.tsx
import {
  focusWithoutScrolling as focusWithoutScrolling2,
  mergeDefaultProps as mergeDefaultProps13,
  removeItemFromArray
} from "@kobalte/utils";
import {
  Show as Show4,
  createEffect as createEffect6,
  createMemo as createMemo3,
  createSignal as createSignal3,
  onCleanup as onCleanup6,
  splitProps as splitProps12
} from "solid-js";
import createPresence from "solid-presence";

// src/menu/utils.ts
import { isPointInPolygon } from "@kobalte/utils";
function getPointerGraceArea(placement, event, contentEl) {
  const basePlacement = placement.split("-")[0];
  const contentRect = contentEl.getBoundingClientRect();
  const polygon = [];
  const pointerX = event.clientX;
  const pointerY = event.clientY;
  switch (basePlacement) {
    case "top":
      polygon.push([pointerX, pointerY + 5]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      break;
    case "right":
      polygon.push([pointerX - 5, pointerY]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      break;
    case "bottom":
      polygon.push([pointerX, pointerY - 5]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      break;
    case "left":
      polygon.push([pointerX + 5, pointerY]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      break;
  }
  return polygon;
}
function isPointerInGraceArea(event, area) {
  if (!area) {
    return false;
  }
  return isPointInPolygon([event.clientX, event.clientY], area);
}

// src/menu/menu.tsx
function Menu(props) {
  const rootContext = useMenuRootContext();
  const parentDomCollectionContext = useOptionalDomCollectionContext();
  const parentMenuContext = useOptionalMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const mergedProps = mergeDefaultProps13(
    {
      placement: rootContext.orientation() === "horizontal" ? "bottom-start" : "right-start"
    },
    props
  );
  const [local, others] = splitProps12(mergedProps, [
    "open",
    "defaultOpen",
    "onOpenChange"
  ]);
  let pointerGraceTimeoutId = 0;
  let pointerGraceIntent = null;
  let pointerDir = "right";
  const [triggerId, setTriggerId] = createSignal3();
  const [contentId, setContentId] = createSignal3();
  const [triggerRef, setTriggerRef] = createSignal3();
  const [contentRef, setContentRef] = createSignal3();
  const [focusStrategy, setFocusStrategy] = createSignal3(true);
  const [currentPlacement, setCurrentPlacement] = createSignal3(
    others.placement
  );
  const [nestedMenus, setNestedMenus] = createSignal3([]);
  const [items, setItems] = createSignal3([]);
  const { DomCollectionProvider } = createDomCollection({
    items,
    onItemsChange: setItems
  });
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const { present: contentPresent } = createPresence({
    show: () => rootContext.forceMount() || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const listState = createListState({
    selectionMode: "none",
    dataSource: items
  });
  const open = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.open();
  };
  const close = (recursively = false) => {
    disclosureState.close();
    if (recursively && parentMenuContext) {
      parentMenuContext.close(true);
    }
  };
  const toggle = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.toggle();
  };
  const _focusContent = () => {
    const content = contentRef();
    if (content) {
      focusWithoutScrolling2(content);
      listState.selectionManager().setFocused(true);
      listState.selectionManager().setFocusedKey(void 0);
    }
  };
  const focusContent = () => {
    if (optionalNavigationMenuContext != null)
      setTimeout(() => _focusContent());
    else
      _focusContent();
  };
  const registerNestedMenu = (element) => {
    setNestedMenus((prev) => [...prev, element]);
    const parentUnregister = parentMenuContext?.registerNestedMenu(element);
    return () => {
      setNestedMenus((prev) => removeItemFromArray(prev, element));
      parentUnregister?.();
    };
  };
  const isPointerMovingToSubmenu = (e) => {
    const isMovingTowards = pointerDir === pointerGraceIntent?.side;
    return isMovingTowards && isPointerInGraceArea(e, pointerGraceIntent?.area);
  };
  const onItemEnter = (e) => {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  };
  const onItemLeave = (e) => {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    focusContent();
  };
  const onTriggerLeave = (e) => {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => {
      return !(parentMenuContext == null && disclosureState.isOpen() && rootContext.isModal());
    },
    targets: () => [contentRef(), ...nestedMenus()].filter(Boolean)
  });
  createEffect6(() => {
    const contentEl = contentRef();
    if (!contentEl || !parentMenuContext) {
      return;
    }
    const parentUnregister = parentMenuContext.registerNestedMenu(contentEl);
    onCleanup6(() => {
      parentUnregister();
    });
  });
  createEffect6(() => {
    if (parentMenuContext !== void 0)
      return;
    optionalMenubarContext?.registerMenu(rootContext.value(), [
      contentRef(),
      ...nestedMenus()
    ]);
  });
  createEffect6(() => {
    if (parentMenuContext !== void 0 || optionalMenubarContext === void 0)
      return;
    if (optionalMenubarContext.value() === rootContext.value()) {
      triggerRef()?.focus();
      if (optionalMenubarContext.autoFocusMenu())
        open(true);
    } else
      close();
  });
  createEffect6(() => {
    if (parentMenuContext !== void 0 || optionalMenubarContext === void 0)
      return;
    if (disclosureState.isOpen())
      optionalMenubarContext.setValue(rootContext.value());
  });
  onCleanup6(() => {
    if (parentMenuContext !== void 0)
      return;
    optionalMenubarContext?.unregisterMenu(rootContext.value());
  });
  const dataset = createMemo3(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    contentPresent,
    nestedMenus,
    currentPlacement,
    pointerGraceTimeoutId: () => pointerGraceTimeoutId,
    autoFocus: focusStrategy,
    listState: () => listState,
    parentMenuContext: () => parentMenuContext,
    triggerRef,
    contentRef,
    triggerId,
    contentId,
    setTriggerRef,
    setContentRef,
    open,
    close,
    toggle,
    focusContent,
    onItemEnter,
    onItemLeave,
    onTriggerLeave,
    setPointerDir: (dir) => pointerDir = dir,
    setPointerGraceTimeoutId: (id) => pointerGraceTimeoutId = id,
    setPointerGraceIntent: (intent) => pointerGraceIntent = intent,
    registerNestedMenu,
    registerItemToParentDomCollection: parentDomCollectionContext?.registerItem,
    registerTriggerId: createRegisterId(setTriggerId),
    registerContentId: createRegisterId(setContentId)
  };
  return <DomCollectionProvider><MenuContext.Provider value={context}><Show4
    when={optionalNavigationMenuContext === void 0}
    fallback={others.children}
  ><Popper
    anchorRef={triggerRef}
    contentRef={contentRef}
    onCurrentPlacementChange={setCurrentPlacement}
    {...others}
  /></Show4></MenuContext.Provider></DomCollectionProvider>;
}

// src/menu/menu-sub.tsx
function MenuSub(props) {
  const { direction } = useLocale();
  return <Menu
    placement={direction() === "rtl" ? "left-start" : "right-start"}
    flip
    {...props}
  />;
}

// src/menu/menu-sub-content.tsx
import {
  callHandler as callHandler4,
  contains as contains2,
  focusWithoutScrolling as focusWithoutScrolling3
} from "@kobalte/utils";
import {
  splitProps as splitProps13
} from "solid-js";
var SUB_CLOSE_KEYS = {
  close: (dir, orientation) => {
    if (dir === "ltr") {
      return [orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
    }
    return [orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
  }
};
function MenuSubContent(props) {
  const context = useMenuContext();
  const rootContext = useMenuRootContext();
  const [local, others] = splitProps13(props, [
    "onFocusOutside",
    "onKeyDown"
  ]);
  const { direction } = useLocale();
  const onOpenAutoFocus = (e) => {
    e.preventDefault();
  };
  const onCloseAutoFocus = (e) => {
    e.preventDefault();
  };
  const onFocusOutside = (e) => {
    local.onFocusOutside?.(e);
    const target = e.target;
    if (!contains2(context.triggerRef(), target)) {
      context.close();
    }
  };
  const onKeyDown = (e) => {
    callHandler4(e, local.onKeyDown);
    const isKeyDownInside = contains2(e.currentTarget, e.target);
    const isCloseKey = SUB_CLOSE_KEYS.close(
      direction(),
      rootContext.orientation()
    ).includes(e.key);
    const isSubMenu = context.parentMenuContext() != null;
    if (isKeyDownInside && isCloseKey && isSubMenu) {
      context.close();
      focusWithoutScrolling3(context.triggerRef());
    }
  };
  return <MenuContentBase
    onOpenAutoFocus={onOpenAutoFocus}
    onCloseAutoFocus={onCloseAutoFocus}
    onFocusOutside={onFocusOutside}
    onKeyDown={onKeyDown}
    {...others}
  />;
}

// src/menu/menu-sub-trigger.tsx
import {
  callHandler as callHandler5,
  composeEventHandlers as composeEventHandlers3,
  focusWithoutScrolling as focusWithoutScrolling4,
  mergeDefaultProps as mergeDefaultProps14,
  mergeRefs as mergeRefs6
} from "@kobalte/utils";
import {
  createEffect as createEffect7,
  createUniqueId as createUniqueId5,
  on as on2,
  onCleanup as onCleanup7,
  splitProps as splitProps14
} from "solid-js";
import { isServer } from "solid-js/web";
var SELECTION_KEYS = ["Enter", " "];
var SUB_OPEN_KEYS = {
  open: (dir, orientation) => {
    if (dir === "ltr") {
      return [
        ...SELECTION_KEYS,
        orientation === "horizontal" ? "ArrowRight" : "ArrowDown"
      ];
    }
    return [
      ...SELECTION_KEYS,
      orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"
    ];
  }
};
function MenuSubTrigger(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps14(
    {
      id: rootContext.generateId(`sub-trigger-${createUniqueId5()}`)
    },
    props
  );
  const [local, others] = splitProps14(mergedProps, [
    "ref",
    "id",
    "textValue",
    "disabled",
    "onPointerMove",
    "onPointerLeave",
    "onPointerDown",
    "onPointerUp",
    "onClick",
    "onKeyDown",
    "onMouseDown",
    "onFocus"
  ]);
  let openTimeoutId = null;
  const clearOpenTimeout = () => {
    if (isServer) {
      return;
    }
    if (openTimeoutId) {
      window.clearTimeout(openTimeoutId);
    }
    openTimeoutId = null;
  };
  const { direction } = useLocale();
  const key = () => local.id;
  const parentSelectionManager = () => {
    const parentMenuContext = context.parentMenuContext();
    if (parentMenuContext == null) {
      throw new Error(
        "[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component"
      );
    }
    return parentMenuContext.listState().selectionManager();
  };
  const collection = () => context.listState().collection();
  const isHighlighted = () => parentSelectionManager().focusedKey() === key();
  const selectableItem = createSelectableItem(
    {
      key,
      selectionManager: parentSelectionManager,
      shouldSelectOnPressUp: true,
      allowsDifferentPressOrigin: true,
      disabled: () => local.disabled
    },
    () => ref
  );
  const onClick = (e) => {
    callHandler5(e, local.onClick);
    if (!context.isOpen() && !local.disabled) {
      context.open(true);
    }
  };
  const onPointerMove = (e) => {
    callHandler5(e, local.onPointerMove);
    if (e.pointerType !== "mouse") {
      return;
    }
    const parentMenuContext = context.parentMenuContext();
    parentMenuContext?.onItemEnter(e);
    if (e.defaultPrevented) {
      return;
    }
    if (local.disabled) {
      parentMenuContext?.onItemLeave(e);
      return;
    }
    if (!context.isOpen() && !openTimeoutId) {
      context.parentMenuContext()?.setPointerGraceIntent(null);
      openTimeoutId = window.setTimeout(() => {
        context.open(false);
        clearOpenTimeout();
      }, 100);
    }
    parentMenuContext?.onItemEnter(e);
    if (!e.defaultPrevented) {
      if (context.listState().selectionManager().isFocused()) {
        context.listState().selectionManager().setFocused(false);
        context.listState().selectionManager().setFocusedKey(void 0);
      }
      focusWithoutScrolling4(e.currentTarget);
      parentMenuContext?.listState().selectionManager().setFocused(true);
      parentMenuContext?.listState().selectionManager().setFocusedKey(key());
    }
  };
  const onPointerLeave = (e) => {
    callHandler5(e, local.onPointerLeave);
    if (e.pointerType !== "mouse") {
      return;
    }
    clearOpenTimeout();
    const parentMenuContext = context.parentMenuContext();
    const contentEl = context.contentRef();
    if (contentEl) {
      parentMenuContext?.setPointerGraceIntent({
        area: getPointerGraceArea(context.currentPlacement(), e, contentEl),
        // Safe because sub menu always open "left" or "right".
        side: context.currentPlacement().split("-")[0]
      });
      window.clearTimeout(parentMenuContext?.pointerGraceTimeoutId());
      const pointerGraceTimeoutId = window.setTimeout(() => {
        parentMenuContext?.setPointerGraceIntent(null);
      }, 300);
      parentMenuContext?.setPointerGraceTimeoutId(pointerGraceTimeoutId);
    } else {
      parentMenuContext?.onTriggerLeave(e);
      if (e.defaultPrevented) {
        return;
      }
      parentMenuContext?.setPointerGraceIntent(null);
    }
    parentMenuContext?.onItemLeave(e);
  };
  const onKeyDown = (e) => {
    callHandler5(e, local.onKeyDown);
    if (e.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    if (SUB_OPEN_KEYS.open(direction(), rootContext.orientation()).includes(e.key)) {
      e.stopPropagation();
      e.preventDefault();
      parentSelectionManager().setFocused(false);
      parentSelectionManager().setFocusedKey(void 0);
      if (!context.isOpen()) {
        context.open("first");
      }
      context.focusContent();
      context.listState().selectionManager().setFocused(true);
      context.listState().selectionManager().setFocusedKey(collection().getFirstKey());
    }
  };
  createEffect7(() => {
    if (context.registerItemToParentDomCollection == null) {
      throw new Error(
        "[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component"
      );
    }
    const unregister = context.registerItemToParentDomCollection({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? ref?.textContent ?? "",
      disabled: local.disabled ?? false
    });
    onCleanup7(unregister);
  });
  createEffect7(
    on2(
      () => context.parentMenuContext()?.pointerGraceTimeoutId(),
      (pointerGraceTimer) => {
        onCleanup7(() => {
          window.clearTimeout(pointerGraceTimer);
          context.parentMenuContext()?.setPointerGraceIntent(null);
        });
      }
    )
  );
  createEffect7(() => onCleanup7(context.registerTriggerId(local.id)));
  onCleanup7(() => {
    clearOpenTimeout();
  });
  return <Polymorphic
    as="div"
    ref={mergeRefs6((el) => {
      context.setTriggerRef(el);
      ref = el;
    }, local.ref)}
    id={local.id}
    role="menuitem"
    tabIndex={selectableItem.tabIndex()}
    aria-haspopup="true"
    aria-expanded={context.isOpen()}
    aria-controls={context.isOpen() ? context.contentId() : void 0}
    aria-disabled={local.disabled}
    data-key={selectableItem.dataKey()}
    data-highlighted={isHighlighted() ? "" : void 0}
    data-disabled={local.disabled ? "" : void 0}
    onPointerDown={composeEventHandlers3([
      local.onPointerDown,
      selectableItem.onPointerDown
    ])}
    onPointerUp={composeEventHandlers3([
      local.onPointerUp,
      selectableItem.onPointerUp
    ])}
    onClick={composeEventHandlers3([onClick, selectableItem.onClick])}
    onKeyDown={composeEventHandlers3([onKeyDown, selectableItem.onKeyDown])}
    onMouseDown={composeEventHandlers3([
      local.onMouseDown,
      selectableItem.onMouseDown
    ])}
    onFocus={composeEventHandlers3([local.onFocus, selectableItem.onFocus])}
    onPointerMove={onPointerMove}
    onPointerLeave={onPointerLeave}
    {...context.dataset()}
    {...others}
  />;
}

// src/menu/menu-root.tsx
import {
  createGenerateId as createGenerateId3,
  mergeDefaultProps as mergeDefaultProps15
} from "@kobalte/utils";
import { createUniqueId as createUniqueId6, splitProps as splitProps15 } from "solid-js";
function MenuRoot(props) {
  const optionalMenubarContext = useOptionalMenubarContext();
  const defaultId = `menu-${createUniqueId6()}`;
  const mergedProps = mergeDefaultProps15(
    {
      id: defaultId,
      modal: true
    },
    props
  );
  const [local, others] = splitProps15(mergedProps, [
    "id",
    "modal",
    "preventScroll",
    "forceMount",
    "open",
    "defaultOpen",
    "onOpenChange",
    "value",
    "orientation"
  ]);
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const context = {
    isModal: () => local.modal ?? true,
    preventScroll: () => local.preventScroll ?? context.isModal(),
    forceMount: () => local.forceMount ?? false,
    generateId: createGenerateId3(() => local.id),
    value: () => local.value,
    orientation: () => local.orientation ?? optionalMenubarContext?.orientation() ?? "horizontal"
  };
  return <MenuRootContext.Provider value={context}><Menu
    open={disclosureState.isOpen()}
    onOpenChange={disclosureState.setIsOpen}
    {...others}
  /></MenuRootContext.Provider>;
}

export {
  MenubarContext,
  useMenubarContext,
  NavigationMenuContext,
  useNavigationMenuContext,
  useOptionalMenuContext,
  useMenuContext,
  useMenuRootContext,
  MenuCheckboxItem,
  MenuTrigger,
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
  MenuSubTrigger
};
