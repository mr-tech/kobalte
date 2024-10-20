import { P as PopperArrow, a as PopperArrowCommonProps, b as PopperArrowOptions, c as PopperArrowProps, d as PopperArrowRenderProps } from './popper-root-4f4dc506.js';
import { u as MenuContentOptions, t as MenuContentCommonProps, w as MenuContentRenderProps, ah as MenuRootOptions, M as MenuDataSet, a as MenuCheckboxItem, c as MenuGroup, d as MenuGroupLabel, e as MenuIcon, f as MenuItem, g as MenuItemDescription, h as MenuItemIndicator, i as MenuItemLabel, j as MenuPortal, k as MenuRadioGroup, l as MenuRadioItem, m as MenuSub, n as MenuSubContent, o as MenuSubTrigger, p as MenuCheckboxItemCommonProps, q as MenuCheckboxItemOptions, r as MenuCheckboxItemProps, s as MenuCheckboxItemRenderProps, x as MenuGroupCommonProps, y as MenuGroupLabelCommonProps, z as MenuGroupLabelOptions, A as MenuGroupLabelProps, B as MenuGroupLabelRenderProps, C as MenuGroupOptions, D as MenuGroupProps, E as MenuGroupRenderProps, F as MenuIconCommonProps, G as MenuIconOptions, H as MenuIconProps, I as MenuIconRenderProps, J as MenuItemCommonProps, K as MenuItemDescriptionCommonProps, L as MenuItemDescriptionOptions, N as MenuItemDescriptionProps, O as MenuItemDescriptionRenderProps, P as MenuItemIndicatorCommonProps, Q as MenuItemIndicatorOptions, R as MenuItemIndicatorProps, S as MenuItemIndicatorRenderProps, T as MenuItemLabelCommonProps, U as MenuItemLabelOptions, V as MenuItemLabelProps, W as MenuItemLabelRenderProps, X as MenuItemOptions, Y as MenuItemProps, Z as MenuItemRenderProps, _ as MenuPortalProps, $ as MenuRadioGroupCommonProps, a0 as MenuRadioGroupOptions, a1 as MenuRadioGroupProps, a2 as MenuRadioGroupRenderProps, a3 as MenuRadioItemCommonProps, a4 as MenuRadioItemOptions, a5 as MenuRadioItemRenderProps, a6 as MenuRadioItemProps, a7 as MenuSubContentCommonProps, a8 as MenuSubContentOptions, a9 as MenuSubContentProps, aa as MenuSubContentRenderProps, ab as MenuSubOptions, ac as MenuSubProps, ad as MenuSubTriggerCommonProps, ae as MenuSubTriggerOptions, af as MenuSubTriggerProps, ag as MenuSubTriggerRenderProps } from './menu-sub-trigger-a61674f3.js';
import { S as SeparatorRoot, a as SeparatorRootCommonProps, b as SeparatorRootOptions, c as SeparatorRootProps, d as SeparatorRootRenderProps } from './separator-root-cb685406.js';
import * as solid_js from 'solid-js';
import { ValidComponent, ParentProps, JSX } from 'solid-js';
import { ElementOf, PolymorphicProps } from './polymorphic/index.js';

interface ContextMenuContentOptions extends MenuContentOptions {
}
interface ContextMenuContentCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentCommonProps<T> {
}
interface ContextMenuContentRenderProps extends ContextMenuContentCommonProps, MenuContentRenderProps {
}
type ContextMenuContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = ContextMenuContentOptions & Partial<ContextMenuContentCommonProps<ElementOf<T>>>;
declare function ContextMenuContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, ContextMenuContentProps<T>>): solid_js.JSX.Element;

interface ContextMenuRootOptions extends Omit<MenuRootOptions, "open" | "defaultOpen" | "getAnchorRect"> {
}
interface ContextMenuRootProps extends ParentProps<ContextMenuRootOptions> {
}
/**
 * Displays a menu located at the pointer, triggered by a right-click or a long-press.
 */
declare function ContextMenuRoot(props: ContextMenuRootProps): solid_js.JSX.Element;

