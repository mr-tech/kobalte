import {
  TabsKeyboardDelegate
} from "./XTJD7L6B.jsx";
import {
  createDomCollection,
  createDomCollectionItem
} from "./SOM3K36D.jsx";
import {
  createListState,
  createSelectableCollection,
  createSelectableItem
} from "./QZDH5R5B.jsx";
import {
  useLocale
} from "./LR7LBJN3.jsx";
import {
  createControllableSignal
} from "./FN6EICGO.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

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

// src/tabs/tabs-content.tsx
import {
  getFocusableTreeWalker,
  mergeRefs
} from "@kobalte/utils";
import {
  Show,
  createEffect,
  createSignal,
  on,
  onCleanup,
  splitProps
} from "solid-js";
import createPresence from "solid-presence";

// src/tabs/tabs-context.tsx
import {
  createContext,
  useContext
} from "solid-js";
var TabsContext = createContext();
function useTabsContext() {
  const context = useContext(TabsContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useTabsContext` must be used within a `Tabs` component"
    );
  }
  return context;
}

// src/tabs/tabs-content.tsx
function TabsContent(props) {
  const [ref, setRef] = createSignal();
  const context = useTabsContext();
  const [local, others] = splitProps(props, [
    "ref",
    "id",
    "value",
    "forceMount"
  ]);
  const [tabIndex, setTabIndex] = createSignal(0);
  const id = () => local.id ?? context.generateContentId(local.value);
  const isSelected = () => context.listState().selectedKey() === local.value;
  const { present } = createPresence({
    show: () => local.forceMount || isSelected(),
    element: () => ref() ?? null
  });
  createEffect(
    on([() => ref(), () => present()], ([ref2, isPresent]) => {
      if (ref2 == null || !isPresent) {
        return;
      }
      const updateTabIndex = () => {
        const walker = getFocusableTreeWalker(ref2, { tabbable: true });
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
    })
  );
  createEffect(
    on([() => local.value, id], ([value, id2]) => {
      context.contentIdsMap().set(value, id2);
    })
  );
  return <Show when={present()}><Polymorphic
    as="div"
    ref={mergeRefs(setRef, local.ref)}
    id={id()}
    role="tabpanel"
    tabIndex={tabIndex()}
    aria-labelledby={context.triggerIdsMap().get(local.value)}
    data-orientation={context.orientation()}
    data-selected={isSelected() ? "" : void 0}
    {...others}
  /></Show>;
}

// src/tabs/tabs-indicator.tsx
import {
  createEffect as createEffect2,
  createSignal as createSignal2,
  on as on2,
  onMount,
  splitProps as splitProps2
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";
import { createResizeObserver } from "@solid-primitives/resize-observer";
function TabsIndicator(props) {
  const context = useTabsContext();
  const [local, others] = splitProps2(props, ["style"]);
  const [style, setStyle] = createSignal2({
    width: void 0,
    height: void 0
  });
  const { direction } = useLocale();
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
  createEffect2(
    on2(
      [context.selectedTab, context.orientation, direction],
      () => {
        computeStyle();
      },
      { defer: true }
    )
  );
  const [resizing, setResizing] = createSignal2(false);
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
  return <Polymorphic
    as="div"
    role="presentation"
    style={combineStyle(style(), local.style)}
    data-orientation={context.orientation()}
    data-resizing={resizing()}
    {...others}
  />;
}

// src/tabs/tabs-list.tsx
import {
  composeEventHandlers,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  createEffect as createEffect3,
  splitProps as splitProps3
} from "solid-js";
function TabsList(props) {
  let ref;
  const context = useTabsContext();
  const [local, others] = splitProps3(props, [
    "ref",
    "onKeyDown",
    "onMouseDown",
    "onFocusIn",
    "onFocusOut"
  ]);
  const { direction } = useLocale();
  const delegate = new TabsKeyboardDelegate(
    () => context.listState().collection(),
    direction,
    context.orientation
  );
  const selectableCollection = createSelectableCollection(
    {
      selectionManager: () => context.listState().selectionManager(),
      keyboardDelegate: () => delegate,
      selectOnFocus: () => context.activationMode() === "automatic",
      shouldFocusWrap: false,
      // handled by the keyboard delegate
      disallowEmptySelection: true
    },
    () => ref
  );
  createEffect3(() => {
    if (ref == null) {
      return;
    }
    const selectedTab = ref.querySelector(
      `[data-key="${context.listState().selectedKey()}"]`
    );
    if (selectedTab != null) {
      context.setSelectedTab(selectedTab);
    }
  });
  return <Polymorphic
    as="div"
    ref={mergeRefs2((el) => ref = el, local.ref)}
    role="tablist"
    aria-orientation={context.orientation()}
    data-orientation={context.orientation()}
    onKeyDown={composeEventHandlers([
      local.onKeyDown,
      selectableCollection.onKeyDown
    ])}
    onMouseDown={composeEventHandlers([
      local.onMouseDown,
      selectableCollection.onMouseDown
    ])}
    onFocusIn={composeEventHandlers([
      local.onFocusIn,
      selectableCollection.onFocusIn
    ])}
    onFocusOut={composeEventHandlers([
      local.onFocusOut,
      selectableCollection.onFocusOut
    ])}
    {...others}
  />;
}

// src/tabs/tabs-root.tsx
import { mergeDefaultProps } from "@kobalte/utils";
import {
  createEffect as createEffect4,
  createSignal as createSignal3,
  createUniqueId,
  on as on3,
  splitProps as splitProps5
} from "solid-js";

// src/list/create-single-select-list-state.ts
import { access } from "@kobalte/utils";
import { createMemo, mergeProps, splitProps as splitProps4 } from "solid-js";
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
  const [, defaultCreateListStateProps] = splitProps4(props, [
    "onSelectionChange"
  ]);
  const createListStateProps = mergeProps(defaultCreateListStateProps, {
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
  const mergedProps = mergeDefaultProps(
    {
      id: defaultId,
      orientation: "horizontal",
      activationMode: "automatic"
    },
    props
  );
  const [local, others] = splitProps5(mergedProps, [
    "value",
    "defaultValue",
    "onChange",
    "orientation",
    "activationMode",
    "disabled"
  ]);
  const [items, setItems] = createSignal3([]);
  const [selectedTab, setSelectedTab] = createSignal3();
  const { DomCollectionProvider } = createDomCollection({
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
  createEffect4(
    on3(
      [
        () => listState.selectionManager(),
        () => listState.collection(),
        () => listState.selectedKey()
      ],
      ([selectionManager, collection, currentSelectedKey]) => {
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
      }
    )
  );
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
  return <DomCollectionProvider><TabsContext.Provider value={context}><Polymorphic
    as="div"
    data-orientation={context.orientation()}
    {...others}
  /></TabsContext.Provider></DomCollectionProvider>;
}

// src/tabs/tabs-trigger.tsx
import {
  composeEventHandlers as composeEventHandlers2,
  focusWithoutScrolling,
  isWebKit,
  mergeDefaultProps as mergeDefaultProps2,
  mergeRefs as mergeRefs3
} from "@kobalte/utils";
import {
  createEffect as createEffect5,
  on as on4,
  splitProps as splitProps6
} from "solid-js";
function TabsTrigger(props) {
  let ref;
  const context = useTabsContext();
  const mergedProps = mergeDefaultProps2(
    {
      type: "button"
    },
    props
  );
  const [local, others] = splitProps6(mergedProps, [
    "ref",
    "id",
    "value",
    "disabled",
    "onPointerDown",
    "onPointerUp",
    "onClick",
    "onKeyDown",
    "onMouseDown",
    "onFocus"
  ]);
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
  const selectableItem = createSelectableItem(
    {
      key: () => local.value,
      selectionManager: () => context.listState().selectionManager(),
      disabled: isDisabled
    },
    () => ref
  );
  const onClick = (e) => {
    if (isWebKit()) {
      focusWithoutScrolling(e.currentTarget);
    }
  };
  createEffect5(
    on4([() => local.value, id], ([value, id2]) => {
      context.triggerIdsMap().set(value, id2);
    })
  );
  return <Polymorphic
    as="button"
    ref={mergeRefs3((el) => ref = el, local.ref)}
    id={id()}
    role="tab"
    tabIndex={!isDisabled() ? selectableItem.tabIndex() : void 0}
    disabled={isDisabled()}
    aria-selected={selectableItem.isSelected()}
    aria-disabled={isDisabled() || void 0}
    aria-controls={selectableItem.isSelected() ? contentId() : void 0}
    data-key={selectableItem.dataKey()}
    data-orientation={context.orientation()}
    data-selected={selectableItem.isSelected() ? "" : void 0}
    data-highlighted={isHighlighted() ? "" : void 0}
    data-disabled={isDisabled() ? "" : void 0}
    onPointerDown={composeEventHandlers2([
      local.onPointerDown,
      selectableItem.onPointerDown
    ])}
    onPointerUp={composeEventHandlers2([
      local.onPointerUp,
      selectableItem.onPointerUp
    ])}
    onClick={composeEventHandlers2([
      local.onClick,
      selectableItem.onClick,
      onClick
    ])}
    onKeyDown={composeEventHandlers2([
      local.onKeyDown,
      selectableItem.onKeyDown
    ])}
    onMouseDown={composeEventHandlers2([
      local.onMouseDown,
      selectableItem.onMouseDown
    ])}
    onFocus={composeEventHandlers2([local.onFocus, selectableItem.onFocus])}
    {...others}
  />;
}

// src/tabs/index.tsx
var Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  Indicator: TabsIndicator,
  List: TabsList,
  Trigger: TabsTrigger
});

export {
  createSingleSelectListState,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Tabs,
  tabs_exports
};
