import { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField } from './HLYNC3TZ.js';
import { useFormControlContext, FormControlDescription, FormControlErrorMessage, FormControlLabel, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { createToggleState } from './YGDQXQ2B.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo } from 'solid-js/web';
import { mergeDefaultProps, mergeRefs, visuallyHiddenStyles, createGenerateId, access, isFunction, callHandler, EventKey } from '@kobalte/utils';
import { createContext, splitProps, createUniqueId, createSignal, createMemo, children, useContext } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';

// src/switch/index.tsx
var switch_exports = {};
__export(switch_exports, {
  Control: () => SwitchControl,
  Description: () => SwitchDescription,
  ErrorMessage: () => SwitchErrorMessage,
  Input: () => SwitchInput,
  Label: () => SwitchLabel,
  Root: () => SwitchRoot,
  Switch: () => Switch,
  Thumb: () => SwitchThumb
});
var SwitchContext = createContext();
function useSwitchContext() {
  const context = useContext(SwitchContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useSwitchContext` must be used within a `Switch` component");
  }
  return context;
}

// src/switch/switch-control.tsx
function SwitchControl(props) {
  const formControlContext = useFormControlContext();
  const context = useSwitchContext();
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
function SwitchDescription(props) {
  const context = useSwitchContext();
  return createComponent(FormControlDescription, mergeProps(() => context.dataset(), props));
}
function SwitchErrorMessage(props) {
  const context = useSwitchContext();
  return createComponent(FormControlErrorMessage, mergeProps(() => context.dataset(), props));
}
function SwitchInput(props) {
  const formControlContext = useFormControlContext();
  const context = useSwitchContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("input")
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["ref", "style", "onChange", "onFocus", "onBlur"], FORM_CONTROL_FIELD_PROP_NAMES);
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  const onChange = (e) => {
    callHandler(e, local.onChange);
    e.stopPropagation();
    const target = e.target;
    context.setIsChecked(target.checked);
    target.checked = context.checked();
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    context.setIsFocused(true);
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    context.setIsFocused(false);
  };
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    ref(r$) {
      const _ref$ = mergeRefs(context.setInputRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    type: "checkbox",
    role: "switch",
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
      return combineStyle({
        ...visuallyHiddenStyles
      }, local.style);
    },
    get ["aria-checked"]() {
      return context.checked();
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
    onChange,
    onFocus,
    onBlur
  }, () => formControlContext.dataset(), () => context.dataset(), others));
}
function SwitchLabel(props) {
  const context = useSwitchContext();
  return createComponent(FormControlLabel, mergeProps(() => context.dataset(), props));
}
function SwitchRoot(props) {
  let ref;
  const defaultId = `switch-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    value: "on",
    id: defaultId
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "children", "value", "checked", "defaultChecked", "onChange", "onPointerDown"], FORM_CONTROL_PROP_NAMES);
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
    "data-checked": state.isSelected() ? "" : void 0
  }));
  const context = {
    value: () => local.value,
    dataset,
    checked: () => state.isSelected(),
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
      return createComponent(SwitchContext.Provider, {
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
              return createComponent(SwitchRootChild, {
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
function SwitchRootChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return memo(resolvedChildren);
}
function SwitchThumb(props) {
  const formControlContext = useFormControlContext();
  const context = useSwitchContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("thumb")
  }, props);
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => formControlContext.dataset(), () => context.dataset(), mergedProps));
}

// src/switch/index.tsx
var Switch = Object.assign(SwitchRoot, {
  Control: SwitchControl,
  Description: SwitchDescription,
  ErrorMessage: SwitchErrorMessage,
  Input: SwitchInput,
  Label: SwitchLabel,
  Thumb: SwitchThumb
});

export { Switch, SwitchControl, SwitchDescription, SwitchErrorMessage, SwitchInput, SwitchLabel, SwitchRoot, SwitchThumb, switch_exports };
