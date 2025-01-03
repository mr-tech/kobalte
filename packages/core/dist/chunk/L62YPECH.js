import { createDomCollectionItem, createDomCollection } from './7CVNMTYF.js';
import { createNumberFormatter, useLocale } from './XHJPQEZP.js';
import { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField } from './HLYNC3TZ.js';
import { FormControlDescription, FormControlErrorMessage, FormControlLabel, useFormControlContext, FORM_CONTROL_PROP_NAMES, createFormControl, FormControlContext } from './Q2DJLZQE.js';
import { createFormResetListener } from './ANN3A2QM.js';
import { createControllableArraySignal } from './BLN63FDC.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, spread, template } from 'solid-js/web';
import { createContext, splitProps, createUniqueId, onMount, createSignal, createEffect, createMemo, useContext } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';
import { mergeDefaultProps, mergeRefs, visuallyHiddenStyles, createGenerateId, access, callHandler, snapValueToStep, clamp } from '@kobalte/utils';

// src/slider/index.tsx
var slider_exports = {};
__export(slider_exports, {
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  Fill: () => SliderFill,
  Input: () => SliderInput,
  Label: () => FormControlLabel,
  Root: () => SliderRoot,
  Slider: () => Slider,
  Thumb: () => SliderThumb,
  Track: () => SliderTrack,
  ValueLabel: () => SliderValueLabel
});
var SliderContext = createContext();
function useSliderContext() {
  const context = useContext(SliderContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useSliderContext` must be used within a `Slider.Root` component");
  }
  return context;
}

// src/slider/slider-fill.tsx
function SliderFill(props) {
  const context = useSliderContext();
  const [local, others] = splitProps(props, ["style"]);
  const percentages = () => {
    return context.state.values().map((value) => context.state.getValuePercent(value) * 100);
  };
  const offsetStart = () => {
    return context.state.values().length > 1 ? Math.min(...percentages()) : 0;
  };
  const offsetEnd = () => {
    return 100 - Math.max(...percentages());
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    get style() {
      return combineStyle({
        [context.startEdge()]: `${offsetStart()}%`,
        [context.endEdge()]: `${offsetEnd()}%`
      }, local.style);
    }
  }, () => context.dataset(), others));
}
function SliderThumb(props) {
  let ref;
  const context = useSliderContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId(`thumb-${createUniqueId()}`)
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["ref", "style", "onKeyDown", "onPointerDown", "onPointerMove", "onPointerUp", "onFocus", "onBlur"], FORM_CONTROL_FIELD_PROP_NAMES);
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  createDomCollectionItem({
    getItem: () => ({
      ref: () => ref,
      disabled: context.state.isDisabled(),
      key: fieldProps.id(),
      textValue: "",
      type: "item"
    })
  });
  const index = () => ref ? context.thumbs().findIndex((v) => v.ref() === ref) : -1;
  const value = () => context.state.getThumbValue(index());
  const position = () => {
    return context.state.getThumbPercent(index());
  };
  const transform = () => {
    if (context.state.orientation() === "vertical") {
      return context.inverted() ? "translateY(-50%)" : "translateY(50%)";
    }
    return context.inverted() ? "translateX(50%)" : "translateX(-50%)";
  };
  let startPosition = 0;
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    context.onStepKeyDown(e, index());
  };
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    const target = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    target.setPointerCapture(e.pointerId);
    target.focus();
    startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
    if (value() !== void 0) {
      context.onSlideStart?.(index(), value());
    }
  };
  const onPointerMove = (e) => {
    e.stopPropagation();
    callHandler(e, local.onPointerMove);
    const target = e.currentTarget;
    if (target.hasPointerCapture(e.pointerId)) {
      const delta = {
        deltaX: e.clientX - startPosition,
        deltaY: e.clientY - startPosition
      };
      context.onSlideMove?.(delta);
      startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
    }
  };
  const onPointerUp = (e) => {
    e.stopPropagation();
    callHandler(e, local.onPointerUp);
    const target = e.currentTarget;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
      context.onSlideEnd?.();
    }
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    context.state.setFocusedThumb(index());
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    context.state.setFocusedThumb(void 0);
  };
  onMount(() => {
    context.state.setThumbEditable(index(), !context.state.isDisabled());
  });
  return createComponent(ThumbContext.Provider, {
    value: {
      index
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "span",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        },
        role: "slider",
        get id() {
          return fieldProps.id();
        },
        get tabIndex() {
          return context.state.isDisabled() ? void 0 : 0;
        },
        get style() {
          return combineStyle({
            display: value() === void 0 ? "none" : void 0,
            position: "absolute",
            [context.startEdge()]: `calc(${position() * 100}%)`,
            transform: transform(),
            "touch-action": "none"
          }, local.style);
        },
        get ["aria-valuetext"]() {
          return context.state.getThumbValueLabel(index());
        },
        get ["aria-valuemin"]() {
          return context.minValue();
        },
        get ["aria-valuenow"]() {
          return value();
        },
        get ["aria-valuemax"]() {
          return context.maxValue();
        },
        get ["aria-orientation"]() {
          return context.state.orientation();
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
        onKeyDown,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onFocus,
        onBlur
      }, () => context.dataset(), others));
    }
  });
}
var ThumbContext = createContext();
function useThumbContext() {
  const context = useContext(ThumbContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useThumbContext` must be used within a `Slider.Thumb` component");
  }
  return context;
}

