import {
  TabsKeyboardDelegate
} from "./XTJD7L6B.jsx";
import {
  ToggleButtonRoot
} from "./BMUFHY3D.jsx";
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
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

// src/toggle-group/index.tsx
var toggle_group_exports = {};
__export(toggle_group_exports, {
  Item: () => ToggleGroupItem,
  Root: () => ToggleGroup,
  ToggleGroup: () => ToggleGroup2
});

// src/toggle-group/toggle-group-item.tsx
import {
  callHandler,
  composeEventHandlers,
  mergeDefaultProps,
  mergeRefs
} from "@kobalte/utils";
import {
  createUniqueId,
  splitProps
} from "solid-js";

// src/toggle-group/toggle-group-context.tsx
import { createContext, useContext } from "solid-js";
var ToggleGroupContext = createContext();
function useToggleGroupContext() {
  const context = useContext(ToggleGroupContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useToggleGroupContext` must be used within a `ToggleGroup` component"
    );
  }
  return context;
}

// src/toggle-group/toggle-group-item.tsx
function ToggleGroupItem(props) {
  let ref;
  const rootContext = useToggleGroupContext();
  const defaultID = rootContext.generateId(`item-${createUniqueId()}`);
  const mergedProps = mergeDefaultProps(
    {
      id: defaultID
    },
    props
  );
  const [local, others] = splitProps(mergedProps, [
    "ref",
    "value",
    "disabled",
    "onPointerDown",
    "onPointerUp",
    "onClick",
    "onKeyDown",
    "onMouseDown",
    "onFocus"
  ]);
  const selectionManager = () => rootContext.listState().selectionManager();
  const isDisabled = () => rootContext.isDisabled() || local.disabled;
  createDomCollectionItem({
    getItem: () => ({
      ref: () => ref,
      type: "item",
      key: local.value,
      textValue: "",
      disabled: local.disabled || rootContext.isDisabled()
    })
  });
  const selectableItem = createSelectableItem(
    {
      key: () => local.value,
      selectionManager,
      disabled: local.disabled || rootContext.isDisabled()
    },
    () => ref
  );
  const onKeyDown = (e) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
    }
    callHandler(e, local.onKeyDown);
    callHandler(e, selectableItem.onKeyDown);
  };
  return <ToggleButtonRoot
    ref={mergeRefs((el) => ref = el, local.ref)}
    pressed={selectionManager().isSelected(local.value)}
    tabIndex={selectableItem.tabIndex()}
    data-orientation={rootContext.orientation()}
    disabled={isDisabled()}
    onPointerDown={composeEventHandlers([
      local.onPointerDown,
      selectableItem.onPointerDown
    ])}
    onPointerUp={composeEventHandlers([
      local.onPointerUp,
      selectableItem.onPointerUp
    ])}
    onClick={composeEventHandlers([local.onClick, selectableItem.onClick])}
    onKeyDown={onKeyDown}
    onMouseDown={composeEventHandlers([
      local.onMouseDown,
      selectableItem.onMouseDown
    ])}
    onFocus={composeEventHandlers([local.onFocus, selectableItem.onFocus])}
    {...others}
  />;
}

// src/toggle-group/toggle-group-root.tsx
import {
  createMemo,
  splitProps as splitProps3
} from "solid-js";

// src/toggle-group/toggle-group-base.tsx
import {
  composeEventHandlers as composeEventHandlers2,
  createGenerateId,
  mergeDefaultProps as mergeDefaultProps2,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  createSignal,
  createUniqueId as createUniqueId2,
  splitProps as splitProps2
} from "solid-js";
function ToggleGroupBase(props) {
  let ref;
  const defaultId = `group-${createUniqueId2()}`;
  const mergedProps = mergeDefaultProps2(
    {
      id: defaultId,
      selectionMode: "single",
      orientation: "horizontal"
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, [
    "ref",
    "value",
    "defaultValue",
    "disabled",
    "orientation",
    "selectionMode",
    "onChange",
    "onKeyDown",
    "onMouseDown",
    "onFocusIn",
    "onFocusOut"
  ]);
  const [items, setItems] = createSignal([]);
  const { DomCollectionProvider } = createDomCollection({
    items,
    onItemsChange: setItems
  });
  const listState = createListState({
    selectedKeys: () => local.value,
    defaultSelectedKeys: () => local.defaultValue,
    onSelectionChange: (key) => local.onChange?.(Array.from(key)),
    disallowEmptySelection: false,
    selectionMode: () => local.selectionMode,
    dataSource: items
  });
  const { direction } = useLocale();
  const delegate = new TabsKeyboardDelegate(
    () => context.listState().collection(),
    direction,
    () => local.orientation
  );
  const selectableList = createSelectableCollection(
    {
      selectionManager: () => listState.selectionManager(),
      keyboardDelegate: () => delegate,
      disallowEmptySelection: () => listState.selectionManager().disallowEmptySelection(),
      disallowTypeAhead: true
    },
    () => ref
  );
  const context = {
    listState: () => listState,
    isDisabled: () => local.disabled ?? false,
    isMultiple: () => local.selectionMode === "multiple",
    generateId: createGenerateId(() => others.id),
    orientation: () => local.orientation
  };
  return <DomCollectionProvider><ToggleGroupContext.Provider value={context}><Polymorphic
    as="div"
    role="group"
    ref={mergeRefs2((el) => ref = el, local.ref)}
    tabIndex={!local.disabled ? selectableList.tabIndex() : void 0}
    data-orientation={local.orientation}
    onKeyDown={composeEventHandlers2([
      local.onKeyDown,
      selectableList.onKeyDown
    ])}
    onMouseDown={composeEventHandlers2([
      local.onMouseDown,
      selectableList.onMouseDown
    ])}
    onFocusIn={composeEventHandlers2([
      local.onFocusIn,
      selectableList.onFocusIn
    ])}
    onFocusOut={composeEventHandlers2([
      local.onFocusOut,
      selectableList.onFocusOut
    ])}
    {...others}
  /></ToggleGroupContext.Provider></DomCollectionProvider>;
}

// src/toggle-group/toggle-group-root.tsx
function ToggleGroup(props) {
  const [local, others] = splitProps3(props, [
    "value",
    "defaultValue",
    "onChange",
    "multiple"
  ]);
  const value = createMemo(() => {
    if (local.value != null) {
      return local.multiple ? local.value : [local.value];
    }
    return local.value;
  });
  const defaultValue = createMemo(() => {
    if (local.defaultValue != null) {
      return local.multiple ? local.defaultValue : [local.defaultValue];
    }
    return local.defaultValue;
  });
  const onChange = (value2) => {
    if (local.multiple) {
      local.onChange?.(value2);
    } else {
      local.onChange?.(value2[0] ?? null);
    }
  };
  return <ToggleGroupBase
    value={value()}
    defaultValue={defaultValue()}
    onChange={onChange}
    selectionMode={local.multiple ? "multiple" : "single"}
    {...others}
  />;
}

// src/toggle-group/index.tsx
var ToggleGroup2 = Object.assign(ToggleGroup, {
  Item: ToggleGroupItem
});

export {
  ToggleGroupItem,
  ToggleGroup,
  ToggleGroup2,
  toggle_group_exports
};
