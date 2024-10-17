import { F as FormControlDataSet, a as FormControlDescription, b as FormControlErrorMessage, c as FormControlDescriptionCommonProps, d as FormControlDescriptionOptions, e as FormControlDescriptionProps, f as FormControlDescriptionRenderProps, g as FormControlErrorMessageCommonProps, h as FormControlErrorMessageOptions, i as FormControlErrorMessageProps, j as FormControlErrorMessageRenderProps } from './form-control-error-message-7d91602e.js';
import { F as FormControlLabel, a as FormControlLabelCommonProps, b as FormControlLabelOptions, c as FormControlLabelProps, d as FormControlLabelRenderProps } from './form-control-label-fea2aaa3.js';
import * as solid_js from 'solid-js';
import { ValidComponent, JSX, ComponentProps } from 'solid-js';
import { ElementOf, PolymorphicProps } from './polymorphic/index.js';
import { ValidationState, Orientation } from '@kobalte/utils';

interface GetValueLabelParams {
    values: number[];
    min: number;
    max: number;
}
interface SliderRootOptions {
    /** The slider values. */
    value?: number[];
    /** The value of the slider when initially rendered. */
    defaultValue?: number[];
    /** Called when the value changes. */
    onChange?: (value: number[]) => void;
    /** Called when the value changes at the end of an interaction. */
    onChangeEnd?: (value: number[]) => void;
    /**
     * Whether the slider is visually inverted.
     * @default false
     */
    inverted?: boolean;
    /**
     * The minimum slider value.
     * @default 0
     */
    minValue?: number;
    /**
     * The maximum slider value.
     * @default 100
     */
    maxValue?: number;
    /**
     * The step amount.
     * @default 1
     */
    step?: number;
    /**
     * The minimum permitted steps between multiple thumbs.
     * @default 0
     */
    minStepsBetweenThumbs?: number;
    /**
     * A function to get the accessible label text representing the current value in a human-readable format.
     * If not provided, the value label will be read as a percentage of the max value.
     */
    getValueLabel?: (params: GetValueLabelParams) => string;
    /**
     * The orientation of the slider.
     * @default horizontal
     */
    orientation?: "horizontal" | "vertical";
    /**
     * A unique identifier for the component.
     * The id is used to generate id attributes for nested components.
     * If no id prop is provided, a generated id will be used.
     */
    id?: string;
    /**
     * The name of the slider, used when submitting an HTML form.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
     */
    name?: string;
    /** Whether the slider should display its "valid" or "invalid" visual styling. */
    validationState?: ValidationState;
    /** Whether the user must fill the slider before the owning form can be submitted. */
    required?: boolean;
    /** Whether the slider is disabled. */
    disabled?: boolean;
    /** Whether the slider is read only. */
    readOnly?: boolean;
}
interface SliderRootCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    ref: T | ((el: T) => void);
}
interface SliderRootRenderProps extends SliderRootCommonProps, SliderDataSet {
    role: "group";
}
type SliderRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderRootOptions & Partial<SliderRootCommonProps<ElementOf<T>>>;
declare function SliderRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderRootProps<T>>): solid_js.JSX.Element;

interface SliderDataSet extends FormControlDataSet {
    "data-orientation": "vertical" | "horizontal" | undefined;
}

interface SliderFillOptions {
}
interface SliderFillCommonProps<T extends HTMLElement = HTMLElement> {
    style?: JSX.CSSProperties | string;
}
interface SliderFillRenderProps extends SliderFillCommonProps, SliderDataSet {
}
type SliderFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderFillOptions & Partial<SliderFillCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the slider value.
 * Used to visually show the fill of `Slider.Track`.
 */
declare function SliderFill<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderFillProps<T>>): JSX.Element;

interface SliderInputProps extends ComponentProps<"input"> {
    style?: JSX.CSSProperties | string;
}
/**
 * The native html input that is visually hidden in the slider thumb.
 */
declare function SliderInput(props: SliderInputProps): JSX.Element;

