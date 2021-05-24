import React from "react";

import renderer from "react-test-renderer";
import { TextField2 } from "./TextField2";

describe("Проверка TextField2", () => {
    it("корректная отрисовка", () => {
        const tree = renderer.create(<TextField2/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("наличие всех свойств", () => {
        const field = { value: "testValue", name: "test", onChange: () => {return;}, onBlur: () => {return;} };
        const tree = renderer.create(<TextField2
            field={field}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



