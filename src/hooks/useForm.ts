import { ChangeEvent, useState, FocusEvent } from 'react';

import {
  Errors,
  FieldTouched,
  FormHookResult,
  ValidationResult,
  ValidationRule,
  Values,
} from 'hooks/types';

export const useForm: () => FormHookResult = () => {
  const [values, setValues] = useState<Values>({});
  const [fieldTouched, setFieldTouched] = useState<FieldTouched>({
    email: false,
  });
  const [errors, setErrors] = useState<Errors>({});

  const validationRules: { [key: string]: ValidationRule } = {
    email: {
      validate: (value: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(value);
      },
      errorMessage: 'Invalid email',
    },
  };

  console.log(values);
  const validateFields: (e: ChangeEvent<HTMLInputElement>) => ValidationResult = e => {
    e.persist();
    const { name, value } = e.target;
    const updatedFieldTouched = { ...fieldTouched, [name]: true };
    const updatedValues = { ...values, [name]: value };
    const updatedErrors: Errors = {};

    Object.keys(validationRules).forEach(key => {
      const rule = validationRules[key];

      if (updatedFieldTouched[key] && !rule.validate(updatedValues[key])) {
        updatedErrors[key] = rule.errorMessage;
      }
    });

    return { updatedFieldTouched, updatedErrors };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    const { name, value } = e.target;

    setValues(values => ({ ...values, [name]: value }));

    const { updatedFieldTouched, updatedErrors } = validateFields(e);

    setFieldTouched(updatedFieldTouched);
    setErrors(updatedErrors);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { updatedFieldTouched, updatedErrors } = validateFields(e);

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
