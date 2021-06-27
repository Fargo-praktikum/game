import React, { useCallback } from "react";
import { Field, Formik } from "formik";

import "./FormsStyle.scss";

import CoolButton from "../../common/FormElements/Button/CoolButton";
import { TextField2 } from "../../common/FormElements/TextInputs/TextField2";
import { composeValidators, maxLength, minLength, required } from "../../../scripts/utils/validateHelpers";
import { TextAreaField } from "../../common/FormElements/TextInputs/TextAreaField";
import { createTopic } from "../../../store/forumReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import User from "../../../models/user";
import DataFieldError from "../../../models/errors/dataFieldError";

export interface FormValues {
    title: string;
    description: string;
}

const initialValues: FormValues = {
    title: "",
    description: "",
};

const AddTopicForm = (props: {onSubmitCallback: () => void}): JSX.Element => {

    const userInfo = useAppSelector((state): User | null => state.auth.userInfo);
    if (!userInfo) {
        throw new Error("User is undefined");
    }

    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        async (values: any, { setSubmitting, setStatus, setFieldError }: any) => {

            setStatus(null);

            try {

                await dispatch(createTopic({
                    title: values.title,
                    message: values.message,
                    userId: userInfo.id
                }));

                props.onSubmitCallback();
            }
            catch (e) {
                if (e instanceof DataFieldError) {
                    setFieldError(e.dataFieldName, e.message);
                }
                else {
                    setStatus(e.message);
                }

                setSubmitting(false);
            }
        },
        []
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleSubmit, isValid, dirty, status }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="title"
                            tipe="text"
                            placeholder="Введите заглавие"
                            validate={composeValidators(required, minLength(5))}
                            component={TextField2}/>
                        <Field
                            name="message"
                            placeholder="Введите сообщение"
                            validate={composeValidators(required, minLength(5), maxLength(300))}
                            rows="3"
                            component={TextAreaField}/>
                        <div className="form__button">
                            <CoolButton
                                isDisabled={!isValid || !dirty}
                                type="submit"
                                text="Отправить"
                                clickHandler={() => {
                                    console.log("Отправил сообщение");
                                }}
                            />
                        </div>
                        <div>{status}</div>
                    </form>
                );
            }
            }
        </Formik>
    );
};



export default AddTopicForm;
