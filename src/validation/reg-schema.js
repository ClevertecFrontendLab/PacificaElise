/* eslint-disable */

import * as yup from 'yup';

/*validate: (values) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .matches(/georges.abitbol@gmail.com/, 'cant change email'),
    providerName: Yup.string()
      .required('type your name'),
    password: Yup.string()
      .min(8, 'at least 8 chars')
      .matches(/[a-z]/, 'at least one lowercase char')
      .matches(/[A-Z]/, 'at least one uppercase char')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    passwordConfirm: Yup.string()
      .equalTo(Yup.ref('password'), 'passwords don't match')
  })

  return schema.validate(values, { abortEarly: false })
    .then(() => {})
    .catch((err) => {
      throw err
    })
}*/

export const RegSchema = yup.object().shape({
  username: yup
    .string()
    .required('Используйте для логина латинский алфавит и цифры')
    .matches(/([A-Za-z])/, 'латинский алфавит')
    .matches(/([0-9])/, 'цифры'),
  password: yup
    .string()
    .required('Пароль не менее 8 символов, с заглавной буквой и цифрой')
    .min(8, 'не менее 8 символов')
    .matches(/([A-ZА-Я])/, 'с заглавной буквой')
    .matches(/([0-9])/, 'цифрой'),
  firstName: yup.string().required('Поле не может быть пустым'),
  lastName: yup.string().required('Поле не может быть пустым'),
  phone: yup
    .string()
    .required('В формате +375 (xx) xxx-xx-xx')
    .matches(
      /^[+]{1}[0-9]{3} [(]{1}[0-9]{2}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/,
      'В формате +375 (xx) xxx-xx-xx'
    ),
  email: yup.string().email('Введите корректный e-mail').required('Введите корректный e-mail'),
});