// src/slider/slider-input.tsx
var _tmpl$ = /* @__PURE__ */ template(`<input type="range">`);
function SliderInput(props) {
  const formControlContext = useFormControlContext();
  const context = useSliderContext();
  const thumb = useThumbContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("input")
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["style", "onChange"], FORM_CONTROL_FIELD_PROP_NAMES);
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  const [valueText, setValueText] = createSignal("");
  const onChange = (e) => {
    callHandler(e, local.onChange);
    const target = e.target;
    context.state.setThumbValue(thumb.index(), Number.parseFloat(target.value));
    target.value = String(context.state.values()[thumb.index()]) ?? "";
  };
  createEffect(() => {
    setValueText(thumb.index() === -1 ? "" : context.state.getThumbValueLabel(thumb.index()));
  });
  return (() => {
    const _el$ = _tmpl$();
    _el$.addEventListener("change", onChange);
    spread(_el$, mergeProps({
      get id() {
        return fieldProps.id();
      },
      get name() {
        return formControlContext.name();
      },
      get tabIndex() {
        return context.state.isDisabled() ? void 0 : -1;
      },
      get min() {
        return context.state.getThumbMinValue(thumb.index());
      },
      get max() {
        return context.state.getThumbMaxValue(thumb.index());
      },
      get step() {
        return context.state.step();
      },
      get value() {
        return context.state.values()[thumb.index()];
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
      get ["aria-orientation"]() {
        return context.state.orientation();
      },
      get ["aria-valuetext"]() {
        return valueText();
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
      }
    }, () => context.dataset(), others), false, false);
    return _el$;
  })();
}

// src/slider/utils.ts
function getNextSortedValues(prevValues, nextValue, atIndex) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.sort((a, b) => a - b);
}
function getClosestValueIndex(values, nextValue) {
  if (values.length === 1)
    return 0;
  const distances = values.map((value) => Math.abs(value - nextValue));
  const closestDistance = Math.min(...distances);
  const closestIndex = distances.indexOf(closestDistance);
  return nextValue < values[closestIndex] ? closestIndex : distances.lastIndexOf(closestDistance);
}
function getStepsBetweenValues(values) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values);
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
  }
  return true;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function stopEventDefaultAndPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}

