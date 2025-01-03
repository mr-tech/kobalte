import { useMenubarContext, MenuRoot, MenubarContext, useOptionalMenuContext, MenuTrigger } from './CHVSKBAO.js';
import { createInteractOutside } from './QGCMYLTA.js';
import { createControllableSignal } from './BLN63FDC.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { createComponent, mergeProps, isServer } from 'solid-js/web';
import { mergeDefaultProps, createGenerateId, contains, mergeRefs } from '@kobalte/utils';
import { splitProps, createUniqueId, createSignal, createMemo, createEffect, onCleanup } from 'solid-js';

function MenubarMenu(props) {
  const menubarContext = useMenubarContext();
  const mergedProps = mergeDefaultProps({
    modal: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["value"]);
  const uniqueid = createUniqueId();
  const defaultId = menubarContext.generateId(`menubar-menu-${uniqueid}`);
  const mergedPropsWithId = mergeDefaultProps({
    id: defaultId
  }, others);
  return createComponent(MenuRoot, mergeProps({
    get value() {
      return local.value ?? uniqueid;
    }
  }, mergedPropsWithId));
}
function MenubarRoot(props) {
  let ref;
  const defaultId = `menubar-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    loop: true,
    orientation: "horizontal"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onValueChange", "loop", "focusOnAlt", "autoFocusMenu", "onAutoFocusMenuChange", "orientation"]);
  const [value, setValue] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value2) => local.onValueChange?.(value2)
  });
  const [lastValue, setLastValue] = createSignal();
  const [menuRefs, setMenuRefs] = createSignal(/* @__PURE__ */ new Map());
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
  createInteractOutside({
    onInteractOutside: () => {
      context.closeMenu();
      setTimeout(() => context.closeMenu());
    },
    shouldExcludeElement: (element) => {
      return [ref, ...menuRefs().values()].flat().some((ref2) => contains(ref2, element));
    }
  }, () => ref);
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
  return createComponent(MenubarContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        },
        role: "menubar",
        get ["data-orientation"]() {
          return local.orientation;
        },
        get ["aria-orientation"]() {
          return local.orientation;
        }
      }, others));
    }
  });
}
function MenubarTrigger(props) {
  const menubarContext = useMenubarContext();
  const menuContext = useOptionalMenuContext();
  if (menuContext === void 0 && Object.hasOwn(props, "href")) {
    const id = menubarContext.generateId("link-trigger-") + createUniqueId();
    return createComponent(MenubarMenu, {
      value: id,
      get children() {
        return createComponent(MenuTrigger, props);
      }
    });
  }
  return MenuTrigger(props);
}

export { MenubarMenu, MenubarRoot, MenubarTrigger };
