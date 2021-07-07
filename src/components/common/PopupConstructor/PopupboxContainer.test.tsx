import React from "react";
import renderer from "react-test-renderer";

import { PopupboxContainer } from "./PopupboxContainer";
import PopupboxManager from "./PopupboxManager";


describe("Проверка PopupboxContainer с помощью snapshot", () => {
    it("корректная отрисовка", () => {
        const tree = renderer.create(
            <PopupboxContainer/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("открытие popup с содержимым", () => {
        const popupContainer = renderer.create(
            <PopupboxContainer/>
        );
        const content = (
            <h1>ПРИВЕТ</h1>
        );
        PopupboxManager.open({
            content,
            config: {
                fadeIn: true,
                fadeInSpeed: 200,
                padding: false
            }
        });
        expect(popupContainer.toJSON()).toMatchSnapshot();
    });

    it("открытие popup с содержимым и обновление", () => {
        const popupContainer = renderer.create(
            <PopupboxContainer/>
        );
        const contentOne = (
            <h1>Первый контент</h1>
        );
        const contentTwo = (
            <h1>Обновленный контент</h1>
        );
        PopupboxManager.open({
            content: contentOne,
            config: {
                fadeIn: true,
                fadeInSpeed: 200,
                padding: false
            }
        });
        PopupboxManager.update({
            content: contentTwo
        });
        expect(popupContainer.toJSON()).toMatchSnapshot();
    });


});



