import { Form, Formik, FormikHelpers } from "formik";
import React, { useCallback } from "react";
import { FloatingFormField } from "../FloatingFormField";
import { Button } from "../Button/Button";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { passwordMinLength } from "../../constants";

import "../../styles/forms/floatingLabelForm.scss";
import SigninRequestData from "../../models/signinRequestData";
import { useAppDispatch } from "../../hooks/storeHooks";
import { signIn } from "../../store/authReducer";
import DataFieldError from "../../models/errors/dataFieldError";
import AuthAPI from "../../api/authApi";
import { getTheme } from "../../store/gameReducer";

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

    const handleSubmit = useCallback(
        async (values: SigninRequestData, actions: FormikHelpers<SigninRequestData>) => {

            actions.setStatus(null);

            try {
                const userInfo = await dispatch(signIn({
                    login: values.login,
                    password: values.password,
                }));

                await dispatch(getTheme(Number(userInfo.payload.id)));

                history.push("/game");
            }
            catch (e) {
                if (e instanceof DataFieldError) {
                    actions.setFieldError(e.dataFieldName, e.message);
                }
                else {
                    actions.setStatus(e.message);
                }

                actions.setSubmitting(false);
            }
        },
        []
    );

    const handleOAuth = useCallback(
        async () => {
            const authApi = new AuthAPI();

            const serviceId = await authApi.getOauthYandexServiceId();

            window.location.href = ` https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=`;
        },
        []
    );

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
                            <Button className="floating-label-form__button" type="button" onClick={handleOAuth}>
                                Авторизоваться через Я.OAuth
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
