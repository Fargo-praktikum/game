import React from "react";
import renderer from "react-test-renderer";

import { TextBox } from "./TextBox";

describe("Проверка TextBox", () => {
    it("корректная отрисовка", () => {
        const textBox = renderer
            .create(<TextBox/>);
        expect(textBox.toJSON()).toMatchSnapshot();
    });

    it("отрисовка с пропсами", () => {
        const field = {
            value: "test",
            name: "testName",
            multiple: true,
            checked: false,
            onChange: () => { return; },
            onBlur: () => { return; },
        };
        const textBox = renderer
            .create(
                <TextBox
                    type={"text"}
                    className="form__textinput-profile right"
                    {...field}
                />
            );
        expect(textBox.toJSON()).toMatchSnapshot();
    });

});



