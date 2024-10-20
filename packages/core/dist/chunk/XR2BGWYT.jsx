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

// src/radio-group/index.tsx
var radio_group_exports = {};
__export(radio_group_exports, {
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  Item: () => RadioGroupItem,
  ItemControl: () => RadioGroupItemControl,
  ItemDescription: () => RadioGroupItemDescription,
  ItemIndicator: () => RadioGroupItemIndicator,
  ItemInput: () => RadioGroupItemInput,
  ItemLabel: () => RadioGroupItemLabel,
  Label: () => RadioGroupLabel,
  RadioGroup: () => RadioGroup,
  Root: () => RadioGroupRoot
});

// src/radio-group/radio-group-item.tsx
import {
  callHandler,
  createGenerateId,
  mergeDefaultProps
} from "@kobalte/utils";
import {
  createMemo,
  createSignal,
  createUniqueId,
  splitProps
} from "solid-js";

// src/radio-group/radio-group-context.tsx
import { createContext, useContext } from "solid-js";
var RadioGroupContext = createContext();
function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component"
    );
  }
  return context;
}

// src/radio-group/radio-group-item-context.tsx
import { createContext as createContext2, useContext as useContext2 } from "solid-js";
var RadioGroupItemContext = createContext2();
function useRadioGroupItemContext() {
  const context = useContext2(RadioGroupItemContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component"
    );
  }
  return context;
}

