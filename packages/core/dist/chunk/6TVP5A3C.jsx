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
  createControllableSignal
} from "./FN6EICGO.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

// src/text-field/index.tsx
var text_field_exports = {};
__export(text_field_exports, {
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  Input: () => TextFieldInput,
  Label: () => FormControlLabel,
  Root: () => TextFieldRoot,
  TextArea: () => TextFieldTextArea,
  TextField: () => TextField
});

// src/text-field/text-field-input.tsx
import { composeEventHandlers, mergeDefaultProps } from "@kobalte/utils";
import { splitProps } from "solid-js";

// src/text-field/text-field-context.tsx
import { createContext, useContext } from "solid-js";
var TextFieldContext = createContext();
function useTextFieldContext() {
  const context = useContext(TextFieldContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useTextFieldContext` must be used within a `TextField` component"
    );
  }
  return context;
}

// src/text-field/text-field-input.tsx
function TextFieldInput(props) {
  return <TextFieldInputBase type="text" {...props} />;
}
function TextFieldInputBase(props) {
  const formControlContext = useFormControlContext();
  const context = useTextFieldContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("input")
    },
    props
  );
  const [local, formControlFieldProps, others] = splitProps(
    mergedProps,
    ["onInput"],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const { fieldProps } = createFormControlField(formControlFieldProps);
  return <Polymorphic
    as="input"
    id={fieldProps.id()}
    name={formControlContext.name()}
    value={context.value()}
    required={formControlContext.isRequired()}
    disabled={formControlContext.isDisabled()}
    readonly={formControlContext.isReadOnly()}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={fieldProps.ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    aria-invalid={formControlContext.validationState() === "invalid" || void 0}
    aria-required={formControlContext.isRequired() || void 0}
    aria-disabled={formControlContext.isDisabled() || void 0}
    aria-readonly={formControlContext.isReadOnly() || void 0}
    onInput={composeEventHandlers([local.onInput, context.onInput])}
    {...formControlContext.dataset()}
    {...others}
  />;
}

// src/text-field/text-field-root.tsx
import {
  access,
  createGenerateId,
  mergeDefaultProps as mergeDefaultProps2,
  mergeRefs
} from "@kobalte/utils";
import {
  createUniqueId,
  splitProps as splitProps2
} from "solid-js";
function TextFieldRoot(props) {
  let ref;
  const defaultId = `textfield-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps2(
    { id: defaultId },
    props
  );
  const [local, formControlProps, others] = splitProps2(
    mergedProps,
    ["ref", "value", "defaultValue", "onChange"],
    FORM_CONTROL_PROP_NAMES
  );
  const initialValue = local.value;
  const [value, setValue] = createControllableSignal({
    value: () => initialValue === void 0 ? void 0 : local.value ?? "",
    defaultValue: () => local.defaultValue,
    onChange: (value2) => local.onChange?.(value2)
  });
  const { formControlContext } = createFormControl(formControlProps);
  createFormResetListener(
    () => ref,
    () => setValue(local.defaultValue ?? "")
  );
  const onInput = (e) => {
    if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
      return;
    }
    const target = e.target;
    setValue(target.value);
    target.value = value() ?? "";
  };
  const context = {
    value,
    generateId: createGenerateId(() => access(formControlProps.id)),
    onInput
  };
  return <FormControlContext.Provider value={formControlContext}><TextFieldContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs((el) => ref = el, local.ref)}
    role="group"
    id={access(formControlProps.id)}
    {...formControlContext.dataset()}
    {...others}
  /></TextFieldContext.Provider></FormControlContext.Provider>;
}

// src/text-field/text-field-text-area.tsx
import {
  composeEventHandlers as composeEventHandlers2,
  mergeDefaultProps as mergeDefaultProps3,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  createEffect,
  on,
  splitProps as splitProps3
} from "solid-js";
function TextFieldTextArea(props) {
  let ref;
  const context = useTextFieldContext();
  const mergedProps = mergeDefaultProps3(
    {
      id: context.generateId("textarea")
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, [
    "ref",
    "autoResize",
    "submitOnEnter",
    "onKeyPress"
  ]);
  createEffect(
    on(
      [() => ref, () => local.autoResize, () => context.value()],
      ([ref2, autoResize]) => {
        if (!ref2 || !autoResize) {
          return;
        }
        adjustHeight(ref2);
      }
    )
  );
  const onKeyPress = (event) => {
    if (ref && local.submitOnEnter && event.key === "Enter" && !event.shiftKey) {
      if (ref.form) {
        ref.form.requestSubmit();
        event.preventDefault();
      }
    }
  };
  return <TextFieldInputBase
    as="textarea"
    aria-multiline={local.submitOnEnter ? "false" : void 0}
    onKeyPress={composeEventHandlers2([local.onKeyPress, onKeyPress])}
    ref={mergeRefs2((el) => ref = el, local.ref)}
    {...others}
  />;
}
function adjustHeight(el) {
  const prevAlignment = el.style.alignSelf;
  const prevOverflow = el.style.overflow;
  const isFirefox = "MozAppearance" in el.style;
  if (!isFirefox) {
    el.style.overflow = "hidden";
  }
  el.style.alignSelf = "start";
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight + (el.offsetHeight - el.clientHeight)}px`;
  el.style.overflow = prevOverflow;
  el.style.alignSelf = prevAlignment;
}

// src/text-field/index.tsx
var TextField = Object.assign(TextFieldRoot, {
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  Input: TextFieldInput,
  Label: FormControlLabel,
  TextArea: TextFieldTextArea
});

export {
  TextFieldInput,
  TextFieldRoot,
  TextFieldTextArea,
  TextField,
  text_field_exports
};
