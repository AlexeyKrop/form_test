type InputType = 'inputText' | 'inputEmail' | 'inputPassword' | 'selectPassword';

export interface Input {
  id: string;
  type: InputType;
  label: string;
  defaultValue?: string;
  required?: boolean;
}
export type ElementBase<Type, ExtraProps> = {
  id: string;
  label: string;
  type: InputType;
  elementType?: Type;
} & ExtraProps;

export enum ElementType {
  input = 'input',
}

export type ElementInput = ElementBase<
  ElementType.input,
  {
    defaultValue?: string;
    required?: boolean;
    elementTypeAttributes?: string;
    handleFieldChange?: () => void;
  }
>;

export type ElementVariant = ElementInput;
