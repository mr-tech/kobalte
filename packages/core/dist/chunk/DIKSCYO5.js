import { isSameSelection } from './H6DSIDEC.js';
import { useFormControlContext } from './Q2DJLZQE.js';
import { use, spread, mergeProps, insert, createComponent, effect, style, setAttribute, template } from 'solid-js/web';
import { callHandler, mergeRefs, visuallyHiddenStyles } from '@kobalte/utils';
import { splitProps, createSignal, createEffect, on, Show, For } from 'solid-js';

var _tmpl$ = /* @__PURE__ */ template(`<option>`);
var _tmpl$2 = /* @__PURE__ */ template(`<div aria-hidden="true"><input type="text"><select tabindex="-1"><option>`);
function HiddenSelectBase(props) {
  let ref;
  const [local, others] = splitProps(props, ["ref", "onChange", "collection", "selectionManager", "isOpen", "isMultiple", "isVirtualized", "focusTrigger"]);
  const formControlContext = useFormControlContext();
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const renderOption = (key) => {
    const item = local.collection.getItem(key);
    return createComponent(Show, {
      get when() {
        return item?.type === "item";
      },
      get children() {
        const _el$ = _tmpl$();
        _el$.value = key;
        insert(_el$, () => item?.textValue);
        effect(() => _el$.selected = local.selectionManager.isSelected(key));
        return _el$;
      }
    });
  };
  createEffect(on(() => local.selectionManager.selectedKeys(), (keys, prevKeys) => {
    if (prevKeys && isSameSelection(keys, prevKeys)) {
      return;
    }
    setIsInternalChangeEvent(true);
    ref?.dispatchEvent(new Event("input", {
      bubbles: true,
      cancelable: true
    }));
    ref?.dispatchEvent(new Event("change", {
      bubbles: true,
      cancelable: true
    }));
  }, {
    defer: true
  }));
  return (() => {
    const _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
    _el$3.addEventListener("focus", () => local.focusTrigger());
    _el$3.style.setProperty("font-size", "16px");
    _el$4.addEventListener("change", (e) => {
      callHandler(e, local.onChange);
      if (!isInternalChangeEvent()) {
        local.selectionManager.setSelectedKeys(/* @__PURE__ */ new Set([e.target.value]));
      }
      setIsInternalChangeEvent(false);
    });
    const _ref$ = mergeRefs((el) => ref = el, local.ref);
    typeof _ref$ === "function" && use(_ref$, _el$4);
    spread(_el$4, mergeProps({
      get multiple() {
        return local.isMultiple;
      },
      get name() {
        return formControlContext.name();
      },
      get required() {
        return formControlContext.isRequired();
      },
      get disabled() {
        return formControlContext.isDisabled();
      },
      get size() {
        return local.collection.getSize();
      },
      get value() {
        return local.selectionManager.firstSelectedKey() ?? "";
      }
    }, others), false, true);
    insert(_el$4, createComponent(Show, {
      get when() {
        return local.isVirtualized;
      },
      get fallback() {
        return createComponent(For, {
          get each() {
            return [...local.collection.getKeys()];
          },
          children: renderOption
        });
      },
      get children() {
        return createComponent(For, {
          get each() {
            return [...local.selectionManager.selectedKeys()];
          },
          children: renderOption
        });
      }
    }), null);
    effect((_p$) => {
      const _v$ = visuallyHiddenStyles, _v$2 = local.selectionManager.isFocused() || local.isOpen ? -1 : 0, _v$3 = formControlContext.isRequired(), _v$4 = formControlContext.isDisabled(), _v$5 = formControlContext.isReadOnly();
      _p$._v$ = style(_el$2, _v$, _p$._v$);
      _v$2 !== _p$._v$2 && setAttribute(_el$3, "tabindex", _p$._v$2 = _v$2);
      _v$3 !== _p$._v$3 && (_el$3.required = _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && (_el$3.disabled = _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && (_el$3.readOnly = _p$._v$5 = _v$5);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    });
    return _el$2;
  })();
}

export { HiddenSelectBase };
