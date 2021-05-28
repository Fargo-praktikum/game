import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { ProfileFormField } from "../ProfileFormField";
import { Button } from "../../Button/Button";
import * as Yup from "yup";
import { passwordMinLength } from "../../../constants";
import { ChangePwdFormValuesType } from "./types";
import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";

import "../Profile.scss";
import User from "../../../models/user";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { changePassword } from "../../../store/authReducer";
import { TAppDispatch } from "../../../store/store";


const formValidationSchema: Yup.SchemaOf<ChangePwdFormValuesType> = Yup.object({
    oldPassword: Yup.string()
        .required("Введите пароль"),
    password: Yup.string()
        .required("Введите пароль")
        .min(passwordMinLength, "Длина пароля не менее ${min}"),
    passwordRepeat: Yup.string()
        .required("Введите пароль")
        .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
});

const handleSubmit = (dispatch: TAppDispatch) =>
    async (values: ChangePwdFormValuesType, actions: FormikHelpers<ChangePwdFormValuesType>) => {

        actions.setStatus(null);

        const resultAction = await dispatch(changePassword({
            oldPassword: values.oldPassword,
            newPassword: values.password
        }));
        if (changePassword.fulfilled.match(resultAction)) {
            // можно отобразить popup например
            console.log("Пароль успешно поменялся");
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

export const ProfileChangePwdForm = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state): User | null => state.auth.userInfo );

    if (!userInfo) {
        throw new Error("User is undefined");
    }

    return (
        <div className="profile__block">
            <div className="profile__wrapper">
                <div className="profile__image">
                    <div className="image-upload">
                        <label className="file-input">
                            <img className="profile__avatar"
                                src={ userInfo?.avatar? userInfo.avatar : ProfileNonePhoto }
                                alt="Аватар"/>
                        </label>

                        <input id="file-input" type="file" />
                    </div>
                </div>
                <Formik<ChangePwdFormValuesType>
                    initialValues={{
                        oldPassword: "",
                        password: "",
                        passwordRepeat: ""
                    }}
                    onSubmit={handleSubmit(dispatch)}
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
