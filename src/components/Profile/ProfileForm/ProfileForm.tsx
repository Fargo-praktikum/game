import { Form, Formik, FormikHelpers } from "formik";
import React, { FormEvent, useCallback, useEffect, useReducer } from "react";
import { ProfileFormField } from "../ProfileFormField";
import { Button } from "../../Button/Button";
import * as Yup from "yup";
import { emailRegexp, phoneRexep } from "../../../constants";
import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";

import "../Profile.scss";
import "./profileForm.scss";
import User from "../../../models/user";
import UserProfile from "../../../models/userProfile";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { changeUserAvatar, changeUserProfile } from "../../../store/authReducer";
import DataFieldError from "../../../models/errors/dataFieldError";
import { useHistory } from "react-router";
import { DropdownMenu } from "../../DropdownMenu/DropdownMenu";
import DragAndDrop from "../DragAndDrop/DragAndDrop";

interface dataDnD {
    dropDepth: number,
    inDropZone: boolean,
    fileList: any
}

interface ActionDropDepth {
    type: "SET_DROP_DEPTH";
    dropDepth: number
}

interface ActionInDropZone {
    type: "SET_IN_DROP_ZONE";
    inDropZone: boolean
}

interface ActionFiles {
    type: "ADD_FILE_TO_LIST";
    files: FormEvent<HTMLInputElement>
}

type Action = ActionDropDepth | ActionInDropZone | ActionFiles;

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

export const ProfileForm = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const userInfo = useAppSelector((state): User | null => state.auth.userInfo);
    if (!userInfo) {
        throw new Error("User is undefined");
    }

    const handleSubmit = useCallback(
        async (values: UserProfile, actions: FormikHelpers<UserProfile>) => {

            actions.setStatus(null);

            try {
                await dispatch(changeUserProfile(values));
                history.goBack();
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

    const onChangeAvatar = useCallback(
        async (e: Event | dataDnD) => {
            let files;
            if ("target" in e) {
                files = (e.target as HTMLInputElement).files;
            } else {
                files = e.fileList;
            }
            if (!files) return;

            const formData = new FormData();
            formData.append("avatar", files[0]);

            try {
                await dispatch(changeUserAvatar(formData));
            }
            catch (e) {
                console.error("Что-то пошло не так");
                console.error(e);
            }
        },
        []
    );

    const themeData = [
        { id: 1, label: "STARS" },
        { id: 2, label: "BASIC" }
    ];

    //DnD
    const reducer = (state: dataDnD, action: Action) => {
        switch (action.type) {
            case "SET_DROP_DEPTH":
                return { ...state, dropDepth: action.dropDepth };
            case "SET_IN_DROP_ZONE":
                return { ...state, inDropZone: action.inDropZone };
            case "ADD_FILE_TO_LIST":
                return { ...state, fileList: action.files };
            default:
                return state;
        }
    };

    const [dataDnD, dispatchDnD] = useReducer(
        reducer, { dropDepth: 0, inDropZone: false, fileList: [] }
    );

    useEffect(() => {
        onChangeAvatar(dataDnD);
    }, [dataDnD.fileList]);

    return (
        <div className="profile__block">
            <div className="profile__wrapper">
                <div className="profile__image">
                    <div className="imageUpload">
                        <label htmlFor="file-input">
                            <img className={dataDnD.inDropZone ? "profile-svg dragAndDrop" : "profile-svg"}
                                src={userInfo?.avatar ? userInfo.avatar : ProfileNonePhoto}
                                alt="Аватар"/>
                            <DragAndDrop data={dataDnD} dispatch={dispatchDnD} />
                        </label>
                        <input id="file-input" type="file" onChange={onChangeAvatar}/>
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
                                <DropdownMenu data={themeData} text="Выберите тему игрового поля"/>
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
