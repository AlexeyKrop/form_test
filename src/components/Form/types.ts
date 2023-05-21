import { ReactNode } from 'react';

export interface FormProps {
  children: ReactNode;
  isDisabledBtn: (value: boolean, errors: string) => void;
}
export interface Input {
  id: string;
  type: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}
