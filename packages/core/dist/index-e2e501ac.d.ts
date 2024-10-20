import { F as FormControlDataSet, a as FormControlDescription, b as FormControlErrorMessage, c as FormControlDescriptionCommonProps, d as FormControlDescriptionOptions, e as FormControlDescriptionProps, f as FormControlDescriptionRenderProps, g as FormControlErrorMessageCommonProps, h as FormControlErrorMessageOptions, i as FormControlErrorMessageProps, j as FormControlErrorMessageRenderProps } from './form-control-error-message-7d91602e.js';
import * as solid_js from 'solid-js';
import { JSX, ValidComponent } from 'solid-js';
import { ElementOf, PolymorphicProps } from './polymorphic/index.js';
import { Orientation, ValidationState } from '@kobalte/utils';

interface RadioGroupItemDataSet {
    "data-valid": string | undefined;
    "data-invalid": string | undefined;
    "data-required": string | undefined;
    "data-disabled": string | undefined;
    "data-readonly": string | undefined;
    "data-checked": string | undefined;
}

interface RadioGroupItemOptions {
    /**
     * The value of the radio button, used when submitting an HTML form.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value).
     */
    value: string;
    /** Whether the radio button is disabled or not. */
    disabled?: boolean;
}
interface RadioGroupItemCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
}
interface RadioGroupItemRenderProps extends RadioGroupItemCommonProps, RadioGroupItemDataSet {
    role: "group";
}
type RadioGroupItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemOptions & Partial<RadioGroupItemCommonProps<ElementOf<T>>>;
/**
 * The root container for a radio button.
 */
declare function RadioGroupItem<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemProps<T>>): JSX.Element;

interface RadioGroupItemControlOptions {
}
interface RadioGroupItemControlCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    onClick: JSX.EventHandlerUnion<T, MouseEvent>;
    onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
}
interface RadioGroupItemControlRenderProps extends RadioGroupItemControlCommonProps, RadioGroupItemDataSet {
}
type RadioGroupItemControlProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemControlOptions & Partial<RadioGroupItemControlCommonProps<ElementOf<T>>>;
/**
 * The element that visually represents a radio button.
 */
declare function RadioGroupItemControl<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemControlProps<T>>): JSX.Element;

interface RadioGroupItemDescriptionOptions {
}
interface RadioGroupItemDescriptionCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
}
interface RadioGroupItemDescriptionRenderProps extends RadioGroupItemDescriptionCommonProps, RadioGroupItemDataSet {
}
type RadioGroupItemDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemDescriptionOptions & Partial<RadioGroupItemDescriptionCommonProps<ElementOf<T>>>;
/**
 * The description that gives the user more information on the radio button.
 */
declare function RadioGroupItemDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemDescriptionProps<T>>): solid_js.JSX.Element;

interface RadioGroupItemIndicatorOptions {
    /**
     * Used to force mounting when more control is needed.
     * Useful when controlling animation with SolidJS animation libraries.
     */
    forceMount?: boolean;
}
interface RadioGroupItemIndicatorCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    ref: T | ((el: T) => void);
}
interface RadioGroupItemIndicatorRenderProps extends RadioGroupItemIndicatorCommonProps, RadioGroupItemDataSet {
}
type RadioGroupItemIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemIndicatorOptions & Partial<RadioGroupItemIndicatorCommonProps<ElementOf<T>>>;
/**
 * The visual indicator rendered when the radio item is in a checked state.
 * You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
 */
declare function RadioGroupItemIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemIndicatorProps<T>>): solid_js.JSX.Element;

interface RadioGroupItemInputOptions {
}
interface RadioGroupItemInputCommonProps<T extends HTMLElement = HTMLInputElement> {
    id: string;
    ref: T | ((el: T) => void);
    "aria-labelledby": string | undefined;
    "aria-describedby": string | undefined;
    onChange: JSX.EventHandlerUnion<T, Event>;
    onFocus: JSX.EventHandlerUnion<T, FocusEvent>;
    onBlur: JSX.EventHandlerUnion<T, FocusEvent>;
    "aria-label"?: string;
    style?: JSX.CSSProperties | string;
}
interface RadioGroupItemInputRenderProps extends RadioGroupItemInputCommonProps, RadioGroupItemDataSet {
    type: "radio";
    name: string;
    value: string;
    checked: boolean;
    required: boolean | undefined;
    disabled: boolean | undefined;
    readonly: boolean | undefined;
}
type RadioGroupItemInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = RadioGroupItemInputOptions & Partial<RadioGroupItemInputCommonProps<ElementOf<T>>>;
/**
 * The native html input that is visually hidden in the radio button.
 */
