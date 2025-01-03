import { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField } from './HLYNC3TZ.js';
import { useFormControlContext, FormControlDescription, FormControlErrorMessage, FormControlLabel, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { createToggleState } from './YGDQXQ2B.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo } from 'solid-js/web';
import { mergeDefaultProps, mergeRefs, visuallyHiddenStyles, createGenerateId, access, isFunction, callHandler, EventKey } from '@kobalte/utils';
import { createContext, splitProps, createSignal, Show, createEffect, on, createUniqueId, createMemo, children, useContext } from 'solid-js';
import createPresence from 'solid-presence';
import { combineStyle } from '@solid-primitives/props';

// src/checkbox/index.tsx
var checkbox_exports = {};
__export(checkbox_exports, {
  Checkbox: () => Checkbox,
  Control: () => CheckboxControl,
  Description: () => CheckboxDescription,
  ErrorMessage: () => CheckboxErrorMessage,
  Indicator: () => CheckboxIndicator,
  Input: () => CheckboxInput,
  Label: () => CheckboxLabel,
  Root: () => CheckboxRoot
});
var CheckboxContext = createContext();
function useCheckboxContext() {
  const context = useContext(CheckboxContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useCheckboxContext` must be used within a `Checkbox` component");
  }
  return context;
}

// src/checkbox/checkbox-control.tsx
function CheckboxControl(props) {
  const formControlContext = useFormControlContext();
  const context = useCheckboxContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("control")
  }, props);
  const [local, others] = splitProps(mergedProps, ["onClick", "onKeyDown"]);
  const onClick = (e) => {
    callHandler(e, local.onClick);
    context.toggle();
    context.inputRef()?.focus();
  };
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    if (e.key === EventKey.Space) {
      context.toggle();
      context.inputRef()?.focus();
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    onClick,
    onKeyDown
  }, () => formControlContext.dataset(), () => context.dataset(), others));
}
function CheckboxDescription(props) {
  const context = useCheckboxContext();
  return createComponent(FormControlDescription, mergeProps(() => context.dataset(), props));
}
function CheckboxErrorMessage(props) {
  const context = useCheckboxContext();
  return createComponent(FormControlErrorMessage, mergeProps(() => context.dataset(), props));
}
function CheckboxIndicator(props) {
  const formControlContext = useFormControlContext();
  const context = useCheckboxContext();
  const [ref, setRef] = createSignal();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "forceMount"]);
  const {
    present
  } = createPresence({
    show: () => local.forceMount || context.indeterminate() || context.checked(),
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
      }, () => formControlContext.dataset(), () => context.dataset(), others));
    }
  });
}
function CheckboxInput(props) {
  let ref;
  const formControlContext = useFormControlContext();
  const context = useCheckboxContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("input")
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["ref", "style", "onChange", "onFocus", "onBlur"], FORM_CONTROL_FIELD_PROP_NAMES);
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const onChange = (e) => {
    callHandler(e, local.onChange);
    e.stopPropagation();
    if (!isInternalChangeEvent()) {
      const target = e.target;
      context.setIsChecked(target.checked);
      target.checked = context.checked();
    }
    setIsInternalChangeEvent(false);
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    context.setIsFocused(true);
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    context.setIsFocused(false);
  };
  createEffect(on([() => context.checked(), () => context.value()], () => {
    setIsInternalChangeEvent(true);
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
  createEffect(on([() => ref, () => context.indeterminate(), () => context.checked()], ([ref2, indeterminate]) => {
    if (ref2) {
      ref2.indeterminate = indeterminate;
    }
  }));
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        context.setInputRef(el);
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    type: "checkbox",
    get id() {
      return fieldProps.id();
    },
    get name() {
      return formControlContext.name();
    },
    get value() {
      return context.value();
    },
    get checked() {
      return context.checked();
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
    get style() {
      return combineStyle(visuallyHiddenStyles, local.style);
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
      return formControlContext.isRequired();
    },
    get ["aria-disabled"]() {
      return formControlContext.isDisabled();
    },
    get ["aria-readonly"]() {
      return formControlContext.isReadOnly();
    },
    onChange,
    onFocus,
    onBlur
  }, () => formControlContext.dataset(), () => context.dataset(), others));
}
function CheckboxLabel(props) {
  const context = useCheckboxContext();
  return createComponent(FormControlLabel, mergeProps(() => context.dataset(), props));
}
function CheckboxRoot(props) {
  let ref;
  const defaultId = `checkbox-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    value: "on",
    id: defaultId
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "children", "value", "checked", "defaultChecked", "indeterminate", "onChange", "onPointerDown"], FORM_CONTROL_PROP_NAMES);
  const [inputRef, setInputRef] = createSignal();
  const [isFocused, setIsFocused] = createSignal(false);
  const {
    formControlContext
  } = createFormControl(formControlProps);
  const state = createToggleState({
    isSelected: () => local.checked,
    defaultIsSelected: () => local.defaultChecked,
    onSelectedChange: (selected) => local.onChange?.(selected),
    isDisabled: () => formControlContext.isDisabled(),
    isReadOnly: () => formControlContext.isReadOnly()
  });
  createFormResetListener(() => ref, () => state.setIsSelected(local.defaultChecked ?? false));
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    if (isFocused()) {
      e.preventDefault();
    }
  };
  const dataset = createMemo(() => ({
    "data-checked": state.isSelected() ? "" : void 0,
    "data-indeterminate": local.indeterminate ? "" : void 0
  }));
  const context = {
    value: () => local.value,
    dataset,
    checked: () => state.isSelected(),
    indeterminate: () => local.indeterminate ?? false,
    inputRef,
    generateId: createGenerateId(() => access(formControlProps.id)),
    toggle: () => state.toggle(),
    setIsChecked: (isChecked) => state.setIsSelected(isChecked),
    setIsFocused,
    setInputRef
  };
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(CheckboxContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            ref(r$) {
              const _ref$ = mergeRefs((el) => ref = el, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            role: "group",
            get id() {
              return access(formControlProps.id);
            },
            onPointerDown
          }, () => formControlContext.dataset(), dataset, others, {
            get children() {
              return createComponent(CheckboxRootChild, {
                state: context,
                get children() {
                  return local.children;
                }
              });
            }
          }));
        }
      });
    }
  });
}
function CheckboxRootChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return memo(resolvedChildren);
}

// src/checkbox/index.tsx
var Checkbox = Object.assign(CheckboxRoot, {
  Control: CheckboxControl,
  Description: CheckboxDescription,
  ErrorMessage: CheckboxErrorMessage,
  Indicator: CheckboxIndicator,
  Input: CheckboxInput,
  Label: CheckboxLabel
});

export { Checkbox, CheckboxControl, CheckboxDescription, CheckboxErrorMessage, CheckboxIndicator, CheckboxInput, CheckboxLabel, CheckboxRoot, checkbox_exports };
