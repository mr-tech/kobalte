import {
  MenuRoot,
  MenuTrigger,
  MenubarContext,
  useMenubarContext,
  useOptionalMenuContext
} from "./3DFIR3JI.jsx";
import {
  createInteractOutside
} from "./BMMCQ7YJ.jsx";
import {
  createControllableSignal
} from "./FN6EICGO.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";

// src/menubar/menubar-menu.tsx
import { mergeDefaultProps } from "@kobalte/utils";
import { createUniqueId, splitProps } from "solid-js";
function MenubarMenu(props) {
  const menubarContext = useMenubarContext();
  const mergedProps = mergeDefaultProps(
    {
      modal: false
    },
    props
  );
  const [local, others] = splitProps(mergedProps, ["value"]);
  const uniqueid = createUniqueId();
  const defaultId = menubarContext.generateId(`menubar-menu-${uniqueid}`);
  const mergedPropsWithId = mergeDefaultProps({ id: defaultId }, others);
  return <MenuRoot value={local.value ?? uniqueid} {...mergedPropsWithId} />;
}

// src/menubar/menubar-root.tsx
import {
  contains,
  createGenerateId,
  mergeDefaultProps as mergeDefaultProps2,
  mergeRefs
} from "@kobalte/utils";
import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId as createUniqueId2,
  onCleanup,
  splitProps as splitProps2
} from "solid-js";
import { isServer } from "solid-js/web";
function MenubarRoot(props) {
  let ref;
  const defaultId = `menubar-${createUniqueId2()}`;
  const mergedProps = mergeDefaultProps2(
    { id: defaultId, loop: true, orientation: "horizontal" },
    props
  );
  const [local, others] = splitProps2(
    mergedProps,
    [
      "ref",
      "value",
      "defaultValue",
      "onValueChange",
      "loop",
      "focusOnAlt",
      "autoFocusMenu",
      "onAutoFocusMenuChange",
      "orientation"
    ]
  );
  const [value, setValue] = createControllableSignal(
    {
      value: () => local.value,
      defaultValue: () => local.defaultValue,
      onChange: (value2) => local.onValueChange?.(value2)
    }
  );
  const [lastValue, setLastValue] = createSignal();
  const [menuRefs, setMenuRefs] = createSignal(
    /* @__PURE__ */ new Map()
  );
  const [autoFocusMenu, setAutoFocusMenu] = createControllableSignal({
    value: () => local.autoFocusMenu,
    defaultValue: () => false,
    onChange: local.onAutoFocusMenuChange
  });
  const expanded = () => {
    return value() && autoFocusMenu() && !value()?.includes("link-trigger-");
  };
  const dataset = createMemo(() => ({
    "data-expanded": expanded() ? "" : void 0,
    "data-closed": !expanded() ? "" : void 0
  }));
  const context = {
    dataset,
    value,
    setValue,
    lastValue,
    setLastValue,
    menus: () => /* @__PURE__ */ new Set([...menuRefs().keys()]),
    menuRefs: () => [...menuRefs().values()].flat(),
    menuRefMap: () => menuRefs(),
    registerMenu: (value2, refs) => {
      setMenuRefs((prev) => {
        const map = /* @__PURE__ */ new Map();
        prev.forEach((value3, key) => map.set(key, value3));
        map.set(value2, refs);
        return map;
      });
    },
    unregisterMenu: (value2) => {
      setMenuRefs((prev) => {
        prev.delete(value2);
        const map = /* @__PURE__ */ new Map();
        prev.forEach((value3, key) => map.set(key, value3));
        return map;
      });
    },
    nextMenu: () => {
      const menusArray = [...menuRefs().keys()];
      if (value() == null) {
        setValue(menusArray[0]);
        return;
      }
      const currentIndex = menusArray.indexOf(value());
      if (currentIndex === menusArray.length - 1) {
        if (local.loop)
          setValue(menusArray[0]);
        return;
      }
      setValue(menusArray[currentIndex + 1]);
    },
    previousMenu: () => {
      const menusArray = [...menuRefs().keys()];
      if (value() == null) {
        setValue(menusArray[0]);
        return;
      }
      const currentIndex = menusArray.indexOf(value());
      if (currentIndex === 0) {
        if (local.loop)
          setValue(menusArray[menusArray.length - 1]);
        return;
      }
      setValue(menusArray[currentIndex - 1]);
    },
    closeMenu: () => {
      setAutoFocusMenu(false);
      setValue(void 0);
    },
    autoFocusMenu: () => autoFocusMenu(),
    setAutoFocusMenu,
    generateId: createGenerateId(() => others.id),
    orientation: () => local.orientation
  };
  createEffect(() => {
    if (value() == null)
      setAutoFocusMenu(false);
  });
  createInteractOutside(
    {
      onInteractOutside: () => {
        context.closeMenu();
        setTimeout(() => context.closeMenu());
      },
      shouldExcludeElement: (element) => {
        return [ref, ...menuRefs().values()].flat().some((ref2) => contains(ref2, element));
      }
    },
    () => ref
  );
  const keydownHandler = (e) => {
    if (e.key === "Alt") {
      e.preventDefault();
      e.stopPropagation();
      if (context.value() === void 0)
        context.nextMenu();
      else
        context.closeMenu();
    }
  };
  createEffect(() => {
    if (isServer)
      return;
    if (local.focusOnAlt)
      window.addEventListener("keydown", keydownHandler);
    else
      window.removeEventListener("keydown", keydownHandler);
    onCleanup(() => {
      window.removeEventListener("keydown", keydownHandler);
    });
  });
  createEffect(() => {
    if (value() != null)
      setLastValue(value());
  });
  return <MenubarContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs((el) => ref = el, local.ref)}
    role="menubar"
    data-orientation={local.orientation}
    aria-orientation={local.orientation}
    {...others}
  /></MenubarContext.Provider>;
}

// src/menubar/menubar-trigger.tsx
import { createUniqueId as createUniqueId3 } from "solid-js";
function MenubarTrigger(props) {
  const menubarContext = useMenubarContext();
  const menuContext = useOptionalMenuContext();
  if (menuContext === void 0 && Object.hasOwn(props, "href")) {
    const id = menubarContext.generateId("link-trigger-") + createUniqueId3();
    return <MenubarMenu value={id}><MenuTrigger {...props} /></MenubarMenu>;
  }
  return MenuTrigger(props);
}

export {
  MenubarMenu,
  MenubarRoot,
  MenubarTrigger
};
