import { useFormControlContext } from './Q2DJLZQE.js';
import { mergeDefaultProps, access } from '@kobalte/utils';
import { createEffect, onCleanup } from 'solid-js';

var FORM_CONTROL_FIELD_PROP_NAMES = ["id", "aria-label", "aria-labelledby", "aria-describedby"];
function createFormControlField(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("field")
  }, props);
  createEffect(() => onCleanup(context.registerField(access(mergedProps.id))));
  return {
    fieldProps: {
      id: () => access(mergedProps.id),
      ariaLabel: () => access(mergedProps["aria-label"]),
      ariaLabelledBy: () => context.getAriaLabelledBy(access(mergedProps.id), access(mergedProps["aria-label"]), access(mergedProps["aria-labelledby"])),
      ariaDescribedBy: () => context.getAriaDescribedBy(access(mergedProps["aria-describedby"]))
    }
  };
}

export { FORM_CONTROL_FIELD_PROP_NAMES, createFormControlField };
