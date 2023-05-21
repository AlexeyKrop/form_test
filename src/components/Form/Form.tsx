import React, { FC, FormEvent, useEffect } from 'react';

import style from './Form.module.scss';

import { Input } from 'components/Form/FormElement/types';
import { useForm } from 'hooks/useForm';

const inputElements: Input[] = [
  {
    id: 'first_name',
    type: 'inputText',
    label: 'First Name',
    defaultValue: 'Some first name',
  },
  {
    id: 'last_name',
    type: 'inputText',
    label: 'Last Name',
  },
  {
    id: 'email',
    type: 'inputEmail',
    label: 'Email',
    required: true,
  },
  {
    id: 'password',
    type: 'inputPassword',
    label: 'Password',
    required: true,
  },
];

interface FormProps {
  children: React.ReactNode;
  isDisabledBtn: (value: boolean, errors: string) => void;
}
export const Form: FC<FormProps> = ({ children, isDisabledBtn }) => {
  console.log('form render');

  const [values, handleChange, fieldTouched, errors, handleBlur] = useForm();

  useEffect(() => {
    const requiredFields = inputElements.filter(input => input.required);

    const isDisabled = requiredFields.some(
      field => !values[field.id] || values[field.id] === '',
    );

    isDisabledBtn(isDisabled, errors.email);
  }, [values]);
  const onSubmitForm: (e: FormEvent<HTMLFormElement>) => void = e => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={onSubmitForm} className={style.form}>
      {inputElements.map(field => {
        return (
          <>
            <label htmlFor={field.id}>{field.id}</label>
            <input
              key={field.id}
              onBlur={handleBlur}
              name={field.id}
              required={field.required}
              defaultValue={field.defaultValue}
              onChange={handleChange}
            />
          </>
        );
      })}
      <input onBlur={handleBlur} name="firstName" required onChange={handleChange} />
      <input onBlur={handleBlur} name="email" required onChange={handleChange} />
      {fieldTouched.email && errors.email && <p>{errors.email}</p>}
      {children}
    </form>
  );
};
