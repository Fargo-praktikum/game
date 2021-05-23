import React from "react";
import { Field, Formik } from "formik";

import "./FormsStyle.scss";

import CoolButton from "../../common/FormElements/Button/CoolButton";
import { TextAreaField } from "../../common/FormElements/TextInputs/TextAreaField";
import { composeValidators, maxLength, minLength, required } from "../../../scripts/utils/validateHelpers";

export interface FormValues {
    message: string;
}

const initialValues: FormValues = {
    message: "",
};

const onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400);
};

const AddCommentForm = (): JSX.Element => (
    <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ handleSubmit, isValid, dirty }) => {
            return (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="message"
                        placeholder="Введите текс"
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
                </form>
            );
        }}
    </Formik>
);


export default AddCommentForm;
