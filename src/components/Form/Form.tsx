import React, { FC, FormEvent, useEffect } from 'react';

import formLogo from '../../assets/form.png';

import style from './Form.module.scss';

import { CustomInput } from 'components/Form/Input/Input';
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
  const { values, handleChange, errors, handleBlur, resetForm } = useForm();

  const onSubmitForm: (e: FormEvent<HTMLFormElement>) => void = e => {
    e.preventDefault();
    alert(JSON.stringify(values));
    resetForm();
  };

  useEffect(() => {
    const requiredFields = inputElements.filter(input => input.required);

    const isDisabled = requiredFields.some(
      field => !values[field.id] || values[field.id] === '',
    );

    isDisabledBtn(isDisabled, errors.email);
  }, [values]);

  return (
    <form onSubmit={onSubmitForm} className={style.form}>
      <div className={style.wrapperImage}>
        <img src={formLogo} alt="Logo" />
      </div>
      {inputElements.map(field => {
        const attributeType = separateTypeElementFromTypeAndText(field.type);

        return (
          <CustomInput
            handleBlur={handleBlur}
            handleChange={handleChange}
            key={field.id}
            field={field}
            error={errors[field.id]}
            attributeType={attributeType}
          />
        );
      })}
      {children}
    </form>
  );
};
