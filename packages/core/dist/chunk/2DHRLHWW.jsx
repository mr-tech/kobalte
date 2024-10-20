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

// src/switch/switch-control.tsx
import { EventKey, callHandler, mergeDefaultProps } from "@kobalte/utils";
import { splitProps } from "solid-js";

// src/switch/switch-context.tsx
import { createContext, useContext } from "solid-js";
var SwitchContext = createContext();
function useSwitchContext() {
  const context = useContext(SwitchContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useSwitchContext` must be used within a `Switch` component"
    );
  }
  return context;
}

// src/switch/switch-control.tsx
function SwitchControl(props) {
  const formControlContext = useFormControlContext();
  const context = useSwitchContext();
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

// src/switch/switch-description.tsx
function SwitchDescription(props) {
  const context = useSwitchContext();
  return <FormControlDescription
    {...context.dataset()}
    {...props}
  />;
}

// src/switch/switch-error-message.tsx
function SwitchErrorMessage(props) {
  const context = useSwitchContext();
  return <FormControlErrorMessage
    {...context.dataset()}
    {...props}
  />;
}

// src/switch/switch-input.tsx
import {
  callHandler as callHandler2,
  mergeDefaultProps as mergeDefaultProps2,
  mergeRefs,
  visuallyHiddenStyles
} from "@kobalte/utils";
import {
  splitProps as splitProps2
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";
function SwitchInput(props) {
  const formControlContext = useFormControlContext();
  const context = useSwitchContext();
  const mergedProps = mergeDefaultProps2(
    { id: context.generateId("input") },
    props
  );
  const [local, formControlFieldProps, others] = splitProps2(
    mergedProps,
    ["ref", "style", "onChange", "onFocus", "onBlur"],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const { fieldProps } = createFormControlField(formControlFieldProps);
  const onChange = (e) => {
    callHandler2(e, local.onChange);
    e.stopPropagation();
    const target = e.target;
    context.setIsChecked(target.checked);
    target.checked = context.checked();
  };
  const onFocus = (e) => {
    callHandler2(e, local.onFocus);
    context.setIsFocused(true);
  };
  const onBlur = (e) => {
    callHandler2(e, local.onBlur);
    context.setIsFocused(false);
  };
  return <Polymorphic
    as="input"
    ref={mergeRefs(context.setInputRef, local.ref)}
    type="checkbox"
    role="switch"
    id={fieldProps.id()}
    name={formControlContext.name()}
    value={context.value()}
    checked={context.checked()}
    required={formControlContext.isRequired()}
    disabled={formControlContext.isDisabled()}
    readonly={formControlContext.isReadOnly()}
    style={combineStyle({ ...visuallyHiddenStyles }, local.style)}
    aria-checked={context.checked()}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={fieldProps.ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    aria-invalid={formControlContext.validationState() === "invalid" || void 0}
    aria-required={formControlContext.isRequired() || void 0}
    aria-disabled={formControlContext.isDisabled() || void 0}
    aria-readonly={formControlContext.isReadOnly() || void 0}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    {...formControlContext.dataset()}
    {...context.dataset()}
    {...others}
  />;
}

// src/switch/switch-label.tsx
function SwitchLabel(props) {
  const context = useSwitchContext();
  return <FormControlLabel
    {...context.dataset()}
    {...props}
  />;
}

// src/switch/switch-root.tsx
import {
  access,
  callHandler as callHandler3,
  createGenerateId,
  isFunction,
  mergeDefaultProps as mergeDefaultProps3,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  children,
  createMemo,
  createSignal,
  createUniqueId,
  splitProps as splitProps3
} from "solid-js";
function SwitchRoot(props) {
  let ref;
  const defaultId = `switch-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps3(
    {
      value: "on",
      id: defaultId
    },
    props
  );
  const [local, formControlProps, others] = splitProps3(
    mergedProps,
    [
      "ref",
      "children",
      "value",
      "checked",
      "defaultChecked",
      "onChange",
      "onPointerDown"
    ],
    FORM_CONTROL_PROP_NAMES
  );
  const [inputRef, setInputRef] = createSignal();
  const [isFocused, setIsFocused] = createSignal(false);
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
  return <FormControlContext.Provider value={formControlContext}><SwitchContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs2((el) => ref = el, local.ref)}
    role="group"
    id={access(formControlProps.id)}
    onPointerDown={onPointerDown}
    {...formControlContext.dataset()}
    {...dataset()}
    {...others}
  ><SwitchRootChild state={context}>{local.children}</SwitchRootChild></Polymorphic></SwitchContext.Provider></FormControlContext.Provider>;
}
function SwitchRootChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return <>{resolvedChildren()}</>;
}

// src/switch/switch-thumb.tsx
import { mergeDefaultProps as mergeDefaultProps4 } from "@kobalte/utils";
function SwitchThumb(props) {
  const formControlContext = useFormControlContext();
  const context = useSwitchContext();
  const mergedProps = mergeDefaultProps4(
    {
      id: context.generateId("thumb")
    },
    props
  );
  return <Polymorphic
    as="div"
    {...formControlContext.dataset()}
    {...context.dataset()}
    {...mergedProps}
  />;
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

export {
  SwitchControl,
  SwitchDescription,
  SwitchErrorMessage,
  SwitchInput,
  SwitchLabel,
  SwitchRoot,
  SwitchThumb,
  Switch,
  switch_exports
};