interface SliderThumbOptions {
}
interface SliderThumbCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    ref: T | ((el: T) => void);
    style?: JSX.CSSProperties | string;
    onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
    onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
    onPointerMove: JSX.EventHandlerUnion<T, PointerEvent>;
    onPointerUp: JSX.EventHandlerUnion<T, PointerEvent>;
    onFocus: JSX.EventHandlerUnion<T, FocusEvent>;
    onBlur: JSX.EventHandlerUnion<T, FocusEvent>;
    "aria-label": string | undefined;
    "aria-labelledby": string | undefined;
    "aria-describedby": string | undefined;
}
interface SliderThumbRenderProps extends SliderThumbCommonProps, SliderDataSet {
    role: "slider";
    tabIndex: 0 | undefined;
    "aria-valuetext": string;
    "aria-valuemin": number;
    "aria-valuenow": number | undefined;
    "aria-valuemax": number;
    "aria-orientation": Orientation;
}
type SliderThumbProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderThumbOptions & Partial<SliderThumbCommonProps<ElementOf<T>>>;
declare function SliderThumb<T extends ValidComponent = "span">(props: PolymorphicProps<T, SliderThumbProps<T>>): JSX.Element;

interface SliderTrackOptions {
}
interface SliderTrackCommonProps<T extends HTMLElement = HTMLElement> {
    onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
    onPointerMove: JSX.EventHandlerUnion<T, PointerEvent>;
    onPointerUp: JSX.EventHandlerUnion<T, PointerEvent>;
}
interface SliderTrackRenderProps extends SliderTrackCommonProps, SliderDataSet {
}
type SliderTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderTrackOptions & Partial<SliderTrackCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the slider track.
 * Act as a container for `Slider.Fill`.
 */
declare function SliderTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderTrackProps<T>>): JSX.Element;

interface SliderValueLabelOptions {
}
interface SliderValueLabelCommonProps<T extends HTMLElement = HTMLElement> {
}
interface SliderValueLabelRenderProps extends SliderValueLabelCommonProps, SliderDataSet {
    children: JSX.Element;
}
type SliderValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderValueLabelOptions & Partial<SliderValueLabelCommonProps<ElementOf<T>>>;
/**
 * The accessible label text representing the current value in a human-readable format.
 */
declare function SliderValueLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderValueLabelProps<T>>): JSX.Element;

declare const Slider: typeof SliderRoot & {
    Description: typeof FormControlDescription;
    ErrorMessage: typeof FormControlErrorMessage;
    Fill: typeof SliderFill;
    Input: typeof SliderInput;
    Label: typeof FormControlLabel;
    Thumb: typeof SliderThumb;
    Track: typeof SliderTrack;
    ValueLabel: typeof SliderValueLabel;
};

