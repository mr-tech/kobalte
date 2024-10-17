import * as solid_js from 'solid-js';
import { JSX, ValidComponent, ComponentProps, Component, Accessor } from 'solid-js';
import { a as DismissableLayerCommonProps, D as DismissableLayerRenderProps } from './dismissable-layer-0aef6de3.js';
import { ElementOf, PolymorphicProps } from './polymorphic/index.js';
import { PointerDownOutsideEvent, FocusOutsideEvent, InteractOutsideEvent } from './primitives/create-interact-outside/index.js';
import { F as FormControlDataSet, a as FormControlDescription, b as FormControlErrorMessage, c as FormControlDescriptionCommonProps, d as FormControlDescriptionOptions, e as FormControlDescriptionProps, f as FormControlDescriptionRenderProps, g as FormControlErrorMessageCommonProps, h as FormControlErrorMessageOptions, i as FormControlErrorMessageProps, j as FormControlErrorMessageRenderProps } from './form-control-error-message-7d91602e.js';
import { w as ListboxRootOptions, y as ListboxRootRenderProps, a as ListboxItem, b as ListboxItemDescription, c as ListboxItemIndicator, d as ListboxItemLabel, e as ListboxSection, f as ListboxItemCommonProps, g as ListboxItemDescriptionCommonProps, h as ListboxItemDescriptionOptions, i as ListboxItemDescriptionProps, j as ListboxItemDescriptionRenderProps, k as ListboxItemIndicatorCommonProps, l as ListboxItemIndicatorOptions, m as ListboxItemIndicatorProps, n as ListboxItemIndicatorRenderProps, o as ListboxItemLabelCommonProps, p as ListboxItemLabelOptions, q as ListboxItemLabelProps, r as ListboxItemLabelRenderProps, s as ListboxItemOptions, t as ListboxItemProps, u as ListboxItemRenderProps, z as ListboxSectionCommonProps, A as ListboxSectionOptions, B as ListboxSectionProps, C as ListboxSectionRenderProps } from './listbox-section-630514ef.js';
import { Portal } from 'solid-js/web';
import { F as FormControlLabel, a as FormControlLabelCommonProps, b as FormControlLabelOptions, c as FormControlLabelProps, d as FormControlLabelRenderProps } from './form-control-label-fea2aaa3.js';
import { g as PopperRootOptions, P as PopperArrow, b as PopperArrowOptions, c as PopperArrowProps } from './popper-root-4f4dc506.js';
import { ValidationState } from '@kobalte/utils';
import { a as CollectionNode } from './types-9fcfe271.js';
import { K as KeyboardDelegate, S as SelectionMode, b as SelectionBehavior } from './types-3ae26449.js';
import { a as ButtonRootCommonProps, d as ButtonRootRenderProps } from './button-root-da654b3e.js';

type ComboboxTriggerMode = "focus" | "input" | "manual";

interface ComboboxDataSet {
    "data-expanded": string | undefined;
    "data-closed": string | undefined;
}

interface ComboboxContentOptions {
    /**
     * Event handler called when focus moves to the trigger after closing.
     * It can be prevented by calling `event.preventDefault`.
     */
    onCloseAutoFocus?: (event: Event) => void;
    /**
     * Event handler called when a pointer event occurs outside the bounds of the component.
     * It can be prevented by calling `event.preventDefault`.
     */
    onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
    /**
     * Event handler called when the focus moves outside the bounds of the component.
     * It can be prevented by calling `event.preventDefault`.
     */
    onFocusOutside?: (event: FocusOutsideEvent) => void;
    /**
     * Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component.
     * It can be prevented by calling `event.preventDefault`.
     */
    onInteractOutside?: (event: InteractOutsideEvent) => void;
}
interface ComboboxContentCommonProps<T extends HTMLElement = HTMLElement> extends DismissableLayerCommonProps<T> {
    style?: JSX.CSSProperties | string;
}
interface ComboboxContentRenderProps extends ComboboxContentCommonProps, DismissableLayerRenderProps, ComboboxDataSet {
}
type ComboboxContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxContentOptions & Partial<ComboboxContentCommonProps<ElementOf<T>>>;
/**
 * The component that pops out when the combobox is open.
 */
