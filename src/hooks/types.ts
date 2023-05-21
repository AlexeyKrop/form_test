import { ChangeEvent, FocusEvent } from 'react';

export interface ValidationRule {
  validate: (value: string) => boolean;
  errorMessage: string;
}

export interface FieldTouched {
  [key: string]: boolean;
}

export interface Errors {
  [key: string]: string;
}

export type Values = {
  [key: string]: string;
};

export type FormHookResult = {
  values: Values;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fieldTouched: FieldTouched;
  errors: Errors;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  resetForm: () => void;
};

export type ValidationResult = {
  updatedFieldTouched: FieldTouched;
  updatedErrors: Errors;
};
