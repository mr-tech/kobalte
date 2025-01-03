import {
  HiddenSelectBase
} from "./SRFLFESK.jsx";
import {
  ListboxItem,
  ListboxItemDescription,
  ListboxItemIndicator,
  ListboxItemLabel,
  ListboxRoot,
  ListboxSection
} from "./4UJQK74D.jsx";
import {
  Popper,
  PopperArrow
} from "./KFH362HI.jsx";
import {
  ListKeyboardDelegate
} from "./N3GAC5SS.jsx";
import {
  Selection,
  createListState,
  createTypeSelect
} from "./QZDH5R5B.jsx";
import {
  createCollator
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
  FORM_CONTROL_FIELD_PROP_NAMES,
  createFormControlField
} from "./37WKIN7J.jsx";
import {
  FORM_CONTROL_PROP_NAMES,
  FormControlContext,
  FormControlDescription,
  FormControlErrorMessage,
  FormControlLabel,
  createFormControl,
  useFormControlContext
} from "./QICKIQIY.jsx";
import {
  createFormResetListener
} from "./QJIB6BDF.jsx";
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
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

// src/select/index.tsx
var select_exports = {};
__export(select_exports, {
  Arrow: () => PopperArrow,
  Content: () => SelectContent,
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  HiddenSelect: () => SelectHiddenSelect,
  Icon: () => SelectIcon,
  Item: () => ListboxItem,
  ItemDescription: () => ListboxItemDescription,
  ItemIndicator: () => ListboxItemIndicator,
  ItemLabel: () => ListboxItemLabel,
  Label: () => SelectLabel,
  Listbox: () => SelectListbox,
  Portal: () => SelectPortal,
  Root: () => SelectRoot,
  Section: () => ListboxSection,
  Select: () => Select,
  Trigger: () => SelectTrigger,
  Value: () => SelectValue
});

