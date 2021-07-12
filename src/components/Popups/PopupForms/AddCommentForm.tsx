import React, { useCallback } from "react";
import { Field, Formik } from "formik";

import "./FormsStyle.scss";

import CoolButton from "../../common/FormElements/Button/CoolButton";
import { TextAreaField } from "../../common/FormElements/TextInputs/TextAreaField";
import { composeValidators, maxLength, minLength, required } from "../../../scripts/utils/validateHelpers";
import { createComment } from "../../../store/forumReducer";
import { useAppSelector, useAppDispatch } from "../../../hooks/storeHooks";
import User from "../../../models/user";
import DataFieldError from "../../../models/errors/dataFieldError";

export interface FormValues {
    message: string;
}

const initialValues: FormValues = {
    message: "",
};

const AddCommentForm = (props: { replyTo: number | null, topicId: number }): JSX.Element => {

    console.log("repl", props.replyTo);

    const userInfo = useAppSelector((state): User | null => state.auth.userInfo);
    if (!userInfo) {
        throw new Error("User is undefined");
    }

    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        async (values: any, { setSubmitting, setStatus, setFieldError }: any) => {

            setStatus(null);

            try {
                await dispatch(createComment({
                    content: values.content,
                    topicId: props.topicId,
                    parentId: props.replyTo
                }));
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
        [props]
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleSubmit, isValid, dirty, status }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="content"
                            placeholder="Введите текст"
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
            }}
        </Formik>
    );
};

export default AddCommentForm;
