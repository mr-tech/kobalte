import {
  createSize
} from "../chunk/KVL5CS3M.jsx";
import {
  MenubarMenu,
  MenubarRoot,
  MenubarTrigger
} from "../chunk/6THKQEBZ.jsx";
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
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  NavigationMenuContext,
  useMenuContext,
  useMenuRootContext,
  useMenubarContext,
  useNavigationMenuContext,
  useOptionalMenuContext
} from "../chunk/3DFIR3JI.jsx";
import "../chunk/G4JQYERT.jsx";
import {
  SeparatorRoot
} from "../chunk/T4C3DMHT.jsx";
import {
  Popper,
  PopperArrow
} from "../chunk/KFH362HI.jsx";
import "../chunk/SOM3K36D.jsx";
import "../chunk/N3GAC5SS.jsx";
import "../chunk/QZDH5R5B.jsx";
import "../chunk/YRH543JR.jsx";
import "../chunk/LR7LBJN3.jsx";
import "../chunk/7A3GDF4Y.jsx";
import "../chunk/P6XU75ZG.jsx";
import "../chunk/JHMNWOLY.jsx";
import {
  DismissableLayer
} from "../chunk/5OEKFZ5A.jsx";
import "../chunk/IGYOA2ZZ.jsx";
import "../chunk/BMMCQ7YJ.jsx";
import "../chunk/3NI6FTA2.jsx";
import "../chunk/VI7QYH27.jsx";
import "../chunk/UKTBL2JL.jsx";
import "../chunk/E53DB7BS.jsx";
import "../chunk/JNCCF6MP.jsx";
import "../chunk/EJ5I5XML.jsx";
import {
  createControllableSignal
} from "../chunk/FN6EICGO.jsx";
import "../chunk/OYES4GOP.jsx";
import "../chunk/FLVHQV4A.jsx";
import "../chunk/5WXHJDCZ.jsx";

// src/navigation-menu/navigation-menu-arrow.tsx
import { mergeDefaultProps, mergeRefs } from "@kobalte/utils";
import {
  createEffect,
  createSignal,
  on,
  splitProps
} from "solid-js";
function NavigationMenuArrow(props) {
  let ref;
  const menubarContext = useMenubarContext();
  const mergedProps = mergeDefaultProps(
    {
      size: 15
    },
    props
  );
  const [local, others] = splitProps(mergedProps, ["ref"]);
  const [offset, setOffset] = createSignal(0);
  const horizontal = () => menubarContext.orientation() === "horizontal";
  createEffect(
    on(menubarContext.value, (value) => {
      setTimeout(() => {
        if (!value || value.includes("link-trigger-"))
          return;
        const triggerRef = document.querySelector(
          `[data-kb-menu-value-trigger="${value}"]`
        );
        if (!triggerRef || !ref)
          return;
        const middle = triggerRef.getBoundingClientRect()[horizontal() ? "x" : "y"] + triggerRef.getBoundingClientRect()[horizontal() ? "width" : "height"] / 2;
        const computed = window.getComputedStyle(ref);
        const initalArrowPos = ref.getBoundingClientRect()[horizontal() ? "x" : "y"] + ref.getBoundingClientRect()[horizontal() ? "width" : "height"] / 2 - Number.parseFloat(
          computed.transform.split(",")[horizontal() ? 4 : 5]
        );
        setOffset(middle - initalArrowPos);
      });
    })
  );
  return <PopperArrow
    ref={mergeRefs((el) => ref = el, local.ref)}
    style={{
      transform: `translate${horizontal() ? "X" : "Y"}(${offset()}px)`,
      color: "red"
    }}
    {...others}
  />;
}

// src/navigation-menu/navigation-menu-content.tsx
import { callHandler } from "@kobalte/utils";
import {
  batch,
  createEffect as createEffect2,
  createSignal as createSignal2,
  on as on2,
  splitProps as splitProps2
} from "solid-js";
function NavigationMenuContent(props) {
  const context = useNavigationMenuContext();
  const menubarContext = useMenubarContext();
  const menuRootContext = useMenuRootContext();
  const [motion, setMotion] = createSignal2();
  const [local, others] = splitProps2(props, [
    "onPointerEnter",
    "onPointerLeave"
  ]);
  const onPointerEnter = (e) => {
    callHandler(e, local.onPointerEnter);
    context.cancelLeaveTimer();
  };
  const onPointerLeave = (e) => {
    callHandler(e, local.onPointerLeave);
    context.startLeaveTimer();
  };
  createEffect2(
    on2(menubarContext.value, (contextValue) => {
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
    })
  );
  return <MenuContent
    as="ul"
    onPointerEnter={onPointerEnter}
    onPointerLeave={onPointerLeave}
    onInteractOutside={() => {
      context.setAutoFocusMenu(false);
    }}
    data-motion={motion()}
    {...others}
  />;
}

// src/navigation-menu/navigation-menu-item.tsx
function NavigationMenuItem(props) {
  return <li role="presentation"><MenuItem as="a" {...props} /></li>;
}

