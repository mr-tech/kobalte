import { MaybeAccessor } from '@kobalte/utils';
import { Accessor } from 'solid-js';

interface CreateDisclosureStateProps {
    /** The value to be used, in controlled mode. */
    open?: MaybeAccessor<boolean | undefined>;
    /** The initial value to be used, in uncontrolled mode. */
    defaultOpen?: MaybeAccessor<boolean | undefined>;
    /** A function that will be called when the `isOpen` state changes. */
    onOpenChange?: (isOpen: boolean) => void;
}
interface CreateDisclosureStateResult {
    /** The open state. */
    isOpen: Accessor<boolean>;
    /** A setter function to manually set the open state. */
    setIsOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    /** A function to set the `isOpen` state to `true`. */
    open: () => void;
    /** A function to set the `isOpen` state to `false`. */
    close: () => void;
    /** A function to toggle the `isOpen` state between `true` and `false`. */
    toggle: () => void;
}
/**
 * Provides state management for open, close and toggle scenarios.
 * Used to control the "open state" of components like Modal, Drawer, etc.
 */
declare function createDisclosureState(props?: CreateDisclosureStateProps): CreateDisclosureStateResult;

export { CreateDisclosureStateProps, CreateDisclosureStateResult, createDisclosureState };