interface ContextMenuTriggerOptions {
    /** Whether the context menu trigger is disabled. */
    disabled?: boolean;
}
interface ContextMenuTriggerCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    ref: T | ((el: T) => void);
    onContextMenu: JSX.EventHandlerUnion<T, MouseEvent>;
    onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
    onPointerMove: JSX.EventHandlerUnion<T, PointerEvent>;
    onPointerCancel: JSX.EventHandlerUnion<T, PointerEvent>;
    onPointerUp: JSX.EventHandlerUnion<T, PointerEvent>;
    style?: JSX.CSSProperties | string;
}
interface ContextMenuTriggerRenderProps extends ContextMenuTriggerCommonProps, MenuDataSet {
}
type ContextMenuTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = ContextMenuTriggerOptions & Partial<ContextMenuTriggerCommonProps<ElementOf<T>>>;
declare function ContextMenuTrigger<T extends ValidComponent = "div">(props: PolymorphicProps<T, ContextMenuTriggerProps<T>>): JSX.Element;

declare const ContextMenu: typeof ContextMenuRoot & {
    Arrow: typeof PopperArrow;
    CheckboxItem: typeof MenuCheckboxItem;
    Content: typeof ContextMenuContent;
    Group: typeof MenuGroup;
    GroupLabel: typeof MenuGroupLabel;
    Icon: typeof MenuIcon;
    Item: typeof MenuItem;
    ItemDescription: typeof MenuItemDescription;
    ItemIndicator: typeof MenuItemIndicator;
    ItemLabel: typeof MenuItemLabel;
    Portal: typeof MenuPortal;
    RadioGroup: typeof MenuRadioGroup;
    RadioItem: typeof MenuRadioItem;
    Separator: typeof SeparatorRoot;
    Sub: typeof MenuSub;
    SubContent: typeof MenuSubContent;
    SubTrigger: typeof MenuSubTrigger;
    Trigger: typeof ContextMenuTrigger;
};