declare function ComboboxContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, ComboboxContentProps<T>>): JSX.Element;

interface ComboboxInputOptions {
}
interface ComboboxInputCommonProps<T extends HTMLElement = HTMLInputElement> {
    id: string;
    ref: T | ((el: T) => void);
    onInput: JSX.EventHandlerUnion<T, InputEvent>;
    onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
    onClick: JSX.EventHandlerUnion<T, MouseEvent>;
    onFocus: JSX.EventHandlerUnion<T, FocusEvent>;
    onBlur: JSX.EventHandlerUnion<T, FocusEvent>;
    onTouchEnd: JSX.EventHandlerUnion<T, TouchEvent>;
    disabled: boolean | undefined;
    "aria-label": string | undefined;
    "aria-labelledby": string | undefined;
    "aria-describedby": string | undefined;
}
interface ComboboxInputRenderProps extends ComboboxInputCommonProps, FormControlDataSet {
    value: string | undefined;
    required: boolean | undefined;
    readonly: boolean | undefined;
    placeholder: JSX.Element;
    "aria-invalid": boolean | undefined;
    "aria-required": boolean | undefined;
    "aria-disabled": boolean | undefined;
    "aria-readonly": boolean | undefined;
    type: "text";
    role: "combobox";
    autoComplete: "off";
    autoCorrect: "off";
    spellCheck: "false";
    "aria-haspopup": "listbox";
    "aria-autocomplete": "list";
    "aria-expanded": boolean;
    "aria-controls": string | undefined;
    "aria-activedescendant": string | undefined;
}
type ComboboxInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = ComboboxInputOptions & Partial<ComboboxInputCommonProps<ElementOf<T>>>;
declare function ComboboxInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, ComboboxInputProps<T>>): JSX.Element;

interface ComboboxListboxOptions<Option, OptGroup = never> extends Pick<ListboxRootOptions<Option, OptGroup>, "scrollRef" | "scrollToItem" | "children"> {
}
interface ComboboxListboxCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    ref: T | ((el: T) => void);
}
interface ComboboxListboxRenderProps extends ComboboxListboxCommonProps, ListboxRootRenderProps {
    "aria-label": string | undefined;
    "aria-labelledby": string | undefined;
}
type ComboboxListboxProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxListboxOptions<Option, OptGroup> & Partial<ComboboxListboxCommonProps<ElementOf<T>>>;
/**
 * Contains all the items of a `Combobox`.
 */
declare function ComboboxListbox<Option = any, OptGroup = never, T extends ValidComponent = "ul">(props: PolymorphicProps<T, ComboboxListboxProps<Option, OptGroup, T>>): solid_js.JSX.Element;

interface ComboboxPortalProps extends ComponentProps<typeof Portal> {
}
/**
 * Portals its children into the `body` when the combobox is open.
 */
declare function ComboboxPortal(props: ComboboxPortalProps): solid_js.JSX.Element;

declare const COMBOBOX_INTL_TRANSLATIONS: {
    focusAnnouncement: (optionText: string, isSelected: boolean) => string;
    countAnnouncement: (optionCount: number) => "one option available" | undefined;
    selectedAnnouncement: (optionText: string) => string;
    triggerLabel: string;
    listboxLabel: string;
};
type ComboboxIntlTranslations = typeof COMBOBOX_INTL_TRANSLATIONS;

