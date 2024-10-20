import * as solid_js from 'solid-js';
import { JSX, ValidComponent } from 'solid-js';
import { ElementOf, PolymorphicProps } from './polymorphic/index.js';

interface ProgressDataSet {
    "data-progress": "loading" | "complete" | undefined;
    "data-indeterminate": string | undefined;
}

interface ProgressFillOptions {
}
interface ProgressFillCommonProps<T extends HTMLElement = HTMLElement> {
    style?: JSX.CSSProperties | string;
}
interface ProgressFillRenderProps extends ProgressFillCommonProps, ProgressDataSet {
}
type ProgressFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressFillOptions & Partial<ProgressFillCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the progress value.
 * Used to visually show the fill of `Progress.Track`.
 */
declare function ProgressFill<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressFillProps<T>>): JSX.Element;

interface ProgressLabelOptions {
}
interface ProgressLabelCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
}
interface ProgressLabelRenderProps extends ProgressLabelCommonProps, ProgressDataSet {
}
type ProgressLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressLabelOptions & Partial<ProgressLabelCommonProps<ElementOf<T>>>;
/**
 * An accessible label that gives the user information on the progress.
 */
declare function ProgressLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, ProgressLabelProps<T>>): solid_js.JSX.Element;

interface GetValueLabelParams {
    value: number;
    min: number;
    max: number;
}
interface ProgressRootOptions {
    /**
     * The progress value.
     * @default 0
     */
    value?: number;
    /**
     * The minimum progress value.
     * @default 0
     */
    minValue?: number;
    /**
     * The maximum progress value.
     * @default 100
     */
    maxValue?: number;
    /** Whether the progress is in an indeterminate state. */
    indeterminate?: boolean;
    /**
     * A function to get the accessible label text representing the current value in a human-readable format.
     * If not provided, the value label will be read as a percentage of the max value.
     */
    getValueLabel?: (params: GetValueLabelParams) => string;
}
interface ProgressRootCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
}
interface ProgressRootRenderProps extends ProgressRootCommonProps, ProgressDataSet {
    role: "progressbar";
    "aria-valuenow": number | undefined;
    "aria-valuemin": number;
    "aria-valuemax": number;
    "aria-valuetext": string | undefined;
    "aria-labelledby": string | undefined;
}
type ProgressRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressRootOptions & Partial<ProgressRootCommonProps<ElementOf<T>>>;
/**
 * Progress show either determinate or indeterminate progress of an operation over time.
 */
declare function ProgressRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressRootProps<T>>): solid_js.JSX.Element;

interface ProgressTrackOptions {
}
interface ProgressTrackCommonProps<T extends HTMLElement = HTMLElement> {
}
interface ProgressTrackRenderProps extends ProgressTrackCommonProps, ProgressDataSet {
}
type ProgressTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressTrackOptions & Partial<ProgressTrackCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the progress track.
 * Act as a container for `Progress.Fill`.
 */
declare function ProgressTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressTrackProps<T>>): solid_js.JSX.Element;

interface ProgressValueLabelOptions {
}
interface ProgressValueLabelCommonProps<T extends HTMLElement = HTMLElement> {
}
interface ProgressValueLabelRenderProps extends ProgressValueLabelCommonProps, ProgressDataSet {
    children: JSX.Element;
}
type ProgressValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressValueLabelOptions & Partial<ProgressValueLabelCommonProps<ElementOf<T>>>;
/**
 * The accessible label text representing the current value in a human-readable format.
 */
declare function ProgressValueLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressValueLabelProps<T>>): JSX.Element;

declare const Progress: typeof ProgressRoot & {
    Fill: typeof ProgressFill;
    Label: typeof ProgressLabel;
    Track: typeof ProgressTrack;
    ValueLabel: typeof ProgressValueLabel;
};

