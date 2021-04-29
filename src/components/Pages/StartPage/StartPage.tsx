import React from "react";
import Card from "../../Card";
import store from "../../../scripts/redux/store";
import { setGameInfo } from "../../../scripts/redux/gameReducer";
import "./StartPage.scss";

export const StartPage = (): JSX.Element => {
    useKeyPress("1", "capitals");
    useKeyPress("2", "periodic");
    useKeyPress("3", "history");
    useKeyPress("4", "english");

    return (
        <div className="mainCanvas">
            <Card />
        </div>
    );
};

const useKeyPress = (targetKey: string, path: string) => {
    const downHandler = ({ key }: { key: string }) => {
        if (key === targetKey) {
            console.log(`Pressed ${key} go to ${path} theme`);

            const gameInfo = setGameInfo( { theme: `${ path }` } );
            store.dispatch(gameInfo);

        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", downHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    }, []);
};

