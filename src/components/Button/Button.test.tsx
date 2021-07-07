import React from "react";

import renderer from "react-test-renderer";
import { Button } from "./Button";

describe("Проверка Button", () => {
    it("отрисовка", () => {
        const tree = renderer.create(
            <Button onClick={() => ""}>Hello, World!</Button>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("отрисовка с некоторымы props", () => {
        const tree = renderer.create(
            <Button className="testClassName">test</Button>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



