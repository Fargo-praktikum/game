import { Form, Formik, FormikHelpers } from "formik";
import React, { ChangeEvent } from "react";
import { ProfileFormField } from "../ProfileFormField";
import { Button } from "../../Button/Button";
import * as Yup from "yup";
import { emailRegexp, phoneRexep } from "../../../constants";
import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";
import ProfileNonePhotoHover from "../../../assets/profileNonePhotoHover.svg";

import "../Profile.scss";
import DataFieldError from "../../../models/errors/dataFieldError";
import User from "../../../models/user";
import UserProfile from "../../../models/userProfile";
import { useAppSelector } from "../../../hooks/storeHooks";
import { changeUserAvatar, changeUserProfile } from "../../../services/userService";

const formValidationSchema: Yup.SchemaOf<UserProfile> = Yup.object({
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
    displayName: Yup.string()
        .required("Введите имя в чате")
});

const handleSubmit =
    async (values: UserProfile, actions: FormikHelpers<UserProfile>) => {

        actions.setStatus(null);

        try {
            await changeUserProfile(values);
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

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        fileUpload((target.files as FileList)[0]);
    }
    function fileUpload(file: File) {
        const formData = new FormData();
        formData.append("avatar",file);
        return changeUserAvatar(formData);
    }

    //TODO типизировать, когда появится типизированный стор
    const userInfo = useAppSelector((state): User | null => state.auth.userInfo );
    if (!userInfo) {
        throw new Error("User is undefined");
    }

    return (
        <div className="profile__block">
            <div className="profile__wrapper">
                <div className="profile__image">
                    <div className="image-upload">
                        <label htmlFor="file-input">
                            <img className="profile-svg"
                                src={ userInfo?.avatar? userInfo.avatar : ProfileNonePhoto }
                                alt="Аватар"/>
                            <img className="profile-svg-change" src={ProfileNonePhotoHover} alt="Поменять аватар"/>
                        </label>
                        <input id="file-input" type="file" onChange={onChange} />
                    </div>
                </div>
                <Formik<UserProfile>
                    initialValues={{
                        email: userInfo.email,
                        login: userInfo.login,
                        firstName: userInfo.firstName,
                        secondName: userInfo.secondName,
                        displayName: userInfo.displayName ? userInfo.displayName : "",
                        phone: userInfo.phone
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
                                />

                                <ProfileFormField
                                    name="login"
                                    label="Логин"
                                />

                                <ProfileFormField
                                    name="firstName"
                                    label="Имя"
                                />

                                <ProfileFormField
                                    name="secondName"
                                    label="Фамилия"
                                />

                                <ProfileFormField
                                    name="displayName"
                                    label="Имя в чате"
                                />

                                <ProfileFormField
                                    name="phone"
                                    label="Телефон"
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
