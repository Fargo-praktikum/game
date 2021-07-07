import React from "react";

import renderer from "react-test-renderer";
import CoolButton from "./CoolButton";

describe("Проверка CoolButton", () => {
    it("корректная отрисовка", () => {
        const tree = renderer
            .create(<CoolButton
                text="Нажми меня"
            />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("наличие всех свойств", () => {
        const tree = renderer.create(<CoolButton
            text="Нажми меня"
            clickHandler={() => {
                console.log("нажал кнопку");
            }}
            isDisabled={false}
            type={"reset"}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



