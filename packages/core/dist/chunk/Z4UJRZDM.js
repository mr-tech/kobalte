import { HiddenSelectBase } from './DIKSCYO5.js';
import { ListboxItem, ListboxItemDescription, ListboxItemIndicator, ListboxItemLabel, ListboxSection, ListboxRoot } from './5D4E5DKO.js';
import { getItemCount } from './2X5XWQIS.js';
import { PopperArrow, Popper } from './4X2EKUJ3.js';
import { ListKeyboardDelegate } from './GLKC2QFF.js';
import { createListState, Selection, createSelectableCollection } from './H6DSIDEC.js';
import { createFilter } from './XHJPQEZP.js';
import { createFocusScope } from './ISKHZMHS.js';
import { createHideOutside } from './TZGE2AQH.js';
import { announce } from './YA7DCYMB.js';
import { DismissableLayer } from './7KU4OSOB.js';
import { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField } from './HLYNC3TZ.js';
import { FormControlDescription, FormControlErrorMessage, FormControlLabel, useFormControlContext, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { createDisclosureState } from './7LCANGHD.js';
import { ButtonRoot } from './7OVKXYPU.js';
import { createRegisterId } from './E4R2EMM4.js';
import { createControllableSignal } from './BLN63FDC.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo, Portal } from 'solid-js/web';
import { focusWithoutScrolling, mergeRefs, mergeDefaultProps, isFunction, callHandler, contains, access, isAppleDevice, createGenerateId } from '@kobalte/utils';
import { createContext, useContext, splitProps, Show, createEffect, onCleanup, children, createMemo, createUniqueId, createSignal, on } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';
import createPreventScroll from 'solid-prevent-scroll';
import createPresence from 'solid-presence';

// src/combobox/index.tsx
var combobox_exports = {};
__export(combobox_exports, {
  Arrow: () => PopperArrow,
  Combobox: () => Combobox,
  Content: () => ComboboxContent,
  Control: () => ComboboxControl,
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  HiddenSelect: () => ComboboxHiddenSelect,
  Icon: () => ComboboxIcon,
  Input: () => ComboboxInput,
  Item: () => ListboxItem,
  ItemDescription: () => ListboxItemDescription,
  ItemIndicator: () => ListboxItemIndicator,
  ItemLabel: () => ListboxItemLabel,
  Label: () => FormControlLabel,
  Listbox: () => ComboboxListbox,
  Portal: () => ComboboxPortal,
  Root: () => ComboboxRoot,
  Section: () => ListboxSection,
  Trigger: () => ComboboxTrigger,
  useComboboxContext: () => useComboboxContext
});
var ComboboxContext = createContext();
function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useComboboxContext` must be used within a `Combobox` component");
  }
  return context;
}

// src/combobox/combobox-content.tsx
function ComboboxContent(props) {
  let ref;
  const context = useComboboxContext();
  const [local, others] = splitProps(props, ["ref", "style", "onCloseAutoFocus", "onFocusOutside"]);
  const dismiss = () => {
    context.resetInputValue(context.listState().selectionManager().selectedKeys());
    context.close();
    setTimeout(() => {
      context.close();
    });
  };
  const onFocusOutside = (e) => {
    local.onFocusOutside?.(e);
    if (context.isOpen() && context.isModal()) {
      e.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => !(context.isOpen() && context.isModal()),
    targets: () => {
      const excludedElements = [];
      if (ref) {
        excludedElements.push(ref);
      }
      const controlEl = context.controlRef();
      if (controlEl) {
        excludedElements.push(controlEl);
      }
      return excludedElements;
    }
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
        focusWithoutScrolling(context.inputRef());
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
              return [context.controlRef];
            },
            get style() {
              return combineStyle({
                "--kb-combobox-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                position: "relative"
              }, local.style);
            },
            onFocusOutside,
            onDismiss: dismiss
          }, () => context.dataset(), others));
        }
      });
    }
  });
}
function ComboboxInput(props) {
  let ref;
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("input")
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["ref", "disabled", "onClick", "onInput", "onKeyDown", "onFocus", "onBlur", "onTouchEnd"], FORM_CONTROL_FIELD_PROP_NAMES);
  const collection = () => context.listState().collection();
  const selectionManager = () => context.listState().selectionManager();
  const isDisabled = () => {
    return local.disabled || context.isDisabled() || formControlContext.isDisabled();
  };
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (context.triggerMode() === "focus" && !context.isOpen()) {
      context.open(false, "focus");
    }
  };
  const onInput = (e) => {
    callHandler(e, local.onInput);
    if (formControlContext.isReadOnly() || isDisabled()) {
      return;
    }
    const target = e.target;
    context.setInputValue(target.value);
    target.value = context.inputValue() ?? "";
    if (context.isOpen()) {
      if (collection().getSize() <= 0 && !context.allowsEmptyCollection()) {
        context.close();
      }
    } else {
      if (collection().getSize() > 0) {
        context.open(false, "input");
      }
    }
  };
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    if (formControlContext.isReadOnly() || isDisabled()) {
      return;
    }
    if (context.isOpen()) {
      callHandler(e, context.onInputKeyDown);
    }
    switch (e.key) {
      case "Enter":
        if (context.isOpen()) {
          e.preventDefault();
          const focusedKey = selectionManager().focusedKey();
          if (focusedKey != null) {
            selectionManager().select(focusedKey);
          }
        }
        break;
      case "Tab":
        if (context.isOpen()) {
          context.close();
          context.resetInputValue(context.listState().selectionManager().selectedKeys());
        }
        break;
      case "Escape":
        if (context.isOpen()) {
          context.close();
          context.resetInputValue(context.listState().selectionManager().selectedKeys());
        } else {
          context.setInputValue("");
        }
        break;
      case "ArrowDown":
        if (!context.isOpen()) {
          context.open(e.altKey ? false : "first", "manual");
        }
        break;
      case "ArrowUp":
        if (!context.isOpen()) {
          context.open("last", "manual");
        } else {
          if (e.altKey) {
            context.close();
            context.resetInputValue(context.listState().selectionManager().selectedKeys());
          }
        }
        break;
      case "ArrowLeft":
      case "ArrowRight":
        selectionManager().setFocusedKey(void 0);
        break;
      case "Backspace":
        if (context.removeOnBackspace() && selectionManager().selectionMode() === "multiple" && context.inputValue() === "") {
          const lastSelectedKey = [...selectionManager().selectedKeys()].pop() ?? "";
          selectionManager().toggleSelection(lastSelectedKey);
        }
        break;
    }
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    if (context.isInputFocused()) {
      return;
    }
    context.setIsInputFocused(true);
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    if (contains(context.controlRef(), e.relatedTarget) || contains(context.contentRef(), e.relatedTarget)) {
      return;
    }
    context.setIsInputFocused(false);
  };
  let lastEventTime = 0;
  const onTouchEnd = (e) => {
    callHandler(e, local.onTouchEnd);
    if (!ref || formControlContext.isReadOnly() || isDisabled()) {
      return;
    }
    if (e.timeStamp - lastEventTime < 500) {
      e.preventDefault();
      ref.focus();
      return;
    }
    const rect = e.target.getBoundingClientRect();
    const touch = e.changedTouches[0];
    const centerX = Math.ceil(rect.left + 0.5 * rect.width);
    const centerY = Math.ceil(rect.top + 0.5 * rect.height);
    if (touch.clientX === centerX && touch.clientY === centerY) {
      e.preventDefault();
      ref.focus();
      context.toggle(false, "manual");
      lastEventTime = e.timeStamp;
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        context.setInputRef(el);
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return fieldProps.id();
    },
    get value() {
      return context.inputValue();
    },
    get required() {
      return formControlContext.isRequired();
    },
    get disabled() {
      return formControlContext.isDisabled();
    },
    get readonly() {
      return formControlContext.isReadOnly();
    },
    get placeholder() {
      return context.placeholder();
    },
    type: "text",
    role: "combobox",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: "false",
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo(() => !!context.isOpen())() ? context.listboxId() : void 0;
    },
    get ["aria-activedescendant"]() {
      return context.activeDescendant();
    },
    get ["aria-label"]() {
      return fieldProps.ariaLabel();
    },
    get ["aria-labelledby"]() {
      return fieldProps.ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return fieldProps.ariaDescribedBy();
    },
    get ["aria-invalid"]() {
      return formControlContext.validationState() === "invalid" || void 0;
    },
    get ["aria-required"]() {
      return formControlContext.isRequired() || void 0;
    },
    get ["aria-disabled"]() {
      return formControlContext.isDisabled() || void 0;
    },
    get ["aria-readonly"]() {
      return formControlContext.isReadOnly() || void 0;
    },
    onClick,
    onInput,
    onKeyDown,
    onFocus,
    onBlur,
    onTouchEnd
  }, () => context.dataset(), () => formControlContext.dataset(), others));
}
function ComboboxListbox(props) {
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("listbox")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref"]);
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(others.id, context.listboxAriaLabel(), void 0);
  };
  createEffect(() => onCleanup(context.registerListboxId(others.id)));
  return createComponent(ListboxRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setListboxRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get state() {
      return context.listState();
    },
    get autoFocus() {
      return context.autoFocus();
    },
    shouldUseVirtualFocus: true,
    shouldSelectOnPressUp: true,
    shouldFocusOnHover: true,
    get ["aria-label"]() {
      return context.listboxAriaLabel();
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    get renderItem() {
      return context.renderItem;
    },
    get renderSection() {
      return context.renderSection;
    },
    get virtualized() {
      return context.isVirtualized();
    }
  }, others));
}
function ComboboxPortal(props) {
  const context = useComboboxContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}
function ComboboxControl(props) {
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const [local, others] = splitProps(props, ["ref", "children"]);
  const selectionManager = () => context.listState().selectionManager();
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setControlRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    }
  }, () => context.dataset(), () => formControlContext.dataset(), others, {
    get children() {
      return createComponent(ComboboxControlChild, {
        state: {
          selectedOptions: () => context.selectedOptions(),
          remove: (option) => context.removeOptionFromSelection(option),
          clear: () => selectionManager().clearSelection()
        },
        get children() {
          return local.children;
        }
      });
    }
  }));
}
function ComboboxControlChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return memo(resolvedChildren);
}
function ComboboxHiddenSelect(props) {
  const context = useComboboxContext();
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
    focusTrigger: () => context.inputRef()?.focus()
  }, props));
}
function ComboboxIcon(props) {
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps({
    children: "\u25BC"
  }, props);
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    "aria-hidden": "true"
  }, () => context.dataset(), mergedProps));
}

// src/combobox/combobox.intl.ts
var COMBOBOX_INTL_TRANSLATIONS = {
  // Annouce option to screen readers on focus.
  focusAnnouncement: (optionText, isSelected) => `${optionText}${isSelected ? ", selected" : ""}`,
  // Annouce the number of options available to screen readers on open.
  countAnnouncement: (optionCount) => {
    switch (optionCount) {
      case 1:
        return "one option available";
    }
  },
  // Annouce the selection of an option to screen readers.
  selectedAnnouncement: (optionText) => `${optionText}, selected`,
  // `aria-label` of Combobox.Trigger.
  triggerLabel: "Show suggestions",
  // `aria-label` of Combobox.Listbox.
  listboxLabel: "Suggestions"
};

// src/combobox/combobox-base.tsx
function ComboboxBase(props) {
  const defaultId = `combobox-${createUniqueId()}`;
  const filter = createFilter({
    sensitivity: "base"
  });
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    selectionMode: "single",
    allowsEmptyCollection: false,
    disallowEmptySelection: false,
    allowDuplicateSelectionEvents: true,
    closeOnSelection: props.selectionMode === "single",
    removeOnBackspace: true,
    gutter: 8,
    sameWidth: true,
    modal: false,
    defaultFilter: "contains",
    triggerMode: "input",
    translations: COMBOBOX_INTL_TRANSLATIONS
  }, props);
  const [local, popperProps, formControlProps, others] = splitProps(mergedProps, ["translations", "itemComponent", "sectionComponent", "open", "defaultOpen", "onOpenChange", "inputValue", "onInputChange", "value", "defaultValue", "onChange", "triggerMode", "placeholder", "options", "optionValue", "optionTextValue", "optionLabel", "optionDisabled", "optionGroupChildren", "keyboardDelegate", "allowDuplicateSelectionEvents", "disallowEmptySelection", "disallowSelectAll", "defaultFilter", "shouldFocusWrap", "allowsEmptyCollection", "closeOnSelection", "removeOnBackspace", "selectionBehavior", "selectionMode", "virtualized", "modal", "preventScroll", "forceMount"], ["getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding"], FORM_CONTROL_PROP_NAMES);
  const [listboxId, setListboxId] = createSignal();
  const [controlRef, setControlRef] = createSignal();
  const [inputRef, setInputRef] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [listboxRef, setListboxRef] = createSignal();
  const [focusStrategy, setFocusStrategy] = createSignal(false);
  const [isInputFocused, setIsInputFocusedState] = createSignal(false);
  const [showAllOptions, setShowAllOptions] = createSignal(false);
  const [lastDisplayedOptions, setLastDisplayedOptions] = createSignal(local.options);
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen, openTriggerMode)
  });
  const [inputValue, setInputValue] = createControllableSignal({
    defaultValue: () => "",
    value: () => local.inputValue,
    onChange: (value) => {
      local.onInputChange?.(value);
      if (value === "" && local.selectionMode === "single" && !listState.selectionManager().isEmpty() && local.value === void 0) {
        listState.selectionManager().setSelectedKeys([]);
      }
      listState.selectionManager().setFocusedKey(void 0);
    }
  });
  const getOptionValue = (option) => {
    const optionValue = local.optionValue;
    if (optionValue == null) {
      return String(option);
    }
    return String(isFunction(optionValue) ? optionValue(option) : option[optionValue]);
  };
  const getOptionLabel = (option) => {
    const optionLabel = local.optionLabel;
    if (optionLabel == null) {
      return String(option);
    }
    return String(isFunction(optionLabel) ? optionLabel(option) : option[optionLabel]);
  };
  const getOptionTextValue = (option) => {
    const optionTextValue = local.optionTextValue;
    if (optionTextValue == null) {
      return String(option);
    }
    return String(isFunction(optionTextValue) ? optionTextValue(option) : option[optionTextValue]);
  };
  const allOptions = createMemo(() => {
    const optionGroupChildren = local.optionGroupChildren;
    if (optionGroupChildren == null) {
      return local.options;
    }
    return local.options.flatMap((item) => item[optionGroupChildren] ?? item);
  });
  const filterFn = (option) => {
    const inputVal = inputValue() ?? "";
    if (isFunction(local.defaultFilter)) {
      return local.defaultFilter?.(option, inputVal);
    }
    const textVal = getOptionTextValue(option);
    switch (local.defaultFilter) {
      case "startsWith":
        return filter.startsWith(textVal, inputVal);
      case "endsWith":
        return filter.endsWith(textVal, inputVal);
      case "contains":
        return filter.contains(textVal, inputVal);
    }
  };
  const filteredOptions = createMemo(() => {
    const optionGroupChildren = local.optionGroupChildren;
    if (optionGroupChildren == null) {
      return local.options.filter(filterFn);
    }
    const filteredGroups = [];
    for (const optGroup of local.options) {
      const filteredChildrenOptions = optGroup[optionGroupChildren].filter(filterFn);
      if (filteredChildrenOptions.length === 0)
        continue;
      filteredGroups.push({
        ...optGroup,
        [optionGroupChildren]: filteredChildrenOptions
      });
    }
    return filteredGroups;
  });
  const displayedOptions = createMemo(() => {
    if (disclosureState.isOpen()) {
      if (showAllOptions()) {
        return local.options;
      }
      return filteredOptions();
    }
    return lastDisplayedOptions();
  });
  let openTriggerMode = "focus";
  const getOptionsFromValues = (values) => {
    return [...values].map((value) => allOptions().find((option) => getOptionValue(option) === value)).filter((option) => option != null);
  };
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
        if (disclosureState.isOpen() && selectedKeys.size > 0) {
          close();
          setTimeout(close);
        }
      }
      const inputEl = inputRef();
      if (inputEl) {
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
        focusWithoutScrolling(inputEl);
      }
    },
    allowDuplicateSelectionEvents: () => access(local.allowDuplicateSelectionEvents),
    disallowEmptySelection: () => local.disallowEmptySelection,
    selectionBehavior: () => access(local.selectionBehavior),
    selectionMode: () => local.selectionMode,
    dataSource: displayedOptions,
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
  const open = (focusStrategy2, triggerMode) => {
    if (local.triggerMode === "manual" && triggerMode !== "manual") {
      return;
    }
    const showAllOptions2 = setShowAllOptions(triggerMode === "manual");
    const hasOptions = showAllOptions2 ? local.options.length > 0 : filteredOptions().length > 0;
    if (!hasOptions && !local.allowsEmptyCollection) {
      return;
    }
    openTriggerMode = triggerMode;
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
    listState.selectionManager().setFocused(true);
    listState.selectionManager().setFocusedKey(focusedKey);
  };
  const close = () => {
    disclosureState.close();
    listState.selectionManager().setFocused(false);
    listState.selectionManager().setFocusedKey(void 0);
  };
  const toggle = (focusStrategy2, triggerMode) => {
    if (disclosureState.isOpen()) {
      close();
    } else {
      open(focusStrategy2, triggerMode);
    }
  };
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(inputRef, () => {
    const defaultSelectedKeys = local.defaultValue ? [...local.defaultValue].map(getOptionValue) : new Selection();
    listState.selectionManager().setSelectedKeys(defaultSelectedKeys);
  });
  const delegate = createMemo(() => {
    const keyboardDelegate = access(local.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(listState.collection, listboxRef, void 0);
  });
  const selectableCollection = createSelectableCollection({
    selectionManager: () => listState.selectionManager(),
    keyboardDelegate: delegate,
    disallowTypeAhead: true,
    disallowEmptySelection: true,
    disallowSelectAll: () => local.disallowSelectAll,
    shouldFocusWrap: () => local.shouldFocusWrap,
    // Prevent item scroll behavior from being applied here, handled in the Listbox component.
    isVirtualized: true
  }, inputRef);
  const setIsInputFocused = (isFocused) => {
    if (isFocused && local.triggerMode === "focus") {
      open(false, "focus");
    }
    setIsInputFocusedState(isFocused);
    listState.selectionManager().setFocused(isFocused);
  };
  const activeDescendant = createMemo(() => {
    const focusedKey = listState.selectionManager().focusedKey();
    if (focusedKey) {
      return listboxRef()?.querySelector(`[data-key="${focusedKey}"]`)?.id;
    }
    return void 0;
  });
  const resetInputValue = (selectedKeys) => {
    if (local.inputValue !== void 0)
      return;
    if (local.selectionMode === "single") {
      const selectedKey = [...selectedKeys][0];
      const selectedOption = allOptions().find((option) => getOptionValue(option) === selectedKey);
      setInputValue(selectedOption ? getOptionLabel(selectedOption) : "");
    } else {
      setInputValue("");
    }
  };
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
  createEffect(on([filteredOptions, showAllOptions], (input, prevInput) => {
    if (disclosureState.isOpen() && prevInput != null) {
      const prevFilteredOptions = prevInput[0];
      const prevShowAllOptions = prevInput[1];
      setLastDisplayedOptions(prevShowAllOptions ? local.options : prevFilteredOptions);
    } else {
      const filteredOptions2 = input[0];
      const showAllOptions2 = input[1];
      setLastDisplayedOptions(showAllOptions2 ? local.options : filteredOptions2);
    }
  }));
  createEffect(on(inputValue, () => {
    if (showAllOptions()) {
      setShowAllOptions(false);
    }
  }));
  createEffect(on(() => listState.selectionManager().selectedKeys(), resetInputValue));
  let lastAnnouncedFocusedKey = "";
  createEffect(() => {
    const focusedKey = listState.selectionManager().focusedKey() ?? "";
    const focusedItem = listState.collection().getItem(focusedKey);
    if (isAppleDevice() && focusedItem != null && focusedKey !== lastAnnouncedFocusedKey) {
      const isSelected = listState.selectionManager().isSelected(focusedKey);
      const announcement = local.translations?.focusAnnouncement(focusedItem?.textValue || "", isSelected) ?? "";
      announce(announcement);
    }
    if (focusedKey) {
      lastAnnouncedFocusedKey = focusedKey;
    }
  });
  let lastOptionCount = getItemCount(listState.collection());
  let lastOpen = disclosureState.isOpen();
  createEffect(() => {
    const optionCount = getItemCount(listState.collection());
    const isOpen = disclosureState.isOpen();
    const didOpenWithoutFocusedItem = isOpen !== lastOpen && (listState.selectionManager().focusedKey() == null || isAppleDevice());
    if (isOpen && (didOpenWithoutFocusedItem || optionCount !== lastOptionCount)) {
      const announcement = local.translations?.countAnnouncement(optionCount) ?? "";
      announce(announcement);
    }
    lastOptionCount = optionCount;
    lastOpen = isOpen;
  });
  let lastAnnouncedSelectedKey = "";
  createEffect(() => {
    const lastSelectedKey = [...listState.selectionManager().selectedKeys()].pop() ?? "";
    const lastSelectedItem = listState.collection().getItem(lastSelectedKey);
    if (isAppleDevice() && isInputFocused() && lastSelectedItem && lastSelectedKey !== lastAnnouncedSelectedKey) {
      const announcement = local.translations?.selectedAnnouncement(lastSelectedItem?.textValue || "") ?? "";
      announce(announcement);
    }
    if (lastSelectedKey) {
      lastAnnouncedSelectedKey = lastSelectedKey;
    }
  });
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
    allowsEmptyCollection: () => local.allowsEmptyCollection ?? false,
    shouldFocusWrap: () => local.shouldFocusWrap ?? false,
    removeOnBackspace: () => local.removeOnBackspace ?? true,
    selectedOptions,
    isInputFocused,
    contentPresent,
    autoFocus: focusStrategy,
    inputValue,
    triggerMode: () => local.triggerMode,
    activeDescendant,
    controlRef,
    inputRef,
    triggerRef,
    contentRef,
    listState: () => listState,
    keyboardDelegate: delegate,
    listboxId,
    triggerAriaLabel: () => local.translations?.triggerLabel,
    listboxAriaLabel: () => local.translations?.listboxLabel,
    setIsInputFocused,
    resetInputValue,
    setInputValue,
    setControlRef,
    setInputRef,
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
    onInputKeyDown: (e) => selectableCollection.onKeyDown(e),
    generateId: createGenerateId(() => access(formControlProps.id)),
    registerListboxId: createRegisterId(setListboxId)
  };
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(ComboboxContext.Provider, {
        value: context,
        get children() {
          return createComponent(Popper, mergeProps({
            anchorRef: controlRef,
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

// src/combobox/combobox-root.tsx
function ComboboxRoot(props) {
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
  return createComponent(ComboboxBase, mergeProps({
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
function ComboboxTrigger(props) {
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("trigger")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "disabled", "onPointerDown", "onClick", "aria-labelledby"]);
  const isDisabled = () => {
    return local.disabled || context.isDisabled() || formControlContext.isDisabled() || formControlContext.isReadOnly();
  };
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    e.currentTarget.dataset.pointerType = e.pointerType;
    if (!isDisabled() && e.pointerType !== "touch" && e.button === 0) {
      e.preventDefault();
      context.toggle(false, "manual");
    }
  };
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (!isDisabled()) {
      if (e.currentTarget.dataset.pointerType === "touch") {
        context.toggle(false, "manual");
      }
      context.inputRef()?.focus();
    }
  };
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(others.id, context.triggerAriaLabel(), local["aria-labelledby"]);
  };
  return createComponent(ButtonRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get disabled() {
      return isDisabled();
    },
    tabIndex: -1,
    "aria-haspopup": "listbox",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo(() => !!context.isOpen())() ? context.listboxId() : void 0;
    },
    get ["aria-label"]() {
      return context.triggerAriaLabel();
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    onPointerDown,
    onClick
  }, () => context.dataset(), others));
}

// src/combobox/index.tsx
var Combobox = Object.assign(ComboboxRoot, {
  Arrow: PopperArrow,
  Content: ComboboxContent,
  Control: ComboboxControl,
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  HiddenSelect: ComboboxHiddenSelect,
  Icon: ComboboxIcon,
  Input: ComboboxInput,
  Item: ListboxItem,
  ItemDescription: ListboxItemDescription,
  ItemIndicator: ListboxItemIndicator,
  ItemLabel: ListboxItemLabel,
  Label: FormControlLabel,
  Listbox: ComboboxListbox,
  Portal: ComboboxPortal,
  Section: ListboxSection,
  Trigger: ComboboxTrigger
});

export { Combobox, ComboboxContent, ComboboxControl, ComboboxHiddenSelect, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxPortal, ComboboxRoot, ComboboxTrigger, combobox_exports, useComboboxContext };