interface ComboboxBaseItemComponentProps<Option> {
    /** The item to render. */
    item: CollectionNode<Option>;
}
interface ComboboxBaseSectionComponentProps<OptGroup> {
    /** The section to render. */
    section: CollectionNode<OptGroup>;
}
interface ComboboxBaseOptions<Option, OptGroup = never> extends Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
    /** The localized strings of the component. */
    translations?: ComboboxIntlTranslations;
    /** The controlled open state of the combobox. */
    open?: boolean;
    /**
     * The default open state when initially rendered.
     * Useful when you do not need to control the open state.
     */
    defaultOpen?: boolean;
    /**
     * Event handler called when the open state of the combobox changes.
     * Returns the new open state and the action that caused the opening of the menu.
     */
    onOpenChange?: (isOpen: boolean, triggerMode?: ComboboxTriggerMode) => void;
    /** The controlled text value of the input in the combobox. */
    inputValue?: string;
    /** Handler that is called when the combobox input value changes. */
    onInputChange?: (value: string) => void;
    /** The controlled value of the combobox. */
    value?: Option[];
    /**
     * The value of the combobox when initially rendered.
     * Useful when you do not need to control the value.
     */
    defaultValue?: Option[];
    /** Event handler called when the value changes. */
    onChange?: (value: Option[]) => void;
    /** The interaction required to display the combobox menu. */
    triggerMode?: ComboboxTriggerMode;
    /** The content that will be rendered when no value or defaultValue is set. */
    placeholder?: JSX.Element;
    /** An array of options to display as the available options. */
    options: Array<Option | OptGroup>;
    /**
     * Property name or getter function to use as the value of an option.
     * This is the value that will be submitted when the combobox is part of a `<form>`.
     */
    optionValue?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string | number);
    /** Property name or getter function to use as the text value of an option for typeahead purpose. */
    optionTextValue?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string);
    /**
     * Property name or getter function to use as the label of an option.
     * This is the string representation of the option to display in the `Combobox.Input`.
     */
    optionLabel?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string);
    /** Property name or getter function to use as the disabled flag of an option. */
    optionDisabled?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => boolean);
    /** Property name that refers to the children options of an option group. */
    optionGroupChildren?: keyof Exclude<OptGroup, null>;
    /** An optional keyboard delegate to override the default. */
    keyboardDelegate?: KeyboardDelegate;
    /** The filter function used to determine if an option should be included in the combo box list. */
    defaultFilter?: "startsWith" | "endsWith" | "contains" | ((option: Exclude<Option, null>, inputValue: string) => boolean);
    /** Whether focus should wrap around when the end/start is reached. */
    shouldFocusWrap?: boolean;
    /** Whether the combobox allows the menu to be open when the collection is empty. */
    allowsEmptyCollection?: boolean;
    /** The type of selection that is allowed in the select. */
    selectionMode?: Exclude<SelectionMode, "none">;
    /** How multiple selection should behave in the select. */
    selectionBehavior?: SelectionBehavior;
    /** Whether onValueChange should fire even if the new set of keys is the same as the last. */
    allowDuplicateSelectionEvents?: boolean;
    /** Whether the combobox allows empty selection. */
    disallowEmptySelection?: boolean;
    /** Whether the combobox allows `ctrl + a` to replace the selection with the current filtered list. */
    disallowSelectAll?: boolean;
    /** Whether the combobox closes after selection. */
    closeOnSelection?: boolean;
    /**
     * When `selectionMode` is "multiple".
     * Whether the last selected option should be removed when the user press the Backspace key and the input is empty.
     */
    removeOnBackspace?: boolean;
    /** Whether the combobox uses virtual scrolling. */
    virtualized?: boolean;
    /** When NOT virtualized, the component to render as an item in the `Combobox.Listbox`. */
    itemComponent?: Component<ComboboxBaseItemComponentProps<Option>>;
    /** When NOT virtualized, the component to render as a section in the `Combobox.Listbox`. */
    sectionComponent?: Component<ComboboxBaseSectionComponentProps<OptGroup>>;
    /**
     * Whether the combobox should be the only visible content for screen readers.
     * When set to `true`:
     * - interaction with outside elements will be disabled.
     * - scroll will be locked.
     * - focus will be locked inside the select content.
     * - elements outside the combobox content will not be visible for screen readers.
     */
    modal?: boolean;
    /** Whether the scroll should be locked even if the combobox is not modal. */
    preventScroll?: boolean;
    /**
     * Used to force mounting the combobox (portal, positioner and content) when more control is needed.
     * Useful when controlling animation with SolidJS animation libraries.
     */
    forceMount?: boolean;
    /**
     * A unique identifier for the component.
     * The id is used to generate id attributes for nested components.
     * If no id prop is provided, a generated id will be used.
     */
    id?: string;
    /**
     * The name of the combobox.
     * Submitted with its owning form as part of a name/value pair.
     */
    name?: string;
    /** Whether the combobox should display its "valid" or "invalid" visual styling. */
    validationState?: ValidationState;
    /** Whether the user must select an item before the owning form can be submitted. */
    required?: boolean;
    /** Whether the combobox is disabled. */
    disabled?: boolean;
    /** Whether the combobox is read only. */
    readOnly?: boolean;
}
interface ComboboxBaseCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
}
interface ComboboxBaseRenderProps extends ComboboxBaseCommonProps, FormControlDataSet, ComboboxDataSet {
    role: "group";
}

