import * as solid_js from 'solid-js';
import { ParentProps, Setter, ValidComponent } from 'solid-js';
import { ah as MenuRootOptions } from './menu-sub-trigger-a61674f3.js';
import { Orientation } from '@kobalte/utils';
import { ElementOf, PolymorphicProps } from './polymorphic/index.js';

interface MenubarMenuOptions extends MenuRootOptions {
}
interface MenubarMenuProps extends ParentProps<MenubarMenuOptions> {
}
/**
 * Displays a menu to the user —such as a set of actions or functions— triggered by a button.
 */
declare function MenubarMenu(props: MenubarMenuProps): solid_js.JSX.Element;

interface MenubarRootOptions {
    /** The value of the menu that should be open when initially rendered. Use when you do not need to control the value state. */
    defaultValue?: string;
    /** The controlled value of the menu to open. Should be used in conjunction with onValueChange. */
    value?: string | null;
    /** Event handler called when the value changes. */
    onValueChange?: (value: string | undefined | null) => void;
    /** When true, keyboard navigation will loop from last item to first, and vice versa. (default: true) */
    loop?: boolean;
    /** When true, click on alt by itsef will focus this Menubar (some browsers interfere) */
    focusOnAlt?: boolean;
    /** The orientation of the menubar. */
    orientation?: Orientation;
    autoFocusMenu?: boolean;
    onAutoFocusMenuChange?: Setter<boolean>;
}
interface MenubarRootCommonProps<T extends HTMLElement = HTMLElement> {
    id: string;
    ref: T | ((el: T) => void);
}
interface MenubarRootRenderProps extends MenubarRootCommonProps {
    role: "menubar";
    "data-orientation": "horizontal" | "vertical";
    "aria-orientation": "horizontal" | "vertical";
}
type MenubarRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenubarRootOptions & Partial<MenubarRootCommonProps<ElementOf<T>>>;
/**
 * A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
 */
declare function MenubarRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenubarRootProps<T>>): solid_js.JSX.Element;

export { MenubarRoot as M, MenubarMenu as a, MenubarMenuOptions as b, MenubarMenuProps as c, MenubarRootCommonProps as d, MenubarRootOptions as e, MenubarRootProps as f, MenubarRootRenderProps as g };
