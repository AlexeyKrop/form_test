import { ChangeEvent, useState, FocusEvent } from 'react';

import { Input } from 'components/Form/types';
import { Errors, FieldTouched, FormHookResult, InputObj, Values } from 'hooks/types';
import { validateFields } from 'utils/validateFields';

export const useForm: (initialValue: Input[]) => FormHookResult = initialValue => {
  const inputElementsObj: InputObj = initialValue.reduce(
    (acc: InputObj, input: Input) => {
      return {
        ...acc,
        [input.id]: input.defaultValue || '',
      };
    },
    {},
  );
  const [values, setValues] = useState<Values>(inputElementsObj);
  const [fieldTouched, setFieldTouched] = useState<FieldTouched>({
    email: false,
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    const { name, value } = e.target;

    setValues(values => ({ ...values, [name]: value }));

    const { updatedFieldTouched, updatedErrors } = validateFields(
      e,
      fieldTouched,
      values,
    );

    setFieldTouched(updatedFieldTouched);

    setErrors(updatedErrors);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { updatedFieldTouched, updatedErrors } = validateFields(
      e,
      fieldTouched,
      values,
    );

    setFieldTouched(updatedFieldTouched);
    setErrors(updatedErrors);
  };

  const resetForm = (): void => {
    const initialValues: Values = {};

    Object.keys(values).forEach(key => {
      initialValues[key] = '';
    });

    setValues(initialValues);
    setFieldTouched({ email: false });
    setErrors({});
  };

  return { values, handleChange, fieldTouched, errors, handleBlur, resetForm };
};
