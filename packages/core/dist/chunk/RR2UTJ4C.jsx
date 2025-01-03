import {
  createNumberFormatter
} from "./LR7LBJN3.jsx";
import {
  createRegisterId
} from "./JNCCF6MP.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

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

// src/progress/progress-fill.tsx
import { splitProps } from "solid-js";
import { combineStyle } from "@solid-primitives/props";

// src/progress/progress-context.tsx
import { createContext, useContext } from "solid-js";
var ProgressContext = createContext();
function useProgressContext() {
  const context = useContext(ProgressContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useProgressContext` must be used within a `Progress.Root` component"
    );
  }
  return context;
}

// src/progress/progress-fill.tsx
function ProgressFill(props) {
  const context = useProgressContext();
  const [local, others] = splitProps(props, ["style"]);
  return <Polymorphic
    as="div"
    style={combineStyle(
      {
        "--kb-progress-fill-width": context.progressFillWidth()
      },
      local.style
    )}
    {...context.dataset()}
    {...others}
  />;
}

// src/progress/progress-label.tsx
import { mergeDefaultProps } from "@kobalte/utils";
import {
  createEffect,
  onCleanup,
  splitProps as splitProps2
} from "solid-js";
function ProgressLabel(props) {
  const context = useProgressContext();
  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("label")
    },
    props
  );
  const [local, others] = splitProps2(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerLabelId(local.id)));
  return <Polymorphic
    as="span"
    id={local.id}
    {...context.dataset()}
    {...others}
  />;
}

// src/progress/progress-root.tsx
import { clamp, createGenerateId, mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import {
  createMemo,
  createSignal,
  createUniqueId,
  splitProps as splitProps3
} from "solid-js";
function ProgressRoot(props) {
  const defaultId = `progress-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps2(
    {
      id: defaultId,
      value: 0,
      minValue: 0,
      maxValue: 100
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, [
    "value",
    "minValue",
    "maxValue",
    "indeterminate",
    "getValueLabel"
  ]);
  const [labelId, setLabelId] = createSignal();
  const defaultFormatter = createNumberFormatter(() => ({ style: "percent" }));
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
  return <ProgressContext.Provider value={context}><Polymorphic
    as="div"
    role="progressbar"
    aria-valuenow={local.indeterminate ? void 0 : value()}
    aria-valuemin={local.minValue}
    aria-valuemax={local.maxValue}
    aria-valuetext={valueLabel()}
    aria-labelledby={labelId()}
    {...dataset()}
    {...others}
  /></ProgressContext.Provider>;
}

// src/progress/progress-track.tsx
function ProgressTrack(props) {
  const context = useProgressContext();
  return <Polymorphic
    as="div"
    {...context.dataset()}
    {...props}
  />;
}

// src/progress/progress-value-label.tsx
function ProgressValueLabel(props) {
  const context = useProgressContext();
  return <Polymorphic
    as="div"
    {...context.dataset()}
    {...props}
  >{context.valueLabel()}</Polymorphic>;
}

// src/progress/index.tsx
var Progress = Object.assign(ProgressRoot, {
  Fill: ProgressFill,
  Label: ProgressLabel,
  Track: ProgressTrack,
  ValueLabel: ProgressValueLabel
});

export {
  ProgressFill,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValueLabel,
  Progress,
  progress_exports
};
