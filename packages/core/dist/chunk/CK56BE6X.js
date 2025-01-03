import { HiddenSelectBase } from './DIKSCYO5.js';
import { ListboxItem, ListboxItemDescription, ListboxItemIndicator, ListboxItemLabel, ListboxSection, ListboxRoot } from './5D4E5DKO.js';
import { PopperArrow, Popper } from './4X2EKUJ3.js';
import { ListKeyboardDelegate } from './GLKC2QFF.js';
import { createTypeSelect, createListState, Selection } from './H6DSIDEC.js';
import { createCollator } from './XHJPQEZP.js';
import { createFocusScope } from './ISKHZMHS.js';
import { createHideOutside } from './TZGE2AQH.js';
import { DismissableLayer } from './7KU4OSOB.js';
import { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField } from './HLYNC3TZ.js';
import { FormControlDescription, FormControlErrorMessage, FormControlLabel, useFormControlContext, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { createDisclosureState } from './7LCANGHD.js';
import { ButtonRoot } from './7OVKXYPU.js';
import { createRegisterId } from './E4R2EMM4.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo, Portal } from 'solid-js/web';
import { focusWithoutScrolling, mergeRefs, mergeDefaultProps, isFunction, callHandler, access, createGenerateId } from '@kobalte/utils';
import { createContext, splitProps, Show, createEffect, onCleanup, createMemo, children, useContext, createUniqueId, createSignal, on } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';
import createPreventScroll from 'solid-prevent-scroll';
import createPresence from 'solid-presence';

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
var SelectContext = createContext();
function useSelectContext() {
  const context = useContext(SelectContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useSelectContext` must be used within a `Select` component");
  }
  return context;
}

// src/select/select-content.tsx
function SelectContent(props) {
  let ref;
  const context = useSelectContext();
  const [local, others] = splitProps(props, ["ref", "style", "onCloseAutoFocus", "onFocusOutside"]);
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
  createFocusScope({
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
  }, () => ref);
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Popper.Positioner, {
        get children() {
          return createComponent(DismissableLayer, mergeProps({
            ref(r$) {
              const _ref$ = mergeRefs((el) => {
                context.setContentRef(el);
                ref = el;
              }, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            get disableOutsidePointerEvents() {
              return memo(() => !!context.isModal())() && context.isOpen();
            },
            get excludedElements() {
              return [context.triggerRef];
            },
            get style() {
              return combineStyle({
                "--kb-select-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                position: "relative"
              }, local.style);
            },
            onEscapeKeyDown,
            onFocusOutside,
            get onDismiss() {
              return context.close;
            }
          }, () => context.dataset(), others));
        }
      });
    }
  });
}
function SelectHiddenSelect(props) {
  const context = useSelectContext();
  return createComponent(HiddenSelectBase, mergeProps({
    get collection() {
      return context.listState().collection();
    },
    get selectionManager() {
      return context.listState().selectionManager();
    },
    get isOpen() {
      return context.isOpen();
    },
    get isMultiple() {
      return context.isMultiple();
    },
    get isVirtualized() {
      return context.isVirtualized();
    },
    focusTrigger: () => context.triggerRef()?.focus()
  }, props));
}
function SelectIcon(props) {
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    children: "\u25BC"
  }, props);
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    "aria-hidden": "true"
  }, () => context.dataset(), mergedProps));
}
function SelectLabel(props) {
  const context = useSelectContext();
  const [local, others] = splitProps(props, ["onClick"]);
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (!context.isDisabled()) {
      context.triggerRef()?.focus();
    }
  };
  return createComponent(FormControlLabel, mergeProps({
    as: "span",
    onClick
  }, others));
}
function SelectListbox(props) {
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("listbox")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "onKeyDown"]);
  createEffect(() => onCleanup(context.registerListboxId(local.id)));
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    if (e.key === "Escape") {
      e.preventDefault();
    }
  };
  return createComponent(ListboxRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setListboxRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return local.id;
    },
    get state() {
      return context.listState();
    },
    get virtualized() {
      return context.isVirtualized();
    },
    get autoFocus() {
      return context.autoFocus();
    },
    shouldSelectOnPressUp: true,
    shouldFocusOnHover: true,
    get shouldFocusWrap() {
      return context.shouldFocusWrap();
    },
    get disallowTypeAhead() {
      return context.disallowTypeAhead();
    },
    get ["aria-labelledby"]() {
      return context.listboxAriaLabelledBy();
    },
    get renderItem() {
      return context.renderItem;
    },
    get renderSection() {
      return context.renderSection;
    },
    onKeyDown
  }, others));
}
function SelectPortal(props) {
  const context = useSelectContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}
function SelectBase(props) {
  const defaultId = `select-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    selectionMode: "single",
    disallowEmptySelection: false,
    closeOnSelection: props.selectionMode === "single",
    allowDuplicateSelectionEvents: true,
    gutter: 8,
    sameWidth: true,
    modal: false
  }, props);
  const [local, popperProps, formControlProps, others] = splitProps(mergedProps, ["itemComponent", "sectionComponent", "open", "defaultOpen", "onOpenChange", "value", "defaultValue", "onChange", "placeholder", "options", "optionValue", "optionTextValue", "optionDisabled", "optionGroupChildren", "keyboardDelegate", "allowDuplicateSelectionEvents", "disallowEmptySelection", "closeOnSelection", "disallowTypeAhead", "shouldFocusWrap", "selectionBehavior", "selectionMode", "virtualized", "modal", "preventScroll", "forceMount"], ["getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding"], FORM_CONTROL_PROP_NAMES);
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
    return String(isFunction(optionValue) ? optionValue(option) : option[optionValue]);
  };
  const flattenOptions = createMemo(() => {
    const optionGroupChildren = local.optionGroupChildren;
    if (optionGroupChildren == null) {
      return local.options;
    }
    return local.options.flatMap((item) => item[optionGroupChildren] ?? item);
  });
  const flattenOptionKeys = createMemo(() => {
    return flattenOptions().map((option) => getOptionValue(option));
  });
  const getOptionsFromValues = (values) => {
    return [...values].map((value) => flattenOptions().find((option) => getOptionValue(option) === value)).filter((option) => option != null);
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
  const {
    present: contentPresent
  } = createPresence({
    show: () => local.forceMount || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const focusListbox = () => {
    const listboxEl = listboxRef();
    if (listboxEl) {
      focusWithoutScrolling(listboxEl);
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
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(triggerRef, () => {
    const defaultSelectedKeys = local.defaultValue ? [...local.defaultValue].map(getOptionValue) : new Selection();
    listState.selectionManager().setSelectedKeys(defaultSelectedKeys);
  });
  const collator = createCollator({
    usage: "search",
    sensitivity: "base"
  });
  const delegate = createMemo(() => {
    const keyboardDelegate = access(local.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(listState.collection, void 0, collator);
  });
  const renderItem = (item) => {
    return local.itemComponent?.({
      item
    });
  };
  const renderSection = (section) => {
    return local.sectionComponent?.({
      section
    });
  };
  createEffect(on([flattenOptionKeys], ([flattenOptionKeys2]) => {
    const currentSelectedKeys = [...listState.selectionManager().selectedKeys()];
    const keysToKeep = currentSelectedKeys.filter((key) => flattenOptionKeys2.includes(key));
    listState.selectionManager().setSelectedKeys(keysToKeep);
  }, {
    defer: true
  }));
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
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(SelectContext.Provider, {
        value: context,
        get children() {
          return createComponent(Popper, mergeProps({
            anchorRef: triggerRef,
            contentRef
          }, popperProps, {
            get children() {
              return createComponent(Polymorphic, mergeProps({
                as: "div",
                role: "group",
                get id() {
                  return access(formControlProps.id);
                }
              }, () => formControlContext.dataset(), dataset, others));
            }
          }));
        }
      });
    }
  });
}

// src/select/select-root.tsx
function SelectRoot(props) {
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
      local.onChange?.(value2 ?? []);
    } else {
      local.onChange?.(value2[0] ?? null);
    }
  };
  return createComponent(SelectBase, mergeProps({
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
function SelectTrigger(props) {
  const formControlContext = useFormControlContext();
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("trigger")
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["ref", "disabled", "onPointerDown", "onClick", "onKeyDown", "onFocus", "onBlur"], FORM_CONTROL_FIELD_PROP_NAMES);
  const selectionManager = () => context.listState().selectionManager();
  const keyboardDelegate = () => context.keyboardDelegate();
  const isDisabled = () => local.disabled || context.isDisabled();
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  const {
    typeSelectHandlers
  } = createTypeSelect({
    keyboardDelegate,
    selectionManager,
    onTypeSelect: (key) => selectionManager().select(key)
  });
  const ariaLabelledBy = () => {
    return [context.listboxAriaLabelledBy(), context.valueId()].filter(Boolean).join(" ") || void 0;
  };
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    e.currentTarget.dataset.pointerType = e.pointerType;
    if (!isDisabled() && e.pointerType !== "touch" && e.button === 0) {
      e.preventDefault();
      context.toggle(true);
    }
  };
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (!isDisabled() && e.currentTarget.dataset.pointerType === "touch") {
      context.toggle(true);
    }
  };
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    if (isDisabled()) {
      return;
    }
    callHandler(e, typeSelectHandlers.onKeyDown);
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
    callHandler(e, local.onFocus);
    if (selectionManager().isFocused()) {
      return;
    }
    selectionManager().setFocused(true);
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    if (context.isOpen()) {
      return;
    }
    selectionManager().setFocused(false);
  };
  createEffect(() => onCleanup(context.registerTriggerId(fieldProps.id())));
  createEffect(() => {
    context.setListboxAriaLabelledBy([fieldProps.ariaLabelledBy(), fieldProps.ariaLabel() && !fieldProps.ariaLabelledBy() ? fieldProps.id() : null].filter(Boolean).join(" ") || void 0);
  });
  return createComponent(ButtonRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return fieldProps.id();
    },
    get disabled() {
      return isDisabled();
    },
    "aria-haspopup": "listbox",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo(() => !!context.isOpen())() ? context.listboxId() : void 0;
    },
    get ["aria-label"]() {
      return fieldProps.ariaLabel();
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return fieldProps.ariaDescribedBy();
    },
    onPointerDown,
    onClick,
    onKeyDown,
    onFocus,
    onBlur
  }, () => context.dataset(), () => formControlContext.dataset(), others));
}
function SelectValue(props) {
  const formControlContext = useFormControlContext();
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("value")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id", "children"]);
  const selectionManager = () => context.listState().selectionManager();
  const isSelectionEmpty = () => {
    const selectedKeys = selectionManager().selectedKeys();
    if (selectedKeys.size === 1 && selectedKeys.has("")) {
      return true;
    }
    return selectionManager().isEmpty();
  };
  createEffect(() => onCleanup(context.registerValueId(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    get id() {
      return local.id;
    },
    get ["data-placeholder-shown"]() {
      return isSelectionEmpty() ? "" : void 0;
    }
  }, () => formControlContext.dataset(), others, {
    get children() {
      return createComponent(Show, {
        get when() {
          return !isSelectionEmpty();
        },
        get fallback() {
          return context.placeholder();
        },
        get children() {
          return createComponent(SelectValueChild, {
            state: {
              selectedOption: () => context.selectedOptions()[0],
              selectedOptions: () => context.selectedOptions(),
              remove: (option) => context.removeOptionFromSelection(option),
              clear: () => selectionManager().clearSelection()
            },
            get children() {
              return local.children;
            }
          });
        }
      });
    }
  }));
}
function SelectValueChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return memo(resolvedChildren);
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

export { Select, SelectContent, SelectHiddenSelect, SelectIcon, SelectLabel, SelectListbox, SelectPortal, SelectRoot, SelectTrigger, SelectValue, select_exports };