interface ComboboxControlState<Option> {
    /** The selected options. */
    selectedOptions: Accessor<Option[]>;
    /** A function to remove an option from the selection. */
    remove: (option: Option) => void;
    /** A function to clear the selection. */
    clear: () => void;
}
interface ComboboxControlOptions<Option> {
    /**
     * The children of the combobox control.
     * Can be a `JSX.Element` or a _render prop_ for having access to the internal state.
     */
    children?: JSX.Element | ((state: ComboboxControlState<Option>) => JSX.Element);
}
interface ComboboxControlCommonProps<T extends HTMLElement = HTMLElement> {
    ref: T | ((el: T) => void);
}
interface ComboboxControlRenderProps extends ComboboxControlCommonProps, FormControlDataSet, ComboboxDataSet {
    children: JSX.Element;
}
type ComboboxControlProps<Option, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxControlOptions<Option> & Partial<ComboboxControlCommonProps<ElementOf<T>>>;
/**
 * Contains the combobox input and trigger.
 */
declare function ComboboxControl<Option, T extends ValidComponent = "div">(props: PolymorphicProps<T, ComboboxControlProps<Option, T>>): JSX.Element;

type ComboboxHiddenSelectProps = ComponentProps<"select">;
declare function ComboboxHiddenSelect(props: ComboboxHiddenSelectProps): solid_js.JSX.Element;

interface ComboboxIconOptions {
}
interface ComboboxIconCommonProps<T extends HTMLElement = HTMLElement> {
    children: JSX.Element;
}
type ComboboxIconProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxIconOptions & Partial<ComboboxIconCommonProps<ElementOf<T>>>;
/**
 * A small icon often displayed next to the value as a visual affordance for the fact it can be open.
 * It renders a `▼` by default, but you can use your own icon `children`.
 */
declare function ComboboxIcon<T extends ValidComponent = "span">(props: PolymorphicProps<T, ComboboxIconProps<T>>): JSX.Element;

interface ComboboxSingleSelectionOptions<T> {
    /** The controlled value of the combobox. */
    value?: T | null;
    /**
     * The value of the combobox when initially rendered.
     * Useful when you do not need to control the value.
     */
    defaultValue?: T;
    /** Event handler called when the value changes. */
    onChange?: (value: T | null) => void;
    /** Whether the combobox allow multiple selection. */
    multiple?: false;
}
interface ComboboxMultipleSelectionOptions<T> {
    /** The controlled value of the combobox. */
    value?: T[];
    /**
     * The value of the combobox when initially rendered.
     * Useful when you do not need to control the value.
     */
    defaultValue?: T[];
    /** Event handler called when the value changes. */
    onChange?: (value: T[]) => void;
    /** Whether the combobox allow multiple selection. */
    multiple: true;
}
type ComboboxRootOptions<Option, OptGroup = never> = (ComboboxSingleSelectionOptions<Option> | ComboboxMultipleSelectionOptions<Option>) & Omit<ComboboxBaseOptions<Option, OptGroup>, "value" | "defaultValue" | "onChange" | "selectionMode">;
interface ComboboxRootCommonProps<T extends HTMLElement = HTMLElement> {
}
interface ComboboxRootRenderProps extends ComboboxRootCommonProps, ComboboxBaseRenderProps {
}
type ComboboxRootProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxRootOptions<Option, OptGroup> & Partial<ComboboxRootCommonProps<ElementOf<T>>>;
/**
 * A combo box combines a text input with a listbox, allowing users to filter a list of options to items matching a query.
 */