declare function RadioGroupItemInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, RadioGroupItemInputProps<T>>): JSX.Element;

interface RadioGroupItemLabelOptions {
}
interface RadioGroupItemLabelCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
}
interface RadioGroupItemLabelRenderProps extends RadioGroupItemLabelCommonProps, RadioGroupItemDataSet {
    for: string | undefined;
}
type RadioGroupItemLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemLabelOptions & Partial<RadioGroupItemLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the radio button.
 */
declare function RadioGroupItemLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, RadioGroupItemLabelProps<T>>): solid_js.JSX.Element;

interface RadioGroupLabelOptions {
}
interface RadioGroupLabelCommonProps<T extends HTMLElement = HTMLElement> {
}
interface RadioGroupLabelRenderProps extends RadioGroupLabelCommonProps {
}
type RadioGroupLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupLabelOptions & Partial<RadioGroupLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the radio group.
 */
declare function RadioGroupLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, RadioGroupLabelProps<T>>): solid_js.JSX.Element;

interface RadioGroupRootOptions {
    /** The controlled value of the radio button to check. */
    value?: string;
    /**
     * The value of the radio button that should be checked when initially rendered.
     * Useful when you do not need to control the state of the radio buttons.
     */
    defaultValue?: string;
    /** Event handler called when the value changes. */
    onChange?: (value: string) => void;
    /** The axis the radio group items should align with. */
    orientation?: Orientation;
    /**
     * A unique identifier for the component.
     * The id is used to generate id attributes for nested components.
     * If no id prop is provided, a generated id will be used.
     */
    id?: string;
    /**
     * The name of the radio group.
     * Submitted with its owning form as part of a name/value pair.
     */
    name?: string;
    /** Whether the radio group should display its "valid" or "invalid" visual styling. */
    validationState?: ValidationState;
    /** Whether the user must select an item before the owning form can be submitted. */
    required?: boolean;
    /** Whether the radio group is disabled. */
    disabled?: boolean;
    /** Whether the radio group is read only. */
    readOnly?: boolean;
}
interface RadioGroupRootCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    ref: T | ((el: T) => void);
    "aria-labelledby": string | undefined;
    "aria-describedby": string | undefined;
    "aria-label"?: string;
}
interface RadioGroupRootRenderProps extends RadioGroupRootCommonProps, FormControlDataSet {
    role: "radiogroup";
    "aria-invalid": boolean | undefined;
    "aria-required": boolean | undefined;
    "aria-disabled": boolean | undefined;
    "aria-readonly": boolean | undefined;
    "aria-orientation": Orientation | undefined;
}
type RadioGroupRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupRootOptions & Partial<RadioGroupRootCommonProps<ElementOf<T>>>;
/**
 * A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.
 * This component is based on the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/)
 */
declare function RadioGroupRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupRootProps<T>>): solid_js.JSX.Element;

declare const RadioGroup: typeof RadioGroupRoot & {
    Description: typeof FormControlDescription;
    ErrorMessage: typeof FormControlErrorMessage;
    Item: typeof RadioGroupItem;
    ItemControl: typeof RadioGroupItemControl;
    ItemDescription: typeof RadioGroupItemDescription;
    ItemIndicator: typeof RadioGroupItemIndicator;
    ItemInput: typeof RadioGroupItemInput;
    ItemLabel: typeof RadioGroupItemLabel;
    Label: typeof RadioGroupLabel;
};

