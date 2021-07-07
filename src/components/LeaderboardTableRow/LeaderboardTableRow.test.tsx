import React from "react";

import renderer from "react-test-renderer";
import { LeaderboardTableRow } from "./LeaderboardTableRow";

describe("Проверка отрисовки строки лидерборда", () => {

    it("Отрисовка строки лидерборда с данными", () => {
        const userData = {
            rating: 1,
            name: "test",
            date: 1,
            score: 1,
            userId: 1,
            theme: "test",
        };

        const tree = renderer
            .create(<LeaderboardTableRow userData={userData}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});



