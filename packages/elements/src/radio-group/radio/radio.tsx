/*!
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/70e7caf1946c423bc9aa9cb0e50dbdbe953d239b/packages/@react-aria/radio/src/useRadio.ts
 */

import { combineProps, createPolymorphicComponent, mergeDefaultProps } from "@kobalte/utils";
import { Accessor, createMemo, createSignal, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { createHover } from "../../primitives";
import { useRadioGroupContext } from "../radio-group-context";
import { RadioContext, RadioContextValue, RadioDataSet } from "./radio-context";
import { RadioControl } from "./radio-control";
import { RadioIndicator } from "./radio-indicator";
import { RadioInput } from "./radio-input";
import { RadioLabel } from "./radio-label";

type RadioComposite = {
  Label: typeof RadioLabel;
  Input: typeof RadioInput;
  Control: typeof RadioControl;
  Indicator: typeof RadioIndicator;
};

export interface RadioProps {
  /**
   * The value of the radio button, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value).
   */
  value: string;

  /** Whether the radio button is disabled or not. */
  isDisabled?: boolean;
}

/**
 * The root container for a radio button.
 */
export const Radio = createPolymorphicComponent<"label", RadioProps, RadioComposite>(props => {
  const radioGroupContext = useRadioGroupContext();

  props = mergeDefaultProps({ as: "label" }, props);

  const [local, others] = splitProps(props, ["as", "children", "value", "isDisabled"]);

  const [isFocused, setIsFocused] = createSignal(false);

  const isSelected = createMemo(() => {
    return radioGroupContext.isSelectedValue(local.value);
  });

  const isDisabled = createMemo(() => {
    return local.isDisabled || radioGroupContext.isDisabled() || false;
  });

  const { isHovered, hoverHandlers } = createHover({ isDisabled });

  const dataset: Accessor<RadioDataSet> = createMemo(() => ({
    "data-valid": radioGroupContext.validationState() === "valid" ? "" : undefined,
    "data-invalid": radioGroupContext.validationState() === "invalid" ? "" : undefined,
    "data-checked": isSelected() ? "" : undefined,
    "data-disabled": isDisabled() ? "" : undefined,
    "data-hover": isHovered() ? "" : undefined,
    "data-focus": isFocused() ? "" : undefined,
  }));

  const context: RadioContextValue = {
    value: () => local.value,
    dataset,
    isSelected,
    isDisabled,
    setIsFocused,
  };

  return (
    <Dynamic
      component={local.as}
      data-part="root"
      {...context.dataset()}
      {...combineProps(others, hoverHandlers)}
    >
      <RadioContext.Provider value={context}>{local.children}</RadioContext.Provider>
    </Dynamic>
  );
});

Radio.Label = RadioLabel;
Radio.Input = RadioInput;
Radio.Control = RadioControl;
Radio.Indicator = RadioIndicator;