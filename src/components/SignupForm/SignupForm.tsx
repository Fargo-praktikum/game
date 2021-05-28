import { Form, Formik, FormikHelpers } from "formik";
import React, { useCallback } from "react";
import { FloatingFormField } from "../FloatingFormField";
import { Button } from "../Button/Button";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { emailRegexp, passwordMinLength, phoneRexep } from "../../constants";
import { SignupFormValuesType } from "./types";

import "../../styles/forms/floatingLabelForm.scss";
// import DataFieldError from "../../models/errors/dataFieldError";
import { useAppDispatch } from "../../hooks/storeHooks";
import { signUp } from "../../store/authReducer";

const formValidationSchema: Yup.SchemaOf<SignupFormValuesType> = Yup.object({
    email: Yup.string()
        .required("Введите email")
        .matches(emailRegexp, "Некорректный email"),
    login: Yup.string()
        .required("Введите логин"),
    firstName: Yup.string()
        .required("Введите имя"),
    secondName: Yup.string()
        .required("Введите фамилию"),
    phone: Yup.string()
        .required("Введите телефон")
        .matches(phoneRexep, "Введите телефон в формате +12345678901 или 12345678901"),
    password: Yup.string()
        .required("Введите пароль")
        .min(passwordMinLength, "Длина пароля не менее ${min}"),
    passwordRepeat: Yup.string()
        .required("Введите пароль")
        .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
});

export const SignupForm = (): JSX.Element => {

    const history = useHistory();

    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        async (values: SignupFormValuesType, actions: FormikHelpers<SignupFormValuesType>) => {

            actions.setStatus(null);

            const resultAction = await dispatch(signUp({
                email: values.email,
                login: values.login,
                firstName: values.firstName,
                secondName: values.secondName,
                phone: values.phone,
                password: values.password,
            }));
            if (signUp.fulfilled.match(resultAction)) {
                history.push("/");
            } else {
                console.dir(resultAction);
                if (resultAction.payload) {
                    actions.setStatus(resultAction.payload.message);
                } else {
                    console.log("Что-то пошло не так");
                }
            }

            actions.setSubmitting(false);
        },
        []
    );

    return (
        <div className="floating-label-form">
            <h1 className="floating-label-form__header">
                Регистрация
            </h1>
            <Formik<SignupFormValuesType>
                initialValues={{
                    email: "",
                    login: "",
                    firstName: "",
                    secondName: "",
                    phone: "",
                    password: "",
                    passwordRepeat: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={formValidationSchema}
            >
                {({ status }) => (
                    <Form className="floating-label-form__form">
                        <div className="floating-label-form__fields-block">
                            <FloatingFormField
                                name="email"
                                label="Email"
                                type="email"
                            />

                            <FloatingFormField
                                name="login"
                                label="Логин"
                            />

                            <FloatingFormField
                                name="firstName"
                                label="Имя"
                            />

                            <FloatingFormField
                                name="secondName"
                                label="Фамилия"
                            />

                            <FloatingFormField
                                name="phone"
                                label="Телефон"
                            />

                            <FloatingFormField
                                name="password"
                                label="Пароль"
                                type="password"
                            />

                            <FloatingFormField
                                name="passwordRepeat"
                                label="Пароль (ещё раз)"
                                type="password"
                            />

                        </div>
                        <div className="floating-label-form__action-block">
                            <div className="floating-label-form__error-message">{status}</div>
                            <Button className="floating-label-form__button" type="submit">
                                Зарегистрироваться
                            </Button>
                            <Link className="floating-label-form__link" to="/login">
                                Войти
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
