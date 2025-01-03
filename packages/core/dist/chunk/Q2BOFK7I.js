import { FormControlDescription, FormControlErrorMessage, useFormControlContext, FormControlLabel, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { createRegisterId } from './E4R2EMM4.js';
import { createControllableSignal } from './BLN63FDC.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps } from 'solid-js/web';
import { mergeDefaultProps, createGenerateId, mergeRefs, visuallyHiddenStyles, access, callHandler, EventKey } from '@kobalte/utils';
import { createContext, createUniqueId, splitProps, createSignal, createMemo, createEffect, onCleanup, Show, on, useContext } from 'solid-js';
import createPresence from 'solid-presence';
import { combineStyle } from '@solid-primitives/props';

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
var RadioGroupContext = createContext();
function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");
  }
  return context;
}
var RadioGroupItemContext = createContext();
function useRadioGroupItemContext() {
  const context = useContext(RadioGroupItemContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");
  }
  return context;
}

// src/radio-group/radio-group-item.tsx
function RadioGroupItem(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const defaultId = `${formControlContext.generateId("item")}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "disabled", "onPointerDown"]);
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
  return createComponent(RadioGroupItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "group",
        onPointerDown
      }, dataset, others));
    }
  });
}
function RadioGroupItemControl(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("control")
  }, props);
  const [local, others] = splitProps(mergedProps, ["onClick", "onKeyDown"]);
  const onClick = (e) => {
    callHandler(e, local.onClick);
    context.select();
    context.inputRef()?.focus();
  };
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    if (e.key === EventKey.Space) {
      context.select();
      context.inputRef()?.focus();
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    onClick,
    onKeyDown
  }, () => context.dataset(), others));
}
function RadioGroupItemDescription(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function RadioGroupItemIndicator(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "forceMount"]);
  const [ref, setRef] = createSignal();
  const {
    present
  } = createPresence({
    show: () => local.forceMount || context.isSelected(),
    element: () => ref() ?? null
  });
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
        }
      }, () => context.dataset(), others));
    }
  });
}
function RadioGroupItemInput(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const radioContext = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: radioContext.generateId("input")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "aria-labelledby", "aria-describedby", "onChange", "onFocus", "onBlur"]);
  const ariaLabelledBy = () => {
    return [
      local["aria-labelledby"],
      radioContext.labelId(),
      // If there is both an aria-label and aria-labelledby, add the input itself has an aria-labelledby
      local["aria-labelledby"] != null && others["aria-label"] != null ? others.id : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const ariaDescribedBy = () => {
    return [local["aria-describedby"], radioContext.descriptionId(), radioGroupContext.ariaDescribedBy()].filter(Boolean).join(" ") || void 0;
  };
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const onChange = (e) => {
    callHandler(e, local.onChange);
    e.stopPropagation();
    if (!isInternalChangeEvent()) {
      radioGroupContext.setSelectedValue(radioContext.value());
      const target = e.target;
      target.checked = radioContext.isSelected();
    }
    setIsInternalChangeEvent(false);
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    radioContext.setIsFocused(true);
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    radioContext.setIsFocused(false);
  };
  createEffect(on([() => radioContext.isSelected(), () => radioContext.value()], (c) => {
    if (!c[0] && c[1] === radioContext.value())
      return;
    setIsInternalChangeEvent(true);
    const ref = radioContext.inputRef();
    ref?.dispatchEvent(new Event("input", {
      bubbles: true,
      cancelable: true
    }));
    ref?.dispatchEvent(new Event("change", {
      bubbles: true,
      cancelable: true
    }));
  }, {
    defer: true
  }));
  createEffect(() => onCleanup(radioContext.registerInput(others.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    ref(r$) {
      const _ref$ = mergeRefs(radioContext.setInputRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    type: "radio",
    get name() {
      return formControlContext.name();
    },
    get value() {
      return radioContext.value();
    },
    get checked() {
      return radioContext.isSelected();
    },
    get required() {
      return formControlContext.isRequired();
    },
    get disabled() {
      return radioContext.isDisabled();
    },
    get readonly() {
      return formControlContext.isReadOnly();
    },
    get style() {
      return combineStyle({
        ...visuallyHiddenStyles
      }, local.style);
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return ariaDescribedBy();
    },
    onChange,
    onFocus,
    onBlur
  }, () => radioContext.dataset(), others));
}
function RadioGroupItemLabel(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  createEffect(() => onCleanup(context.registerLabel(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "label",
    get ["for"]() {
      return context.inputId();
    }
  }, () => context.dataset(), mergedProps));
}
function RadioGroupLabel(props) {
  return createComponent(FormControlLabel, mergeProps({
    as: "span"
  }, props));
}
function RadioGroupRoot(props) {
  let ref;
  const defaultId = `radiogroup-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    orientation: "vertical"
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onChange", "orientation", "aria-labelledby", "aria-describedby"], FORM_CONTROL_PROP_NAMES);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onChange?.(value)
  });
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(() => ref, () => setSelected(local.defaultValue ?? ""));
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(access(formControlProps.id), others["aria-label"], local["aria-labelledby"]);
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
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(RadioGroupContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            ref(r$) {
              const _ref$ = mergeRefs((el) => ref = el, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            role: "radiogroup",
            get id() {
              return access(formControlProps.id);
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
            get ["aria-orientation"]() {
              return local.orientation;
            },
            get ["aria-labelledby"]() {
              return ariaLabelledBy();
            },
            get ["aria-describedby"]() {
              return ariaDescribedBy();
            }
          }, () => formControlContext.dataset(), others));
        }
      });
    }
  });
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

export { RadioGroup, RadioGroupItem, RadioGroupItemControl, RadioGroupItemDescription, RadioGroupItemIndicator, RadioGroupItemInput, RadioGroupItemLabel, RadioGroupLabel, RadioGroupRoot, radio_group_exports };
