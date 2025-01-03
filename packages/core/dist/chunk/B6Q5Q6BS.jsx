import {
  SpinButtonRoot
} from "./7F47TQM2.jsx";
import {
  useLocale
} from "./LR7LBJN3.jsx";
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
  createControllableSignal
} from "./FN6EICGO.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

// src/number-field/index.tsx
var number_field_exports = {};
__export(number_field_exports, {
  DecrementTrigger: () => NumberFieldDecrementTrigger,
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  HiddenInput: () => NumberFieldHiddenInput,
  IncrementTrigger: () => NumberFieldIncrementTrigger,
  Input: () => NumberFieldInput,
  Label: () => FormControlLabel,
  NumberField: () => NumberField,
  Root: () => NumberFieldRoot
});

// src/number-field/number-field-vary-trigger.tsx
import { callHandler } from "@kobalte/utils";
import {
  splitProps
} from "solid-js";

// src/number-field/number-field-context.tsx
import {
  createContext,
  useContext
} from "solid-js";
var NumberFieldContext = createContext();
function useNumberFieldContext() {
  const context = useContext(NumberFieldContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useNumberFieldContext` must be used within a `NumberField` component"
    );
  }
  return context;
}

// src/number-field/number-field-vary-trigger.tsx
function NumberFieldVaryTrigger(props) {
  const formControlContext = useFormControlContext();
  const context = useNumberFieldContext();
  const [local, others] = splitProps(props, [
    "numberFieldVaryType",
    "onClick"
  ]);
  return <ButtonRoot
    tabIndex={-1}
    disabled={formControlContext.isDisabled() || context.rawValue() === (local.numberFieldVaryType === "increment" ? context.maxValue() : context.minValue())}
    aria-controls={formControlContext.fieldId()}
    onClick={(e) => {
      callHandler(e, local.onClick);
      context.varyValue(
        context.step() * (local.numberFieldVaryType === "increment" ? 1 : -1)
      );
      context.inputRef()?.focus();
    }}
    {...others}
  />;
}

// src/number-field/number-field-decrement-trigger.tsx
function NumberFieldDecrementTrigger(props) {
  return <NumberFieldVaryTrigger
    numberFieldVaryType="decrement"
    {...props}
  />;
}

// src/number-field/number-field-hidden-input.tsx
import { callHandler as callHandler2, mergeRefs, visuallyHiddenStyles } from "@kobalte/utils";
import { batch, splitProps as splitProps2 } from "solid-js";
function NumberFieldHiddenInput(props) {
  const context = useNumberFieldContext();
  const [local, others] = splitProps2(props, ["ref", "onChange"]);
  const formControlContext = useFormControlContext();
  return <div style={visuallyHiddenStyles} aria-hidden="true"><input
    ref={mergeRefs(context.setHiddenInputRef, local.ref)}
    type="text"
    tabIndex={-1}
    style={{ "font-size": "16px" }}
    name={formControlContext.name()}
    value={Number.isNaN(context.rawValue()) ? "" : context.rawValue()}
    required={formControlContext.isRequired()}
    disabled={formControlContext.isDisabled()}
    readOnly={formControlContext.isReadOnly()}
    onChange={(e) => {
      callHandler2(e, local.onChange);
      batch(() => {
        context.setValue(e.target.value);
        context.format();
      });
    }}
    {...others}
  /></div>;
}

// src/number-field/number-field-increment-trigger.tsx
function NumberFieldIncrementTrigger(props) {
  return <NumberFieldVaryTrigger
    numberFieldVaryType="increment"
    {...props}
  />;
}

// src/number-field/number-field-input.tsx
import {
  callHandler as callHandler3,
  composeEventHandlers,
  mergeDefaultProps,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  splitProps as splitProps3
} from "solid-js";
function NumberFieldInput(props) {
  const formControlContext = useFormControlContext();
  const context = useNumberFieldContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("input"),
      inputMode: "decimal",
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: false
    },
    props
  );
  const [local, formControlFieldProps, others] = splitProps3(
    mergedProps,
    ["ref", "onInput", "onChange", "onWheel", "as"],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const { fieldProps } = createFormControlField(formControlFieldProps);
  return <SpinButtonRoot
    type="text"
    id={fieldProps.id()}
    ref={mergeRefs2(context.setInputRef, local.ref)}
    value={context.value()}
    validationState={formControlContext.validationState()}
    required={formControlContext.isRequired()}
    disabled={formControlContext.isDisabled()}
    readOnly={formControlContext.isReadOnly()}
    textValue={context.textValue()}
    minValue={context.minValue()}
    maxValue={context.maxValue()}
    onIncrement={() => {
      context.varyValue(context.step());
    }}
    onIncrementPage={() => {
      context.varyValue(context.largeStep());
    }}
    onIncrementToMax={() => {
      context.setValue(context.maxValue());
      context.format();
    }}
    onDecrement={() => {
      context.varyValue(-context.step());
    }}
    onDecrementPage={() => {
      context.varyValue(-context.largeStep());
    }}
    onDecrementToMin={() => {
      context.setValue(context.minValue());
      context.format();
    }}
    translations={context.translations()}
    onChange={(e) => {
      callHandler3(e, local.onChange);
      context.format();
    }}
    onWheel={(e) => {
      callHandler3(e, local.onWheel);
      if (!context.changeOnWheel() || document.activeElement !== context.inputRef())
        return;
      e.preventDefault();
      if (e.deltaY < 0)
        context.varyValue(context.step());
      else
        context.varyValue(-context.step());
    }}
    onInput={composeEventHandlers([local.onInput, context.onInput])}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={fieldProps.ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    {...formControlContext.dataset()}
    as={(props2) => <Polymorphic
      as={local.as || "input"}
      value={Number.isNaN(context.rawValue()) || context.value() === void 0 ? "" : context.formatNumber(context.rawValue())}
      required={formControlContext.isRequired()}
      disabled={formControlContext.isDisabled()}
      readOnly={formControlContext.isReadOnly()}
      {...props2}
      {...others}
    />}
  />;
}

// src/number-field/number-field-root.tsx
import {
  access,
  createGenerateId,
  getPrecision,
  mergeDefaultProps as mergeDefaultProps2,
  mergeRefs as mergeRefs3,
  snapValueToStep
} from "@kobalte/utils";
import {
  batch as batch2,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  on,
  splitProps as splitProps4
} from "solid-js";
import { NumberFormatter, NumberParser } from "@internationalized/number";
function NumberFieldRoot(props) {
  let ref;
  const defaultId = `NumberField-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps2(
    {
      id: defaultId,
      format: true,
      minValue: Number.MIN_SAFE_INTEGER,
      maxValue: Number.MAX_SAFE_INTEGER,
      step: 1,
      changeOnWheel: true
    },
    props
  );
  const [local, formControlProps, others] = splitProps4(
    mergedProps,
    [
      "ref",
      "value",
      "defaultValue",
      "onChange",
      "rawValue",
      "onRawValueChange",
      "translations",
      "format",
      "formatOptions",
      "textValue",
      "minValue",
      "maxValue",
      "step",
      "largeStep",
      "changeOnWheel",
      "translations",
      "allowedInput"
    ],
    FORM_CONTROL_PROP_NAMES
  );
  const { locale } = useLocale();
  const numberParser = createMemo(() => {
    return new NumberParser(locale(), local.formatOptions);
  });
  const numberFormatter = createMemo(() => {
    return new NumberFormatter(locale(), local.formatOptions);
  });
  const formatNumber = (number) => local.format ? numberFormatter().format(number) : number.toString();
  const parseRawValue = (value2) => local.format && typeof value2 !== "number" ? numberParser().parse(value2 ?? "") : Number(value2 ?? "");
  const isValidPartialValue = (value2) => local.format && typeof value2 !== "number" ? numberParser().isValidPartialNumber(
    value2 ?? "",
    mergedProps.minValue,
    mergedProps.maxValue
  ) : !Number.isNaN(Number(value2));
  const [value, setValue] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue ?? local.rawValue,
    onChange: (value2) => {
      local.onChange?.(typeof value2 === "number" ? formatNumber(value2) : value2);
      local.onRawValueChange?.(parseRawValue(value2));
    }
  });
  if (value() !== void 0)
    local.onRawValueChange?.(parseRawValue(value()));
  function isAllowedInput(char) {
    if (local.allowedInput !== void 0)
      return local.allowedInput.test(char);
    return true;
  }
  const { formControlContext } = createFormControl(formControlProps);
  createFormResetListener(
    () => ref,
    () => {
      setValue(local.defaultValue ?? "");
    }
  );
  const [inputRef, setInputRef] = createSignal();
  const [hiddenInputRef, setHiddenInputRef] = createSignal();
  const onInput = (e) => {
    if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
      return;
    }
    const target = e.target;
    let cursorPosition = target.selectionStart;
    if (isValidPartialValue(target.value)) {
      if (e.inputType !== "insertText" || isAllowedInput(e.data || "")) {
        setValue(target.value);
      }
    } else {
      if (e.inputType === "deleteContentBackward") {
        if (cursorPosition !== null)
          cursorPosition += 1;
      }
    }
    const v = value();
    if (v !== target.value) {
      target.value = String(v ?? "");
      if (cursorPosition !== null) {
        target.selectionStart = cursorPosition;
        target.selectionEnd = cursorPosition;
      }
    }
  };
  const context = {
    value,
    setValue,
    rawValue: () => parseRawValue(value()),
    generateId: createGenerateId(() => access(formControlProps.id)),
    formatNumber,
    format: () => {
      if (!local.format)
        return;
      let rawValue = context.rawValue();
      if (Number.isNaN(rawValue)) {
        if (hiddenInputRef())
          hiddenInputRef().value = "";
        local.onRawValueChange?.(rawValue);
        return;
      }
      if (context.minValue())
        rawValue = Math.max(rawValue, context.minValue());
      if (context.maxValue())
        rawValue = Math.min(rawValue, context.maxValue());
      const formattedValue = context.formatNumber(rawValue);
      if (value() != formattedValue)
        setValue(formattedValue);
      if (inputRef())
        inputRef().value = formattedValue;
      if (hiddenInputRef())
        hiddenInputRef().value = String(rawValue);
    },
    onInput,
    textValue: () => local.textValue,
    minValue: () => local.minValue,
    maxValue: () => local.maxValue,
    step: () => local.step,
    largeStep: () => local.largeStep ?? local.step * 10,
    changeOnWheel: () => local.changeOnWheel,
    translations: () => local.translations,
    inputRef,
    setInputRef,
    hiddenInputRef,
    setHiddenInputRef,
    varyValue: (offset) => {
      let rawValue = context.rawValue() ?? 0;
      if (Number.isNaN(rawValue))
        rawValue = 0;
      batch2(() => {
        let newValue = rawValue;
        const operation = offset > 0 ? "+" : "-";
        const localStep = Math.abs(offset);
        const min = props.minValue === void 0 ? Number.NaN : context.minValue();
        const max = props.maxValue === void 0 ? Number.NaN : context.maxValue();
        newValue = snapValueToStep(rawValue, min, max, localStep);
        if (!(operation === "+" && newValue > rawValue || operation === "-" && newValue < rawValue)) {
          newValue = snapValueToStep(
            handleDecimalOperation(operation, rawValue, localStep),
            min,
            max,
            localStep
          );
        }
        context.setValue(newValue);
        context.format();
      });
    }
  };
  createEffect(
    on(
      () => local.rawValue,
      (rawValue) => {
        if (rawValue !== context.rawValue()) {
          if (Number.isNaN(rawValue))
            return;
          batch2(() => {
            setValue(rawValue ?? "");
            context.format();
          });
        }
      },
      { defer: true }
    )
  );
  return <FormControlContext.Provider value={formControlContext}><NumberFieldContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs3((el) => ref = el, local.ref)}
    role="group"
    id={access(formControlProps.id)}
    {...formControlContext.dataset()}
    {...others}
  /></NumberFieldContext.Provider></FormControlContext.Provider>;
}
function handleDecimalOperation(operator, value1, value2) {
  let result = operator === "+" ? value1 + value2 : value1 - value2;
  if (Number.isFinite(value1) && Number.isFinite(value2) && (value2 % 1 !== 0 || value1 % 1 !== 0)) {
    const offsetPrecision = getPrecision(value2);
    const valuePrecision = getPrecision(value1);
    const multiplier = 10 ** Math.max(offsetPrecision, valuePrecision);
    const multipliedOffset = Math.round(value2 * multiplier);
    const multipliedValue = Math.round(value1 * multiplier);
    const next = operator === "+" ? multipliedValue + multipliedOffset : multipliedValue - multipliedOffset;
    result = next / multiplier;
  }
  return result;
}

// src/number-field/index.tsx
var NumberField = Object.assign(NumberFieldRoot, {
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  HiddenInput: NumberFieldHiddenInput,
  Input: NumberFieldInput,
  IncrementTrigger: NumberFieldIncrementTrigger,
  DecrementTrigger: NumberFieldDecrementTrigger,
  Label: FormControlLabel
});

export {
  NumberFieldDecrementTrigger,
  NumberFieldHiddenInput,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldRoot,
  NumberField,
  number_field_exports
};
