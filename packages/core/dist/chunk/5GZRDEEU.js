import { createNumberFormatter } from './XHJPQEZP.js';
import { createRegisterId } from './E4R2EMM4.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps, memo } from 'solid-js/web';
import { createContext, splitProps, createEffect, onCleanup, createUniqueId, createSignal, createMemo, useContext } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';
import { mergeDefaultProps, createGenerateId, clamp } from '@kobalte/utils';

// src/progress/index.tsx
var progress_exports = {};
__export(progress_exports, {
  Fill: () => ProgressFill,
  Label: () => ProgressLabel,
  Progress: () => Progress,
  Root: () => ProgressRoot,
  Track: () => ProgressTrack,
  ValueLabel: () => ProgressValueLabel
});
var ProgressContext = createContext();
function useProgressContext() {
  const context = useContext(ProgressContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useProgressContext` must be used within a `Progress.Root` component");
  }
  return context;
}

// src/progress/progress-fill.tsx
function ProgressFill(props) {
  const context = useProgressContext();
  const [local, others] = splitProps(props, ["style"]);
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    get style() {
      return combineStyle({
        "--kb-progress-fill-width": context.progressFillWidth()
      }, local.style);
    }
  }, () => context.dataset(), others));
}
function ProgressLabel(props) {
  const context = useProgressContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerLabelId(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function ProgressRoot(props) {
  const defaultId = `progress-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    value: 0,
    minValue: 0,
    maxValue: 100
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "minValue", "maxValue", "indeterminate", "getValueLabel"]);
  const [labelId, setLabelId] = createSignal();
  const defaultFormatter = createNumberFormatter(() => ({
    style: "percent"
  }));
  const value = () => {
    return clamp(local.value, local.minValue, local.maxValue);
  };
  const valuePercent = () => {
    return (value() - local.minValue) / (local.maxValue - local.minValue);
  };
  const valueLabel = () => {
    if (local.indeterminate) {
      return void 0;
    }
    if (local.getValueLabel) {
      return local.getValueLabel({
        value: value(),
        min: local.minValue,
        max: local.maxValue
      });
    }
    return defaultFormatter().format(valuePercent());
  };
  const progressFillWidth = () => {
    return local.indeterminate ? void 0 : `${Math.round(valuePercent() * 100)}%`;
  };
  const dataset = createMemo(() => {
    let dataProgress = void 0;
    if (!local.indeterminate) {
      dataProgress = valuePercent() === 1 ? "complete" : "loading";
    }
    return {
      "data-progress": dataProgress,
      "data-indeterminate": local.indeterminate ? "" : void 0
    };
  });
  const context = {
    dataset,
    value,
    valuePercent,
    valueLabel,
    labelId,
    progressFillWidth,
    generateId: createGenerateId(() => others.id),
    registerLabelId: createRegisterId(setLabelId)
  };
  return createComponent(ProgressContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "progressbar",
        get ["aria-valuenow"]() {
          return memo(() => !!local.indeterminate)() ? void 0 : value();
        },
        get ["aria-valuemin"]() {
          return local.minValue;
        },
        get ["aria-valuemax"]() {
          return local.maxValue;
        },
        get ["aria-valuetext"]() {
          return valueLabel();
        },
        get ["aria-labelledby"]() {
          return labelId();
        }
      }, dataset, others));
    }
  });
}
function ProgressTrack(props) {
  const context = useProgressContext();
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), props));
}
function ProgressValueLabel(props) {
  const context = useProgressContext();
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), props, {
    get children() {
      return context.valueLabel();
    }
  }));
}

// src/progress/index.tsx
var Progress = Object.assign(ProgressRoot, {
  Fill: ProgressFill,
  Label: ProgressLabel,
  Track: ProgressTrack,
  ValueLabel: ProgressValueLabel
});

export { Progress, ProgressFill, ProgressLabel, ProgressRoot, ProgressTrack, ProgressValueLabel, progress_exports };
