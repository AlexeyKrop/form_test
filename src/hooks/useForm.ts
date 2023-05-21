import { ChangeEvent, useState, FocusEvent } from 'react';

interface ValidationRule {
  validate: (value: string) => boolean;
  errorMessage: string;
}

interface FieldTouched {
  [key: string]: boolean;
}

interface Errors {
  [key: string]: string;
}

type Values = {
  [key: string]: string;
};

type FormHookResult = [
  Values,
  (e: ChangeEvent<HTMLInputElement>) => void,
  FieldTouched,
  Errors,
  (e: FocusEvent<HTMLInputElement>) => void,
];

type ValidationResult = {
  updatedFieldTouched: FieldTouched;
  updatedErrors: Errors;
};
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

  return [values, handleChange, fieldTouched, errors, handleBlur];
};
