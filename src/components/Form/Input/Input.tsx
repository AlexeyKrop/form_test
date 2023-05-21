import React, { ChangeEvent, FocusEvent, FC, memo, useState, useEffect } from 'react';

import style from 'components/Form/Input/Input.module.scss';
import { useForm } from 'hooks/useForm';

interface Input {
  id: string;
  type: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}

interface CustomInputProps {
  field: Input;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  attributeType: string;
  error: string;
}
export const CustomInput: FC<CustomInputProps> = memo(
  ({ field, handleBlur, attributeType, handleChange, error }: CustomInputProps) => {
    const { id, label, defaultValue, required } = field;
    const [inputValue, setInputValue] = useState<string>(defaultValue || '');

    console.log('CustomInput render');
    const handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = e => {
      setInputValue(e.target.value);
      handleChange(e);
    };

    useEffect(() => {
      console.log('useEffect render');
      setInputValue(defaultValue || '');
    }, [defaultValue]);

    return (
      <div className={style.inputWrapper}>
        <label htmlFor={id}>{label}</label>
        <input
          name={id}
          className={style.input}
          type={attributeType}
          required={required}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={defaultValue ? '' : 'Enter value'}
          value={inputValue}
        />
        <p className={style.error}>{error}</p>
      </div>
    );
  },
);