// src/radio-group/radio-group-item.tsx
function RadioGroupItem(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const defaultId = `${formControlContext.generateId(
    "item"
  )}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps(
    {
      id: defaultId
    },
    props
  );
  const [local, others] = splitProps(mergedProps, [
    "value",
    "disabled",
    "onPointerDown"
  ]);
  const [inputId, setInputId] = createSignal();
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [inputRef, setInputRef] = createSignal();
  const [isFocused, setIsFocused] = createSignal(false);
  const isSelected = createMemo(() => {
    return radioGroupContext.isSelectedValue(local.value);
  });
  const isDisabled = createMemo(() => {
    return local.disabled || formControlContext.isDisabled() || false;
  });
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    if (isFocused()) {
      e.preventDefault();
    }
  };
  const dataset = createMemo(() => ({
    ...formControlContext.dataset(),
    "data-disabled": isDisabled() ? "" : void 0,
    "data-checked": isSelected() ? "" : void 0
  }));
  const context = {
    value: () => local.value,
    dataset,
    isSelected,
    isDisabled,
    inputId,
    labelId,
    descriptionId,
    inputRef,
    select: () => radioGroupContext.setSelectedValue(local.value),
    generateId: createGenerateId(() => others.id),
    registerInput: createRegisterId(setInputId),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId),
    setIsFocused,
    setInputRef
  };
  return <RadioGroupItemContext.Provider value={context}><Polymorphic
    as="div"
    role="group"
    onPointerDown={onPointerDown}
    {...dataset()}
    {...others}
  /></RadioGroupItemContext.Provider>;
}

// src/radio-group/radio-group-item-control.tsx
import { EventKey, callHandler as callHandler2, mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import { splitProps as splitProps2 } from "solid-js";
function RadioGroupItemControl(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps2(
    {
      id: context.generateId("control")
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, ["onClick", "onKeyDown"]);
  const onClick = (e) => {
    callHandler2(e, local.onClick);
    context.select();
    context.inputRef()?.focus();
  };
  const onKeyDown = (e) => {
    callHandler2(e, local.onKeyDown);
    if (e.key === EventKey.Space) {
      context.select();
      context.inputRef()?.focus();
    }
  };
  return <Polymorphic
    as="div"
    onClick={onClick}
    onKeyDown={onKeyDown}
    {...context.dataset()}
    {...others}
  />;
}

// src/radio-group/radio-group-item-description.tsx
import { mergeDefaultProps as mergeDefaultProps3 } from "@kobalte/utils";
import { createEffect, onCleanup } from "solid-js";
function RadioGroupItemDescription(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps3(
    {
      id: context.generateId("description")
    },
    props
  );
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return <Polymorphic
    as="div"
    {...context.dataset()}
    {...mergedProps}
  />;
}

// src/radio-group/radio-group-item-indicator.tsx
import { mergeDefaultProps as mergeDefaultProps4, mergeRefs } from "@kobalte/utils";
import { Show, createSignal as createSignal2, splitProps as splitProps3 } from "solid-js";
import createPresence from "solid-presence";
function RadioGroupItemIndicator(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps4(
    {
      id: context.generateId("indicator")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, ["ref", "forceMount"]);
  const [ref, setRef] = createSignal2();
  const { present } = createPresence({
    show: () => local.forceMount || context.isSelected(),
    element: () => ref() ?? null
  });
  return <Show when={present()}><Polymorphic
    as="div"
    ref={mergeRefs(setRef, local.ref)}
    {...context.dataset()}
    {...others}
  /></Show>;
}

// src/radio-group/radio-group-item-input.tsx
import {
  callHandler as callHandler3,
  mergeDefaultProps as mergeDefaultProps5,
  mergeRefs as mergeRefs2,
  visuallyHiddenStyles
} from "@kobalte/utils";
import {
  createEffect as createEffect2,
  createSignal as createSignal3,
  on,
  onCleanup as onCleanup2,
  splitProps as splitProps4
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";
function RadioGroupItemInput(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const radioContext = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps5(
    {
      id: radioContext.generateId("input")
    },
    props
  );
  const [local, others] = splitProps4(mergedProps, [
    "ref",
    "style",
    "aria-labelledby",
    "aria-describedby",
    "onChange",
    "onFocus",
    "onBlur"
  ]);
  const ariaLabelledBy = () => {
    return [
      local["aria-labelledby"],
      radioContext.labelId(),
      // If there is both an aria-label and aria-labelledby, add the input itself has an aria-labelledby
      local["aria-labelledby"] != null && others["aria-label"] != null ? others.id : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const ariaDescribedBy = () => {
    return [
      local["aria-describedby"],
      radioContext.descriptionId(),
      radioGroupContext.ariaDescribedBy()
    ].filter(Boolean).join(" ") || void 0;
  };
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal3(false);
  const onChange = (e) => {
    callHandler3(e, local.onChange);
    e.stopPropagation();
    if (!isInternalChangeEvent()) {
      radioGroupContext.setSelectedValue(radioContext.value());
      const target = e.target;
      target.checked = radioContext.isSelected();
    }
    setIsInternalChangeEvent(false);
  };
  const onFocus = (e) => {
    callHandler3(e, local.onFocus);
    radioContext.setIsFocused(true);
  };
  const onBlur = (e) => {
    callHandler3(e, local.onBlur);
    radioContext.setIsFocused(false);
  };
  createEffect2(
    on(
      [() => radioContext.isSelected(), () => radioContext.value()],
      (c) => {
        if (!c[0] && c[1] === radioContext.value())
          return;
        setIsInternalChangeEvent(true);
        const ref = radioContext.inputRef();
        ref?.dispatchEvent(
          new Event("input", { bubbles: true, cancelable: true })
        );
        ref?.dispatchEvent(
          new Event("change", { bubbles: true, cancelable: true })
        );
      },
      {
        defer: true
      }
    )
  );
  createEffect2(() => onCleanup2(radioContext.registerInput(others.id)));
  return <Polymorphic
    as="input"
    ref={mergeRefs2(radioContext.setInputRef, local.ref)}
    type="radio"
    name={formControlContext.name()}
    value={radioContext.value()}
    checked={radioContext.isSelected()}
    required={formControlContext.isRequired()}
    disabled={radioContext.isDisabled()}
    readonly={formControlContext.isReadOnly()}
    style={combineStyle({ ...visuallyHiddenStyles }, local.style)}
    aria-labelledby={ariaLabelledBy()}
    aria-describedby={ariaDescribedBy()}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    {...radioContext.dataset()}
    {...others}
  />;
}

// src/radio-group/radio-group-item-label.tsx
import { mergeDefaultProps as mergeDefaultProps6 } from "@kobalte/utils";
import { createEffect as createEffect3, onCleanup as onCleanup3 } from "solid-js";
function RadioGroupItemLabel(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps6(
    {
      id: context.generateId("label")
    },
    props
  );
  createEffect3(() => onCleanup3(context.registerLabel(mergedProps.id)));
  return <Polymorphic
    as="label"
    for={context.inputId()}
    {...context.dataset()}
    {...mergedProps}
  />;
}

// src/radio-group/radio-group-label.tsx
function RadioGroupLabel(props) {
  return <FormControlLabel
    as="span"
    {...props}
  />;
}

// src/radio-group/radio-group-root.tsx
import {
  access,
  mergeDefaultProps as mergeDefaultProps7,
  mergeRefs as mergeRefs3
} from "@kobalte/utils";
import { createUniqueId as createUniqueId2, splitProps as splitProps5 } from "solid-js";
function RadioGroupRoot(props) {
  let ref;
  const defaultId = `radiogroup-${createUniqueId2()}`;
  const mergedProps = mergeDefaultProps7(
    {
      id: defaultId,
      orientation: "vertical"
    },
    props
  );
  const [local, formControlProps, others] = splitProps5(
    mergedProps,
    [
      "ref",
      "value",
      "defaultValue",
      "onChange",
      "orientation",
      "aria-labelledby",
      "aria-describedby"
    ],
    FORM_CONTROL_PROP_NAMES
  );
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onChange?.(value)
  });
  const { formControlContext } = createFormControl(formControlProps);
  createFormResetListener(
    () => ref,
    () => setSelected(local.defaultValue ?? "")
  );
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(
      access(formControlProps.id),
      others["aria-label"],
      local["aria-labelledby"]
    );
  };
  const ariaDescribedBy = () => {
    return formControlContext.getAriaDescribedBy(local["aria-describedby"]);
  };
  const isSelectedValue = (value) => {
    return value === selected();
  };
  const context = {
    ariaDescribedBy,
    isSelectedValue,
    setSelectedValue: (value) => {
      if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
        return;
      }
      setSelected(value);
      if (ref)
        for (const el of ref.querySelectorAll("[type='radio']")) {
          const radio = el;
          radio.checked = isSelectedValue(radio.value);
        }
    }
  };
  return <FormControlContext.Provider value={formControlContext}><RadioGroupContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs3((el) => ref = el, local.ref)}
    role="radiogroup"
    id={access(formControlProps.id)}
    aria-invalid={formControlContext.validationState() === "invalid" || void 0}
    aria-required={formControlContext.isRequired() || void 0}
    aria-disabled={formControlContext.isDisabled() || void 0}
    aria-readonly={formControlContext.isReadOnly() || void 0}
    aria-orientation={local.orientation}
    aria-labelledby={ariaLabelledBy()}
    aria-describedby={ariaDescribedBy()}
    {...formControlContext.dataset()}
    {...others}
  /></RadioGroupContext.Provider></FormControlContext.Provider>;
}

// src/radio-group/index.tsx
var RadioGroup = Object.assign(RadioGroupRoot, {
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  Item: RadioGroupItem,
  ItemControl: RadioGroupItemControl,
  ItemDescription: RadioGroupItemDescription,
  ItemIndicator: RadioGroupItemIndicator,
  ItemInput: RadioGroupItemInput,
  ItemLabel: RadioGroupItemLabel,
  Label: RadioGroupLabel
});

export {
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemDescription,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
  RadioGroupRoot,
  RadioGroup,
  radio_group_exports
};
