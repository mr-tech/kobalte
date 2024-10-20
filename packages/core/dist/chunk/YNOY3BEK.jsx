import {
  createDomCollection,
  createDomCollectionItem
} from "./SOM3K36D.jsx";
import {
  createNumberFormatter,
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
  createControllableArraySignal
} from "./FN6EICGO.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

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

// src/slider/slider-fill.tsx
import { splitProps } from "solid-js";
import { combineStyle } from "@solid-primitives/props";

// src/slider/slider-context.tsx
import {
  createContext,
  useContext
} from "solid-js";
var SliderContext = createContext();
function useSliderContext() {
  const context = useContext(SliderContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useSliderContext` must be used within a `Slider.Root` component"
    );
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
  return <Polymorphic
    as="div"
    style={combineStyle(
      {
        [context.startEdge()]: `${offsetStart()}%`,
        [context.endEdge()]: `${offsetEnd()}%`
      },
      local.style
    )}
    {...context.dataset()}
    {...others}
  />;
}

// src/slider/slider-input.tsx
import {
  callHandler as callHandler2,
  mergeDefaultProps as mergeDefaultProps2,
  visuallyHiddenStyles
} from "@kobalte/utils";
import {
  createEffect,
  createSignal,
  splitProps as splitProps3
} from "solid-js";
import { combineStyle as combineStyle3 } from "@solid-primitives/props";

// src/slider/slider-thumb.tsx
import {
  callHandler,
  mergeDefaultProps,
  mergeRefs
} from "@kobalte/utils";
import {
  createContext as createContext2,
  createUniqueId,
  onMount,
  splitProps as splitProps2,
  useContext as useContext2
} from "solid-js";
import { combineStyle as combineStyle2 } from "@solid-primitives/props";
function SliderThumb(props) {
  let ref;
  const context = useSliderContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId(`thumb-${createUniqueId()}`)
    },
    props
  );
  const [local, formControlFieldProps, others] = splitProps2(
    mergedProps,
    [
      "ref",
      "style",
      "onKeyDown",
      "onPointerDown",
      "onPointerMove",
      "onPointerUp",
      "onFocus",
      "onBlur"
    ],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const { fieldProps } = createFormControlField(formControlFieldProps);
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
  return <ThumbContext.Provider value={{ index }}><Polymorphic
    as="span"
    ref={mergeRefs((el) => ref = el, local.ref)}
    role="slider"
    id={fieldProps.id()}
    tabIndex={context.state.isDisabled() ? void 0 : 0}
    style={combineStyle2(
      {
        display: value() === void 0 ? "none" : void 0,
        position: "absolute",
        [context.startEdge()]: `calc(${position() * 100}%)`,
        transform: transform(),
        "touch-action": "none"
      },
      local.style
    )}
    aria-valuetext={context.state.getThumbValueLabel(index())}
    aria-valuemin={context.minValue()}
    aria-valuenow={value()}
    aria-valuemax={context.maxValue()}
    aria-orientation={context.state.orientation()}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={fieldProps.ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    onKeyDown={onKeyDown}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    onFocus={onFocus}
    onBlur={onBlur}
    {...context.dataset()}
    {...others}
  /></ThumbContext.Provider>;
}
var ThumbContext = createContext2();
function useThumbContext() {
  const context = useContext2(ThumbContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useThumbContext` must be used within a `Slider.Thumb` component"
    );
  }
  return context;
}

