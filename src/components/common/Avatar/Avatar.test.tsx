import React from "react";

import renderer from "react-test-renderer";
import Avatar from "./Avatar";

describe("Проверка Avatar", () => {
    it("отрисовка без avatarSrc", () => {
        const tree = renderer
            .create(<Avatar/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с avatarSrc", () => {
        const tree = renderer.create(<Avatar
            avatarSrc="https://test.ru"
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



