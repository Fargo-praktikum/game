import React from "react";

import renderer from "react-test-renderer";
import { ErrorInfo } from "./ErrorInfo";
// здесь используем StaticRouter вместо BrowserRouter, иначе будет ошибка
import { StaticRouter  } from "react-router-dom";

describe("Проверка ErrorInfo", () => {
    it("отрисовка", () => {
        const tree = renderer.create(
            <StaticRouter >
                <ErrorInfo errorName="testName" message="testMessage"/>
            </StaticRouter >
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