// src/navigation-menu/navigation-menu-menu.tsx
import { mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import {
  createEffect as createEffect3,
  createSignal as createSignal3,
  createUniqueId,
  on as on3,
  splitProps as splitProps3
} from "solid-js";
function NavigationMenuMenu(props) {
  const menubarContext = useMenubarContext();
  const context = useNavigationMenuContext();
  const [local, others] = splitProps3(props, ["value"]);
  const uniqueid = createUniqueId();
  const defaultId = menubarContext.generateId(
    `navigation-menu-menu-${uniqueid}`
  );
  const mergedPropsWithId = mergeDefaultProps2({ id: defaultId }, others);
  const value = () => local.value ?? uniqueid;
  const [forceMount, setForceMount] = createSignal3(false);
  const animationEnd = () => {
    if (menubarContext.value() !== value()) {
      setForceMount(false);
    }
    context.viewportRef()?.removeEventListener("animationend", animationEnd);
    context.viewportRef()?.removeEventListener("animationcancel", animationEnd);
  };
  createEffect3(
    on3(menubarContext.value, (contextValue) => {
      if (contextValue === value()) {
        setForceMount(true);
      } else {
        const viewportRef = context.viewportRef();
        if (!viewportRef || ["", "none"].includes(
          window.getComputedStyle(viewportRef).animationName
        )) {
          setForceMount(false);
          return;
        }
        viewportRef.addEventListener("animationend", animationEnd);
      }
    })
  );
  return <MenubarMenu
    forceMount={forceMount()}
    value={value()}
    {...mergedPropsWithId}
  />;
}

// src/navigation-menu/navigation-menu-portal.tsx
import { mergeRefs as mergeRefs2 } from "@kobalte/utils";
import { Show, splitProps as splitProps4 } from "solid-js";
function NavigationMenuPortal(props) {
  const context = useNavigationMenuContext();
  const menuContext = useMenuContext();
  const [local, others] = splitProps4(props, ["ref"]);
  return <Show when={context.viewportPresent()}><MenuPortal
    ref={mergeRefs2((ref) => {
      if (ref)
        ref.setAttribute("role", "presentation");
    }, local.ref)}
    mount={menuContext.parentMenuContext() == null ? context.viewportRef() : void 0}
    {...others}
  /></Show>;
}

// src/navigation-menu/navigation-menu-root.tsx
import { mergeDefaultProps as mergeDefaultProps3, mergeRefs as mergeRefs3 } from "@kobalte/utils";
import {
  batch as batch3,
  createEffect as createEffect4,
  createMemo,
  createSignal as createSignal4,
  splitProps as splitProps5
} from "solid-js";
import createPresence from "solid-presence";
function NavigationMenuRoot(props) {
  const mergedProps = mergeDefaultProps3(
    {
      delayDuration: 200,
      skipDelayDuration: 300
    },
    props
  );
  const [local, popperProps, others] = splitProps5(
    mergedProps,
    [
      "ref",
      "delayDuration",
      "skipDelayDuration",
      "autoFocusMenu",
      "onAutoFocusMenuChange",
      "defaultValue",
      "value",
      "onValueChange",
      "forceMount"
    ],
    [
      "getAnchorRect",
      "placement",
      "gutter",
      "shift",
      "flip",
      "slide",
      "overlap",
      "sameWidth",
      "fitViewport",
      "hideWhenDetached",
      "detachedPadding",
      "arrowPadding",
      "overflowPadding"
    ]
  );
  const [value, setValue] = createControllableSignal(
    {
      value: () => local.value,
      defaultValue: () => local.defaultValue,
      onChange: (value2) => local.onValueChange?.(value2)
    }
  );
  const [autoFocusMenu, setAutoFocusMenu] = createControllableSignal({
    value: () => local.autoFocusMenu,
    defaultValue: () => false,
    onChange: local.onAutoFocusMenuChange
  });
  const [viewportRef, setViewportRef] = createSignal4();
  const [rootRef, setRootRef] = createSignal4();
  const [currentPlacement, setCurrentPlacement] = createSignal4(
    popperProps.placement ?? others.orientation === "vertical" ? "right" : "bottom"
  );
  createEffect4(() => {
    setCurrentPlacement(others.orientation === "vertical" ? "right" : "bottom");
  });
  let timeoutId;
  const [previousMenu, setPreviousMenu] = createSignal4();
  const [show, setShow] = createSignal4(false);
  const [expanded, setExpanded] = createSignal4(false);
  createEffect4(() => {
    if (value() && !value().includes("link-trigger-") && autoFocusMenu()) {
      batch3(() => {
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
  const { present: viewportPresent } = createPresence({
    show: () => local.forceMount || show() || expanded(),
    element: () => viewportRef() ?? null
  });
  createEffect4(() => {
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
  return <NavigationMenuContext.Provider value={context}><Popper
    anchorRef={rootRef}
    contentRef={viewportRef}
    placement={currentPlacement()}
    onCurrentPlacementChange={setCurrentPlacement}
    {...popperProps}
  ><nav><MenubarRoot
    as="ul"
    ref={mergeRefs3(context.setRootRef, local.ref)}
    value={value() ?? null}
    onValueChange={setValue}
    autoFocusMenu={autoFocusMenu()}
    onAutoFocusMenuChange={setAutoFocusMenu}
    {...others}
  /></nav></Popper></NavigationMenuContext.Provider>;
}

// src/navigation-menu/navigation-menu-trigger.tsx
import { callHandler as callHandler3 } from "@kobalte/utils";
import {
  splitProps as splitProps6
} from "solid-js";
function NavigationMenuTrigger(props) {
  const context = useNavigationMenuContext();
  const menuContext = useOptionalMenuContext();
  const [local, others] = splitProps6(props, [
    "onPointerEnter",
    "onPointerLeave",
    "onClick"
  ]);
  let timeoutId;
  const onClick = (e) => {
    callHandler3(e, local.onClick);
    if (timeoutId)
      clearTimeout(timeoutId);
  };
  const onPointerEnter = (e) => {
    callHandler3(e, local.onPointerEnter);
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
    callHandler3(e, local.onPointerLeave);
    if (e.pointerType === "touch")
      return;
    context.startLeaveTimer();
    if (timeoutId)
      clearTimeout(timeoutId);
  };
  return <li role="presentation"><MenubarTrigger
    onClick={onClick}
    onPointerEnter={onPointerEnter}
    onPointerLeave={onPointerLeave}
    {...others}
  /></li>;
}

// src/navigation-menu/navigation-menu-viewport.tsx
import {
  composeEventHandlers,
  mergeRefs as mergeRefs4
} from "@kobalte/utils";
import { combineStyle } from "@solid-primitives/props";
import {
  Show as Show2,
  createEffect as createEffect5,
  createMemo as createMemo2,
  createSignal as createSignal5,
  on as on4,
  splitProps as splitProps7
} from "solid-js";
function NavigationMenuViewport(props) {
  const context = useNavigationMenuContext();
  const menubarContext = useMenubarContext();
  const [ref, setRef] = createSignal5();
  const [local, others] = splitProps7(props, [
    "ref",
    "style",
    "onEscapeKeyDown"
  ]);
  const close = () => {
    menubarContext.setAutoFocusMenu(false);
    menubarContext.closeMenu();
  };
  const onEscapeKeyDown = (e) => {
    close();
  };
  const size = createSize(ref);
  createEffect5(
    on4(
      () => menubarContext.value() ? menubarContext.menuRefMap().get(menubarContext.value()) : void 0,
      (menu) => {
        if (menu === void 0 || menu[0] === void 0)
          return;
        setRef(menu[0]);
      }
    )
  );
  const height = createMemo2((prev) => {
    if (ref() === void 0 || !context.viewportPresent())
      return void 0;
    if (size.height() === 0)
      return prev;
    return size.height();
  });
  const width = createMemo2((prev) => {
    if (ref() === void 0 || !context.viewportPresent())
      return void 0;
    if (size.width() === 0)
      return prev;
    return size.width();
  });
  return <Show2 when={context.viewportPresent()}><Popper.Positioner role="presentation"><DismissableLayer
    as="li"
    ref={mergeRefs4(context.setViewportRef, local.ref)}
    excludedElements={[context.rootRef]}
    bypassTopMostLayerCheck
    style={combineStyle(
      {
        "--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
        "--kb-navigation-menu-viewport-height": height() ? `${height()}px` : void 0,
        "--kb-navigation-menu-viewport-width": width() ? `${width()}px` : void 0,
        position: "relative"
      },
      local.style
    )}
    onEscapeKeyDown={composeEventHandlers([
      local.onEscapeKeyDown,
      onEscapeKeyDown
    ])}
    onDismiss={close}
    data-orientation={menubarContext.orientation()}
    {...context.dataset()}
    {...others}
  /></Popper.Positioner></Show2>;
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
export {
  NavigationMenuArrow as Arrow,
  MenuCheckboxItem as CheckboxItem,
  NavigationMenuContent as Content,
  MenuGroup as Group,
  MenuGroupLabel as GroupLabel,
  MenuIcon as Icon,
  NavigationMenuItem as Item,
  MenuItemDescription as ItemDescription,
  MenuItemIndicator as ItemIndicator,
  MenuItemLabel as ItemLabel,
  NavigationMenuMenu as Menu,
  NavigationMenu,
  NavigationMenuPortal as Portal,
  MenuRadioGroup as RadioGroup,
  MenuRadioItem as RadioItem,
  NavigationMenuRoot as Root,
  SeparatorRoot as Separator,
  MenuSub as Sub,
  MenuSubContent as SubContent,
  MenuSubTrigger as SubTrigger,
  NavigationMenuTrigger as Trigger,
  NavigationMenuViewport as Viewport
};
