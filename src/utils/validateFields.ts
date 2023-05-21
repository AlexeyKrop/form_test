import { ChangeEvent } from 'react';

import {
  Errors,
  FieldTouched,
  ValidationResult,
  ValidationRule,
  Values,
} from 'hooks/types';

const validateEmail = (value: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(value);
};

export const validationRules: { [key: string]: ValidationRule } = {
  email: {
    validate: validateEmail,
    errorMessage: 'Invalid email',
  },
};

export const validateFields = (
  e: ChangeEvent<HTMLInputElement>,
  fieldTouched: FieldTouched,
  values: Values,
): ValidationResult => {
  e.persist();
  const { name, value } = e.target;
  const updatedFieldTouched = { ...fieldTouched, [name]: true };
  const updatedValues = { ...values, [name]: value };
  const updatedErrors: Errors = {};

  Object.keys(validationRules).forEach(key => {
    const rule = validationRules[key];

    if (
      updatedFieldTouched[key] &&
      !rule.validate(updatedValues[key]) &&
      updatedValues[key].length !== 0
    ) {
      updatedErrors[key] = rule.errorMessage;
    }
  });

  return { updatedFieldTouched, updatedErrors };
};
