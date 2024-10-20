import { createDomCollection, createDomCollectionItem } from './7CVNMTYF.js';
import { createSelectableList } from './GLKC2QFF.js';
import { createListState, createSelectableItem } from './H6DSIDEC.js';
import { CollapsibleContent, useCollapsibleContext, CollapsibleRoot, CollapsibleTrigger } from './IHL55PMF.js';
import { createRegisterId } from './E4R2EMM4.js';
import { Polymorphic } from './6Y7B2NEO.js';
import { __export } from './5ZKAE4VZ.js';
import { createComponent, mergeProps } from 'solid-js/web';
import { mergeDefaultProps, createGenerateId, mergeRefs, composeEventHandlers, callHandler } from '@kobalte/utils';
import { createContext, splitProps, createEffect, onCleanup, createUniqueId, createSignal, useContext } from 'solid-js';
import { combineStyle } from '@solid-primitives/props';

// src/accordion/index.tsx
var accordion_exports = {};
__export(accordion_exports, {
  Accordion: () => Accordion,
  Content: () => AccordionContent,
  Header: () => AccordionHeader,
  Item: () => AccordionItem,
  Root: () => AccordionRoot,
  Trigger: () => AccordionTrigger
});
var AccordionItemContext = createContext();
function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useAccordionItemContext` must be used within a `Accordion.Item` component");
  }
  return context;
}

// src/accordion/accordion-content.tsx
function AccordionContent(props) {
  const itemContext = useAccordionItemContext();
  const defaultId = itemContext.generateId("content");
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["id", "style"]);
  createEffect(() => onCleanup(itemContext.registerContentId(local.id)));
  return createComponent(CollapsibleContent, mergeProps({
    role: "region",
    get ["aria-labelledby"]() {
      return itemContext.triggerId();
    },
    get style() {
      return combineStyle({
        "--kb-accordion-content-height": "var(--kb-collapsible-content-height)",
        "--kb-accordion-content-width": "var(--kb-collapsible-content-width)"
      }, local.style);
    }
  }, others));
}
function AccordionHeader(props) {
  const context = useCollapsibleContext();
  return createComponent(Polymorphic, mergeProps({
    as: "h3"
  }, () => context.dataset(), props));
}
var AccordionContext = createContext();
function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useAccordionContext` must be used within a `Accordion.Root` component");
  }
  return context;
}

// src/accordion/accordion-item.tsx
function AccordionItem(props) {
  const accordionContext = useAccordionContext();
  const defaultId = `${accordionContext.generateId("item")}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "disabled"]);
  const [triggerId, setTriggerId] = createSignal();
  const [contentId, setContentId] = createSignal();
  const selectionManager = () => accordionContext.listState().selectionManager();
  const isExpanded = () => {
    return selectionManager().isSelected(local.value);
  };
  const context = {
    value: () => local.value,
    triggerId,
    contentId,
    generateId: createGenerateId(() => others.id),
    registerTriggerId: createRegisterId(setTriggerId),
    registerContentId: createRegisterId(setContentId)
  };
  return createComponent(AccordionItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(CollapsibleRoot, mergeProps({
        get open() {
          return isExpanded();
        },
        get disabled() {
          return local.disabled;
        }
      }, others));
    }
  });
}
function AccordionRoot(props) {
  let ref;
  const defaultId = `accordion-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    multiple: false,
    collapsible: false,
    shouldFocusWrap: true
  }, props);
  const [local, others] = splitProps(mergedProps, [
    "id",
    "ref",
    "value",
    "defaultValue",
    "onChange",
    "multiple",
    "collapsible",
    "shouldFocusWrap",
    "onKeyDown",
    "onMouseDown",
    "onFocusIn",
    // TODO: remove next breaking
    "onFocusOut"
  ]);
  const [items, setItems] = createSignal([]);
  const {
    DomCollectionProvider
  } = createDomCollection({
    items,
    onItemsChange: setItems
  });
  const listState = createListState({
    selectedKeys: () => local.value,
    defaultSelectedKeys: () => local.defaultValue,
    onSelectionChange: (value) => local.onChange?.(Array.from(value)),
    disallowEmptySelection: () => !local.multiple && !local.collapsible,
    selectionMode: () => local.multiple ? "multiple" : "single",
    dataSource: items
  });
  listState.selectionManager().setFocusedKey("item-1");
  const selectableList = createSelectableList({
    selectionManager: () => listState.selectionManager(),
    collection: () => listState.collection(),
    disallowEmptySelection: () => listState.selectionManager().disallowEmptySelection(),
    shouldFocusWrap: () => local.shouldFocusWrap,
    disallowTypeAhead: true,
    allowsTabNavigation: true
  }, () => ref);
  const context = {
    listState: () => listState,
    generateId: createGenerateId(() => local.id)
  };
  return createComponent(DomCollectionProvider, {
    get children() {
      return createComponent(AccordionContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            get id() {
              return local.id;
            },
            ref(r$) {
              const _ref$ = mergeRefs((el) => ref = el, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            get onKeyDown() {
              return composeEventHandlers([local.onKeyDown, selectableList.onKeyDown]);
            },
            get onMouseDown() {
              return composeEventHandlers([local.onMouseDown, selectableList.onMouseDown]);
            },
            get onFocusIn() {
              return composeEventHandlers([
                local.onFocusIn
                // TODO: remove next breaking
              ]);
            },
            get onFocusOut() {
              return composeEventHandlers([local.onFocusOut, selectableList.onFocusOut]);
            }
          }, others));
        }
      });
    }
  });
}
function AccordionTrigger(props) {
  let ref;
  const accordionContext = useAccordionContext();
  const itemContext = useAccordionItemContext();
  const collapsibleContext = useCollapsibleContext();
  const defaultId = itemContext.generateId("trigger");
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  createDomCollectionItem({
    getItem: () => ({
      ref: () => ref,
      type: "item",
      key: itemContext.value(),
      textValue: "",
      // not applicable here
      disabled: collapsibleContext.disabled()
    })
  });
  const selectableItem = createSelectableItem({
    key: () => itemContext.value(),
    selectionManager: () => accordionContext.listState().selectionManager(),
    disabled: () => collapsibleContext.disabled(),
    shouldSelectOnPressUp: true
  }, () => ref);
  const onKeyDown = (e) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
    }
    callHandler(e, local.onKeyDown);
    callHandler(e, selectableItem.onKeyDown);
  };
  createEffect(() => onCleanup(itemContext.registerTriggerId(others.id)));
  return createComponent(CollapsibleTrigger, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get ["data-key"]() {
      return selectableItem.dataKey();
    },
    get onPointerDown() {
      return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
    },
    get onPointerUp() {
      return composeEventHandlers([local.onPointerUp, selectableItem.onPointerUp]);
    },
    get onClick() {
      return composeEventHandlers([local.onClick, selectableItem.onClick]);
    },
    onKeyDown,
    get onMouseDown() {
      return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
    },
    get onFocus() {
      return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
    }
  }, others));
}

// src/accordion/index.tsx
var Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
  Trigger: AccordionTrigger
});

export { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, accordion_exports };
