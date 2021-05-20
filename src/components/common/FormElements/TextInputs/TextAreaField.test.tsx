import React from "react";

import renderer from "react-test-renderer";
import { TextAreaField } from "./TextAreaField";

describe("Проверка TextAreaField", () => {
    it("корректная отрисовка", () => {
        // const form = { values: [], errors: {}, touched: {}, isSubmitting: false, isValidating: true, submitCount: 1,
        //     setStatus: () => {return;}, setErrors: () => {return;}, setSubmitting: () => {return;}, setTouched: () => {return;}};
        // const form2 = { touched: { [field.name]: { value: true } }, errors: { [field.name]: {} } };
        // const meta = {};
        const tree = renderer
            .create(<TextAreaField/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("наличие всех свойств", () => {
        const field = { value: "testValue", name: "test", onChange: () => {return;}, onBlur: () => {return;} };
        const tree = renderer.create(<TextAreaField
            field={field}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



