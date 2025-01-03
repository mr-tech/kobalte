import { createSize } from '../chunk/B2CSS4CB.js';
import { MenubarMenu, MenubarRoot, MenubarTrigger } from '../chunk/TGY5QIZX.js';
import { MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuIcon, MenuItemDescription, MenuItemIndicator, MenuItemLabel, MenuRadioGroup, MenuRadioItem, MenuSub, MenuSubContent, MenuSubTrigger, useMenubarContext, useNavigationMenuContext, useMenuRootContext, MenuContent, MenuItem, useMenuContext, MenuPortal, NavigationMenuContext, useOptionalMenuContext } from '../chunk/CHVSKBAO.js';
export { MenuCheckboxItem as CheckboxItem, MenuGroup as Group, MenuGroupLabel as GroupLabel, MenuIcon as Icon, MenuItemDescription as ItemDescription, MenuItemIndicator as ItemIndicator, MenuItemLabel as ItemLabel, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, MenuSub as Sub, MenuSubContent as SubContent, MenuSubTrigger as SubTrigger } from '../chunk/CHVSKBAO.js';
import { SeparatorRoot } from '../chunk/STGRFJHZ.js';
export { SeparatorRoot as Separator } from '../chunk/STGRFJHZ.js';
import { PopperArrow, Popper } from '../chunk/4X2EKUJ3.js';
import { DismissableLayer } from '../chunk/7KU4OSOB.js';
import { createControllableSignal } from '../chunk/BLN63FDC.js';
import { createComponent, mergeProps, insert, memo, template } from 'solid-js/web';
import { mergeDefaultProps, mergeRefs, composeEventHandlers, callHandler } from '@kobalte/utils';
import { splitProps, createSignal, createEffect, on, batch, createUniqueId, Show, createMemo } from 'solid-js';
import createPresence from 'solid-presence';
import { combineStyle } from '@solid-primitives/props';

