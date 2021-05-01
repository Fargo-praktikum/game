// import { Form, Formik, FormikHelpers } from "formik";
// import React from "react";
// import { ProfileFormField } from "../ProfileFormField";
// import { Button } from "../../Button/Button";
// import * as Yup from "yup";
// import { emailRegexp, passwordMinLength } from "../../../constants";
// import { signup } from "../../../services/authService";
// import { SignupFormValuesType } from "./types";
// import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";
// import ProfileNonePhotoHover from "../../../assets/profileNonePhotoHover.svg";
//
// import "./ProfileForm.scss";
// import DataFieldError from "../../../models/errors/dataFieldError";
// import { useSelector } from "react-redux";
//
// const formValidationSchema: Yup.SchemaOf<SignupFormValuesType> = Yup.object({
//     email: Yup.string()
//         .required("Введите email")
//         .matches(emailRegexp, "Некорректный email"),
//     login: Yup.string()
//         .required("Введите логин"),
//     firstName: Yup.string()
//         .required("Введите имя"),
//     secondName: Yup.string()
//         .required("Введите фамилию"),
//     phone: Yup.string()
//         .required("Введите телефон")
//         .matches(emailRegexp, "Введите телефон в формате +12345678901 или 12345678901"),
//     password: Yup.string()
//         .required("Введите пароль")
//         .min(passwordMinLength, "Длина пароля не менее ${min}"),
//     passwordRepeat: Yup.string()
//         .required("Введите пароль")
//         .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
// });
//
// const handleSubmit =
//     async (values: SignupFormValuesType, actions: FormikHelpers<SignupFormValuesType>) => {
//
//         actions.setStatus(null);
//
//         try {
//             await signup({
//                 email: values.email,
//                 login: values.login,
//                 firstName: values.firstName,
//                 secondName: values.secondName,
//                 phone: values.phone,
//                 password: values.password,
//             });
//         }
//         catch (e) {
//             if (e instanceof DataFieldError) {
//                 actions.setFieldError(e.dataFieldName, e.message);
//             }
//             else {
//                 actions.setStatus(e.message);
//             }
//         }
//         finally {
//             actions.setSubmitting(false);
//         }
//     };
//
// export const ProfileForm = (): JSX.Element => {
//
//     //TODO типизировать, когда появится типизированный стор
//     const userInfo = useSelector<{ auth: any }>(state => state.auth.userInfo );
//
//     return (
//         <div className="registration__block">
//             <div className="wraper">
//                 <div className="profile-image">
//                     <img className="profile-svg" src={ userInfo.avatar ?? ProfileNonePhoto } alt="Аватар"/>
//                     <img className="profile-svg-change" src={ProfileNonePhotoHover} alt="Поменять аватар"/>
//                 </div>
//                 <Formik<SignupFormValuesType>
//                     initialValues={{
//                         email: "",
//                         login: "",
//                         firstName: "",
//                         secondName: "",
//                         phone: "",
//                         password: "",
//                         passwordRepeat: ""
//                     }}
//                     onSubmit={handleSubmit}
//                     validationSchema={formValidationSchema}
//                 >
//                     {({ status }) => (
//                         <Form className="floating-label-form__form">
//                             <div className="floating-label-form__fields-block">
//                                 <ProfileFormField
//                                     name="email"
//                                     label="Email"
//                                     type="email"
//                                     placeholder={userInfo.email}
//                                 />
//
//                                 <ProfileFormField
//                                     name="login"
//                                     label="Логин"
//                                     placeholder={userInfo.login}
//                                 />
//
//                                 <ProfileFormField
//                                     name="firstName"
//                                     label="Имя"
//                                     placeholder={userInfo.firstName}
//                                 />
//
//                                 <ProfileFormField
//                                     name="secondName"
//                                     label="Фамилия"
//                                     placeholder={userInfo.secondName}
//                                 />
//
//                                 <ProfileFormField
//                                     name="displayName"
//                                     label="Имя в чате"
//                                     placeholder={userInfo.displayName}
//                                 />
//
//                                 <ProfileFormField
//                                     name="phone"
//                                     label="Телефон"
//                                     placeholder={userInfo.phone}
//                                 />
//
//                             </div>
//                             <div className="floating-label-form__action-block">
//                                 <div className="floating-label-form__error-message">{status}</div>
//                                 <Button className="floating-label-form__button" type="submit">
//                                     Сохранить
//                                 </Button>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };
