import React from "react";
import {Field, Formik} from "formik";

import CoolButton from "../../common/FormElements/Button/CoolButton";
import {TextField2} from "../../common/FormElements/TextField/TextField2";
import {composeValidators, minLength, required} from "../../../scripts/utils/validateHelpers";

export interface FormValues {
    title: string;
    description: string;
}

const initialValues: FormValues = {
    title: "",
    description: "",
};

const AddTopicForm = () => (
    <Formik
        initialValues={initialValues}
        // validate={validate}
        onSubmit={onSubmit}>
        {(props) => {
            return (
                <form onSubmit={props.handleSubmit}>
                    <Field
                        name="title"
                        tipe="text"
                        placeholder="Введите заглавие сообщения"
                        validate={composeValidators(required, minLength(5))}
                        component={TextField2}/>
                    <Field
                        name="description"
                        placeholder="Введите описание"
                        validate={required}
                        component={TextField2}/>
                    <CoolButton
                        isDisabled={!props.isValid || !props.dirty}
                        type="submit"
                        text="Отправить сообщение"
                        clickHandler={() => {
                            console.log('Отправил тему')
                        }}
                    />
                </form>
            )
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

const onSubmit = (values: any, {setSubmitting}: any) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400);
};

export default AddTopicForm;
