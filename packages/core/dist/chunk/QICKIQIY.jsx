import {
  createRegisterId
} from "./JNCCF6MP.jsx";
import {
  createTagName
} from "./OYES4GOP.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";

// src/form-control/create-form-control.tsx
import {
  access,
  createGenerateId,
  mergeDefaultProps
} from "@kobalte/utils";
import {
  createMemo,
  createSignal,
  createUniqueId
} from "solid-js";
var FORM_CONTROL_PROP_NAMES = [
  "id",
  "name",
  "validationState",
  "required",
  "disabled",
  "readOnly"
];
function createFormControl(props) {
  const defaultId = `form-control-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({ id: defaultId }, props);
  const [labelId, setLabelId] = createSignal();
  const [fieldId, setFieldId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [errorMessageId, setErrorMessageId] = createSignal();
  const getAriaLabelledBy = (fieldId2, fieldAriaLabel, fieldAriaLabelledBy) => {
    const hasAriaLabelledBy = fieldAriaLabelledBy != null || labelId() != null;
    return [
      fieldAriaLabelledBy,
      labelId(),
      // If there is both an aria-label and aria-labelledby, add the field itself has an aria-labelledby
      hasAriaLabelledBy && fieldAriaLabel != null ? fieldId2 : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const getAriaDescribedBy = (fieldAriaDescribedBy) => {
    return [
      descriptionId(),
      // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA.
      // See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
      errorMessageId(),
      fieldAriaDescribedBy
    ].filter(Boolean).join(" ") || void 0;
  };
  const dataset = createMemo(() => ({
    "data-valid": access(mergedProps.validationState) === "valid" ? "" : void 0,
    "data-invalid": access(mergedProps.validationState) === "invalid" ? "" : void 0,
    "data-required": access(mergedProps.required) ? "" : void 0,
    "data-disabled": access(mergedProps.disabled) ? "" : void 0,
    "data-readonly": access(mergedProps.readOnly) ? "" : void 0
  }));
  const formControlContext = {
    name: () => access(mergedProps.name) ?? access(mergedProps.id),
    dataset,
    validationState: () => access(mergedProps.validationState),
    isRequired: () => access(mergedProps.required),
    isDisabled: () => access(mergedProps.disabled),
    isReadOnly: () => access(mergedProps.readOnly),
    labelId,
    fieldId,
    descriptionId,
    errorMessageId,
    getAriaLabelledBy,
    getAriaDescribedBy,
    generateId: createGenerateId(() => access(mergedProps.id)),
    registerLabel: createRegisterId(setLabelId),
    registerField: createRegisterId(setFieldId),
    registerDescription: createRegisterId(setDescriptionId),
    registerErrorMessage: createRegisterId(setErrorMessageId)
  };
  return { formControlContext };
}

// src/form-control/form-control-context.tsx
import { createContext, useContext } from "solid-js";
var FormControlContext = createContext();
function useFormControlContext() {
  const context = useContext(FormControlContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component"
    );
  }
  return context;
}

// src/form-control/form-control-description.tsx
import { mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import { createEffect, onCleanup } from "solid-js";
function FormControlDescription(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps2(
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

// src/form-control/form-control-error-message.tsx
import { mergeDefaultProps as mergeDefaultProps3 } from "@kobalte/utils";
import {
  Show,
  createEffect as createEffect2,
  onCleanup as onCleanup2,
  splitProps
} from "solid-js";
function FormControlErrorMessage(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps3(
    {
      id: context.generateId("error-message")
    },
    props
  );
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  const isInvalid = () => context.validationState() === "invalid";
  createEffect2(() => {
    if (!isInvalid()) {
      return;
    }
    onCleanup2(context.registerErrorMessage(others.id));
  });
  return <Show when={local.forceMount || isInvalid()}><Polymorphic
    as="div"
    {...context.dataset()}
    {...others}
  /></Show>;
}

// src/form-control/form-control-label.tsx
import {
  mergeDefaultProps as mergeDefaultProps4,
  mergeRefs
} from "@kobalte/utils";
import {
  createEffect as createEffect3,
  onCleanup as onCleanup3,
  splitProps as splitProps2
} from "solid-js";
function FormControlLabel(props) {
  let ref;
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps4(
    {
      id: context.generateId("label")
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, ["ref"]);
  const tagName = createTagName(
    () => ref,
    () => "label"
  );
  createEffect3(() => onCleanup3(context.registerLabel(others.id)));
  return <Polymorphic
    as="label"
    ref={mergeRefs((el) => ref = el, local.ref)}
    for={tagName() === "label" ? context.fieldId() : void 0}
    {...context.dataset()}
    {...others}
  />;
}

export {
  FORM_CONTROL_PROP_NAMES,
  createFormControl,
  FormControlContext,
  useFormControlContext,
  FormControlDescription,
  FormControlErrorMessage,
  FormControlLabel
};
