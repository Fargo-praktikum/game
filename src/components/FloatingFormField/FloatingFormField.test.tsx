import React from "react";
import renderer from "react-test-renderer";
import { Form, Formik } from "formik";

import { FloatingFormField } from "./FloatingFormField";


describe("Проверка FloatingFormField с помощью snapshot", () => {
    it("корректная отрисовка", () => {
        const tree = renderer.create(
            <Formik<{test: string}>
                initialValues={{ test: "" }}
                onSubmit={() => {return;}}
            >
                {() => (
                    <Form>
                        <FloatingFormField
                            name="login"
                            label="Логин"
                        />
                    </Form>
                )}
            </Formik>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("все три свойства", () => {
        const tree = renderer.create(
            <Formik<{test: string}>
                initialValues={{ test: "" }}
                onSubmit={() => {return;}}
            >
                {() => (
                    <Form>
                        <FloatingFormField
                            name="password"
                            label="Пароль"
                            type="password"
                        />
                    </Form>
                )}
            </Formik>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



