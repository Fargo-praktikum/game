import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { FloatingFormField } from "../FloatingFormField";
import { Button } from "../Button/Button";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { passwordMinLength } from "../../constants";

import "../../styles/forms/floatingLabelForm.scss";
// import DataFieldError from "../../models/errors/dataFieldError";
import SigninRequestData from "../../models/signinRequestData";
import { useAppDispatch } from "../../hooks/storeHooks";
import { signIn } from "../../store/authReducer";

const formValidationSchema: Yup.SchemaOf<SigninRequestData> = Yup.object({
    login: Yup.string()
        .required("Введите логин"),
    password: Yup.string()
        .required("Введите пароль")
        .min(passwordMinLength, "Длина пароля не менее ${min}")
});


export const SigninForm = (): JSX.Element => {

    const history = useHistory();

    const dispatch = useAppDispatch();

    const handleSubmit =
        async (values: SigninRequestData, actions: FormikHelpers<SigninRequestData>) => {

            actions.setStatus(null);

            const resultAction = await dispatch(signIn({
                login: values.login,
                password: values.password,
            }));
            if (signIn.fulfilled.match(resultAction)) {
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
        };


    return (
        <div className="floating-label-form">
            <h1 className="floating-label-form__header">
                Войти
            </h1>
            <Formik<SigninRequestData>
                initialValues={{
                    login: "",
                    password: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={formValidationSchema}
            >
                {({ status }) => (
                    <Form className="floating-label-form__form">
                        <div className="floating-label-form__fields-block">
                            <FloatingFormField
                                name="login"
                                label="Логин"
                            />

                            <FloatingFormField
                                name="password"
                                label="Пароль"
                                type="password"
                            />

                        </div>
                        <div className="floating-label-form__action-block">
                            <div className="floating-label-form__error-message">{status}</div>
                            <Button className="floating-label-form__button" type="submit">
                                Авторизоваться
                            </Button>
                            <Link className="floating-label-form__link" to="/signup">
                                Нет аккаунта ?
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
