import { TabsKeyboardDelegate } from './43XIKO67.js';
import { ToggleButtonRoot } from './WCX7EZ72.js';
import { createDomCollectionItem, createDomCollection } from './7CVNMTYF.js';
import { createSelectableItem, createListState, createSelectableCollection } from './H6DSIDEC.js';
import { useLocale } from './XHJPQEZP.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo } from 'solid-js/web';
import { mergeDefaultProps, mergeRefs, composeEventHandlers, callHandler, createGenerateId } from '@kobalte/utils';
import { createContext, createUniqueId, splitProps, createMemo, useContext, createSignal } from 'solid-js';

// src/toggle-group/index.tsx
var toggle_group_exports = {};
__export(toggle_group_exports, {
  Item: () => ToggleGroupItem,
  Root: () => ToggleGroup,
  ToggleGroup: () => ToggleGroup2
});
var ToggleGroupContext = createContext();
function useToggleGroupContext() {
  const context = useContext(ToggleGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useToggleGroupContext` must be used within a `ToggleGroup` component");
  }
  return context;
}

// src/toggle-group/toggle-group-item.tsx
function ToggleGroupItem(props) {
  let ref;
  const rootContext = useToggleGroupContext();
  const defaultID = rootContext.generateId(`item-${createUniqueId()}`);
  const mergedProps = mergeDefaultProps({
    id: defaultID
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "value", "disabled", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
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
  const selectableItem = createSelectableItem({
    key: () => local.value,
    selectionManager,
    disabled: local.disabled || rootContext.isDisabled()
  }, () => ref);
  const onKeyDown = (e) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
    }
    callHandler(e, local.onKeyDown);
    callHandler(e, selectableItem.onKeyDown);
  };
  return createComponent(ToggleButtonRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get pressed() {
      return selectionManager().isSelected(local.value);
    },
    get tabIndex() {
      return selectableItem.tabIndex();
    },
    get ["data-orientation"]() {
      return rootContext.orientation();
    },
    get disabled() {
      return isDisabled();
    },
    get onPointerDown() {
      return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
    },
    get onPointerUp() {
      return composeEventHandlers([local.onPointerUp, selectableItem.onPointerUp]);
    },
    get onClick() {
      return composeEventHandlers([local.onClick, selectableItem.onClick]);
    },
    onKeyDown,
    get onMouseDown() {
      return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
    },
    get onFocus() {
      return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
    }
  }, others));
}
function ToggleGroupBase(props) {
  let ref;
  const defaultId = `group-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    selectionMode: "single",
    orientation: "horizontal"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "disabled", "orientation", "selectionMode", "onChange", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut"]);
  const [items, setItems] = createSignal([]);
  const {
    DomCollectionProvider
  } = createDomCollection({
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
  const {
    direction
  } = useLocale();
  const delegate = new TabsKeyboardDelegate(() => context.listState().collection(), direction, () => local.orientation);
  const selectableList = createSelectableCollection({
    selectionManager: () => listState.selectionManager(),
    keyboardDelegate: () => delegate,
    disallowEmptySelection: () => listState.selectionManager().disallowEmptySelection(),
    disallowTypeAhead: true
  }, () => ref);
  const context = {
    listState: () => listState,
    isDisabled: () => local.disabled ?? false,
    isMultiple: () => local.selectionMode === "multiple",
    generateId: createGenerateId(() => others.id),
    orientation: () => local.orientation
  };
  return createComponent(DomCollectionProvider, {
    get children() {
      return createComponent(ToggleGroupContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            role: "group",
            ref(r$) {
              const _ref$ = mergeRefs((el) => ref = el, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            get tabIndex() {
              return memo(() => !!!local.disabled)() ? selectableList.tabIndex() : void 0;
            },
            get ["data-orientation"]() {
              return local.orientation;
            },
            get onKeyDown() {
              return composeEventHandlers([local.onKeyDown, selectableList.onKeyDown]);
            },
            get onMouseDown() {
              return composeEventHandlers([local.onMouseDown, selectableList.onMouseDown]);
            },
            get onFocusIn() {
              return composeEventHandlers([local.onFocusIn, selectableList.onFocusIn]);
            },
            get onFocusOut() {
              return composeEventHandlers([local.onFocusOut, selectableList.onFocusOut]);
            }
          }, others));
        }
      });
    }
  });
}

// src/toggle-group/toggle-group-root.tsx
function ToggleGroup(props) {
  const [local, others] = splitProps(props, ["value", "defaultValue", "onChange", "multiple"]);
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
  return createComponent(ToggleGroupBase, mergeProps({
    get value() {
      return value();
    },
    get defaultValue() {
      return defaultValue();
    },
    onChange,
    get selectionMode() {
      return local.multiple ? "multiple" : "single";
    }
  }, others));
}

// src/toggle-group/index.tsx
var ToggleGroup2 = Object.assign(ToggleGroup, {
  Item: ToggleGroupItem
});

export { ToggleGroup, ToggleGroup2, ToggleGroupItem, toggle_group_exports };
