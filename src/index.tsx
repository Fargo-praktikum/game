import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App";
import { Provider } from "react-redux";
import store from "./scripts/redux/store";
import "./global.scss";
import { getUserAndSetToStore } from "./services/authService";


getUserAndSetToStore()
    .catch((e: Error) =>{
        console.error(e);
    })
    .finally(() => {
        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>,
            document.getElementById("root"),
        );
    });
