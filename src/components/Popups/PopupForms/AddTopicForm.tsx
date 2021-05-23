import React from "react";
import { Field, Formik } from "formik";

import "./FormsStyle.scss";

import CoolButton from "../../common/FormElements/Button/CoolButton";
import { TextField2 } from "../../common/FormElements/TextInputs/TextField2";
import { composeValidators, minLength, required } from "../../../scripts/utils/validateHelpers";
import { TextAreaField } from "../../common/FormElements/TextInputs/TextAreaField";

export interface FormValues {
    title: string;
    description: string;
}

const initialValues: FormValues = {
    title: "",
    description: "",
};

const AddTopicForm = (): JSX.Element => (
    <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ handleSubmit, isValid,dirty }) => {
            return (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        tipe="text"
                        placeholder="Введите название топика"
                        validate={composeValidators(required, minLength(5))}
                        component={TextField2}/>
                    <Field
                        name="description"
                        placeholder="Введите описание"
                        validate={required}
                        rows="3"
                        component={TextAreaField}/>
                    <div className="form__button">
                        <CoolButton
                            isDisabled={!isValid || !dirty}
                            type="submit"
                            text="Отправить"
                            clickHandler={() => {
                                console.log("Отправил тему");
                            }}
                        />
                    </div>
                </form>
            );
        }}
    </Formik>
);


const onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400);
};

export default AddTopicForm;
