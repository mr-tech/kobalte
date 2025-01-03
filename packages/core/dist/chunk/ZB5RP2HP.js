import { SpinButtonRoot } from './OJC5QABG.js';
import { useLocale } from './XHJPQEZP.js';
import { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField } from './HLYNC3TZ.js';
import { FormControlDescription, FormControlErrorMessage, FormControlLabel, useFormControlContext, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { ButtonRoot } from './7OVKXYPU.js';
import { createControllableSignal } from './BLN63FDC.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, use, spread, memo, effect, style, template } from 'solid-js/web';
import { callHandler, mergeRefs, visuallyHiddenStyles, mergeDefaultProps, composeEventHandlers, createGenerateId, access, snapValueToStep, getPrecision } from '@kobalte/utils';
import { createContext, splitProps, batch, createUniqueId, createMemo, createSignal, createEffect, on, useContext } from 'solid-js';
import { NumberParser, NumberFormatter } from '@internationalized/number';

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
var NumberFieldContext = createContext();
function useNumberFieldContext() {
  const context = useContext(NumberFieldContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useNumberFieldContext` must be used within a `NumberField` component");
  }
  return context;
}

// src/number-field/number-field-vary-trigger.tsx
function NumberFieldVaryTrigger(props) {
  const formControlContext = useFormControlContext();
  const context = useNumberFieldContext();
  const [local, others] = splitProps(props, ["numberFieldVaryType", "onClick"]);
  return createComponent(ButtonRoot, mergeProps({
    tabIndex: -1,
    get disabled() {
      return formControlContext.isDisabled() || context.rawValue() === (local.numberFieldVaryType === "increment" ? context.maxValue() : context.minValue());
    },
    get ["aria-controls"]() {
      return formControlContext.fieldId();
    },
    onClick: (e) => {
      callHandler(e, local.onClick);
      context.varyValue(context.step() * (local.numberFieldVaryType === "increment" ? 1 : -1));
      context.inputRef()?.focus();
    }
  }, others));
}

// src/number-field/number-field-decrement-trigger.tsx
function NumberFieldDecrementTrigger(props) {
  return createComponent(NumberFieldVaryTrigger, mergeProps({
    numberFieldVaryType: "decrement"
  }, props));
}
var _tmpl$ = /* @__PURE__ */ template(`<div aria-hidden="true"><input type="text" tabindex="-1">`);
function NumberFieldHiddenInput(props) {
  const context = useNumberFieldContext();
  const [local, others] = splitProps(props, ["ref", "onChange"]);
  const formControlContext = useFormControlContext();
  return (() => {
    const _el$ = _tmpl$(), _el$2 = _el$.firstChild;
    _el$2.addEventListener("change", (e) => {
      callHandler(e, local.onChange);
      batch(() => {
        context.setValue(e.target.value);
        context.format();
      });
    });
    const _ref$ = mergeRefs(context.setHiddenInputRef, local.ref);
    typeof _ref$ === "function" && use(_ref$, _el$2);
    _el$2.style.setProperty("font-size", "16px");
    spread(_el$2, mergeProps({
      get name() {
        return formControlContext.name();
      },
      get value() {
        return memo(() => !!Number.isNaN(context.rawValue()))() ? "" : context.rawValue();
      },
      get required() {
        return formControlContext.isRequired();
      },
      get disabled() {
        return formControlContext.isDisabled();
      },
      get readOnly() {
        return formControlContext.isReadOnly();
      }
    }, others), false, false);
    effect((_$p) => style(_el$, visuallyHiddenStyles, _$p));
    return _el$;
  })();
}
function NumberFieldIncrementTrigger(props) {
  return createComponent(NumberFieldVaryTrigger, mergeProps({
    numberFieldVaryType: "increment"
  }, props));
}
function NumberFieldInput(props) {
  const formControlContext = useFormControlContext();
  const context = useNumberFieldContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("input"),
    inputMode: "decimal",
    autocomplete: "off",
    autocorrect: "off",
    spellcheck: false
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["ref", "onInput", "onChange", "onWheel", "as"], FORM_CONTROL_FIELD_PROP_NAMES);
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  return createComponent(SpinButtonRoot, mergeProps({
    type: "text",
    get id() {
      return fieldProps.id();
    },
    ref(r$) {
      const _ref$ = mergeRefs(context.setInputRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get value() {
      return context.value();
    },
    get validationState() {
      return formControlContext.validationState();
    },
    get required() {
      return formControlContext.isRequired();
    },
    get disabled() {
      return formControlContext.isDisabled();
    },
    get readOnly() {
      return formControlContext.isReadOnly();
    },
    get textValue() {
      return context.textValue();
    },
    get minValue() {
      return context.minValue();
    },
    get maxValue() {
      return context.maxValue();
    },
    onIncrement: () => {
      context.varyValue(context.step());
    },
    onIncrementPage: () => {
      context.varyValue(context.largeStep());
    },
    onIncrementToMax: () => {
      context.setValue(context.maxValue());
      context.format();
    },
    onDecrement: () => {
      context.varyValue(-context.step());
    },
    onDecrementPage: () => {
      context.varyValue(-context.largeStep());
    },
    onDecrementToMin: () => {
      context.setValue(context.minValue());
      context.format();
    },
    get translations() {
      return context.translations();
    },
    onChange: (e) => {
      callHandler(e, local.onChange);
      context.format();
    },
    onWheel: (e) => {
      callHandler(e, local.onWheel);
      if (!context.changeOnWheel() || document.activeElement !== context.inputRef())
        return;
      e.preventDefault();
      if (e.deltaY < 0)
        context.varyValue(context.step());
      else
        context.varyValue(-context.step());
    },
    get onInput() {
      return composeEventHandlers([local.onInput, context.onInput]);
    },
    get ["aria-label"]() {
      return fieldProps.ariaLabel();
    },
    get ["aria-labelledby"]() {
      return fieldProps.ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return fieldProps.ariaDescribedBy();
    }
  }, () => formControlContext.dataset(), {
    as: (props2) => createComponent(Polymorphic, mergeProps({
      get as() {
        return local.as || "input";
      },
      get value() {
        return memo(() => !!(Number.isNaN(context.rawValue()) || context.value() === void 0))() ? "" : context.formatNumber(context.rawValue());
      },
      get required() {
        return formControlContext.isRequired();
      },
      get disabled() {
        return formControlContext.isDisabled();
      },
      get readOnly() {
        return formControlContext.isReadOnly();
      }
    }, props2, others))
  }));
}
function NumberFieldRoot(props) {
  let ref;
  const defaultId = `NumberField-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    format: true,
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
    step: 1,
    changeOnWheel: true
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onChange", "rawValue", "onRawValueChange", "translations", "format", "formatOptions", "textValue", "minValue", "maxValue", "step", "largeStep", "changeOnWheel", "translations", "allowedInput"], FORM_CONTROL_PROP_NAMES);
  const {
    locale
  } = useLocale();
  const numberParser = createMemo(() => {
    return new NumberParser(locale(), local.formatOptions);
  });
  const numberFormatter = createMemo(() => {
    return new NumberFormatter(locale(), local.formatOptions);
  });
  const formatNumber = (number) => local.format ? numberFormatter().format(number) : number.toString();
  const parseRawValue = (value2) => local.format && typeof value2 !== "number" ? numberParser().parse(value2 ?? "") : Number(value2 ?? "");
  const isValidPartialValue = (value2) => local.format && typeof value2 !== "number" ? numberParser().isValidPartialNumber(value2 ?? "", mergedProps.minValue, mergedProps.maxValue) : !Number.isNaN(Number(value2));
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
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(() => ref, () => {
    setValue(local.defaultValue ?? "");
  });
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
      batch(() => {
        let newValue = rawValue;
        const operation = offset > 0 ? "+" : "-";
        const localStep = Math.abs(offset);
        const min = props.minValue === void 0 ? Number.NaN : context.minValue();
        const max = props.maxValue === void 0 ? Number.NaN : context.maxValue();
        newValue = snapValueToStep(rawValue, min, max, localStep);
        if (!(operation === "+" && newValue > rawValue || operation === "-" && newValue < rawValue)) {
          newValue = snapValueToStep(handleDecimalOperation(operation, rawValue, localStep), min, max, localStep);
        }
        context.setValue(newValue);
        context.format();
      });
    }
  };
  createEffect(on(() => local.rawValue, (rawValue) => {
    if (rawValue !== context.rawValue()) {
      if (Number.isNaN(rawValue))
        return;
      batch(() => {
        setValue(rawValue ?? "");
        context.format();
      });
    }
  }, {
    defer: true
  }));
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(NumberFieldContext.Provider, {
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

export { NumberField, NumberFieldDecrementTrigger, NumberFieldHiddenInput, NumberFieldIncrementTrigger, NumberFieldInput, NumberFieldRoot, number_field_exports };