// src/slider/create-slider-state.ts
function createSliderState(props) {
  let dirty = false;
  const mergedProps = mergeDefaultProps(
    {
      minValue: () => 0,
      maxValue: () => 100,
      step: () => 1,
      minStepsBetweenThumbs: () => 0,
      orientation: () => "horizontal",
      isDisabled: () => false
    },
    props
  );
  const pageSize = createMemo(() => {
    let calcPageSize = (mergedProps.maxValue() - mergedProps.minValue()) / 10;
    calcPageSize = snapValueToStep(
      calcPageSize,
      0,
      calcPageSize + mergedProps.step(),
      mergedProps.step()
    );
    return Math.max(calcPageSize, mergedProps.step());
  });
  const defaultValue = createMemo(() => {
    return mergedProps.defaultValue() ?? [mergedProps.minValue()];
  });
  const [values, setValues] = createControllableArraySignal({
    value: () => mergedProps.value(),
    defaultValue,
    onChange: (values2) => mergedProps.onChange?.(values2)
  });
  const [isDragging, setIsDragging] = createSignal(
    new Array(values().length).fill(false)
  );
  const [isEditables, setEditables] = createSignal(
    new Array(values().length).fill(false)
  );
  const [focusedIndex, setFocusedIndex] = createSignal(
    void 0
  );
  const resetValues = () => {
    setValues(defaultValue());
  };
  const getValuePercent = (value) => {
    return (value - mergedProps.minValue()) / (mergedProps.maxValue() - mergedProps.minValue());
  };
  const getThumbMinValue = (index) => {
    return index === 0 ? props.minValue() : values()[index - 1] + props.minStepsBetweenThumbs() * props.step();
  };
  const getThumbMaxValue = (index) => {
    return index === values().length - 1 ? props.maxValue() : values()[index + 1] - props.minStepsBetweenThumbs() * props.step();
  };
  const isThumbEditable = (index) => {
    return isEditables()[index];
  };
  const setThumbEditable = (index) => {
    setEditables((p) => {
      p[index] = true;
      return p;
    });
  };
  const updateValue = (index, value) => {
    if (mergedProps.isDisabled() || !isThumbEditable(index))
      return;
    const snappedValue = snapValueToStep(
      value,
      getThumbMinValue(index),
      getThumbMaxValue(index),
      mergedProps.step()
    );
    const nextValues = getNextSortedValues(values(), snappedValue, index);
    if (!hasMinStepsBetweenValues(
      nextValues,
      mergedProps.minStepsBetweenThumbs() * mergedProps.step()
    )) {
      return;
    }
    setValues((prev) => [...replaceIndex(prev, index, snappedValue)]);
  };
  const updateDragging = (index, dragging) => {
    if (mergedProps.isDisabled() || !isThumbEditable(index))
      return;
    const wasDragging = isDragging()[index];
    setIsDragging((p) => [...replaceIndex(p, index, dragging)]);
    if (wasDragging && !isDragging().some(Boolean)) {
      mergedProps.onChangeEnd?.(values());
    }
  };
  const getFormattedValue = (value) => {
    return mergedProps.numberFormatter.format(value);
  };
  const setThumbPercent = (index, percent) => {
    updateValue(index, getPercentValue(percent));
  };
  const getRoundedValue = (value) => {
    return Math.round((value - mergedProps.minValue()) / mergedProps.step()) * mergedProps.step() + mergedProps.minValue();
  };
  const getPercentValue = (percent) => {
    const val = percent * (mergedProps.maxValue() - mergedProps.minValue()) + mergedProps.minValue();
    return clamp(
      getRoundedValue(val),
      mergedProps.minValue(),
      mergedProps.maxValue()
    );
  };
  const snapThumbValue = (index, value) => {
    const nextValue = values()[index] + value;
    const nextValues = getNextSortedValues(values(), nextValue, index);
    if (hasMinStepsBetweenValues(
      nextValues,
      mergedProps.minStepsBetweenThumbs() * mergedProps.step()
    )) {
      updateValue(
        index,
        snapValueToStep(
          nextValue,
          mergedProps.minValue(),
          mergedProps.maxValue(),
          mergedProps.step()
        )
      );
    }
  };
  const incrementThumb = (index, stepSize = 1) => {
    dirty = true;
    snapThumbValue(index, Math.max(stepSize, props.step()));
  };
  const decrementThumb = (index, stepSize = 1) => {
    dirty = true;
    snapThumbValue(index, -Math.max(stepSize, props.step()));
  };
  return {
    values,
    getThumbValue: (index) => values()[index],
    setThumbValue: updateValue,
    setThumbPercent,
    isThumbDragging: (index) => isDragging()[index],
    setThumbDragging: updateDragging,
    focusedThumb: focusedIndex,
    setFocusedThumb: (index) => {
      if (index === void 0 && dirty) {
        dirty = false;
        mergedProps.onChangeEnd?.(values());
      }
      setFocusedIndex(index);
    },
    getThumbPercent: (index) => getValuePercent(values()[index]),
    getValuePercent,
    getThumbValueLabel: (index) => getFormattedValue(values()[index]),
    getFormattedValue,
    getThumbMinValue,
    getThumbMaxValue,
    getPercentValue,
    isThumbEditable,
    setThumbEditable,
    incrementThumb,
    decrementThumb,
    step: mergedProps.step,
    pageSize,
    orientation: mergedProps.orientation,
    isDisabled: mergedProps.isDisabled,
    setValues,
    resetValues
  };
}
function replaceIndex(array, index, value) {
  if (array[index] === value) {
    return array;
  }
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

// src/slider/slider-root.tsx
function SliderRoot(props) {
  let ref;
  const defaultId = `slider-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    minValue: 0,
    maxValue: 100,
    step: 1,
    minStepsBetweenThumbs: 0,
    orientation: "horizontal",
    disabled: false,
    inverted: false,
    getValueLabel: (params) => params.values.join(", ")
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onChange", "onChangeEnd", "inverted", "minValue", "maxValue", "step", "minStepsBetweenThumbs", "getValueLabel", "orientation"], FORM_CONTROL_PROP_NAMES);
  const {
    formControlContext
  } = createFormControl(formControlProps);
  const defaultFormatter = createNumberFormatter(() => ({
    style: "decimal"
  }));
  const {
    direction
  } = useLocale();
  const state = createSliderState({
    value: () => local.value,
    defaultValue: () => local.defaultValue ?? [local.minValue],
    maxValue: () => local.maxValue,
    minValue: () => local.minValue,
    minStepsBetweenThumbs: () => local.minStepsBetweenThumbs,
    isDisabled: () => formControlContext.isDisabled() ?? false,
    orientation: () => local.orientation,
    step: () => local.step,
    numberFormatter: defaultFormatter(),
    onChange: local.onChange,
    onChangeEnd: local.onChangeEnd
  });
  const [thumbs, setThumbs] = createSignal([]);
  const {
    DomCollectionProvider
  } = createDomCollection({
    items: thumbs,
    onItemsChange: setThumbs
  });
  createFormResetListener(() => ref, () => state.resetValues());
  const isLTR = () => direction() === "ltr";
  const isSlidingFromLeft = () => {
    return isLTR() && !local.inverted || !isLTR() && local.inverted;
  };
  const isSlidingFromBottom = () => !local.inverted;
  const isVertical = () => state.orientation() === "vertical";
  const dataset = createMemo(() => {
    return {
      ...formControlContext.dataset(),
      "data-orientation": local.orientation
    };
  });
  const [trackRef, setTrackRef] = createSignal();
  let currentPosition = null;
  const onSlideStart = (index, value) => {
    state.setFocusedThumb(index);
    state.setThumbDragging(index, true);
    state.setThumbValue(index, value);
    currentPosition = null;
  };
  const onSlideMove = ({
    deltaX,
    deltaY
  }) => {
    const active = state.focusedThumb();
    if (active === void 0) {
      return;
    }
    const {
      width,
      height
    } = trackRef().getBoundingClientRect();
    const size = isVertical() ? height : width;
    if (currentPosition === null) {
      currentPosition = state.getThumbPercent(state.focusedThumb()) * size;
    }
    let delta = isVertical() ? deltaY : deltaX;
    if (!isVertical() && local.inverted || isVertical() && isSlidingFromBottom()) {
      delta = -delta;
    }
    currentPosition += delta;
    const percent = clamp(currentPosition / size, 0, 1);
    const nextValues = getNextSortedValues(state.values(), currentPosition, active);
    if (hasMinStepsBetweenValues(nextValues, local.minStepsBetweenThumbs * state.step())) {
      state.setThumbPercent(state.focusedThumb(), percent);
      local.onChange?.(state.values());
    }
  };
  const onSlideEnd = () => {
    const activeThumb = state.focusedThumb();
    if (activeThumb !== void 0) {
      state.setThumbDragging(activeThumb, false);
      thumbs()[activeThumb].ref().focus();
    }
  };
  const onHomeKeyDown = (event) => {
    const focusedThumb = state.focusedThumb();
    if (!formControlContext.isDisabled() && focusedThumb !== void 0) {
      stopEventDefaultAndPropagation(event);
      state.setThumbValue(focusedThumb, state.getThumbMinValue(focusedThumb));
    }
  };
  const onEndKeyDown = (event) => {
    const focusedThumb = state.focusedThumb();
    if (!formControlContext.isDisabled() && focusedThumb !== void 0) {
      stopEventDefaultAndPropagation(event);
      state.setThumbValue(focusedThumb, state.getThumbMaxValue(focusedThumb));
    }
  };
  const onStepKeyDown = (event, index) => {
    if (!formControlContext.isDisabled()) {
      switch (event.key) {
        case "Left":
        case "ArrowLeft":
        case "Down":
        case "ArrowDown":
          stopEventDefaultAndPropagation(event);
          if (!isLTR()) {
            state.incrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
          } else {
            state.decrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
          }
          break;
        case "Right":
        case "ArrowRight":
        case "Up":
        case "ArrowUp":
          stopEventDefaultAndPropagation(event);
          if (!isLTR()) {
            state.decrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
          } else {
            state.incrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
          }
          break;
        case "Home":
          onHomeKeyDown(event);
          break;
        case "End":
          onEndKeyDown(event);
          break;
        case "PageUp":
          stopEventDefaultAndPropagation(event);
          state.incrementThumb(index, state.pageSize());
          break;
        case "PageDown":
          stopEventDefaultAndPropagation(event);
          state.decrementThumb(index, state.pageSize());
          break;
      }
    }
  };
  const startEdge = createMemo(() => {
    if (isVertical()) {
      return isSlidingFromBottom() ? "bottom" : "top";
    }
    return isSlidingFromLeft() ? "left" : "right";
  });
  const endEdge = createMemo(() => {
    if (isVertical()) {
      return isSlidingFromBottom() ? "top" : "bottom";
    }
    return isSlidingFromLeft() ? "right" : "left";
  });
  const context = {
    dataset,
    state,
    thumbs,
    setThumbs,
    onSlideStart,
    onSlideMove,
    onSlideEnd,
    onStepKeyDown,
    isSlidingFromLeft,
    isSlidingFromBottom,
    trackRef,
    minValue: () => local.minValue,
    maxValue: () => local.maxValue,
    inverted: () => local.inverted,
    startEdge,
    endEdge,
    registerTrack: (ref2) => setTrackRef(ref2),
    generateId: createGenerateId(() => access(formControlProps.id)),
    getValueLabel: local.getValueLabel
  };
  return createComponent(DomCollectionProvider, {
    get children() {
      return createComponent(FormControlContext.Provider, {
        value: formControlContext,
        get children() {
          return createComponent(SliderContext.Provider, {
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
              }, dataset, others));
            }
          });
        }
      });
    }
  });
}
function SliderTrack(props) {
  const context = useSliderContext();
  const [local, others] = splitProps(props, ["onPointerDown", "onPointerMove", "onPointerUp"]);
  const [sRect, setRect] = createSignal();
  function getValueFromPointer(pointerPosition) {
    const rect = sRect() || context.trackRef().getBoundingClientRect();
    const input = [0, context.state.orientation() === "vertical" ? rect.height : rect.width];
    let output = context.isSlidingFromLeft() ? [context.minValue(), context.maxValue()] : [context.maxValue(), context.minValue()];
    if (context.state.orientation() === "vertical") {
      output = context.isSlidingFromBottom() ? [context.maxValue(), context.minValue()] : [context.minValue(), context.maxValue()];
    }
    const value = linearScale(input, output);
    setRect(rect);
    return value(pointerPosition - (context.state.orientation() === "vertical" ? rect.top : rect.left));
  }
  let startPosition = 0;
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    e.preventDefault();
    const value = getValueFromPointer(context.state.orientation() === "horizontal" ? e.clientX : e.clientY);
    startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
    const closestIndex = getClosestValueIndex(context.state.values(), value);
    context.onSlideStart?.(closestIndex, value);
  };
  const onPointerMove = (e) => {
    callHandler(e, local.onPointerMove);
    const target = e.target;
    if (target.hasPointerCapture(e.pointerId)) {
      context.onSlideMove?.({
        deltaX: e.clientX - startPosition,
        deltaY: e.clientY - startPosition
      });
      startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
    }
  };
  const onPointerUp = (e) => {
    callHandler(e, local.onPointerUp);
    const target = e.target;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
      setRect(void 0);
      context.onSlideEnd?.();
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.registerTrack, props.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    onPointerDown,
    onPointerMove,
    onPointerUp
  }, () => context.dataset(), others));
}
function SliderValueLabel(props) {
  const context = useSliderContext();
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), props, {
    get children() {
      return context.getValueLabel?.({
        values: context.state.values(),
        max: context.maxValue(),
        min: context.minValue()
      });
    }
  }));
}

// src/slider/index.tsx
var Slider = Object.assign(SliderRoot, {
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  Fill: SliderFill,
  Input: SliderInput,
  Label: FormControlLabel,
  Thumb: SliderThumb,
  Track: SliderTrack,
  ValueLabel: SliderValueLabel
});

export { Slider, SliderFill, SliderInput, SliderRoot, SliderThumb, SliderTrack, SliderValueLabel, slider_exports };
