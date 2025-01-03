import { MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuIcon, MenuItem, MenuItemDescription, MenuItemIndicator, MenuItemLabel, MenuPortal, MenuRadioGroup, MenuRadioItem, MenuSub, MenuSubContent, MenuSubTrigger, MenuTrigger, useMenuRootContext, useMenuContext, MenuContent, MenuRoot } from './CHVSKBAO.js';
import { SeparatorRoot } from './STGRFJHZ.js';
import { PopperArrow } from './4X2EKUJ3.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps } from 'solid-js/web';
import { mergeDefaultProps, focusWithoutScrolling } from '@kobalte/utils';
import { splitProps, createUniqueId } from 'solid-js';

// src/dropdown-menu/index.tsx
var dropdown_menu_exports = {};
__export(dropdown_menu_exports, {
  Arrow: () => PopperArrow,
  CheckboxItem: () => MenuCheckboxItem,
  Content: () => DropdownMenuContent,
  DropdownMenu: () => DropdownMenu,
  Group: () => MenuGroup,
  GroupLabel: () => MenuGroupLabel,
  Icon: () => MenuIcon,
  Item: () => MenuItem,
  ItemDescription: () => MenuItemDescription,
  ItemIndicator: () => MenuItemIndicator,
  ItemLabel: () => MenuItemLabel,
  Portal: () => MenuPortal,
  RadioGroup: () => MenuRadioGroup,
  RadioItem: () => MenuRadioItem,
  Root: () => DropdownMenuRoot,
  Separator: () => SeparatorRoot,
  Sub: () => MenuSub,
  SubContent: () => MenuSubContent,
  SubTrigger: () => MenuSubTrigger,
  Trigger: () => MenuTrigger
});
function DropdownMenuContent(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps(props, ["onCloseAutoFocus", "onInteractOutside"]);
  let hasInteractedOutside = false;
  const onCloseAutoFocus = (e) => {
    local.onCloseAutoFocus?.(e);
    if (!hasInteractedOutside) {
      focusWithoutScrolling(context.triggerRef());
    }
    hasInteractedOutside = false;
    e.preventDefault();
  };
  const onInteractOutside = (e) => {
    local.onInteractOutside?.(e);
    if (!rootContext.isModal() || e.detail.isContextMenu) {
      hasInteractedOutside = true;
    }
  };
  return createComponent(MenuContent, mergeProps({
    onCloseAutoFocus,
    onInteractOutside
  }, others));
}
function DropdownMenuRoot(props) {
  const defaultId = `dropdownmenu-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  return createComponent(MenuRoot, mergedProps);
}

// src/dropdown-menu/index.tsx
var DropdownMenu = Object.assign(DropdownMenuRoot, {
  Arrow: PopperArrow,
  CheckboxItem: MenuCheckboxItem,
  Content: DropdownMenuContent,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Icon: MenuIcon,
  Item: MenuItem,
  ItemDescription: MenuItemDescription,
  ItemIndicator: MenuItemIndicator,
  ItemLabel: MenuItemLabel,
  Portal: MenuPortal,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Separator: SeparatorRoot,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger,
  Trigger: MenuTrigger
});

export { DropdownMenu, DropdownMenuContent, DropdownMenuRoot, dropdown_menu_exports };