declare function ComboboxRoot<Option, OptGroup = never, T extends ValidComponent = "div">(props: PolymorphicProps<T, ComboboxRootProps<Option, OptGroup, T>>): solid_js.JSX.Element;

interface ComboboxTriggerOptions {
}
interface ComboboxTriggerCommonProps<T extends HTMLElement = HTMLElement> extends ButtonRootCommonProps<T> {
    id: string;
    ref: T | ((el: T) => void);
    onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
    onClick: JSX.EventHandlerUnion<T, MouseEvent>;
    "aria-labelledby": string | undefined;
}
interface ComboboxTriggerRenderProps extends ComboboxTriggerCommonProps, ComboboxDataSet, ButtonRootRenderProps {
    "aria-label": string | undefined;
    "aria-haspopup": "listbox";
    "aria-expanded": boolean;
    "aria-controls": string | undefined;
}
type ComboboxTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxTriggerOptions & Partial<ComboboxTriggerCommonProps<ElementOf<T>>>;
declare function ComboboxTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, ComboboxTriggerProps<T>>): JSX.Element;

declare const Combobox: typeof ComboboxRoot & {
    Arrow: typeof PopperArrow;
    Content: typeof ComboboxContent;
    Control: typeof ComboboxControl;
    Description: typeof FormControlDescription;
    ErrorMessage: typeof FormControlErrorMessage;
    HiddenSelect: typeof ComboboxHiddenSelect;
    Icon: typeof ComboboxIcon;
    Input: typeof ComboboxInput;
    Item: typeof ListboxItem;
    ItemDescription: typeof ListboxItemDescription;
    ItemIndicator: typeof ListboxItemIndicator;
    ItemLabel: typeof ListboxItemLabel;
    Label: typeof FormControlLabel;
    Listbox: typeof ComboboxListbox;
    Portal: typeof ComboboxPortal;
    Section: typeof ListboxSection;
    Trigger: typeof ComboboxTrigger;
};