function NavigationMenuArrow(props) {
  let ref;
  const menubarContext = useMenubarContext();
  const mergedProps = mergeDefaultProps({
    size: 15
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref"]);
  const [offset, setOffset] = createSignal(0);
  const horizontal = () => menubarContext.orientation() === "horizontal";
  createEffect(on(menubarContext.value, (value) => {
    setTimeout(() => {
      if (!value || value.includes("link-trigger-"))
        return;
      const triggerRef = document.querySelector(`[data-kb-menu-value-trigger="${value}"]`);
      if (!triggerRef || !ref)
        return;
      const middle = triggerRef.getBoundingClientRect()[horizontal() ? "x" : "y"] + triggerRef.getBoundingClientRect()[horizontal() ? "width" : "height"] / 2;
      const computed = window.getComputedStyle(ref);
      const initalArrowPos = ref.getBoundingClientRect()[horizontal() ? "x" : "y"] + ref.getBoundingClientRect()[horizontal() ? "width" : "height"] / 2 - Number.parseFloat(computed.transform.split(",")[horizontal() ? 4 : 5]);
      setOffset(middle - initalArrowPos);
    });
  }));
  return createComponent(PopperArrow, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get style() {
      return {
        transform: `translate${horizontal() ? "X" : "Y"}(${offset()}px)`,
        color: "red"
      };
    }
  }, others));
}
function NavigationMenuContent(props) {
  const context = useNavigationMenuContext();
  const menubarContext = useMenubarContext();
  const menuRootContext = useMenuRootContext();
  const [motion, setMotion] = createSignal();
  const [local, others] = splitProps(props, ["onPointerEnter", "onPointerLeave"]);
  const onPointerEnter = (e) => {
    callHandler(e, local.onPointerEnter);
    context.cancelLeaveTimer();
  };
  const onPointerLeave = (e) => {
    callHandler(e, local.onPointerLeave);
    context.startLeaveTimer();
  };
  createEffect(on(menubarContext.value, (contextValue) => {
    batch(() => {
      if (!contextValue || contextValue.includes("link-trigger-")) {
        context.setPreviousMenu(void 0);
        return;
      }
      if (contextValue === menuRootContext.value()) {
        if (context.previousMenu() != null) {
          const menus2 = [...menubarContext.menus()];
          const prevIndex2 = menus2.indexOf(context.previousMenu());
          const nextIndex2 = menus2.indexOf(contextValue);
          if (prevIndex2 < nextIndex2)
            setMotion("from-end");
          else
            setMotion("from-start");
        } else {
          setMotion(void 0);
        }
        context.setPreviousMenu(contextValue);
        return;
      }
      const menus = [...menubarContext.menus()];
      const prevIndex = menus.indexOf(context.previousMenu());
      const nextIndex = menus.indexOf(contextValue);
      if (prevIndex > nextIndex)
        setMotion("to-end");
      else
        setMotion("to-start");
    });
  }));
  return createComponent(MenuContent, mergeProps({
    as: "ul",
    onPointerEnter,
    onPointerLeave,
    onInteractOutside: () => {
      context.setAutoFocusMenu(false);
    },
    get ["data-motion"]() {
      return motion();
    }
  }, others));
}
var _tmpl$ = /* @__PURE__ */ template(`<li role="presentation">`);
function NavigationMenuItem(props) {
  return (() => {
    const _el$ = _tmpl$();
    insert(_el$, createComponent(MenuItem, mergeProps({
      as: "a"
    }, props)));
    return _el$;
  })();
}
function NavigationMenuMenu(props) {
  const menubarContext = useMenubarContext();
  const context = useNavigationMenuContext();
  const [local, others] = splitProps(props, ["value"]);
  const uniqueid = createUniqueId();
  const defaultId = menubarContext.generateId(`navigation-menu-menu-${uniqueid}`);
  const mergedPropsWithId = mergeDefaultProps({
    id: defaultId
  }, others);
  const value = () => local.value ?? uniqueid;
  const [forceMount, setForceMount] = createSignal(false);
  const animationEnd = () => {
    if (menubarContext.value() !== value()) {
      setForceMount(false);
    }
    context.viewportRef()?.removeEventListener("animationend", animationEnd);
    context.viewportRef()?.removeEventListener("animationcancel", animationEnd);
  };
  createEffect(on(menubarContext.value, (contextValue) => {
    if (contextValue === value()) {
      setForceMount(true);
    } else {
      const viewportRef = context.viewportRef();
      if (!viewportRef || ["", "none"].includes(window.getComputedStyle(viewportRef).animationName)) {
        setForceMount(false);
        return;
      }
      viewportRef.addEventListener("animationend", animationEnd);
    }
  }));
  return createComponent(MenubarMenu, mergeProps({
    get forceMount() {
      return forceMount();
    },
    get value() {
      return value();
    }
  }, mergedPropsWithId));
}
function NavigationMenuPortal(props) {
  const context = useNavigationMenuContext();
  const menuContext = useMenuContext();
  const [local, others] = splitProps(props, ["ref"]);
  return createComponent(Show, {
    get when() {
      return context.viewportPresent();
    },
    get children() {
      return createComponent(MenuPortal, mergeProps({
        ref(r$) {
          const _ref$ = mergeRefs((ref) => {
            if (ref)
              ref.setAttribute("role", "presentation");
          }, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        },
        get mount() {
          return memo(() => menuContext.parentMenuContext() == null)() ? context.viewportRef() : void 0;
        }
      }, others));
    }
  });
}
var _tmpl$2 = /* @__PURE__ */ template(`<nav>`);
function NavigationMenuRoot(props) {
  const mergedProps = mergeDefaultProps({
    delayDuration: 200,
    skipDelayDuration: 300
  }, props);
  const [local, popperProps, others] = splitProps(mergedProps, ["ref", "delayDuration", "skipDelayDuration", "autoFocusMenu", "onAutoFocusMenuChange", "defaultValue", "value", "onValueChange", "forceMount"], ["getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding"]);
  const [value, setValue] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value2) => local.onValueChange?.(value2)
  });
  const [autoFocusMenu, setAutoFocusMenu] = createControllableSignal({
    value: () => local.autoFocusMenu,
    defaultValue: () => false,
    onChange: local.onAutoFocusMenuChange
  });
  const [viewportRef, setViewportRef] = createSignal();
  const [rootRef, setRootRef] = createSignal();
  const [currentPlacement, setCurrentPlacement] = createSignal(popperProps.placement ?? others.orientation === "vertical" ? "right" : "bottom");
  createEffect(() => {
    setCurrentPlacement(others.orientation === "vertical" ? "right" : "bottom");
  });
  let timeoutId;
  const [previousMenu, setPreviousMenu] = createSignal();
  const [show, setShow] = createSignal(false);
  const [expanded, setExpanded] = createSignal(false);
  createEffect(() => {
    if (value() && !value().includes("link-trigger-") && autoFocusMenu()) {
      batch(() => {
        setExpanded(true);
        setShow(true);
      });
    } else {
      setExpanded(false);
      setShow(false);
    }
  });
  const dataset = createMemo(() => ({
    "data-expanded": expanded() ? "" : void 0,
    "data-closed": !expanded() ? "" : void 0
  }));
  const {
    present: viewportPresent
  } = createPresence({
    show: () => local.forceMount || show() || expanded(),
    element: () => viewportRef() ?? null
  });
  createEffect(() => {
    if (!viewportPresent()) {
      context.setPreviousMenu(void 0);
    }
  });
  const context = {
    dataset,
    delayDuration: () => local.delayDuration,
    skipDelayDuration: () => local.skipDelayDuration,
    autoFocusMenu,
    setAutoFocusMenu,
    startLeaveTimer: () => {
      timeoutId = window.setTimeout(() => {
        context.setAutoFocusMenu(false);
        setValue(void 0);
      }, context.skipDelayDuration());
    },
    cancelLeaveTimer: () => {
      if (timeoutId)
        clearTimeout(timeoutId);
    },
    rootRef,
    setRootRef,
    viewportRef,
    setViewportRef,
    viewportPresent,
    currentPlacement,
    previousMenu,
    setPreviousMenu
  };
  return createComponent(NavigationMenuContext.Provider, {
    value: context,
    get children() {
      return createComponent(Popper, mergeProps({
        anchorRef: rootRef,
        contentRef: viewportRef,
        get placement() {
          return currentPlacement();
        },
        onCurrentPlacementChange: setCurrentPlacement
      }, popperProps, {
        get children() {
          const _el$ = _tmpl$2();
          insert(_el$, createComponent(MenubarRoot, mergeProps({
            as: "ul",
            ref(r$) {
              const _ref$ = mergeRefs(context.setRootRef, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            get value() {
              return value() ?? null;
            },
            onValueChange: setValue,
            get autoFocusMenu() {
              return autoFocusMenu();
            },
            onAutoFocusMenuChange: setAutoFocusMenu
          }, others)));
          return _el$;
        }
      }));
    }
  });
}
var _tmpl$3 = /* @__PURE__ */ template(`<li role="presentation">`);
function NavigationMenuTrigger(props) {
  const context = useNavigationMenuContext();
  const menuContext = useOptionalMenuContext();
  const [local, others] = splitProps(props, ["onPointerEnter", "onPointerLeave", "onClick"]);
  let timeoutId;
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (timeoutId)
      clearTimeout(timeoutId);
  };
  const onPointerEnter = (e) => {
    callHandler(e, local.onPointerEnter);
    if (e.pointerType === "touch")
      return;
    context.cancelLeaveTimer();
    if (context.dataset()["data-expanded"] === "")
      return;
    timeoutId = window.setTimeout(() => {
      menuContext?.triggerRef()?.focus();
      setTimeout(() => {
        context.setAutoFocusMenu(true);
      });
    }, context.delayDuration());
  };
  const onPointerLeave = (e) => {
    callHandler(e, local.onPointerLeave);
    if (e.pointerType === "touch")
      return;
    context.startLeaveTimer();
    if (timeoutId)
      clearTimeout(timeoutId);
  };
  return (() => {
    const _el$ = _tmpl$3();
    insert(_el$, createComponent(MenubarTrigger, mergeProps({
      onClick,
      onPointerEnter,
      onPointerLeave
    }, others)));
    return _el$;
  })();
}
function NavigationMenuViewport(props) {
  const context = useNavigationMenuContext();
  const menubarContext = useMenubarContext();
  const [ref, setRef] = createSignal();
  const [local, others] = splitProps(props, ["ref", "style", "onEscapeKeyDown"]);
  const close = () => {
    menubarContext.setAutoFocusMenu(false);
    menubarContext.closeMenu();
  };
  const onEscapeKeyDown = (e) => {
    close();
  };
  const size = createSize(ref);
  createEffect(on(() => menubarContext.value() ? menubarContext.menuRefMap().get(menubarContext.value()) : void 0, (menu) => {
    if (menu === void 0 || menu[0] === void 0)
      return;
    setRef(menu[0]);
  }));
  const height = createMemo((prev) => {
    if (ref() === void 0 || !context.viewportPresent())
      return void 0;
    if (size.height() === 0)
      return prev;
    return size.height();
  });
  const width = createMemo((prev) => {
    if (ref() === void 0 || !context.viewportPresent())
      return void 0;
    if (size.width() === 0)
      return prev;
    return size.width();
  });
  return createComponent(Show, {
    get when() {
      return context.viewportPresent();
    },
    get children() {
      return createComponent(Popper.Positioner, {
        role: "presentation",
        get children() {
          return createComponent(DismissableLayer, mergeProps({
            as: "li",
            ref(r$) {
              const _ref$ = mergeRefs(context.setViewportRef, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            get excludedElements() {
              return [context.rootRef];
            },
            bypassTopMostLayerCheck: true,
            get style() {
              return combineStyle({
                "--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                "--kb-navigation-menu-viewport-height": height() ? `${height()}px` : void 0,
                "--kb-navigation-menu-viewport-width": width() ? `${width()}px` : void 0,
                position: "relative"
              }, local.style);
            },
            get onEscapeKeyDown() {
              return composeEventHandlers([local.onEscapeKeyDown, onEscapeKeyDown]);
            },
            onDismiss: close,
            get ["data-orientation"]() {
              return menubarContext.orientation();
            }
          }, () => context.dataset(), others));
        }
      });
    }
  });
}

// src/navigation-menu/index.tsx
var NavigationMenu = Object.assign(NavigationMenuRoot, {
  Arrow: NavigationMenuArrow,
  CheckboxItem: MenuCheckboxItem,
  Content: NavigationMenuContent,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Icon: MenuIcon,
  Item: NavigationMenuItem,
  ItemDescription: MenuItemDescription,
  ItemIndicator: MenuItemIndicator,
  ItemLabel: MenuItemLabel,
  Portal: NavigationMenuPortal,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Menu: NavigationMenuMenu,
  Separator: SeparatorRoot,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger,
  Trigger: NavigationMenuTrigger,
  Viewport: NavigationMenuViewport
});

export { NavigationMenuArrow as Arrow, NavigationMenuContent as Content, NavigationMenuItem as Item, NavigationMenuMenu as Menu, NavigationMenu, NavigationMenuPortal as Portal, NavigationMenuRoot as Root, NavigationMenuTrigger as Trigger, NavigationMenuViewport as Viewport };
