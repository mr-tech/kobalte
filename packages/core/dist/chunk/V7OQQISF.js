import { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField } from './HLYNC3TZ.js';
import { FormControlDescription, FormControlErrorMessage, FormControlLabel, useFormControlContext, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { createControllableSignal } from './BLN63FDC.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps } from 'solid-js/web';
import { mergeDefaultProps, composeEventHandlers, createGenerateId, access, mergeRefs } from '@kobalte/utils';
import { createContext, splitProps, createUniqueId, createEffect, on, useContext } from 'solid-js';

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
var TextFieldContext = createContext();
function useTextFieldContext() {
  const context = useContext(TextFieldContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useTextFieldContext` must be used within a `TextField` component");
  }
  return context;
}

// src/text-field/text-field-input.tsx
function TextFieldInput(props) {
  return createComponent(TextFieldInputBase, mergeProps({
    type: "text"
  }, props));
}
function TextFieldInputBase(props) {
  const formControlContext = useFormControlContext();
  const context = useTextFieldContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("input")
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["onInput"], FORM_CONTROL_FIELD_PROP_NAMES);
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    get id() {
      return fieldProps.id();
    },
    get name() {
      return formControlContext.name();
    },
    get value() {
      return context.value();
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
    get onInput() {
      return composeEventHandlers([local.onInput, context.onInput]);
    }
  }, () => formControlContext.dataset(), others));
}
function TextFieldRoot(props) {
  let ref;
  const defaultId = `textfield-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onChange"], FORM_CONTROL_PROP_NAMES);
  const initialValue = local.value;
  const [value, setValue] = createControllableSignal({
    value: () => initialValue === void 0 ? void 0 : local.value ?? "",
    defaultValue: () => local.defaultValue,
    onChange: (value2) => local.onChange?.(value2)
  });
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(() => ref, () => setValue(local.defaultValue ?? ""));
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
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(TextFieldContext.Provider, {
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
            }
          }, () => formControlContext.dataset(), others));
        }
      });
    }
  });
}
function TextFieldTextArea(props) {
  let ref;
  const context = useTextFieldContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("textarea")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "autoResize", "submitOnEnter", "onKeyPress"]);
  createEffect(on([() => ref, () => local.autoResize, () => context.value()], ([ref2, autoResize]) => {
    if (!ref2 || !autoResize) {
      return;
    }
    adjustHeight(ref2);
  }));
  const onKeyPress = (event) => {
    if (ref && local.submitOnEnter && event.key === "Enter" && !event.shiftKey) {
      if (ref.form) {
        ref.form.requestSubmit();
        event.preventDefault();
      }
    }
  };
  return createComponent(TextFieldInputBase, mergeProps({
    as: "textarea",
    get ["aria-multiline"]() {
      return local.submitOnEnter ? "false" : void 0;
    },
    get onKeyPress() {
      return composeEventHandlers([local.onKeyPress, onKeyPress]);
    },
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    }
  }, others));
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

export { TextField, TextFieldInput, TextFieldRoot, TextFieldTextArea, text_field_exports };