declare const index_Combobox: typeof Combobox;
type index_ComboboxContentCommonProps<T extends HTMLElement = HTMLElement> = ComboboxContentCommonProps<T>;
type index_ComboboxContentOptions = ComboboxContentOptions;
type index_ComboboxContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxContentProps<T>;
type index_ComboboxContentRenderProps = ComboboxContentRenderProps;
type index_ComboboxControlCommonProps<T extends HTMLElement = HTMLElement> = ComboboxControlCommonProps<T>;
type index_ComboboxControlOptions<Option> = ComboboxControlOptions<Option>;
type index_ComboboxControlProps<Option, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxControlProps<Option, T>;
type index_ComboboxControlRenderProps = ComboboxControlRenderProps;
type index_ComboboxHiddenSelectProps = ComboboxHiddenSelectProps;
type index_ComboboxIconProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxIconProps<T>;
type index_ComboboxInputCommonProps<T extends HTMLElement = HTMLInputElement> = ComboboxInputCommonProps<T>;
type index_ComboboxInputOptions = ComboboxInputOptions;
type index_ComboboxInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = ComboboxInputProps<T>;
type index_ComboboxInputRenderProps = ComboboxInputRenderProps;
type index_ComboboxListboxCommonProps<T extends HTMLElement = HTMLElement> = ComboboxListboxCommonProps<T>;
type index_ComboboxListboxOptions<Option, OptGroup = never> = ComboboxListboxOptions<Option, OptGroup>;
type index_ComboboxListboxProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxListboxProps<Option, OptGroup, T>;
type index_ComboboxListboxRenderProps = ComboboxListboxRenderProps;
type index_ComboboxMultipleSelectionOptions<T> = ComboboxMultipleSelectionOptions<T>;
type index_ComboboxPortalProps = ComboboxPortalProps;
type index_ComboboxRootCommonProps<T extends HTMLElement = HTMLElement> = ComboboxRootCommonProps<T>;
type index_ComboboxRootOptions<Option, OptGroup = never> = ComboboxRootOptions<Option, OptGroup>;
type index_ComboboxRootProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxRootProps<Option, OptGroup, T>;
type index_ComboboxRootRenderProps = ComboboxRootRenderProps;
type index_ComboboxSingleSelectionOptions<T> = ComboboxSingleSelectionOptions<T>;
type index_ComboboxTriggerCommonProps<T extends HTMLElement = HTMLElement> = ComboboxTriggerCommonProps<T>;
type index_ComboboxTriggerMode = ComboboxTriggerMode;
type index_ComboboxTriggerOptions = ComboboxTriggerOptions;
type index_ComboboxTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxTriggerProps<T>;
type index_ComboboxTriggerRenderProps = ComboboxTriggerRenderProps;
declare namespace index {
  export {
    PopperArrow as Arrow,
    index_Combobox as Combobox,
    PopperArrowOptions as ComboboxArrowOptions,
    PopperArrowProps as ComboboxArrowProps,
    index_ComboboxContentCommonProps as ComboboxContentCommonProps,
    index_ComboboxContentOptions as ComboboxContentOptions,
    index_ComboboxContentProps as ComboboxContentProps,
    index_ComboboxContentRenderProps as ComboboxContentRenderProps,
    index_ComboboxControlCommonProps as ComboboxControlCommonProps,
    index_ComboboxControlOptions as ComboboxControlOptions,
    index_ComboboxControlProps as ComboboxControlProps,
    index_ComboboxControlRenderProps as ComboboxControlRenderProps,
    FormControlDescriptionCommonProps as ComboboxDescriptionCommonProps,
    FormControlDescriptionOptions as ComboboxDescriptionOptions,
    FormControlDescriptionProps as ComboboxDescriptionProps,
    FormControlDescriptionRenderProps as ComboboxDescriptionRenderProps,
    FormControlErrorMessageCommonProps as ComboboxErrorMessageCommonProps,
    FormControlErrorMessageOptions as ComboboxErrorMessageOptions,
    FormControlErrorMessageProps as ComboboxErrorMessageProps,
    FormControlErrorMessageRenderProps as ComboboxErrorMessageRenderProps,
    index_ComboboxHiddenSelectProps as ComboboxHiddenSelectProps,
    index_ComboboxIconProps as ComboboxIconProps,
    index_ComboboxInputCommonProps as ComboboxInputCommonProps,
    index_ComboboxInputOptions as ComboboxInputOptions,
    index_ComboboxInputProps as ComboboxInputProps,
    index_ComboboxInputRenderProps as ComboboxInputRenderProps,
    ListboxItemCommonProps as ComboboxItemCommonProps,
    ListboxItemDescriptionCommonProps as ComboboxItemDescriptionCommonProps,
    ListboxItemDescriptionOptions as ComboboxItemDescriptionOptions,
    ListboxItemDescriptionProps as ComboboxItemDescriptionProps,
    ListboxItemDescriptionRenderProps as ComboboxItemDescriptionRenderProps,
    ListboxItemIndicatorCommonProps as ComboboxItemIndicatorCommonProps,
    ListboxItemIndicatorOptions as ComboboxItemIndicatorOptions,
    ListboxItemIndicatorProps as ComboboxItemIndicatorProps,
    ListboxItemIndicatorRenderProps as ComboboxItemIndicatorRenderProps,
    ListboxItemLabelCommonProps as ComboboxItemLabelCommonProps,
    ListboxItemLabelOptions as ComboboxItemLabelOptions,
    ListboxItemLabelProps as ComboboxItemLabelProps,
    ListboxItemLabelRenderProps as ComboboxItemLabelRenderProps,
    ListboxItemOptions as ComboboxItemOptions,
    ListboxItemProps as ComboboxItemProps,
    ListboxItemRenderProps as ComboboxItemRenderProps,
    FormControlLabelCommonProps as ComboboxLabelCommonProps,
    FormControlLabelOptions as ComboboxLabelOptions,
    FormControlLabelProps as ComboboxLabelProps,
    FormControlLabelRenderProps as ComboboxLabelRenderProps,
    index_ComboboxListboxCommonProps as ComboboxListboxCommonProps,
    index_ComboboxListboxOptions as ComboboxListboxOptions,
    index_ComboboxListboxProps as ComboboxListboxProps,
    index_ComboboxListboxRenderProps as ComboboxListboxRenderProps,
    index_ComboboxMultipleSelectionOptions as ComboboxMultipleSelectionOptions,
    index_ComboboxPortalProps as ComboboxPortalProps,
    index_ComboboxRootCommonProps as ComboboxRootCommonProps,
    ComboboxBaseItemComponentProps as ComboboxRootItemComponentProps,
    index_ComboboxRootOptions as ComboboxRootOptions,
    index_ComboboxRootProps as ComboboxRootProps,
    index_ComboboxRootRenderProps as ComboboxRootRenderProps,
    ComboboxBaseSectionComponentProps as ComboboxRootSectionComponentProps,
    ListboxSectionCommonProps as ComboboxSectionCommonProps,
    ListboxSectionOptions as ComboboxSectionOptions,
    ListboxSectionProps as ComboboxSectionProps,
    ListboxSectionRenderProps as ComboboxSectionRenderProps,
    index_ComboboxSingleSelectionOptions as ComboboxSingleSelectionOptions,
    index_ComboboxTriggerCommonProps as ComboboxTriggerCommonProps,
    index_ComboboxTriggerMode as ComboboxTriggerMode,
    index_ComboboxTriggerOptions as ComboboxTriggerOptions,
    index_ComboboxTriggerProps as ComboboxTriggerProps,
    index_ComboboxTriggerRenderProps as ComboboxTriggerRenderProps,
    ComboboxContent as Content,
    ComboboxControl as Control,
    FormControlDescription as Description,
    FormControlErrorMessage as ErrorMessage,
    ComboboxHiddenSelect as HiddenSelect,
    ComboboxIcon as Icon,
    ComboboxInput as Input,
    ListboxItem as Item,
    ListboxItemDescription as ItemDescription,
    ListboxItemIndicator as ItemIndicator,
    ListboxItemLabel as ItemLabel,
    FormControlLabel as Label,
    ComboboxListbox as Listbox,
    ComboboxPortal as Portal,
    ComboboxRoot as Root,
    ListboxSection as Section,
    ComboboxTrigger as Trigger,
  };
}