// src/slider/slider-input.tsx
function SliderInput(props) {
  const formControlContext = useFormControlContext();
  const context = useSliderContext();
  const thumb = useThumbContext();
  const mergedProps = mergeDefaultProps2(
    {
      id: context.generateId("input")
    },
    props
  );
  const [local, formControlFieldProps, others] = splitProps3(
    mergedProps,
    ["style", "onChange"],
    FORM_CONTROL_FIELD_PROP_NAMES
  );
  const { fieldProps } = createFormControlField(formControlFieldProps);
  const [valueText, setValueText] = createSignal("");
  const onChange = (e) => {
    callHandler2(e, local.onChange);
    const target = e.target;
    context.state.setThumbValue(thumb.index(), Number.parseFloat(target.value));
    target.value = String(context.state.values()[thumb.index()]) ?? "";
  };
  createEffect(() => {
    setValueText(
      thumb.index() === -1 ? "" : context.state.getThumbValueLabel(thumb.index())
    );
  });
  return <input
    type="range"
    id={fieldProps.id()}
    name={formControlContext.name()}
    tabIndex={context.state.isDisabled() ? void 0 : -1}
    min={context.state.getThumbMinValue(thumb.index())}
    max={context.state.getThumbMaxValue(thumb.index())}
    step={context.state.step()}
    value={context.state.values()[thumb.index()]}
    required={formControlContext.isRequired()}
    disabled={formControlContext.isDisabled()}
    readonly={formControlContext.isReadOnly()}
    style={combineStyle3({ ...visuallyHiddenStyles }, local.style)}
    aria-orientation={context.state.orientation()}
    aria-valuetext={valueText()}
    aria-label={fieldProps.ariaLabel()}
    aria-labelledby={fieldProps.ariaLabelledBy()}
    aria-describedby={fieldProps.ariaDescribedBy()}
    aria-invalid={formControlContext.validationState() === "invalid" || void 0}
    aria-required={formControlContext.isRequired() || void 0}
    aria-disabled={formControlContext.isDisabled() || void 0}
    aria-readonly={formControlContext.isReadOnly() || void 0}
    onChange={onChange}
    {...context.dataset()}
    {...others}
  />;
}

// src/slider/slider-root.tsx
import {
  access,
  clamp as clamp2,
  createGenerateId,
  mergeDefaultProps as mergeDefaultProps4,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  createMemo as createMemo2,
  createSignal as createSignal3,
  createUniqueId as createUniqueId2,
  splitProps as splitProps4
} from "solid-js";