declare const index_Slider: typeof Slider;
type index_SliderFillCommonProps<T extends HTMLElement = HTMLElement> = SliderFillCommonProps<T>;
type index_SliderFillOptions = SliderFillOptions;
type index_SliderFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderFillProps<T>;
type index_SliderFillRenderProps = SliderFillRenderProps;
type index_SliderInputProps = SliderInputProps;
type index_SliderRootCommonProps<T extends HTMLElement = HTMLElement> = SliderRootCommonProps<T>;
type index_SliderRootOptions = SliderRootOptions;
type index_SliderRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderRootProps<T>;
type index_SliderRootRenderProps = SliderRootRenderProps;
type index_SliderThumbCommonProps<T extends HTMLElement = HTMLElement> = SliderThumbCommonProps<T>;
type index_SliderThumbOptions = SliderThumbOptions;
type index_SliderThumbProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderThumbProps<T>;
type index_SliderThumbRenderProps = SliderThumbRenderProps;
type index_SliderTrackCommonProps<T extends HTMLElement = HTMLElement> = SliderTrackCommonProps<T>;
type index_SliderTrackOptions = SliderTrackOptions;
type index_SliderTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderTrackProps<T>;
type index_SliderTrackRenderProps = SliderTrackRenderProps;
type index_SliderValueLabelCommonProps<T extends HTMLElement = HTMLElement> = SliderValueLabelCommonProps<T>;
type index_SliderValueLabelOptions = SliderValueLabelOptions;
type index_SliderValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderValueLabelProps<T>;
type index_SliderValueLabelRenderProps = SliderValueLabelRenderProps;
declare namespace index {
  export {
    FormControlDescription as Description,
    FormControlErrorMessage as ErrorMessage,
    SliderFill as Fill,
    SliderInput as Input,
    FormControlLabel as Label,
    SliderRoot as Root,
    index_Slider as Slider,
    FormControlDescriptionCommonProps as SliderDescriptionCommonProps,
    FormControlDescriptionOptions as SliderDescriptionOptions,
    FormControlDescriptionProps as SliderDescriptionProps,
    FormControlDescriptionRenderProps as SliderDescriptionRenderProps,
    FormControlErrorMessageCommonProps as SliderErrorMessageCommonProps,
    FormControlErrorMessageOptions as SliderErrorMessageOptions,
    FormControlErrorMessageProps as SliderErrorMessageProps,
    FormControlErrorMessageRenderProps as SliderErrorMessageRenderProps,
    index_SliderFillCommonProps as SliderFillCommonProps,
    index_SliderFillOptions as SliderFillOptions,
    index_SliderFillProps as SliderFillProps,
    index_SliderFillRenderProps as SliderFillRenderProps,
    GetValueLabelParams as SliderGetValueLabelParams,
    index_SliderInputProps as SliderInputProps,
    FormControlLabelCommonProps as SliderLabelCommonProps,
    FormControlLabelOptions as SliderLabelOptions,
    FormControlLabelProps as SliderLabelProps,
    FormControlLabelRenderProps as SliderLabelRenderProps,
    index_SliderRootCommonProps as SliderRootCommonProps,
    index_SliderRootOptions as SliderRootOptions,
    index_SliderRootProps as SliderRootProps,
    index_SliderRootRenderProps as SliderRootRenderProps,
    index_SliderThumbCommonProps as SliderThumbCommonProps,
    index_SliderThumbOptions as SliderThumbOptions,
    index_SliderThumbProps as SliderThumbProps,
    index_SliderThumbRenderProps as SliderThumbRenderProps,
    index_SliderTrackCommonProps as SliderTrackCommonProps,
    index_SliderTrackOptions as SliderTrackOptions,
    index_SliderTrackProps as SliderTrackProps,
    index_SliderTrackRenderProps as SliderTrackRenderProps,
    index_SliderValueLabelCommonProps as SliderValueLabelCommonProps,
    index_SliderValueLabelOptions as SliderValueLabelOptions,
    index_SliderValueLabelProps as SliderValueLabelProps,
    index_SliderValueLabelRenderProps as SliderValueLabelRenderProps,
    SliderThumb as Thumb,
    SliderTrack as Track,
    SliderValueLabel as ValueLabel,
  };
}

export { SliderValueLabel as A, Slider as B, GetValueLabelParams as G, SliderFillOptions as S, SliderFillCommonProps as a, SliderFillRenderProps as b, SliderFillProps as c, SliderInputProps as d, SliderRootOptions as e, SliderRootCommonProps as f, SliderRootRenderProps as g, SliderRootProps as h, index as i, SliderThumbOptions as j, SliderThumbCommonProps as k, SliderThumbRenderProps as l, SliderThumbProps as m, SliderTrackOptions as n, SliderTrackCommonProps as o, SliderTrackRenderProps as p, SliderTrackProps as q, SliderValueLabelOptions as r, SliderValueLabelCommonProps as s, SliderValueLabelRenderProps as t, SliderValueLabelProps as u, SliderFill as v, SliderInput as w, SliderRoot as x, SliderThumb as y, SliderTrack as z };
