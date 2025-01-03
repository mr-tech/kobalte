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
  getItemCount
} from "./FINWO3A5.jsx";
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
  createSelectableCollection
} from "./QZDH5R5B.jsx";
import {
  createFilter
} from "./LR7LBJN3.jsx";
import {
  createFocusScope
} from "./7A3GDF4Y.jsx";
import {
  createHideOutside
} from "./P6XU75ZG.jsx";
import {
  announce
} from "./JHMNWOLY.jsx";
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
  createControllableSignal
} from "./FN6EICGO.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

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

// src/combobox/combobox-content.tsx
import { focusWithoutScrolling, mergeRefs } from "@kobalte/utils";
import {
  Show,
  splitProps
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";
import createPreventScroll from "solid-prevent-scroll";

// src/combobox/combobox-context.tsx
import { createContext, useContext } from "solid-js";
var ComboboxContext = createContext();
function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useComboboxContext` must be used within a `Combobox` component"
    );
  }
  return context;
}

// src/combobox/combobox-content.tsx
function ComboboxContent(props) {
  let ref;
  const context = useComboboxContext();
  const [local, others] = splitProps(props, [
    "ref",
    "style",
    "onCloseAutoFocus",
    "onFocusOutside"
  ]);
  const dismiss = () => {
    context.resetInputValue(
      context.listState().selectionManager().selectedKeys()
    );
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
  createFocusScope(
    {
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
    },
    () => ref
  );
  return <Show when={context.contentPresent()}><Popper.Positioner><DismissableLayer
    ref={mergeRefs((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref)}
    disableOutsidePointerEvents={context.isModal() && context.isOpen()}
    excludedElements={[context.controlRef]}
    style={combineStyle(
      {
        "--kb-combobox-content-transform-origin": "var(--kb-popper-content-transform-origin)",
        position: "relative"
      },
      local.style
    )}
    onFocusOutside={onFocusOutside}
    onDismiss={dismiss}
    {...context.dataset()}
    {...others}
  /></Popper.Positioner></Show>;
}

// src/combobox/combobox-input.tsx
import {
  callHandler,
  contains,
  mergeDefaultProps,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import { splitProps as splitProps2 } from "solid-js";
function ComboboxInput(props) {
  let ref;
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("input")
    },
    props
  );
  const [local, formControlFieldProps, others] = splitProps2(
    mergedProps,
    [
      "ref",
      "disabled",
      "onClick",
      "onInput",
      "onKeyDown",
      "onFocus",
      "onBlur",
      "onTouchEnd"
    ],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const collection = () => context.listState().collection();
  const selectionManager = () => context.listState().selectionManager();
  const isDisabled = () => {
    return local.disabled || context.isDisabled() || formControlContext.isDisabled();
  };
  const { fieldProps } = createFormControlField(formControlFieldProps);
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
          context.resetInputValue(
            context.listState().selectionManager().selectedKeys()
          );
        }
        break;
      case "Escape":
        if (context.isOpen()) {
          context.close();
          context.resetInputValue(
            context.listState().selectionManager().selectedKeys()
          );
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
            context.resetInputValue(
              context.listState().selectionManager().selectedKeys()
            );
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
  return <Polymorphic
    as="input"
    ref={mergeRefs2((el) => {
      context.setInputRef(el);
      ref = el;
    }, local.ref)}
    id={fieldProps.id()}
    value={context.inputValue()}
    required={formControlContext.isRequired()}
    disabled={formControlContext.isDisabled()}
    readonly={formControlContext.isReadOnly()}
    placeholder={context.placeholder()}
    type="text"
    role="combobox"
    autoComplete="off"
    autoCorrect="off"
    spellCheck="false"
    aria-haspopup="listbox"
    aria-autocomplete="list"
    aria-expanded={context.isOpen()}
    aria-controls={context.isOpen() ? context.listboxId() : void 0}
    aria-activedescendant={context.activeDescendant()}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={fieldProps.ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    aria-invalid={formControlContext.validationState() === "invalid" || void 0}
    aria-required={formControlContext.isRequired() || void 0}
    aria-disabled={formControlContext.isDisabled() || void 0}
    aria-readonly={formControlContext.isReadOnly() || void 0}
    onClick={onClick}
    onInput={onInput}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    onTouchEnd={onTouchEnd}
    {...context.dataset()}
    {...formControlContext.dataset()}
    {...others}
  />;
}

// src/combobox/combobox-listbox.tsx
import { mergeDefaultProps as mergeDefaultProps2, mergeRefs as mergeRefs3 } from "@kobalte/utils";
import {
  createEffect,
  onCleanup,
  splitProps as splitProps3
} from "solid-js";
function ComboboxListbox(props) {
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps2(
    {
      id: context.generateId("listbox")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, ["ref"]);
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(
      others.id,
      context.listboxAriaLabel(),
      void 0
    );
  };
  createEffect(() => onCleanup(context.registerListboxId(others.id)));
  return <ListboxRoot
    ref={mergeRefs3(context.setListboxRef, local.ref)}
    state={context.listState()}
    autoFocus={context.autoFocus()}
    shouldUseVirtualFocus
    shouldSelectOnPressUp
    shouldFocusOnHover
    aria-label={context.listboxAriaLabel()}
    aria-labelledby={ariaLabelledBy()}
    renderItem={context.renderItem}
    renderSection={context.renderSection}
    virtualized={context.isVirtualized()}
    {...others}
  />;
}

// src/combobox/combobox-portal.tsx
import { Show as Show2 } from "solid-js";
import { Portal } from "solid-js/web";
function ComboboxPortal(props) {
  const context = useComboboxContext();
  return <Show2 when={context.contentPresent()}><Portal {...props} /></Show2>;
}

// src/combobox/combobox-control.tsx
import { isFunction, mergeRefs as mergeRefs4 } from "@kobalte/utils";
import {
  children,
  splitProps as splitProps4
} from "solid-js";
function ComboboxControl(props) {
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const [local, others] = splitProps4(props, [
    "ref",
    "children"
  ]);
  const selectionManager = () => context.listState().selectionManager();
  return <Polymorphic
    as="div"
    ref={mergeRefs4(context.setControlRef, local.ref)}
    {...context.dataset()}
    {...formControlContext.dataset()}
    {...others}
  ><ComboboxControlChild
    state={{
      selectedOptions: () => context.selectedOptions(),
      remove: (option) => context.removeOptionFromSelection(option),
      clear: () => selectionManager().clearSelection()
    }}
  >{local.children}</ComboboxControlChild></Polymorphic>;
}
function ComboboxControlChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return <>{resolvedChildren()}</>;
}

// src/combobox/combobox-hidden-select.tsx
function ComboboxHiddenSelect(props) {
  const context = useComboboxContext();
  return <HiddenSelectBase
    collection={context.listState().collection()}
    selectionManager={context.listState().selectionManager()}
    isOpen={context.isOpen()}
    isMultiple={context.isMultiple()}
    isVirtualized={context.isVirtualized()}
    focusTrigger={() => context.inputRef()?.focus()}
    {...props}
  />;
}

// src/combobox/combobox-icon.tsx
import { mergeDefaultProps as mergeDefaultProps3 } from "@kobalte/utils";
function ComboboxIcon(props) {
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps3(
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

// src/combobox/combobox-root.tsx
import {
  createMemo as createMemo2,
  splitProps as splitProps6
} from "solid-js";

// src/combobox/combobox-base.tsx
import {
  access,
  createGenerateId,
  focusWithoutScrolling as focusWithoutScrolling2,
  isAppleDevice,
  isFunction as isFunction2,
  mergeDefaultProps as mergeDefaultProps4
} from "@kobalte/utils";
import {
  createEffect as createEffect2,
  createMemo,
  createSignal,
  createUniqueId,
  on,
  splitProps as splitProps5
} from "solid-js";
import createPresence from "solid-presence";

// src/combobox/combobox.intl.ts
var COMBOBOX_INTL_TRANSLATIONS = {
  // Annouce option to screen readers on focus.
  focusAnnouncement: (optionText, isSelected) => `${optionText}${isSelected ? ", selected" : ""}`,
  // Annouce the number of options available to screen readers on open.
  countAnnouncement: (optionCount) => {
    switch (optionCount) {
      case 1:
        return "one option available";
      default:
        `${optionCount} options available`;
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
  const filter = createFilter({ sensitivity: "base" });
  const mergedProps = mergeDefaultProps4(
    {
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
    },
    props
  );
  const [local, popperProps, formControlProps, others] = splitProps5(
    mergedProps,
    [
      "translations",
      "itemComponent",
      "sectionComponent",
      "open",
      "defaultOpen",
      "onOpenChange",
      "inputValue",
      "onInputChange",
      "value",
      "defaultValue",
      "onChange",
      "triggerMode",
      "placeholder",
      "options",
      "optionValue",
      "optionTextValue",
      "optionLabel",
      "optionDisabled",
      "optionGroupChildren",
      "keyboardDelegate",
      "allowDuplicateSelectionEvents",
      "disallowEmptySelection",
      "disallowSelectAll",
      "defaultFilter",
      "shouldFocusWrap",
      "allowsEmptyCollection",
      "closeOnSelection",
      "removeOnBackspace",
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
  const [listboxId, setListboxId] = createSignal();
  const [controlRef, setControlRef] = createSignal();
  const [inputRef, setInputRef] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [listboxRef, setListboxRef] = createSignal();
  const [focusStrategy, setFocusStrategy] = createSignal(false);
  const [isInputFocused, setIsInputFocusedState] = createSignal(false);
  const [showAllOptions, setShowAllOptions] = createSignal(false);
  const [lastDisplayedOptions, setLastDisplayedOptions] = createSignal(
    local.options
  );
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
    return String(
      isFunction2(optionValue) ? optionValue(option) : option[optionValue]
    );
  };
  const getOptionLabel = (option) => {
    const optionLabel = local.optionLabel;
    if (optionLabel == null) {
      return String(option);
    }
    return String(
      isFunction2(optionLabel) ? optionLabel(option) : option[optionLabel]
    );
  };
  const getOptionTextValue = (option) => {
    const optionTextValue = local.optionTextValue;
    if (optionTextValue == null) {
      return String(option);
    }
    return String(
      isFunction2(optionTextValue) ? optionTextValue(option) : option[optionTextValue]
    );
  };
  const allOptions = createMemo(() => {
    const optionGroupChildren = local.optionGroupChildren;
    if (optionGroupChildren == null) {
      return local.options;
    }
    return local.options.flatMap(
      (item) => item[optionGroupChildren] ?? item
    );
  });
  const filterFn = (option) => {
    const inputVal = inputValue() ?? "";
    if (isFunction2(local.defaultFilter)) {
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
    return [...values].map(
      (value) => allOptions().find((option) => getOptionValue(option) === value)
    ).filter((option) => option != null);
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
        focusWithoutScrolling2(inputEl);
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
  const { present: contentPresent } = createPresence({
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
  const { formControlContext } = createFormControl(formControlProps);
  createFormResetListener(inputRef, () => {
    const defaultSelectedKeys = local.defaultValue ? [...local.defaultValue].map(getOptionValue) : new Selection();
    listState.selectionManager().setSelectedKeys(defaultSelectedKeys);
  });
  const delegate = createMemo(() => {
    const keyboardDelegate = access(local.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(
      listState.collection,
      listboxRef,
      void 0
    );
  });
  const selectableCollection = createSelectableCollection(
    {
      selectionManager: () => listState.selectionManager(),
      keyboardDelegate: delegate,
      disallowTypeAhead: true,
      disallowEmptySelection: true,
      disallowSelectAll: () => local.disallowSelectAll,
      shouldFocusWrap: () => local.shouldFocusWrap,
      // Prevent item scroll behavior from being applied here, handled in the Listbox component.
      isVirtualized: true
    },
    inputRef
  );
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
      const selectedOption = allOptions().find(
        (option) => getOptionValue(option) === selectedKey
      );
      setInputValue(selectedOption ? getOptionLabel(selectedOption) : "");
    } else {
      setInputValue("");
    }
  };
  const renderItem = (item) => {
    return local.itemComponent?.({ item });
  };
  const renderSection = (section) => {
    return local.sectionComponent?.({ section });
  };
  createEffect2(
    on([filteredOptions, showAllOptions], (input, prevInput) => {
      if (disclosureState.isOpen() && prevInput != null) {
        const prevFilteredOptions = prevInput[0];
        const prevShowAllOptions = prevInput[1];
        setLastDisplayedOptions(
          prevShowAllOptions ? local.options : prevFilteredOptions
        );
      } else {
        const filteredOptions2 = input[0];
        const showAllOptions2 = input[1];
        setLastDisplayedOptions(
          showAllOptions2 ? local.options : filteredOptions2
        );
      }
    })
  );
  createEffect2(
    on(inputValue, () => {
      if (showAllOptions()) {
        setShowAllOptions(false);
      }
    })
  );
  createEffect2(
    on(() => listState.selectionManager().selectedKeys(), resetInputValue)
  );
  let lastAnnouncedFocusedKey = "";
  createEffect2(() => {
    const focusedKey = listState.selectionManager().focusedKey() ?? "";
    const focusedItem = listState.collection().getItem(focusedKey);
    if (isAppleDevice() && focusedItem != null && focusedKey !== lastAnnouncedFocusedKey) {
      const isSelected = listState.selectionManager().isSelected(focusedKey);
      const announcement = local.translations?.focusAnnouncement(
        focusedItem?.textValue || "",
        isSelected
      ) ?? "";
      announce(announcement);
    }
    if (focusedKey) {
      lastAnnouncedFocusedKey = focusedKey;
    }
  });
  let lastOptionCount = getItemCount(listState.collection());
  let lastOpen = disclosureState.isOpen();
  createEffect2(() => {
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
  createEffect2(() => {
    const lastSelectedKey = [...listState.selectionManager().selectedKeys()].pop() ?? "";
    const lastSelectedItem = listState.collection().getItem(lastSelectedKey);
    if (isAppleDevice() && isInputFocused() && lastSelectedItem && lastSelectedKey !== lastAnnouncedSelectedKey) {
      const announcement = local.translations?.selectedAnnouncement(
        lastSelectedItem?.textValue || ""
      ) ?? "";
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
  return <FormControlContext.Provider value={formControlContext}><ComboboxContext.Provider value={context}><Popper anchorRef={controlRef} contentRef={contentRef} {...popperProps}><Polymorphic
    as="div"
    role="group"
    id={access(formControlProps.id)}
    {...formControlContext.dataset()}
    {...dataset()}
    {...others}
  /></Popper></ComboboxContext.Provider></FormControlContext.Provider>;
}

// src/combobox/combobox-root.tsx
function ComboboxRoot(props) {
  const [local, others] = splitProps6(
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
  return <ComboboxBase
    value={value()}
    defaultValue={defaultValue()}
    onChange={onChange}
    selectionMode={local.multiple ? "multiple" : "single"}
    {...others}
  />;
}

// src/combobox/combobox-trigger.tsx
import {
  callHandler as callHandler2,
  mergeDefaultProps as mergeDefaultProps5,
  mergeRefs as mergeRefs5
} from "@kobalte/utils";
import {
  splitProps as splitProps7
} from "solid-js";
function ComboboxTrigger(props) {
  const formControlContext = useFormControlContext();
  const context = useComboboxContext();
  const mergedProps = mergeDefaultProps5(
    {
      id: context.generateId("trigger")
    },
    props
  );
  const [local, others] = splitProps7(mergedProps, [
    "ref",
    "disabled",
    "onPointerDown",
    "onClick",
    "aria-labelledby"
  ]);
  const isDisabled = () => {
    return local.disabled || context.isDisabled() || formControlContext.isDisabled() || formControlContext.isReadOnly();
  };
  const onPointerDown = (e) => {
    callHandler2(e, local.onPointerDown);
    e.currentTarget.dataset.pointerType = e.pointerType;
    if (!isDisabled() && e.pointerType !== "touch" && e.button === 0) {
      e.preventDefault();
      context.toggle(false, "manual");
    }
  };
  const onClick = (e) => {
    callHandler2(e, local.onClick);
    if (!isDisabled()) {
      if (e.currentTarget.dataset.pointerType === "touch") {
        context.toggle(false, "manual");
      }
      context.inputRef()?.focus();
    }
  };
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(
      others.id,
      context.triggerAriaLabel(),
      local["aria-labelledby"]
    );
  };
  return <ButtonRoot
    ref={mergeRefs5(context.setTriggerRef, local.ref)}
    disabled={isDisabled()}
    tabIndex={-1}
    aria-haspopup="listbox"
    aria-expanded={context.isOpen()}
    aria-controls={context.isOpen() ? context.listboxId() : void 0}
    aria-label={context.triggerAriaLabel()}
    aria-labelledby={ariaLabelledBy()}
    onPointerDown={onPointerDown}
    onClick={onClick}
    {...context.dataset()}
    {...others}
  />;
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

export {
  useComboboxContext,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxPortal,
  ComboboxControl,
  ComboboxHiddenSelect,
  ComboboxIcon,
  ComboboxRoot,
  ComboboxTrigger,
  Combobox,
  combobox_exports
};
