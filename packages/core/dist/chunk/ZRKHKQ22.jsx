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
  createToggleState
} from "./VI7QYH27.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

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

// src/checkbox/checkbox-control.tsx
import { EventKey, callHandler, mergeDefaultProps } from "@kobalte/utils";
import { splitProps } from "solid-js";

// src/checkbox/checkbox-context.tsx
import { createContext, useContext } from "solid-js";
var CheckboxContext = createContext();
function useCheckboxContext() {
  const context = useContext(CheckboxContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useCheckboxContext` must be used within a `Checkbox` component"
    );
  }
  return context;
}

// src/checkbox/checkbox-control.tsx
function CheckboxControl(props) {
  const formControlContext = useFormControlContext();
  const context = useCheckboxContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("control")
    },
    props
  );
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
  return <Polymorphic
    as="div"
    onClick={onClick}
    onKeyDown={onKeyDown}
    {...formControlContext.dataset()}
    {...context.dataset()}
    {...others}
  />;
}

// src/checkbox/checkbox-description.tsx
function CheckboxDescription(props) {
  const context = useCheckboxContext();
  return <FormControlDescription
    {...context.dataset()}
    {...props}
  />;
}

// src/checkbox/checkbox-error-message.tsx
function CheckboxErrorMessage(props) {
  const context = useCheckboxContext();
  return <FormControlErrorMessage
    {...context.dataset()}
    {...props}
  />;
}

// src/checkbox/checkbox-indicator.tsx
import { mergeDefaultProps as mergeDefaultProps2, mergeRefs } from "@kobalte/utils";
import {
  Show,
  createSignal,
  splitProps as splitProps2
} from "solid-js";
import createPresence from "solid-presence";
function CheckboxIndicator(props) {
  const formControlContext = useFormControlContext();
  const context = useCheckboxContext();
  const [ref, setRef] = createSignal();
  const mergedProps = mergeDefaultProps2(
    {
      id: context.generateId("indicator")
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, ["ref", "forceMount"]);
  const { present } = createPresence({
    show: () => local.forceMount || context.indeterminate() || context.checked(),
    element: () => ref() ?? null
  });
  return <Show when={present()}><Polymorphic
    as="div"
    ref={mergeRefs(setRef, local.ref)}
    {...formControlContext.dataset()}
    {...context.dataset()}
    {...others}
  /></Show>;
}

// src/checkbox/checkbox-input.tsx
import {
  callHandler as callHandler2,
  mergeDefaultProps as mergeDefaultProps3,
  mergeRefs as mergeRefs2,
  visuallyHiddenStyles
} from "@kobalte/utils";
import { combineStyle } from "@solid-primitives/props";
import {
  createEffect as createEffect2,
  createSignal as createSignal2,
  on,
  splitProps as splitProps3
} from "solid-js";
function CheckboxInput(props) {
  let ref;
  const formControlContext = useFormControlContext();
  const context = useCheckboxContext();
  const mergedProps = mergeDefaultProps3(
    {
      id: context.generateId("input")
    },
    props
  );
  const [local, formControlFieldProps, others] = splitProps3(
    mergedProps,
    ["ref", "style", "onChange", "onFocus", "onBlur"],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const { fieldProps } = createFormControlField(formControlFieldProps);
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal2(false);
  const onChange = (e) => {
    callHandler2(e, local.onChange);
    e.stopPropagation();
    if (!isInternalChangeEvent()) {
      const target = e.target;
      context.setIsChecked(target.checked);
      target.checked = context.checked();
    }
    setIsInternalChangeEvent(false);
  };
  const onFocus = (e) => {
    callHandler2(e, local.onFocus);
    context.setIsFocused(true);
  };
  const onBlur = (e) => {
    callHandler2(e, local.onBlur);
    context.setIsFocused(false);
  };
  createEffect2(
    on(
      [() => context.checked(), () => context.value()],
      () => {
        setIsInternalChangeEvent(true);
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
  createEffect2(
    on(
      [() => ref, () => context.indeterminate(), () => context.checked()],
      ([ref2, indeterminate]) => {
        if (ref2) {
          ref2.indeterminate = indeterminate;
        }
      }
    )
  );
  return <Polymorphic
    as="input"
    ref={mergeRefs2((el) => {
      context.setInputRef(el);
      ref = el;
    }, local.ref)}
    type="checkbox"
    id={fieldProps.id()}
    name={formControlContext.name()}
    value={context.value()}
    checked={context.checked()}
    required={formControlContext.isRequired()}
    disabled={formControlContext.isDisabled()}
    readonly={formControlContext.isReadOnly()}
    style={combineStyle(visuallyHiddenStyles, local.style)}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={fieldProps.ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    aria-invalid={formControlContext.validationState() === "invalid" || void 0}
    aria-required={formControlContext.isRequired()}
    aria-disabled={formControlContext.isDisabled()}
    aria-readonly={formControlContext.isReadOnly()}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    {...formControlContext.dataset()}
    {...context.dataset()}
    {...others}
  />;
}

// src/checkbox/checkbox-label.tsx
function CheckboxLabel(props) {
  const context = useCheckboxContext();
  return <FormControlLabel
    {...context.dataset()}
    {...props}
  />;
}

// src/checkbox/checkbox-root.tsx
import {
  access,
  callHandler as callHandler3,
  createGenerateId,
  isFunction,
  mergeDefaultProps as mergeDefaultProps4,
  mergeRefs as mergeRefs3
} from "@kobalte/utils";
import {
  children,
  createMemo,
  createSignal as createSignal3,
  createUniqueId,
  splitProps as splitProps4
} from "solid-js";
function CheckboxRoot(props) {
  let ref;
  const defaultId = `checkbox-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps4(
    {
      value: "on",
      id: defaultId
    },
    props
  );
  const [local, formControlProps, others] = splitProps4(
    mergedProps,
    [
      "ref",
      "children",
      "value",
      "checked",
      "defaultChecked",
      "indeterminate",
      "onChange",
      "onPointerDown"
    ],
    FORM_CONTROL_PROP_NAMES
  );
  const [inputRef, setInputRef] = createSignal3();
  const [isFocused, setIsFocused] = createSignal3(false);
  const { formControlContext } = createFormControl(formControlProps);
  const state = createToggleState({
    isSelected: () => local.checked,
    defaultIsSelected: () => local.defaultChecked,
    onSelectedChange: (selected) => local.onChange?.(selected),
    isDisabled: () => formControlContext.isDisabled(),
    isReadOnly: () => formControlContext.isReadOnly()
  });
  createFormResetListener(
    () => ref,
    () => state.setIsSelected(local.defaultChecked ?? false)
  );
  const onPointerDown = (e) => {
    callHandler3(e, local.onPointerDown);
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
  return <FormControlContext.Provider value={formControlContext}><CheckboxContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs3((el) => ref = el, local.ref)}
    role="group"
    id={access(formControlProps.id)}
    onPointerDown={onPointerDown}
    {...formControlContext.dataset()}
    {...dataset()}
    {...others}
  ><CheckboxRootChild state={context}>{local.children}</CheckboxRootChild></Polymorphic></CheckboxContext.Provider></FormControlContext.Provider>;
}
function CheckboxRootChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return <>{resolvedChildren()}</>;
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

export {
  CheckboxControl,
  CheckboxDescription,
  CheckboxErrorMessage,
  CheckboxIndicator,
  CheckboxInput,
  CheckboxLabel,
  CheckboxRoot,
  Checkbox,
  checkbox_exports
};
