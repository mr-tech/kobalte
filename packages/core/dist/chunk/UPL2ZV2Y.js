import { TabsKeyboardDelegate } from './43XIKO67.js';
import { createDomCollection, createDomCollectionItem } from './7CVNMTYF.js';
import { createSelectableCollection, createSelectableItem, createListState } from './H6DSIDEC.js';
import { useLocale } from './XHJPQEZP.js';
import { createControllableSignal } from './BLN63FDC.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo } from 'solid-js/web';
import { mergeRefs, composeEventHandlers, mergeDefaultProps, getFocusableTreeWalker, access, isWebKit, focusWithoutScrolling } from '@kobalte/utils';
import { createContext, createSignal, splitProps, createEffect, on, onCleanup, Show, onMount, createUniqueId, useContext, createMemo, mergeProps as mergeProps$1 } from 'solid-js';
import createPresence from 'solid-presence';
import { combineStyle } from '@solid-primitives/props';
import { createResizeObserver } from '@solid-primitives/resize-observer';

// src/tabs/index.tsx
var tabs_exports = {};
__export(tabs_exports, {
  Content: () => TabsContent,
  Indicator: () => TabsIndicator,
  List: () => TabsList,
  Root: () => TabsRoot,
  Tabs: () => Tabs,
  Trigger: () => TabsTrigger
});
var TabsContext = createContext();
function useTabsContext() {
  const context = useContext(TabsContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useTabsContext` must be used within a `Tabs` component");
  }
  return context;
}

// src/tabs/tabs-content.tsx
function TabsContent(props) {
  const [ref, setRef] = createSignal();
  const context = useTabsContext();
  const [local, others] = splitProps(props, ["ref", "id", "value", "forceMount"]);
  const [tabIndex, setTabIndex] = createSignal(0);
  const id = () => local.id ?? context.generateContentId(local.value);
  const isSelected = () => context.listState().selectedKey() === local.value;
  const {
    present
  } = createPresence({
    show: () => local.forceMount || isSelected(),
    element: () => ref() ?? null
  });
  createEffect(on([() => ref(), () => present()], ([ref2, isPresent]) => {
    if (ref2 == null || !isPresent) {
      return;
    }
    const updateTabIndex = () => {
      const walker = getFocusableTreeWalker(ref2, {
        tabbable: true
      });
      setTabIndex(walker.nextNode() ? void 0 : 0);
    };
    updateTabIndex();
    const observer = new MutationObserver(updateTabIndex);
    observer.observe(ref2, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["tabindex", "disabled"]
    });
    onCleanup(() => {
      observer.disconnect();
    });
  }));
  createEffect(on([() => local.value, id], ([value, id2]) => {
    context.contentIdsMap().set(value, id2);
  }));
  return createComponent(Show, {
    get when() {
      return present();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs(setRef, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        },
        get id() {
          return id();
        },
        role: "tabpanel",
        get tabIndex() {
          return tabIndex();
        },
        get ["aria-labelledby"]() {
          return context.triggerIdsMap().get(local.value);
        },
        get ["data-orientation"]() {
          return context.orientation();
        },
        get ["data-selected"]() {
          return isSelected() ? "" : void 0;
        }
      }, others));
    }
  });
}
function TabsIndicator(props) {
  const context = useTabsContext();
  const [local, others] = splitProps(props, ["style"]);
  const [style, setStyle] = createSignal({
    width: void 0,
    height: void 0
  });
  const {
    direction
  } = useLocale();
  const computeStyle = () => {
    const selectedTab = context.selectedTab();
    if (selectedTab == null) {
      return;
    }
    const styleObj = {
      transform: void 0,
      width: void 0,
      height: void 0
    };
    const offset = direction() === "rtl" ? -1 * (selectedTab.offsetParent?.offsetWidth - selectedTab.offsetWidth - selectedTab.offsetLeft) : selectedTab.offsetLeft;
    styleObj.transform = context.orientation() === "vertical" ? `translateY(${selectedTab.offsetTop}px)` : `translateX(${offset}px)`;
    if (context.orientation() === "horizontal") {
      styleObj.width = `${selectedTab.offsetWidth}px`;
    } else {
      styleObj.height = `${selectedTab.offsetHeight}px`;
    }
    setStyle(styleObj);
  };
  onMount(() => {
    queueMicrotask(() => {
      computeStyle();
    });
  });
  createEffect(on([context.selectedTab, context.orientation, direction], () => {
    computeStyle();
  }, {
    defer: true
  }));
  const [resizing, setResizing] = createSignal(false);
  let timeout = null;
  let prevTarget = null;
  createResizeObserver(context.selectedTab, (_, t) => {
    if (prevTarget !== t) {
      prevTarget = t;
      return;
    }
    setResizing(true);
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      setResizing(false);
    }, 1);
    computeStyle();
  });
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    role: "presentation",
    get style() {
      return combineStyle(style(), local.style);
    },
    get ["data-orientation"]() {
      return context.orientation();
    },
    get ["data-resizing"]() {
      return resizing();
    }
  }, others));
}
function TabsList(props) {
  let ref;
  const context = useTabsContext();
  const [local, others] = splitProps(props, ["ref", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut"]);
  const {
    direction
  } = useLocale();
  const delegate = new TabsKeyboardDelegate(() => context.listState().collection(), direction, context.orientation);
  const selectableCollection = createSelectableCollection({
    selectionManager: () => context.listState().selectionManager(),
    keyboardDelegate: () => delegate,
    selectOnFocus: () => context.activationMode() === "automatic",
    shouldFocusWrap: false,
    // handled by the keyboard delegate
    disallowEmptySelection: true
  }, () => ref);
  createEffect(() => {
    if (ref == null) {
      return;
    }
    const selectedTab = ref.querySelector(`[data-key="${context.listState().selectedKey()}"]`);
    if (selectedTab != null) {
      context.setSelectedTab(selectedTab);
    }
  });
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    role: "tablist",
    get ["aria-orientation"]() {
      return context.orientation();
    },
    get ["data-orientation"]() {
      return context.orientation();
    },
    get onKeyDown() {
      return composeEventHandlers([local.onKeyDown, selectableCollection.onKeyDown]);
    },
    get onMouseDown() {
      return composeEventHandlers([local.onMouseDown, selectableCollection.onMouseDown]);
    },
    get onFocusIn() {
      return composeEventHandlers([local.onFocusIn, selectableCollection.onFocusIn]);
    },
    get onFocusOut() {
      return composeEventHandlers([local.onFocusOut, selectableCollection.onFocusOut]);
    }
  }, others));
}
function createSingleSelectListState(props) {
  const [selectedKey, setSelectedKey] = createControllableSignal({
    value: () => access(props.selectedKey),
    defaultValue: () => access(props.defaultSelectedKey),
    onChange: (value) => props.onSelectionChange?.(value)
  });
  const selectedKeys = createMemo(() => {
    const selection = selectedKey();
    return selection != null ? [selection] : [];
  });
  const [, defaultCreateListStateProps] = splitProps(props, [
    "onSelectionChange"
  ]);
  const createListStateProps = mergeProps$1(defaultCreateListStateProps, {
    selectionMode: "single",
    disallowEmptySelection: true,
    allowDuplicateSelectionEvents: true,
    selectedKeys,
    onSelectionChange: (keys) => {
      const key = keys.values().next().value;
      if (key === selectedKey()) {
        props.onSelectionChange?.(key);
      }
      setSelectedKey(key);
    }
  });
  const { collection, selectionManager } = createListState(createListStateProps);
  const selectedItem = createMemo(() => {
    const selection = selectedKey();
    return selection != null ? collection().getItem(selection) : void 0;
  });
  return {
    collection,
    selectionManager,
    selectedKey,
    setSelectedKey,
    selectedItem
  };
}

// src/tabs/tabs-root.tsx
function TabsRoot(props) {
  const defaultId = `tabs-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    orientation: "horizontal",
    activationMode: "automatic"
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "defaultValue", "onChange", "orientation", "activationMode", "disabled"]);
  const [items, setItems] = createSignal([]);
  const [selectedTab, setSelectedTab] = createSignal();
  const {
    DomCollectionProvider
  } = createDomCollection({
    items,
    onItemsChange: setItems
  });
  const listState = createSingleSelectListState({
    selectedKey: () => local.value,
    defaultSelectedKey: () => local.defaultValue,
    onSelectionChange: (key) => local.onChange?.(String(key)),
    dataSource: items
  });
  let lastSelectedKey = listState.selectedKey();
  createEffect(on([() => listState.selectionManager(), () => listState.collection(), () => listState.selectedKey()], ([selectionManager, collection, currentSelectedKey]) => {
    let selectedKey = currentSelectedKey;
    if (selectionManager.isEmpty() || selectedKey == null || !collection.getItem(selectedKey)) {
      selectedKey = collection.getFirstKey();
      let selectedItem = selectedKey != null ? collection.getItem(selectedKey) : void 0;
      while (selectedItem?.disabled && selectedItem.key !== collection.getLastKey()) {
        selectedKey = collection.getKeyAfter(selectedItem.key);
        selectedItem = selectedKey != null ? collection.getItem(selectedKey) : void 0;
      }
      if (selectedItem?.disabled && selectedKey === collection.getLastKey()) {
        selectedKey = collection.getFirstKey();
      }
      if (selectedKey != null) {
        selectionManager.setSelectedKeys([selectedKey]);
      }
    }
    if (selectionManager.focusedKey() == null || !selectionManager.isFocused() && selectedKey !== lastSelectedKey) {
      selectionManager.setFocusedKey(selectedKey);
    }
    lastSelectedKey = selectedKey;
  }));
  const triggerIdsMap = /* @__PURE__ */ new Map();
  const contentIdsMap = /* @__PURE__ */ new Map();
  const context = {
    isDisabled: () => local.disabled ?? false,
    orientation: () => local.orientation,
    activationMode: () => local.activationMode,
    triggerIdsMap: () => triggerIdsMap,
    contentIdsMap: () => contentIdsMap,
    listState: () => listState,
    selectedTab,
    setSelectedTab,
    generateTriggerId: (value) => `${others.id}-trigger-${value}`,
    generateContentId: (value) => `${others.id}-content-${value}`
  };
  return createComponent(DomCollectionProvider, {
    get children() {
      return createComponent(TabsContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            get ["data-orientation"]() {
              return context.orientation();
            }
          }, others));
        }
      });
    }
  });
}
function TabsTrigger(props) {
  let ref;
  const context = useTabsContext();
  const mergedProps = mergeDefaultProps({
    type: "button"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "value", "disabled", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  const id = () => local.id ?? context.generateTriggerId(local.value);
  const isHighlighted = () => context.listState().selectionManager().focusedKey() === local.value;
  const isDisabled = () => local.disabled || context.isDisabled();
  const contentId = () => context.contentIdsMap().get(local.value);
  createDomCollectionItem({
    getItem: () => ({
      ref: () => ref,
      type: "item",
      key: local.value,
      textValue: "",
      // not applicable here
      disabled: isDisabled()
    })
  });
  const selectableItem = createSelectableItem({
    key: () => local.value,
    selectionManager: () => context.listState().selectionManager(),
    disabled: isDisabled
  }, () => ref);
  const onClick = (e) => {
    if (isWebKit()) {
      focusWithoutScrolling(e.currentTarget);
    }
  };
  createEffect(on([() => local.value, id], ([value, id2]) => {
    context.triggerIdsMap().set(value, id2);
  }));
  return createComponent(Polymorphic, mergeProps({
    as: "button",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return id();
    },
    role: "tab",
    get tabIndex() {
      return memo(() => !!!isDisabled())() ? selectableItem.tabIndex() : void 0;
    },
    get disabled() {
      return isDisabled();
    },
    get ["aria-selected"]() {
      return selectableItem.isSelected();
    },
    get ["aria-disabled"]() {
      return isDisabled() || void 0;
    },
    get ["aria-controls"]() {
      return memo(() => !!selectableItem.isSelected())() ? contentId() : void 0;
    },
    get ["data-key"]() {
      return selectableItem.dataKey();
    },
    get ["data-orientation"]() {
      return context.orientation();
    },
    get ["data-selected"]() {
      return selectableItem.isSelected() ? "" : void 0;
    },
    get ["data-highlighted"]() {
      return isHighlighted() ? "" : void 0;
    },
    get ["data-disabled"]() {
      return isDisabled() ? "" : void 0;
    },
    get onPointerDown() {
      return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
    },
    get onPointerUp() {
      return composeEventHandlers([local.onPointerUp, selectableItem.onPointerUp]);
    },
    get onClick() {
      return composeEventHandlers([local.onClick, selectableItem.onClick, onClick]);
    },
    get onKeyDown() {
      return composeEventHandlers([local.onKeyDown, selectableItem.onKeyDown]);
    },
    get onMouseDown() {
      return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
    },
    get onFocus() {
      return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
    }
  }, others));
}

// src/tabs/index.tsx
var Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  Indicator: TabsIndicator,
  List: TabsList,
  Trigger: TabsTrigger
});

export { Tabs, TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger, createSingleSelectListState, tabs_exports };