declare const index_RadioGroup: typeof RadioGroup;
type index_RadioGroupItemCommonProps<T extends HTMLElement = HTMLElement> = RadioGroupItemCommonProps<T>;
type index_RadioGroupItemControlCommonProps<T extends HTMLElement = HTMLElement> = RadioGroupItemControlCommonProps<T>;
type index_RadioGroupItemControlOptions = RadioGroupItemControlOptions;
type index_RadioGroupItemControlProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemControlProps<T>;
type index_RadioGroupItemControlRenderProps = RadioGroupItemControlRenderProps;
type index_RadioGroupItemDescriptionCommonProps<T extends HTMLElement = HTMLElement> = RadioGroupItemDescriptionCommonProps<T>;
type index_RadioGroupItemDescriptionOptions = RadioGroupItemDescriptionOptions;
type index_RadioGroupItemDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemDescriptionProps<T>;
type index_RadioGroupItemDescriptionRenderProps = RadioGroupItemDescriptionRenderProps;
type index_RadioGroupItemIndicatorCommonProps<T extends HTMLElement = HTMLElement> = RadioGroupItemIndicatorCommonProps<T>;
type index_RadioGroupItemIndicatorOptions = RadioGroupItemIndicatorOptions;
type index_RadioGroupItemIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemIndicatorProps<T>;
type index_RadioGroupItemIndicatorRenderProps = RadioGroupItemIndicatorRenderProps;
type index_RadioGroupItemInputCommonProps<T extends HTMLElement = HTMLInputElement> = RadioGroupItemInputCommonProps<T>;
type index_RadioGroupItemInputOptions = RadioGroupItemInputOptions;
type index_RadioGroupItemInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = RadioGroupItemInputProps<T>;
type index_RadioGroupItemInputRenderProps = RadioGroupItemInputRenderProps;
type index_RadioGroupItemLabelCommonProps<T extends HTMLElement = HTMLElement> = RadioGroupItemLabelCommonProps<T>;
type index_RadioGroupItemLabelOptions = RadioGroupItemLabelOptions;
type index_RadioGroupItemLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemLabelProps<T>;
type index_RadioGroupItemLabelRenderProps = RadioGroupItemLabelRenderProps;
type index_RadioGroupItemOptions = RadioGroupItemOptions;
type index_RadioGroupItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemProps<T>;
type index_RadioGroupItemRenderProps = RadioGroupItemRenderProps;
type index_RadioGroupLabelCommonProps<T extends HTMLElement = HTMLElement> = RadioGroupLabelCommonProps<T>;
type index_RadioGroupLabelOptions = RadioGroupLabelOptions;
type index_RadioGroupLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupLabelProps<T>;
type index_RadioGroupLabelRenderProps = RadioGroupLabelRenderProps;
type index_RadioGroupRootCommonProps<T extends HTMLElement = HTMLElement> = RadioGroupRootCommonProps<T>;
type index_RadioGroupRootOptions = RadioGroupRootOptions;
type index_RadioGroupRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupRootProps<T>;
type index_RadioGroupRootRenderProps = RadioGroupRootRenderProps;
declare namespace index {
  export {
    FormControlDescription as Description,
    FormControlErrorMessage as ErrorMessage,
    RadioGroupItem as Item,
    RadioGroupItemControl as ItemControl,
    RadioGroupItemDescription as ItemDescription,
    RadioGroupItemIndicator as ItemIndicator,
    RadioGroupItemInput as ItemInput,
    RadioGroupItemLabel as ItemLabel,
    RadioGroupLabel as Label,
    index_RadioGroup as RadioGroup,
    FormControlDescriptionCommonProps as RadioGroupDescriptionCommonProps,
    FormControlDescriptionOptions as RadioGroupDescriptionOptions,
    FormControlDescriptionProps as RadioGroupDescriptionProps,
    FormControlDescriptionRenderProps as RadioGroupDescriptionRenderProps,
    FormControlErrorMessageCommonProps as RadioGroupErrorMessageCommonProps,
    FormControlErrorMessageOptions as RadioGroupErrorMessageOptions,
    FormControlErrorMessageProps as RadioGroupErrorMessageProps,
    FormControlErrorMessageRenderProps as RadioGroupErrorMessageRenderProps,
    index_RadioGroupItemCommonProps as RadioGroupItemCommonProps,
    index_RadioGroupItemControlCommonProps as RadioGroupItemControlCommonProps,
    index_RadioGroupItemControlOptions as RadioGroupItemControlOptions,
    index_RadioGroupItemControlProps as RadioGroupItemControlProps,
    index_RadioGroupItemControlRenderProps as RadioGroupItemControlRenderProps,
    index_RadioGroupItemDescriptionCommonProps as RadioGroupItemDescriptionCommonProps,
    index_RadioGroupItemDescriptionOptions as RadioGroupItemDescriptionOptions,
    index_RadioGroupItemDescriptionProps as RadioGroupItemDescriptionProps,
    index_RadioGroupItemDescriptionRenderProps as RadioGroupItemDescriptionRenderProps,
    index_RadioGroupItemIndicatorCommonProps as RadioGroupItemIndicatorCommonProps,
    index_RadioGroupItemIndicatorOptions as RadioGroupItemIndicatorOptions,
    index_RadioGroupItemIndicatorProps as RadioGroupItemIndicatorProps,
    index_RadioGroupItemIndicatorRenderProps as RadioGroupItemIndicatorRenderProps,
    index_RadioGroupItemInputCommonProps as RadioGroupItemInputCommonProps,
    index_RadioGroupItemInputOptions as RadioGroupItemInputOptions,
    index_RadioGroupItemInputProps as RadioGroupItemInputProps,
    index_RadioGroupItemInputRenderProps as RadioGroupItemInputRenderProps,
    index_RadioGroupItemLabelCommonProps as RadioGroupItemLabelCommonProps,
    index_RadioGroupItemLabelOptions as RadioGroupItemLabelOptions,
    index_RadioGroupItemLabelProps as RadioGroupItemLabelProps,
    index_RadioGroupItemLabelRenderProps as RadioGroupItemLabelRenderProps,
    index_RadioGroupItemOptions as RadioGroupItemOptions,
    index_RadioGroupItemProps as RadioGroupItemProps,
    index_RadioGroupItemRenderProps as RadioGroupItemRenderProps,
    index_RadioGroupLabelCommonProps as RadioGroupLabelCommonProps,
    index_RadioGroupLabelOptions as RadioGroupLabelOptions,
    index_RadioGroupLabelProps as RadioGroupLabelProps,
    index_RadioGroupLabelRenderProps as RadioGroupLabelRenderProps,
    index_RadioGroupRootCommonProps as RadioGroupRootCommonProps,
    index_RadioGroupRootOptions as RadioGroupRootOptions,
    index_RadioGroupRootProps as RadioGroupRootProps,
    index_RadioGroupRootRenderProps as RadioGroupRootRenderProps,
    RadioGroupRoot as Root,
  };
}

