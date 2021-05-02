import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { ProfileFormField } from "../ProfileFormField";
import { Button } from "../../Button/Button";
import * as Yup from "yup";
import { emailRegexp, phoneRexep } from "../../../constants";
import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";
import ProfileNonePhotoHover from "../../../assets/profileNonePhotoHover.svg";

import "../Profile.scss";
import DataFieldError from "../../../models/errors/dataFieldError";
import { useSelector } from "react-redux";
import User from "../../../models/user";
import ChangeRequestData from "../../../models/changeRequestData";
import ChangeRequestDataTypes from "./types";

const formValidationSchema: Yup.SchemaOf<ChangeRequestDataTypes> = Yup.object({
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
        .matches(phoneRexep, "Введите телефон в формате +12345678901 или 12345678901")
});

const handleSubmit =
    async (values: ChangeRequestData, actions: FormikHelpers<ChangeRequestData>) => {

        actions.setStatus(null);

        try {
            // TODO когда будет API добавить
            console.log({
                email: values.email,
                login: values.login,
                firstName: values.firstName,
                secondName: values.secondName,
                displayName: values.displayName,
                phone: values.phone,
            });
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

export const ProfileForm = (): JSX.Element => {

    //TODO типизировать, когда появится типизированный стор
    const userInfo = useSelector<{ auth: { userInfo: User } }, User>((state): User => state.auth.userInfo );

    return (
        <div className="profile__block">
            <div className="profile__wrapper">
                <div className="profile__image">
                    <div className="image-upload">
                        <label htmlFor="file-input">
                            <img className="profile-svg"
                                src={ userInfo?.avatar? `https://ya-praktikum.tech/api/v2/resources${userInfo.avatar}` : ProfileNonePhoto }
                                alt="Аватар"/>
                            <img className="profile-svg-change" src={ProfileNonePhotoHover} alt="Поменять аватар"/>
                        </label>

                        <input id="file-input" type="file" />
                    </div>
                </div>
                <Formik<ChangeRequestData>
                    initialValues={{
                        email: "",
                        login: "",
                        firstName: "",
                        secondName: "",
                        displayName: "",
                        phone: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={formValidationSchema}
                >
                    {({ status }) => (
                        <Form className="floating-label-form__form">
                            <div className="floating-label-form__fields-block">
                                <ProfileFormField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder={userInfo.email}
                                />

                                <ProfileFormField
                                    name="login"
                                    label="Логин"
                                    placeholder={userInfo.login}
                                />

                                <ProfileFormField
                                    name="firstName"
                                    label="Имя"
                                    placeholder={userInfo.firstName}
                                />

                                <ProfileFormField
                                    name="secondName"
                                    label="Фамилия"
                                    placeholder={userInfo.secondName}
                                />

                                <ProfileFormField
                                    name="displayName"
                                    label="Имя в чате"
                                    placeholder={userInfo?.displayName? userInfo.displayName : ""}
                                />

                                <ProfileFormField
                                    name="phone"
                                    label="Телефон"
                                    placeholder={userInfo.phone}
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
