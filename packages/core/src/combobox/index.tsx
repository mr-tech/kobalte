import {
	ComboboxContent as Content, type ComboboxContentCommonProps,
	type ComboboxContentOptions,
	type ComboboxContentProps,
	type ComboboxContentRenderProps
} from "../combobox/combobox-content";
import {
	ComboboxInput as Input, type ComboboxInputCommonProps,
	type ComboboxInputOptions,
	type ComboboxInputProps,
	type ComboboxInputRenderProps
} from "../combobox/combobox-input";
import {
	ComboboxListbox as Listbox, type ComboboxListboxCommonProps,
	type ComboboxListboxOptions,
	type ComboboxListboxProps,
	type ComboboxListboxRenderProps
} from "../combobox/combobox-listbox";
import {
	ComboboxPortal as Portal, type ComboboxPortalProps
} from "../combobox/combobox-portal";
import {
	FormControlDescription as Description,
	FormControlErrorMessage as ErrorMessage,
	FormControlLabel as Label, type FormControlDescriptionCommonProps as ComboboxDescriptionCommonProps,
	type FormControlDescriptionOptions as ComboboxDescriptionOptions,
	type FormControlDescriptionProps as ComboboxDescriptionProps,
	type FormControlDescriptionRenderProps as ComboboxDescriptionRenderProps,
	type FormControlErrorMessageCommonProps as ComboboxErrorMessageCommonProps,
	type FormControlErrorMessageOptions as ComboboxErrorMessageOptions,
	type FormControlErrorMessageProps as ComboboxErrorMessageProps,
	type FormControlErrorMessageRenderProps as ComboboxErrorMessageRenderProps,
	type FormControlLabelCommonProps as ComboboxLabelCommonProps,
	type FormControlLabelOptions as ComboboxLabelOptions,
	type FormControlLabelProps as ComboboxLabelProps,
	type FormControlLabelRenderProps as ComboboxLabelRenderProps
} from "../form-control";
import {
	Item,
	ItemDescription,
	ItemIndicator,
	ItemLabel,
	Section, type ListboxItemCommonProps as ComboboxItemCommonProps,
	type ListboxItemDescriptionCommonProps as ComboboxItemDescriptionCommonProps,
	type ListboxItemDescriptionOptions as ComboboxItemDescriptionOptions,
	type ListboxItemDescriptionProps as ComboboxItemDescriptionProps,
	type ListboxItemDescriptionRenderProps as ComboboxItemDescriptionRenderProps,
	type ListboxItemIndicatorCommonProps as ComboboxItemIndicatorCommonProps,
	type ListboxItemIndicatorOptions as ComboboxItemIndicatorOptions,
	type ListboxItemIndicatorProps as ComboboxItemIndicatorProps,
	type ListboxItemIndicatorRenderProps as ComboboxItemIndicatorRenderProps,
	type ListboxItemLabelCommonProps as ComboboxItemLabelCommonProps,
	type ListboxItemLabelOptions as ComboboxItemLabelOptions,
	type ListboxItemLabelProps as ComboboxItemLabelProps,
	type ListboxItemLabelRenderProps as ComboboxItemLabelRenderProps,
	type ListboxItemOptions as ComboboxItemOptions,
	type ListboxItemProps as ComboboxItemProps,
	type ListboxItemRenderProps as ComboboxItemRenderProps,
	type ListboxSectionCommonProps as ComboboxSectionCommonProps,
	type ListboxSectionOptions as ComboboxSectionOptions,
	type ListboxSectionProps as ComboboxSectionProps,
	type ListboxSectionRenderProps as ComboboxSectionRenderProps
} from "../listbox";
import {
	Arrow,
	type PopperArrowOptions as ComboboxArrowOptions,
	type PopperArrowProps as ComboboxArrowProps
} from "../popper";
import type {
	ComboboxBaseItemComponentProps as ComboboxRootItemComponentProps,
	ComboboxBaseSectionComponentProps as ComboboxRootSectionComponentProps
} from "./combobox-base";
import { useComboboxContext } from "./combobox-context";
import {
	ComboboxControl as Control, type ComboboxControlCommonProps,
	type ComboboxControlOptions,
	type ComboboxControlProps,
	type ComboboxControlRenderProps
} from "./combobox-control";
import {
	ComboboxHiddenSelect as HiddenSelect, type ComboboxHiddenSelectProps
} from "./combobox-hidden-select";
import { ComboboxIcon as Icon, type ComboboxIconProps } from "./combobox-icon";
import {
	ComboboxRoot as Root, type ComboboxMultipleSelectionOptions,
	type ComboboxRootCommonProps,
	type ComboboxRootOptions,
	type ComboboxRootProps,
	type ComboboxRootRenderProps,
	type ComboboxSingleSelectionOptions
} from "./combobox-root";
import {
	ComboboxTrigger as Trigger, type ComboboxTriggerCommonProps,
	type ComboboxTriggerOptions,
	type ComboboxTriggerProps,
	type ComboboxTriggerRenderProps
} from "./combobox-trigger";
import type { ComboboxTriggerMode } from "./types";

