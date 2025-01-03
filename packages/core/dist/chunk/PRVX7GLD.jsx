import {
  createDomCollection,
  createDomCollectionItem
} from "./SOM3K36D.jsx";
import {
  createSelectableList
} from "./N3GAC5SS.jsx";
import {
  createListState,
  createSelectableItem
} from "./QZDH5R5B.jsx";
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  useCollapsibleContext
} from "./V46W2NYV.jsx";
import {
  createRegisterId
} from "./JNCCF6MP.jsx";
import {
  Polymorphic
} from "./FLVHQV4A.jsx";
import {
  __export
} from "./5WXHJDCZ.jsx";

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

// src/accordion/accordion-content.tsx
import { mergeDefaultProps } from "@kobalte/utils";
import {
  createEffect,
  onCleanup,
  splitProps
} from "solid-js";
import { combineStyle } from "@solid-primitives/props";

// src/accordion/accordion-item-context.tsx
import { createContext, useContext } from "solid-js";
var AccordionItemContext = createContext();
function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useAccordionItemContext` must be used within a `Accordion.Item` component"
    );
  }
  return context;
}

// src/accordion/accordion-content.tsx
function AccordionContent(props) {
  const itemContext = useAccordionItemContext();
  const defaultId = itemContext.generateId("content");
  const mergedProps = mergeDefaultProps(
    { id: defaultId },
    props
  );
  const [local, others] = splitProps(mergedProps, ["id", "style"]);
  createEffect(() => onCleanup(itemContext.registerContentId(local.id)));
  return <CollapsibleContent
    role="region"
    aria-labelledby={itemContext.triggerId()}
    style={combineStyle(
      {
        "--kb-accordion-content-height": "var(--kb-collapsible-content-height)",
        "--kb-accordion-content-width": "var(--kb-collapsible-content-width)"
      },
      local.style
    )}
    {...others}
  />;
}

// src/accordion/accordion-header.tsx
function AccordionHeader(props) {
  const context = useCollapsibleContext();
  return <Polymorphic
    as="h3"
    {...context.dataset()}
    {...props}
  />;
}

// src/accordion/accordion-item.tsx
import { createGenerateId, mergeDefaultProps as mergeDefaultProps2 } from "@kobalte/utils";
import {
  createSignal,
  createUniqueId,
  splitProps as splitProps2
} from "solid-js";

// src/accordion/accordion-context.tsx
import { createContext as createContext2, useContext as useContext2 } from "solid-js";
var AccordionContext = createContext2();
function useAccordionContext() {
  const context = useContext2(AccordionContext);
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useAccordionContext` must be used within a `Accordion.Root` component"
    );
  }
  return context;
}

// src/accordion/accordion-item.tsx
function AccordionItem(props) {
  const accordionContext = useAccordionContext();
  const defaultId = `${accordionContext.generateId(
    "item"
  )}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps2(
    { id: defaultId },
    props
  );
  const [local, others] = splitProps2(mergedProps, ["value", "disabled"]);
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
  return <AccordionItemContext.Provider value={context}><CollapsibleRoot
    open={isExpanded()}
    disabled={local.disabled}
    {...others}
  /></AccordionItemContext.Provider>;
}

// src/accordion/accordion-root.tsx
import {
  composeEventHandlers,
  createGenerateId as createGenerateId2,
  mergeDefaultProps as mergeDefaultProps3,
  mergeRefs
} from "@kobalte/utils";
import {
  createSignal as createSignal2,
  createUniqueId as createUniqueId2,
  splitProps as splitProps3
} from "solid-js";
function AccordionRoot(props) {
  let ref;
  const defaultId = `accordion-${createUniqueId2()}`;
  const mergedProps = mergeDefaultProps3(
    {
      id: defaultId,
      multiple: false,
      collapsible: false,
      shouldFocusWrap: true
    },
    props
  );
  const [local, others] = splitProps3(mergedProps, [
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
  const [items, setItems] = createSignal2([]);
  const { DomCollectionProvider } = createDomCollection({
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
  const selectableList = createSelectableList(
    {
      selectionManager: () => listState.selectionManager(),
      collection: () => listState.collection(),
      disallowEmptySelection: () => listState.selectionManager().disallowEmptySelection(),
      shouldFocusWrap: () => local.shouldFocusWrap,
      disallowTypeAhead: true,
      allowsTabNavigation: true
    },
    () => ref
  );
  const context = {
    listState: () => listState,
    generateId: createGenerateId2(() => local.id)
  };
  return <DomCollectionProvider><AccordionContext.Provider value={context}><Polymorphic
    as="div"
    id={local.id}
    ref={mergeRefs((el) => ref = el, local.ref)}
    onKeyDown={composeEventHandlers([
      local.onKeyDown,
      selectableList.onKeyDown
    ])}
    onMouseDown={composeEventHandlers([
      local.onMouseDown,
      selectableList.onMouseDown
    ])}
    onFocusIn={composeEventHandlers([
      local.onFocusIn
      // TODO: remove next breaking
    ])}
    onFocusOut={composeEventHandlers([
      local.onFocusOut,
      selectableList.onFocusOut
    ])}
    {...others}
  /></AccordionContext.Provider></DomCollectionProvider>;
}

// src/accordion/accordion-trigger.tsx
import {
  callHandler,
  composeEventHandlers as composeEventHandlers2,
  mergeDefaultProps as mergeDefaultProps4,
  mergeRefs as mergeRefs2
} from "@kobalte/utils";
import {
  createEffect as createEffect2,
  onCleanup as onCleanup2,
  splitProps as splitProps4
} from "solid-js";
function AccordionTrigger(props) {
  let ref;
  const accordionContext = useAccordionContext();
  const itemContext = useAccordionItemContext();
  const collapsibleContext = useCollapsibleContext();
  const defaultId = itemContext.generateId("trigger");
  const mergedProps = mergeDefaultProps4(
    { id: defaultId },
    props
  );
  const [local, others] = splitProps4(mergedProps, [
    "ref",
    "onPointerDown",
    "onPointerUp",
    "onClick",
    "onKeyDown",
    "onMouseDown",
    "onFocus"
  ]);
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
  const selectableItem = createSelectableItem(
    {
      key: () => itemContext.value(),
      selectionManager: () => accordionContext.listState().selectionManager(),
      disabled: () => collapsibleContext.disabled(),
      shouldSelectOnPressUp: true
    },
    () => ref
  );
  const onKeyDown = (e) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
    }
    callHandler(e, local.onKeyDown);
    callHandler(e, selectableItem.onKeyDown);
  };
  createEffect2(() => onCleanup2(itemContext.registerTriggerId(others.id)));
  return <CollapsibleTrigger
    ref={mergeRefs2((el) => ref = el, local.ref)}
    data-key={selectableItem.dataKey()}
    onPointerDown={composeEventHandlers2([
      local.onPointerDown,
      selectableItem.onPointerDown
    ])}
    onPointerUp={composeEventHandlers2([
      local.onPointerUp,
      selectableItem.onPointerUp
    ])}
    onClick={composeEventHandlers2([local.onClick, selectableItem.onClick])}
    onKeyDown={onKeyDown}
    onMouseDown={composeEventHandlers2([
      local.onMouseDown,
      selectableItem.onMouseDown
    ])}
    onFocus={composeEventHandlers2([local.onFocus, selectableItem.onFocus])}
    {...others}
  />;
}

// src/accordion/index.tsx
var Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
  Trigger: AccordionTrigger
});

export {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Accordion,
  accordion_exports
};
