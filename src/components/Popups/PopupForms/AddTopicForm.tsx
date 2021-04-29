import React from "react";
import {Field, Formik} from "formik";

import CoolButton from "../../common/FormElements/Button/CoolButton";
import {TextField} from "../../common/FormElements/TextField/TextField";
import {TextField2} from "../../common/FormElements/TextField/TextField2";

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
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
                <TextField
                    name="title"
                    type="text"
                    placeholder="Введите название топика"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={errors.title}
                    touched={touched.title}
                />
                <Field
                    name="description"
                    placeholder="введите описание"
                    component={TextField2} />

                <CoolButton
                    isDisabled={isSubmitting}
                    type="submit"
                    text="Отправить тему"
                    clickHandler={() => {
                        console.log('Отправил тему')
                    }}
                />
            </form>
        )}
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
