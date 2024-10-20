import {
  isSameSelection
} from "./QZDH5R5B.jsx";
import {
  useFormControlContext
} from "./QICKIQIY.jsx";

// src/select/hidden-select-base.tsx
import { callHandler, mergeRefs, visuallyHiddenStyles } from "@kobalte/utils";
import {
  For,
  Show,
  createEffect,
  createSignal,
  on,
  splitProps
} from "solid-js";
function HiddenSelectBase(props) {
  let ref;
  const [local, others] = splitProps(props, [
    "ref",
    "onChange",
    "collection",
    "selectionManager",
    "isOpen",
    "isMultiple",
    "isVirtualized",
    "focusTrigger"
  ]);
  const formControlContext = useFormControlContext();
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const renderOption = (key) => {
    const item = local.collection.getItem(key);
    return <Show when={item?.type === "item"}><option value={key} selected={local.selectionManager.isSelected(key)}>{item?.textValue}</option></Show>;
  };
  createEffect(
    on(
      () => local.selectionManager.selectedKeys(),
      (keys, prevKeys) => {
        if (prevKeys && isSameSelection(keys, prevKeys)) {
          return;
        }
        setIsInternalChangeEvent(true);
        ref?.dispatchEvent(
          new Event("input", { bubbles: true, cancelable: true })
        );
        ref?.dispatchEvent(
          new Event("change", { bubbles: true, cancelable: true })
        );
      },
      {
        defer: true
      }
    )
  );
  return <div style={visuallyHiddenStyles} aria-hidden="true">
    <input
      type="text"
      tabIndex={local.selectionManager.isFocused() || local.isOpen ? -1 : 0}
      style={{ "font-size": "16px" }}
      required={formControlContext.isRequired()}
      disabled={formControlContext.isDisabled()}
      readOnly={formControlContext.isReadOnly()}
      onFocus={() => local.focusTrigger()}
    />
    <select
      ref={mergeRefs((el) => ref = el, local.ref)}
      tabIndex={-1}
      multiple={local.isMultiple}
      name={formControlContext.name()}
      required={formControlContext.isRequired()}
      disabled={formControlContext.isDisabled()}
      size={local.collection.getSize()}
      value={local.selectionManager.firstSelectedKey() ?? ""}
      onChange={(e) => {
        callHandler(e, local.onChange);
        if (!isInternalChangeEvent()) {
          local.selectionManager.setSelectedKeys(
            /* @__PURE__ */ new Set([e.target.value])
          );
        }
        setIsInternalChangeEvent(false);
      }}
      {...others}
    >
      <option />
      <Show
        when={local.isVirtualized}
        fallback={<For each={[...local.collection.getKeys()]}>{renderOption}</For>}
      ><For each={[...local.selectionManager.selectedKeys()]}>{renderOption}</For></Show>
    </select>
  </div>;
}

export {
  HiddenSelectBase
};