declare const index_Progress: typeof Progress;
type index_ProgressFillCommonProps<T extends HTMLElement = HTMLElement> = ProgressFillCommonProps<T>;
type index_ProgressFillOptions = ProgressFillOptions;
type index_ProgressFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressFillProps<T>;
type index_ProgressFillRenderProps = ProgressFillRenderProps;
type index_ProgressLabelCommonProps<T extends HTMLElement = HTMLElement> = ProgressLabelCommonProps<T>;
type index_ProgressLabelOptions = ProgressLabelOptions;
type index_ProgressLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressLabelProps<T>;
type index_ProgressLabelRenderProps = ProgressLabelRenderProps;
type index_ProgressRootCommonProps<T extends HTMLElement = HTMLElement> = ProgressRootCommonProps<T>;
type index_ProgressRootOptions = ProgressRootOptions;
type index_ProgressRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressRootProps<T>;
type index_ProgressRootRenderProps = ProgressRootRenderProps;
type index_ProgressTrackCommonProps<T extends HTMLElement = HTMLElement> = ProgressTrackCommonProps<T>;
type index_ProgressTrackOptions = ProgressTrackOptions;
type index_ProgressTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressTrackProps<T>;
type index_ProgressTrackRenderProps = ProgressTrackRenderProps;
type index_ProgressValueLabelCommonProps<T extends HTMLElement = HTMLElement> = ProgressValueLabelCommonProps<T>;
type index_ProgressValueLabelOptions = ProgressValueLabelOptions;
type index_ProgressValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressValueLabelProps<T>;
type index_ProgressValueLabelRenderProps = ProgressValueLabelRenderProps;
declare namespace index {
  export {
    ProgressFill as Fill,
    ProgressLabel as Label,
    index_Progress as Progress,
    index_ProgressFillCommonProps as ProgressFillCommonProps,
    index_ProgressFillOptions as ProgressFillOptions,
    index_ProgressFillProps as ProgressFillProps,
    index_ProgressFillRenderProps as ProgressFillRenderProps,
    index_ProgressLabelCommonProps as ProgressLabelCommonProps,
    index_ProgressLabelOptions as ProgressLabelOptions,
    index_ProgressLabelProps as ProgressLabelProps,
    index_ProgressLabelRenderProps as ProgressLabelRenderProps,
    index_ProgressRootCommonProps as ProgressRootCommonProps,
    index_ProgressRootOptions as ProgressRootOptions,
    index_ProgressRootProps as ProgressRootProps,
    index_ProgressRootRenderProps as ProgressRootRenderProps,
    index_ProgressTrackCommonProps as ProgressTrackCommonProps,
    index_ProgressTrackOptions as ProgressTrackOptions,
    index_ProgressTrackProps as ProgressTrackProps,
    index_ProgressTrackRenderProps as ProgressTrackRenderProps,
    index_ProgressValueLabelCommonProps as ProgressValueLabelCommonProps,
    index_ProgressValueLabelOptions as ProgressValueLabelOptions,
    index_ProgressValueLabelProps as ProgressValueLabelProps,
    index_ProgressValueLabelRenderProps as ProgressValueLabelRenderProps,
    ProgressRoot as Root,
    ProgressTrack as Track,
    ProgressValueLabel as ValueLabel,
  };
}

export { ProgressFillOptions as P, ProgressFillCommonProps as a, ProgressFillRenderProps as b, ProgressFillProps as c, ProgressLabelOptions as d, ProgressLabelCommonProps as e, ProgressLabelRenderProps as f, ProgressLabelProps as g, ProgressRootOptions as h, index as i, ProgressRootCommonProps as j, ProgressRootRenderProps as k, ProgressRootProps as l, ProgressTrackOptions as m, ProgressTrackCommonProps as n, ProgressTrackRenderProps as o, ProgressTrackProps as p, ProgressValueLabelOptions as q, ProgressValueLabelCommonProps as r, ProgressValueLabelRenderProps as s, ProgressValueLabelProps as t, ProgressFill as u, ProgressLabel as v, ProgressRoot as w, ProgressTrack as x, ProgressValueLabel as y, Progress as z };
