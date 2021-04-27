import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./scripts/redux/store";
import "./global.scss";
import App from "./components/App/App";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
