import React from "react";
import { Game } from "../../Game";
import Navbar from "../../Navbar/Navbar";
import "./gamePage.scss";

export const GamePage = (): JSX.Element => {
    return (
        <div className="game__wrap">
            <Navbar />
            <div className="game__field">
                <Game />
            </div>
        </div>
    );
};
