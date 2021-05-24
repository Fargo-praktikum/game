import React from "react";

import renderer from "react-test-renderer";
import { TextAreaField } from "./TextAreaField";

describe("Проверка TextAreaField", () => {
    it("корректная отрисовка", () => {
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



