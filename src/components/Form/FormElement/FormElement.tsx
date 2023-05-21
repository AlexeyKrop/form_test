// import { FC } from 'react';
//
// import { Input } from 'components/Form/FormElement/Input/Input';
// import { ElementType, ElementVariant } from 'components/Form/FormElement/types';
// import { separateFormTypeElementAndText } from 'utils/separateFormTypeElementAndText';
//
// export type ElementProps = {
//   element: ElementVariant;
// };
//
// export const FormElement: FC<ElementProps | any> = ({ element }) => {
//   // const { fields, handleFieldChange } = useForm({
//   //   last_name: {
//   //     isRequired: true,
//   //     value: '',
//   //   },
//   //   email: {
//   //     isRequired: true,
//   //     value: '',
//   //   },
//   // });
//
//   const [elementType, elementTypeAttributes] = separateFormTypeElementAndText(
//     element.type,
//   );
//
//   switch (elementType) {
//     case ElementType.input:
//       return <Input {...element} elementTypeAttributes={elementTypeAttributes} />;
//     default:
//       return null;
//   }
// };
