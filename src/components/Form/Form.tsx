import React, { FC, FormEvent, useEffect } from 'react';

import formLogo from '../../assets/form.png';

import style from './Form.module.scss';

import { FormProps, Input } from 'components/Form/types';
import { useForm } from 'hooks/useForm';
import { separateTypeElementFromTypeAndText } from 'utils/separateFormTypeElementAndText';

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

export const Form: FC<FormProps> = ({ children, isDisabledBtn }) => {
  const { values, handleChange, errors, handleBlur, resetForm } = useForm(inputElements);

  const onSubmitForm: (e: FormEvent<HTMLFormElement>) => void = e => {
    e.preventDefault();
    alert(JSON.stringify(values, null, 2));
    resetForm();
  };

  const getDefaultValue: (id: string, defaultValue: string | undefined) => string = (
    id,
    defaultValue,
  ) => {
    if (values[id] !== undefined) {
      return values[id];
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return '';
  };

  useEffect(() => {
    const requiredFields = inputElements.filter(input => input.required);

    const isDisabled = requiredFields.some(
      field => !values[field.id] || values[field.id] === '',
    );

    isDisabledBtn(isDisabled, errors.email);
  }, [values, isDisabledBtn, errors.email]);

  return (
    <form onSubmit={onSubmitForm} className={style.form}>
      <div className={style.wrapperImage}>
        <img src={formLogo} alt="Logo" />
      </div>
      {inputElements.map(({ id, label, defaultValue, required, type }) => {
        const attributeType = separateTypeElementFromTypeAndText(type);

        return (
          <div key={id} className={style.inputWrapper}>
            <label htmlFor={id}>{label}</label>
            <input
              name={id}
              className={style.input}
              type={attributeType}
              required={required}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={defaultValue || 'Enter value'}
              value={getDefaultValue(id, defaultValue)}
            />
            <p className={style.error}>{errors[id]}</p>
          </div>
        );
      })}
      {children}
    </form>
  );
};
