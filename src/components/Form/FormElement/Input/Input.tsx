import { FC, memo } from 'react';

import style from 'components/Form/FormElement/Input/Input.module.scss';

// export const CustomInput: FC<any> = memo(
//   ({
//     required,
//     elementTypeAttributes,
//     label,
//     id,
//     defaultValue,
//     handleInputChange,
//   }: any) => {
//     // const { formFields, setFieldValue } = useContext(FormFieldsContext);
//     //
//     // const handleFieldChange = useCallback(
//     //   (e: ChangeEvent<HTMLInputElement>) => {
//     //     const { value } = e.target;
//     //
//     //     setFieldValue(id, value);
//     //   },
//     //   [id],
//     // );
//     //
//     // console.log('input render');
//     // const { handleInputChange } = useForm();
//
//     return (
//       <div className={style.inputWrapper}>
//         <label htmlFor={id}>{label}</label>
//         <input
//           name={id}
//           defaultValue={defaultValue}
//           className={style.input}
//           type={elementTypeAttributes}
//           required={required}
//           onChange={handleInputChange}
//           placeholder={defaultValue ? '' : 'Enter value'}
//           // value={formFields[id]}
//         />
//       </div>
//     );
//   },
// );