export { RadioGroupLabelRenderProps as A, RadioGroupLabelProps as B, RadioGroupRootOptions as C, RadioGroupRootCommonProps as D, RadioGroupRootRenderProps as E, RadioGroupRootProps as F, RadioGroupItem as G, RadioGroupItemControl as H, RadioGroupItemDescription as I, RadioGroupItemIndicator as J, RadioGroupItemInput as K, RadioGroupItemLabel as L, RadioGroupLabel as M, RadioGroupRoot as N, RadioGroup as O, RadioGroupItemControlOptions as R, RadioGroupItemControlCommonProps as a, RadioGroupItemControlRenderProps as b, RadioGroupItemControlProps as c, RadioGroupItemDescriptionOptions as d, RadioGroupItemDescriptionCommonProps as e, RadioGroupItemDescriptionRenderProps as f, RadioGroupItemDescriptionProps as g, RadioGroupItemIndicatorOptions as h, index as i, RadioGroupItemIndicatorCommonProps as j, RadioGroupItemIndicatorRenderProps as k, RadioGroupItemIndicatorProps as l, RadioGroupItemInputOptions as m, RadioGroupItemInputCommonProps as n, RadioGroupItemInputRenderProps as o, RadioGroupItemInputProps as p, RadioGroupItemLabelOptions as q, RadioGroupItemLabelCommonProps as r, RadioGroupItemLabelRenderProps as s, RadioGroupItemLabelProps as t, RadioGroupItemOptions as u, RadioGroupItemCommonProps as v, RadioGroupItemRenderProps as w, RadioGroupItemProps as x, RadioGroupLabelOptions as y, RadioGroupLabelCommonProps as z };
