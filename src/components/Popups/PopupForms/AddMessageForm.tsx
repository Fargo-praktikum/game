import React from "react";
import { Field, Formik } from "formik";

import "./FormsStyle.scss";

import CoolButton from "../../common/FormElements/Button/CoolButton";
import { TextField2 } from "../../common/FormElements/TextInputs/TextField2";
import { composeValidators, maxLength, minLength, required } from "../../../scripts/utils/validateHelpers";
import { TextAreaField } from "../../common/FormElements/TextInputs/TextAreaField";

export interface FormValues {
    title: string;
    description: string;
}

const initialValues: FormValues = {
    title: "",
    description: "",
};

const AddMessageForm = () => (
    <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ handleSubmit, isValid, dirty }) => {
            return (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        tipe="text"
                        placeholder="Введите заглавие"
                        validate={composeValidators(required, minLength(5))}
                        component={TextField2}/>
                    <Field
                        name="description"
                        placeholder="Введите описание"
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
        }
        }
    </Formik>
);

// const validate = values => {
//     let errors = {};
//     if (!values.email) {
//         errors.email = "Email is required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = "Invalid email address";
//     }
//     if (!values.password) {
//         errors.password = "Password is required";
//     }
//     return errors;
// };

const onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400);
};

export default AddMessageForm;