export { ComboboxSingleSelectionOptions as A, ComboboxTriggerMode as B, ComboboxContentOptions as C, ComboboxTriggerOptions as D, ComboboxTriggerCommonProps as E, ComboboxTriggerRenderProps as F, ComboboxTriggerProps as G, ComboboxContent as H, ComboboxControl as I, ComboboxHiddenSelect as J, ComboboxIcon as K, ComboboxInput as L, ComboboxListbox as M, ComboboxPortal as N, ComboboxRoot as O, ComboboxTrigger as P, Combobox as Q, ComboboxContentCommonProps as a, ComboboxContentRenderProps as b, ComboboxContentProps as c, ComboboxControlOptions as d, ComboboxControlCommonProps as e, ComboboxControlRenderProps as f, ComboboxControlProps as g, ComboboxHiddenSelectProps as h, index as i, ComboboxIconProps as j, ComboboxInputOptions as k, ComboboxInputCommonProps as l, ComboboxInputRenderProps as m, ComboboxInputProps as n, ComboboxListboxOptions as o, ComboboxListboxCommonProps as p, ComboboxListboxRenderProps as q, ComboboxListboxProps as r, ComboboxMultipleSelectionOptions as s, ComboboxPortalProps as t, ComboboxBaseItemComponentProps as u, ComboboxRootOptions as v, ComboboxRootCommonProps as w, ComboboxRootRenderProps as x, ComboboxRootProps as y, ComboboxBaseSectionComponentProps as z };