// src/select/select-content.tsx
import {
  focusWithoutScrolling,
  mergeRefs
} from "@kobalte/utils";
import {
  Show,
  splitProps
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";
import createPreventScroll from "solid-prevent-scroll";

// src/select/select-context.tsx
import {
  createContext,
  useContext
} from "solid-js";
var SelectContext = createContext();
function useSelectContext() {
  const context = useContext(SelectContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useSelectContext` must be used within a `Select` component"
    );
  }
  return context;
}

// src/select/select-content.tsx
function SelectContent(props) {
  let ref;
  const context = useSelectContext();
  const [local, others] = splitProps(props, [
    "ref",
    "style",
    "onCloseAutoFocus",
    "onFocusOutside"
  ]);
  const onEscapeKeyDown = (e) => {
    context.close();
  };
  const onFocusOutside = (e) => {
    local.onFocusOutside?.(e);
    if (context.isOpen() && context.isModal()) {
      e.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => !(context.isOpen() && context.isModal()),
    targets: () => ref ? [ref] : []
  });
  createPreventScroll({
    element: () => ref ?? null,
    enabled: () => context.contentPresent() && context.preventScroll()
  });
  createFocusScope(
    {
      trapFocus: () => context.isOpen() && context.isModal(),
      onMountAutoFocus: (e) => {
        e.preventDefault();
      },
      onUnmountAutoFocus: (e) => {
        local.onCloseAutoFocus?.(e);
        if (!e.defaultPrevented) {
          focusWithoutScrolling(context.triggerRef());
          e.preventDefault();
        }
      }
    },
    () => ref
  );
  return <Show when={context.contentPresent()}><Popper.Positioner><DismissableLayer
    ref={mergeRefs((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref)}
    disableOutsidePointerEvents={context.isModal() && context.isOpen()}
    excludedElements={[context.triggerRef]}
    style={combineStyle(
      {
        "--kb-select-content-transform-origin": "var(--kb-popper-content-transform-origin)",
        position: "relative"
      },
      local.style
    )}
    onEscapeKeyDown={onEscapeKeyDown}
    onFocusOutside={onFocusOutside}
    onDismiss={context.close}
    {...context.dataset()}
    {...others}
  /></Popper.Positioner></Show>;
}

// src/select/select-hidden-select.tsx
function SelectHiddenSelect(props) {
  const context = useSelectContext();
  return <HiddenSelectBase
    collection={context.listState().collection()}
    selectionManager={context.listState().selectionManager()}
    isOpen={context.isOpen()}
    isMultiple={context.isMultiple()}
    isVirtualized={context.isVirtualized()}
    focusTrigger={() => context.triggerRef()?.focus()}
    {...props}
  />;
}

// src/select/select-icon.tsx
import { mergeDefaultProps } from "@kobalte/utils";
function SelectIcon(props) {
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps(
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

// src/select/select-label.tsx
import { callHandler } from "@kobalte/utils";
import {
  splitProps as splitProps2
} from "solid-js";
function SelectLabel(props) {
  const context = useSelectContext();
  const [local, others] = splitProps2(props, ["onClick"]);
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (!context.isDisabled()) {
      context.triggerRef()?.focus();
    }
  };
  return <FormControlLabel
    as="span"
    onClick={onClick}
    {...others}
  />;
}

// src/select/select-listbox.tsx
import { callHandler as callHandler2, mergeDefaultProps as mergeDefaultProps2, mergeRefs as mergeRefs2 } from "@kobalte/utils";
import {
  createEffect,
  onCleanup,
  splitProps as splitProps3
} from "solid-js";
function SelectListbox(props) {
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps2(
    {
      id: context.generateId("listbox")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, ["ref", "id", "onKeyDown"]);
  createEffect(() => onCleanup(context.registerListboxId(local.id)));
  const onKeyDown = (e) => {
    callHandler2(e, local.onKeyDown);
    if (e.key === "Escape") {
      e.preventDefault();
    }
  };
  return <ListboxRoot
    ref={mergeRefs2(context.setListboxRef, local.ref)}
    id={local.id}
    state={context.listState()}
    virtualized={context.isVirtualized()}
    autoFocus={context.autoFocus()}
    shouldSelectOnPressUp
    shouldFocusOnHover
    shouldFocusWrap={context.shouldFocusWrap()}
    disallowTypeAhead={context.disallowTypeAhead()}
    aria-labelledby={context.listboxAriaLabelledBy()}
    renderItem={context.renderItem}
    renderSection={context.renderSection}
    onKeyDown={onKeyDown}
    {...others}
  />;
}

// src/select/select-portal.tsx
import { Show as Show2 } from "solid-js";
import { Portal } from "solid-js/web";
function SelectPortal(props) {
  const context = useSelectContext();
  return <Show2 when={context.contentPresent()}><Portal {...props} /></Show2>;
}

// src/select/select-root.tsx
import {
  createMemo as createMemo2,
  splitProps as splitProps5
} from "solid-js";

// src/select/select-base.tsx
import {
  access,
  createGenerateId,
  focusWithoutScrolling as focusWithoutScrolling2,
  isFunction,
  mergeDefaultProps as mergeDefaultProps3
} from "@kobalte/utils";
import {
  createEffect as createEffect2,
  createMemo,
  createSignal,
  createUniqueId,
  on,
  splitProps as splitProps4
} from "solid-js";
import createPresence from "solid-presence";
function SelectBase(props) {
  const defaultId = `select-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps3(
    {
      id: defaultId,
      selectionMode: "single",
      disallowEmptySelection: false,
      closeOnSelection: props.selectionMode === "single",
      allowDuplicateSelectionEvents: true,
      gutter: 8,
      sameWidth: true,
      modal: false
    },
    props
  );
  const [local, popperProps, formControlProps, others] = splitProps4(
    mergedProps,
    [
      "itemComponent",
      "sectionComponent",
      "open",
      "defaultOpen",
      "onOpenChange",
      "value",
      "defaultValue",
      "onChange",
      "placeholder",
      "options",
      "optionValue",
      "optionTextValue",
      "optionDisabled",
      "optionGroupChildren",
      "keyboardDelegate",
      "allowDuplicateSelectionEvents",
      "disallowEmptySelection",
      "closeOnSelection",
      "disallowTypeAhead",
      "shouldFocusWrap",
      "selectionBehavior",
      "selectionMode",
      "virtualized",
      "modal",
      "preventScroll",
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
    ],
    FORM_CONTROL_PROP_NAMES
  );
  const [triggerId, setTriggerId] = createSignal();
  const [valueId, setValueId] = createSignal();
  const [listboxId, setListboxId] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [listboxRef, setListboxRef] = createSignal();
  const [listboxAriaLabelledBy, setListboxAriaLabelledBy] = createSignal();
  const [focusStrategy, setFocusStrategy] = createSignal(true);
  const getOptionValue = (option) => {
    const optionValue = local.optionValue;
    if (optionValue == null) {
      return String(option);
    }
    return String(
      isFunction(optionValue) ? optionValue(option) : option[optionValue]
    );
  };
  const flattenOptions = createMemo(() => {
    const optionGroupChildren = local.optionGroupChildren;
    if (optionGroupChildren == null) {
      return local.options;
    }
    return local.options.flatMap(
      (item) => item[optionGroupChildren] ?? item
    );
  });
  const flattenOptionKeys = createMemo(() => {
    return flattenOptions().map((option) => getOptionValue(option));
  });
  const getOptionsFromValues = (values) => {
    return [...values].map(
      (value) => flattenOptions().find((option) => getOptionValue(option) === value)
    ).filter((option) => option != null);
  };
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const listState = createListState({
    selectedKeys: () => {
      if (local.value != null) {
        return local.value.map(getOptionValue);
      }
      return local.value;
    },
    defaultSelectedKeys: () => {
      if (local.defaultValue != null) {
        return local.defaultValue.map(getOptionValue);
      }
      return local.defaultValue;
    },
    onSelectionChange: (selectedKeys) => {
      local.onChange?.(getOptionsFromValues(selectedKeys));
      if (local.closeOnSelection) {
        close();
      }
    },
    allowDuplicateSelectionEvents: () => access(local.allowDuplicateSelectionEvents),
    disallowEmptySelection: () => access(local.disallowEmptySelection),
    selectionBehavior: () => access(local.selectionBehavior),
    selectionMode: () => local.selectionMode,
    dataSource: () => local.options ?? [],
    getKey: () => local.optionValue,
    getTextValue: () => local.optionTextValue,
    getDisabled: () => local.optionDisabled,
    getSectionChildren: () => local.optionGroupChildren
  });
  const selectedOptions = createMemo(() => {
    return getOptionsFromValues(listState.selectionManager().selectedKeys());
  });
  const removeOptionFromSelection = (option) => {
    listState.selectionManager().toggleSelection(getOptionValue(option));
  };
  const { present: contentPresent } = createPresence({
    show: () => local.forceMount || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const focusListbox = () => {
    const listboxEl = listboxRef();
    if (listboxEl) {
      focusWithoutScrolling2(listboxEl);
    }
  };
  const open = (focusStrategy2) => {
    if (local.options.length <= 0) {
      return;
    }
    setFocusStrategy(focusStrategy2);
    disclosureState.open();
    let focusedKey = listState.selectionManager().firstSelectedKey();
    if (focusedKey == null) {
      if (focusStrategy2 === "first") {
        focusedKey = listState.collection().getFirstKey();
      } else if (focusStrategy2 === "last") {
        focusedKey = listState.collection().getLastKey();
      }
    }
    focusListbox();
    listState.selectionManager().setFocused(true);
    listState.selectionManager().setFocusedKey(focusedKey);
  };
  const close = () => {
    disclosureState.close();
    listState.selectionManager().setFocused(false);
    listState.selectionManager().setFocusedKey(void 0);
  };
  const toggle = (focusStrategy2) => {
    if (disclosureState.isOpen()) {
      close();
    } else {
      open(focusStrategy2);
    }
  };
  const { formControlContext } = createFormControl(formControlProps);
  createFormResetListener(triggerRef, () => {
    const defaultSelectedKeys = local.defaultValue ? [...local.defaultValue].map(getOptionValue) : new Selection();
    listState.selectionManager().setSelectedKeys(defaultSelectedKeys);
  });
  const collator = createCollator({ usage: "search", sensitivity: "base" });
  const delegate = createMemo(() => {
    const keyboardDelegate = access(local.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(listState.collection, void 0, collator);
  });
  const renderItem = (item) => {
    return local.itemComponent?.({ item });
  };
  const renderSection = (section) => {
    return local.sectionComponent?.({ section });
  };
  createEffect2(
    on(
      [flattenOptionKeys],
      ([flattenOptionKeys2]) => {
        const currentSelectedKeys = [
          ...listState.selectionManager().selectedKeys()
        ];
        const keysToKeep = currentSelectedKeys.filter(
          (key) => flattenOptionKeys2.includes(key)
        );
        listState.selectionManager().setSelectedKeys(keysToKeep);
      },
      {
        defer: true
      }
    )
  );
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    isDisabled: () => formControlContext.isDisabled() ?? false,
    isMultiple: () => access(local.selectionMode) === "multiple",
    isVirtualized: () => local.virtualized ?? false,
    isModal: () => local.modal ?? false,
    preventScroll: () => local.preventScroll ?? context.isModal(),
    disallowTypeAhead: () => local.disallowTypeAhead ?? false,
    shouldFocusWrap: () => local.shouldFocusWrap ?? false,
    selectedOptions,
    contentPresent,
    autoFocus: focusStrategy,
    triggerRef,
    listState: () => listState,
    keyboardDelegate: delegate,
    triggerId,
    valueId,
    listboxId,
    listboxAriaLabelledBy,
    setListboxAriaLabelledBy,
    setTriggerRef,
    setContentRef,
    setListboxRef,
    open,
    close,
    toggle,
    placeholder: () => local.placeholder,
    renderItem,
    renderSection,
    removeOptionFromSelection,
    generateId: createGenerateId(() => access(formControlProps.id)),
    registerTriggerId: createRegisterId(setTriggerId),
    registerValueId: createRegisterId(setValueId),
    registerListboxId: createRegisterId(setListboxId)
  };
  return <FormControlContext.Provider value={formControlContext}><SelectContext.Provider value={context}><Popper anchorRef={triggerRef} contentRef={contentRef} {...popperProps}><Polymorphic
    as="div"
    role="group"
    id={access(formControlProps.id)}
    {...formControlContext.dataset()}
    {...dataset()}
    {...others}
  /></Popper></SelectContext.Provider></FormControlContext.Provider>;
}

// src/select/select-root.tsx
function SelectRoot(props) {
  const [local, others] = splitProps5(
    props,
    ["value", "defaultValue", "onChange", "multiple"]
  );
  const value = createMemo2(() => {
    if (local.value != null) {
      return local.multiple ? local.value : [local.value];
    }
    return local.value;
  });
  const defaultValue = createMemo2(() => {
    if (local.defaultValue != null) {
      return local.multiple ? local.defaultValue : [local.defaultValue];
    }
    return local.defaultValue;
  });
  const onChange = (value2) => {
    if (local.multiple) {
      local.onChange?.(value2 ?? []);
    } else {
      local.onChange?.(value2[0] ?? null);
    }
  };
  return <SelectBase
    value={value()}
    defaultValue={defaultValue()}
    onChange={onChange}
    selectionMode={local.multiple ? "multiple" : "single"}
    {...others}
  />;
}

// src/select/select-trigger.tsx
import { callHandler as callHandler3, mergeDefaultProps as mergeDefaultProps4, mergeRefs as mergeRefs3 } from "@kobalte/utils";
import {
  createEffect as createEffect3,
  onCleanup as onCleanup2,
  splitProps as splitProps6
} from "solid-js";
function SelectTrigger(props) {
  const formControlContext = useFormControlContext();
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps4(
    {
      id: context.generateId("trigger")
    },
    props
  );
  const [local, formControlFieldProps, others] = splitProps6(
    mergedProps,
    [
      "ref",
      "disabled",
      "onPointerDown",
      "onClick",
      "onKeyDown",
      "onFocus",
      "onBlur"
    ],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const selectionManager = () => context.listState().selectionManager();
  const keyboardDelegate = () => context.keyboardDelegate();
  const isDisabled = () => local.disabled || context.isDisabled();
  const { fieldProps } = createFormControlField(formControlFieldProps);
  const { typeSelectHandlers } = createTypeSelect({
    keyboardDelegate,
    selectionManager,
    onTypeSelect: (key) => selectionManager().select(key)
  });
  const ariaLabelledBy = () => {
    return [context.listboxAriaLabelledBy(), context.valueId()].filter(Boolean).join(" ") || void 0;
  };
  const onPointerDown = (e) => {
    callHandler3(e, local.onPointerDown);
    e.currentTarget.dataset.pointerType = e.pointerType;
    if (!isDisabled() && e.pointerType !== "touch" && e.button === 0) {
      e.preventDefault();
      context.toggle(true);
    }
  };
  const onClick = (e) => {
    callHandler3(e, local.onClick);
    if (!isDisabled() && e.currentTarget.dataset.pointerType === "touch") {
      context.toggle(true);
    }
  };
  const onKeyDown = (e) => {
    callHandler3(e, local.onKeyDown);
    if (isDisabled()) {
      return;
    }
    callHandler3(e, typeSelectHandlers.onKeyDown);
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.stopPropagation();
        e.preventDefault();
        context.toggle("first");
        break;
      case "ArrowUp":
        e.stopPropagation();
        e.preventDefault();
        context.toggle("last");
        break;
      case "ArrowLeft": {
        e.preventDefault();
        if (context.isMultiple()) {
          return;
        }
        const firstSelectedKey = selectionManager().firstSelectedKey();
        const key = firstSelectedKey != null ? keyboardDelegate().getKeyAbove?.(firstSelectedKey) : keyboardDelegate().getFirstKey?.();
        if (key != null) {
          selectionManager().select(key);
        }
        break;
      }
      case "ArrowRight": {
        e.preventDefault();
        if (context.isMultiple()) {
          return;
        }
        const firstSelectedKey = selectionManager().firstSelectedKey();
        const key = firstSelectedKey != null ? keyboardDelegate().getKeyBelow?.(firstSelectedKey) : keyboardDelegate().getFirstKey?.();
        if (key != null) {
          selectionManager().select(key);
        }
        break;
      }
    }
  };
  const onFocus = (e) => {
    callHandler3(e, local.onFocus);
    if (selectionManager().isFocused()) {
      return;
    }
    selectionManager().setFocused(true);
  };
  const onBlur = (e) => {
    callHandler3(e, local.onBlur);
    if (context.isOpen()) {
      return;
    }
    selectionManager().setFocused(false);
  };
  createEffect3(() => onCleanup2(context.registerTriggerId(fieldProps.id())));
  createEffect3(() => {
    context.setListboxAriaLabelledBy(
      [
        fieldProps.ariaLabelledBy(),
        fieldProps.ariaLabel() && !fieldProps.ariaLabelledBy() ? fieldProps.id() : null
      ].filter(Boolean).join(" ") || void 0
    );
  });
  return <ButtonRoot
    ref={mergeRefs3(context.setTriggerRef, local.ref)}
    id={fieldProps.id()}
    disabled={isDisabled()}
    aria-haspopup="listbox"
    aria-expanded={context.isOpen()}
    aria-controls={context.isOpen() ? context.listboxId() : void 0}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    onPointerDown={onPointerDown}
    onClick={onClick}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    {...context.dataset()}
    {...formControlContext.dataset()}
    {...others}
  />;
}

// src/select/select-value.tsx
import {
  isFunction as isFunction2,
  mergeDefaultProps as mergeDefaultProps5
} from "@kobalte/utils";
import {
  Show as Show3,
  children,
  createEffect as createEffect4,
  onCleanup as onCleanup3,
  splitProps as splitProps7
} from "solid-js";
function SelectValue(props) {
  const formControlContext = useFormControlContext();
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps5(
    {
      id: context.generateId("value")
    },
    props
  );
  const [local, others] = splitProps7(mergedProps, ["id", "children"]);
  const selectionManager = () => context.listState().selectionManager();
  const isSelectionEmpty = () => {
    const selectedKeys = selectionManager().selectedKeys();
    if (selectedKeys.size === 1 && selectedKeys.has("")) {
      return true;
    }
    return selectionManager().isEmpty();
  };
  createEffect4(() => onCleanup3(context.registerValueId(local.id)));
  return <Polymorphic
    as="span"
    id={local.id}
    data-placeholder-shown={isSelectionEmpty() ? "" : void 0}
    {...formControlContext.dataset()}
    {...others}
  ><Show3 when={!isSelectionEmpty()} fallback={context.placeholder()}><SelectValueChild
    state={{
      selectedOption: () => context.selectedOptions()[0],
      selectedOptions: () => context.selectedOptions(),
      remove: (option) => context.removeOptionFromSelection(option),
      clear: () => selectionManager().clearSelection()
    }}
  >{local.children}</SelectValueChild></Show3></Polymorphic>;
}
function SelectValueChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction2(body) ? body(props.state) : body;
  });
  return <>{resolvedChildren()}</>;
}

// src/select/index.tsx
var Select = Object.assign(SelectRoot, {
  Arrow: PopperArrow,
  Content: SelectContent,
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  HiddenSelect: SelectHiddenSelect,
  Icon: SelectIcon,
  Item: ListboxItem,
  ItemDescription: ListboxItemDescription,
  ItemIndicator: ListboxItemIndicator,
  ItemLabel: ListboxItemLabel,
  Label: SelectLabel,
  Listbox: SelectListbox,
  Portal: SelectPortal,
  Section: ListboxSection,
  Trigger: SelectTrigger,
  Value: SelectValue
});

export {
  SelectContent,
  SelectHiddenSelect,
  SelectIcon,
  SelectLabel,
  SelectListbox,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  Select,
  select_exports
};