export type {
	ComboboxArrowOptions,
	ComboboxArrowProps,
	ComboboxContentOptions,
	ComboboxContentCommonProps,
	ComboboxContentRenderProps,
	ComboboxContentProps,
	ComboboxControlOptions,
	ComboboxControlCommonProps,
	ComboboxControlRenderProps,
	ComboboxControlProps,
	ComboboxDescriptionOptions,
	ComboboxDescriptionCommonProps,
	ComboboxDescriptionRenderProps,
	ComboboxDescriptionProps,
	ComboboxErrorMessageOptions,
	ComboboxErrorMessageCommonProps,
	ComboboxErrorMessageRenderProps,
	ComboboxErrorMessageProps,
	ComboboxHiddenSelectProps,
	ComboboxIconProps,
	ComboboxInputOptions,
	ComboboxInputCommonProps,
	ComboboxInputRenderProps,
	ComboboxInputProps,
	ComboboxItemDescriptionOptions,
	ComboboxItemDescriptionCommonProps,
	ComboboxItemDescriptionRenderProps,
	ComboboxItemDescriptionProps,
	ComboboxItemIndicatorOptions,
	ComboboxItemIndicatorCommonProps,
	ComboboxItemIndicatorRenderProps,
	ComboboxItemIndicatorProps,
	ComboboxItemLabelOptions,
	ComboboxItemLabelCommonProps,
	ComboboxItemLabelRenderProps,
	ComboboxItemLabelProps,
	ComboboxItemOptions,
	ComboboxItemCommonProps,
	ComboboxItemRenderProps,
	ComboboxItemProps,
	ComboboxLabelOptions,
	ComboboxLabelCommonProps,
	ComboboxLabelRenderProps,
	ComboboxLabelProps,
	ComboboxListboxOptions,
	ComboboxListboxCommonProps,
	ComboboxListboxRenderProps,
	ComboboxListboxProps,
	ComboboxMultipleSelectionOptions,
	ComboboxPortalProps,
	ComboboxRootItemComponentProps,
	ComboboxRootOptions,
	ComboboxRootCommonProps,
	ComboboxRootRenderProps,
	ComboboxRootProps,
	ComboboxRootSectionComponentProps,
	ComboboxSectionOptions,
	ComboboxSectionCommonProps,
	ComboboxSectionRenderProps,
	ComboboxSectionProps,
	ComboboxSingleSelectionOptions,
	ComboboxTriggerMode,
	ComboboxTriggerOptions,
	ComboboxTriggerCommonProps,
	ComboboxTriggerRenderProps,
	ComboboxTriggerProps,
};
export {
	Arrow,
	Content,
	Control,
	Description,
	ErrorMessage,
	HiddenSelect,
	Icon,
	Input,
	Item,
	ItemDescription,
	ItemIndicator,
	ItemLabel,
	Label,
	Listbox,
	Portal,
	Root,
	Section,
	Trigger,
	useComboboxContext,
};


export const Combobox = Object.assign(Root, {
	Arrow,
	Content,
	Control,
	Description,
	ErrorMessage,
	HiddenSelect,
	Icon,
	Input,
	Item,
	ItemDescription,
	ItemIndicator,
	ItemLabel,
	Label,
	Listbox,
	Portal,
	Section,
	Trigger,
});
