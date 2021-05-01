import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { ProfileFormField } from "../ProfileFormField";
import { Button } from "../../Button/Button";
import * as Yup from "yup";
import { passwordMinLength } from "../../../constants";
import { ChangePswFormValuesType } from "./types";
import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";

import "../Profile.scss";
import DataFieldError from "../../../models/errors/dataFieldError";
import { useSelector } from "react-redux";
import User from "../../../models/user";

const formValidationSchema: Yup.SchemaOf<ChangePswFormValuesType> = Yup.object({
    password: Yup.string()
        .required("Введите пароль")
        .min(passwordMinLength, "Длина пароля не менее ${min}"),
    passwordRepeat: Yup.string()
        .required("Введите пароль")
        .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
});

const handleSubmit =
    async (values: ChangePswFormValuesType, actions: FormikHelpers<ChangePswFormValuesType>) => {

        actions.setStatus(null);

        try {
            // TODO когда будет API добавить
            console.log(values.password);
        }
        catch (e) {
            if (e instanceof DataFieldError) {
                actions.setFieldError(e.dataFieldName, e.message);
            }
            else {
                actions.setStatus(e.message);
            }
        }
        finally {
            actions.setSubmitting(false);
        }
    };

export const ProfileChangePswForm = (): JSX.Element => {

    //TODO типизировать, когда появится типизированный стор
    const userInfo = useSelector<{ auth: { userInfo: User } }, User>((state): User => state.auth.userInfo );

    return (
        <div className="registration__block">
            <div className="wraper">
                <div className="profile-image">
                    <div className="image-upload">
                        <label className="file-input">
                            <img className="profile-avatar"
                                src={ userInfo?.avatar? `https://ya-praktikum.tech/api/v2/resources${userInfo.avatar}` : ProfileNonePhoto }
                                alt="Аватар"/>
                        </label>

                        <input id="file-input" type="file" />
                    </div>
                </div>
                <Formik<ChangePswFormValuesType>
                    initialValues={{
                        password: "",
                        passwordRepeat: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={formValidationSchema}
                >
                    {({ status }) => (
                        <Form className="floating-label-form__form">
                            <div className="floating-label-form__fields-block">
                                <ProfileFormField
                                    name="oldPassword"
                                    label="Старый пароль"
                                    type="password"
                                />

                                <ProfileFormField
                                    name="password"
                                    label="Новый пароль"
                                    type="password"
                                />

                                <ProfileFormField
                                    name="passwordRepeat"
                                    label="Повторите новый пароль"
                                    type="password"
                                />
                            </div>
                            <div className="floating-label-form__action-block">
                                <div className="floating-label-form__error-message">{status}</div>
                                <Button className="floating-label-form__button" type="submit">
                                    Сохранить
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