// src/slider/create-slider-state.ts
import { clamp, mergeDefaultProps as mergeDefaultProps3, snapValueToStep } from "@kobalte/utils";
import { createMemo, createSignal as createSignal2 } from "solid-js";

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
  const mergedProps = mergeDefaultProps3(
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
  const [isDragging, setIsDragging] = createSignal2(
    new Array(values().length).fill(false)
  );
  const [isEditables, setEditables] = createSignal2(
    new Array(values().length).fill(false)
  );
  const [focusedIndex, setFocusedIndex] = createSignal2(
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
  const defaultId = `slider-${createUniqueId2()}`;
  const mergedProps = mergeDefaultProps4(
    {
      id: defaultId,
      minValue: 0,
      maxValue: 100,
      step: 1,
      minStepsBetweenThumbs: 0,
      orientation: "horizontal",
      disabled: false,
      inverted: false,
      getValueLabel: (params) => params.values.join(", ")
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
      "onChangeEnd",
      "inverted",
      "minValue",
      "maxValue",
      "step",
      "minStepsBetweenThumbs",
      "getValueLabel",
      "orientation"
    ],
    FORM_CONTROL_PROP_NAMES
  );
  const { formControlContext } = createFormControl(formControlProps);
  const defaultFormatter = createNumberFormatter(() => ({ style: "decimal" }));
  const { direction } = useLocale();
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
  const [thumbs, setThumbs] = createSignal3([]);
  const { DomCollectionProvider } = createDomCollection({
    items: thumbs,
    onItemsChange: setThumbs
  });
  createFormResetListener(
    () => ref,
    () => state.resetValues()
  );
  const isLTR = () => direction() === "ltr";
  const isSlidingFromLeft = () => {
    return isLTR() && !local.inverted || !isLTR() && local.inverted;
  };
  const isSlidingFromBottom = () => !local.inverted;
  const isVertical = () => state.orientation() === "vertical";
  const dataset = createMemo2(() => {
    return {
      ...formControlContext.dataset(),
      "data-orientation": local.orientation
    };
  });
  const [trackRef, setTrackRef] = createSignal3();
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
    const { width, height } = trackRef().getBoundingClientRect();
    const size = isVertical() ? height : width;
    if (currentPosition === null) {
      currentPosition = state.getThumbPercent(state.focusedThumb()) * size;
    }
    let delta = isVertical() ? deltaY : deltaX;
    if (!isVertical() && local.inverted || isVertical() && isSlidingFromBottom()) {
      delta = -delta;
    }
    currentPosition += delta;
    const percent = clamp2(currentPosition / size, 0, 1);
    const nextValues = getNextSortedValues(
      state.values(),
      currentPosition,
      active
    );
    if (hasMinStepsBetweenValues(
      nextValues,
      local.minStepsBetweenThumbs * state.step()
    )) {
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
            state.incrementThumb(
              index,
              event.shiftKey ? state.pageSize() : state.step()
            );
          } else {
            state.decrementThumb(
              index,
              event.shiftKey ? state.pageSize() : state.step()
            );
          }
          break;
        case "Right":
        case "ArrowRight":
        case "Up":
        case "ArrowUp":
          stopEventDefaultAndPropagation(event);
          if (!isLTR()) {
            state.decrementThumb(
              index,
              event.shiftKey ? state.pageSize() : state.step()
            );
          } else {
            state.incrementThumb(
              index,
              event.shiftKey ? state.pageSize() : state.step()
            );
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
  const startEdge = createMemo2(() => {
    if (isVertical()) {
      return isSlidingFromBottom() ? "bottom" : "top";
    }
    return isSlidingFromLeft() ? "left" : "right";
  });
  const endEdge = createMemo2(() => {
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
  return <DomCollectionProvider><FormControlContext.Provider value={formControlContext}><SliderContext.Provider value={context}><Polymorphic
    as="div"
    ref={mergeRefs2((el) => ref = el, local.ref)}
    role="group"
    id={access(formControlProps.id)}
    {...dataset()}
    {...others}
  /></SliderContext.Provider></FormControlContext.Provider></DomCollectionProvider>;
}

// src/slider/slider-track.tsx
import { callHandler as callHandler3, mergeRefs as mergeRefs3 } from "@kobalte/utils";
import {
  createSignal as createSignal4,
  splitProps as splitProps5
} from "solid-js";
function SliderTrack(props) {
  const context = useSliderContext();
  const [local, others] = splitProps5(props, [
    "onPointerDown",
    "onPointerMove",
    "onPointerUp"
  ]);
  const [sRect, setRect] = createSignal4();
  function getValueFromPointer(pointerPosition) {
    const rect = sRect() || context.trackRef().getBoundingClientRect();
    const input = [
      0,
      context.state.orientation() === "vertical" ? rect.height : rect.width
    ];
    let output = context.isSlidingFromLeft() ? [context.minValue(), context.maxValue()] : [context.maxValue(), context.minValue()];
    if (context.state.orientation() === "vertical") {
      output = context.isSlidingFromBottom() ? [context.maxValue(), context.minValue()] : [context.minValue(), context.maxValue()];
    }
    const value = linearScale(input, output);
    setRect(rect);
    return value(
      pointerPosition - (context.state.orientation() === "vertical" ? rect.top : rect.left)
    );
  }
  let startPosition = 0;
  const onPointerDown = (e) => {
    callHandler3(e, local.onPointerDown);
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    e.preventDefault();
    const value = getValueFromPointer(
      context.state.orientation() === "horizontal" ? e.clientX : e.clientY
    );
    startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
    const closestIndex = getClosestValueIndex(context.state.values(), value);
    context.onSlideStart?.(closestIndex, value);
  };
  const onPointerMove = (e) => {
    callHandler3(e, local.onPointerMove);
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
    callHandler3(e, local.onPointerUp);
    const target = e.target;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
      setRect(void 0);
      context.onSlideEnd?.();
    }
  };
  return <Polymorphic
    as="div"
    ref={mergeRefs3(context.registerTrack, props.ref)}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    {...context.dataset()}
    {...others}
  />;
}

// src/slider/slider-value-label.tsx
function SliderValueLabel(props) {
  const context = useSliderContext();
  return <Polymorphic
    as="div"
    {...context.dataset()}
    {...props}
  >{context.getValueLabel?.({
    values: context.state.values(),
    max: context.maxValue(),
    min: context.minValue()
  })}</Polymorphic>;
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

export {
  SliderFill,
  SliderThumb,
  SliderInput,
  SliderRoot,
  SliderTrack,
  SliderValueLabel,
  Slider,
  slider_exports
};