declare const index_ContextMenu: typeof ContextMenu;
type index_ContextMenuContentCommonProps<T extends HTMLElement = HTMLElement> = ContextMenuContentCommonProps<T>;
type index_ContextMenuContentOptions = ContextMenuContentOptions;
type index_ContextMenuContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = ContextMenuContentProps<T>;
type index_ContextMenuContentRenderProps = ContextMenuContentRenderProps;
type index_ContextMenuRootOptions = ContextMenuRootOptions;
type index_ContextMenuRootProps = ContextMenuRootProps;
type index_ContextMenuTriggerCommonProps<T extends HTMLElement = HTMLElement> = ContextMenuTriggerCommonProps<T>;
type index_ContextMenuTriggerOptions = ContextMenuTriggerOptions;
type index_ContextMenuTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = ContextMenuTriggerProps<T>;
type index_ContextMenuTriggerRenderProps = ContextMenuTriggerRenderProps;
declare namespace index {
  export {
    PopperArrow as Arrow,
    MenuCheckboxItem as CheckboxItem,
    ContextMenuContent as Content,
    index_ContextMenu as ContextMenu,
    PopperArrowCommonProps as ContextMenuArrowCommonProps,
    PopperArrowOptions as ContextMenuArrowOptions,
    PopperArrowProps as ContextMenuArrowProps,
    PopperArrowRenderProps as ContextMenuArrowRenderProps,
    MenuCheckboxItemCommonProps as ContextMenuCheckboxItemCommonProps,
    MenuCheckboxItemOptions as ContextMenuCheckboxItemOptions,
    MenuCheckboxItemProps as ContextMenuCheckboxItemProps,
    MenuCheckboxItemRenderProps as ContextMenuCheckboxItemRenderProps,
    index_ContextMenuContentCommonProps as ContextMenuContentCommonProps,
    index_ContextMenuContentOptions as ContextMenuContentOptions,
    index_ContextMenuContentProps as ContextMenuContentProps,
    index_ContextMenuContentRenderProps as ContextMenuContentRenderProps,
    MenuGroupCommonProps as ContextMenuGroupCommonProps,
    MenuGroupLabelCommonProps as ContextMenuGroupLabelCommonProps,
    MenuGroupLabelOptions as ContextMenuGroupLabelOptions,
    MenuGroupLabelProps as ContextMenuGroupLabelProps,
    MenuGroupLabelRenderProps as ContextMenuGroupLabelRenderProps,
    MenuGroupOptions as ContextMenuGroupOptions,
    MenuGroupProps as ContextMenuGroupProps,
    MenuGroupRenderProps as ContextMenuGroupRenderProps,
    MenuIconCommonProps as ContextMenuIconCommonProps,
    MenuIconOptions as ContextMenuIconOptions,
    MenuIconProps as ContextMenuIconProps,
    MenuIconRenderProps as ContextMenuIconRenderProps,
    MenuItemCommonProps as ContextMenuItemCommonProps,
    MenuItemDescriptionCommonProps as ContextMenuItemDescriptionCommonProps,
    MenuItemDescriptionOptions as ContextMenuItemDescriptionOptions,
    MenuItemDescriptionProps as ContextMenuItemDescriptionProps,
    MenuItemDescriptionRenderProps as ContextMenuItemDescriptionRenderProps,
    MenuItemIndicatorCommonProps as ContextMenuItemIndicatorCommonProps,
    MenuItemIndicatorOptions as ContextMenuItemIndicatorOptions,
    MenuItemIndicatorProps as ContextMenuItemIndicatorProps,
    MenuItemIndicatorRenderProps as ContextMenuItemIndicatorRenderProps,
    MenuItemLabelCommonProps as ContextMenuItemLabelCommonProps,
    MenuItemLabelOptions as ContextMenuItemLabelOptions,
    MenuItemLabelProps as ContextMenuItemLabelProps,
    MenuItemLabelRenderProps as ContextMenuItemLabelRenderProps,
    MenuItemOptions as ContextMenuItemOptions,
    MenuItemProps as ContextMenuItemProps,
    MenuItemRenderProps as ContextMenuItemRenderProps,
    MenuPortalProps as ContextMenuPortalProps,
    MenuRadioGroupCommonProps as ContextMenuRadioGroupCommonProps,
    MenuRadioGroupOptions as ContextMenuRadioGroupOptions,
    MenuRadioGroupProps as ContextMenuRadioGroupProps,
    MenuRadioGroupRenderProps as ContextMenuRadioGroupRenderProps,
    MenuRadioItemCommonProps as ContextMenuRadioItemCommonProps,
    MenuRadioItemOptions as ContextMenuRadioItemOptions,
    MenuRadioItemRenderProps as ContextMenuRadioItemPRenderrops,
    MenuRadioItemProps as ContextMenuRadioItemProps,
    index_ContextMenuRootOptions as ContextMenuRootOptions,
    index_ContextMenuRootProps as ContextMenuRootProps,
    SeparatorRootCommonProps as ContextMenuSeparatorCommonProps,
    SeparatorRootOptions as ContextMenuSeparatorOptions,
    SeparatorRootProps as ContextMenuSeparatorProps,
    SeparatorRootRenderProps as ContextMenuSeparatorRenderProps,
    MenuSubContentCommonProps as ContextMenuSubContentCommonProps,
    MenuSubContentOptions as ContextMenuSubContentOptions,
    MenuSubContentProps as ContextMenuSubContentProps,
    MenuSubContentRenderProps as ContextMenuSubContentRenderProps,
    MenuSubOptions as ContextMenuSubOptions,
    MenuSubProps as ContextMenuSubProps,
    MenuSubTriggerCommonProps as ContextMenuSubTriggerCommonProps,
    MenuSubTriggerOptions as ContextMenuSubTriggerOptions,
    MenuSubTriggerProps as ContextMenuSubTriggerProps,
    MenuSubTriggerRenderProps as ContextMenuSubTriggerRenderProps,
    index_ContextMenuTriggerCommonProps as ContextMenuTriggerCommonProps,
    index_ContextMenuTriggerOptions as ContextMenuTriggerOptions,
    index_ContextMenuTriggerProps as ContextMenuTriggerProps,
    index_ContextMenuTriggerRenderProps as ContextMenuTriggerRenderProps,
    MenuGroup as Group,
    MenuGroupLabel as GroupLabel,
    MenuIcon as Icon,
    MenuItem as Item,
    MenuItemDescription as ItemDescription,
    MenuItemIndicator as ItemIndicator,
    MenuItemLabel as ItemLabel,
    MenuPortal as Portal,
    MenuRadioGroup as RadioGroup,
    MenuRadioItem as RadioItem,
    ContextMenuRoot as Root,
    SeparatorRoot as Separator,
    MenuSub as Sub,
    MenuSubContent as SubContent,
    MenuSubTrigger as SubTrigger,
    ContextMenuTrigger as Trigger,
  };
}

export { ContextMenuContentOptions as C, ContextMenuContentCommonProps as a, ContextMenuContentRenderProps as b, ContextMenuContentProps as c, ContextMenuRootOptions as d, ContextMenuRootProps as e, ContextMenuTriggerOptions as f, ContextMenuTriggerCommonProps as g, ContextMenuTriggerRenderProps as h, index as i, ContextMenuTriggerProps as j, ContextMenuContent as k, ContextMenuRoot as l, ContextMenuTrigger as m, ContextMenu as n };
