import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App";
import { Provider } from "react-redux";
import { storeWithInitState, TRootState } from "./store/store";
import "./global.scss";
import { setOnline } from "./store/appStateReducer";
import { BrowserRouter } from "react-router-dom";
import { getUser } from "./store/authReducer";
import * as dotenv from "dotenv";
dotenv.config();

// global redeclared types
declare global {
    interface Window {
        __INITIAL_STATE__?: string;
    }
}

const preloadedState = window.__INITIAL_STATE__
    ? JSON.parse(window.__INITIAL_STATE__) as TRootState
    : undefined;
delete window.__INITIAL_STATE__;

const store = storeWithInitState(preloadedState);

function startServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then(registration => {
            console.log("ServiceWorker registration successful with  scope: ", registration.scope);
            navigator.serviceWorker.addEventListener("message", (event: MessageEvent) => {
                if (event.data.type === "online_checker") {
                    store.dispatch(setOnline(event.data.payload));
                }
            });
        }).catch((error: string) => {
            console.log("ServiceWorker registration failed: ", error);
        });
    }
}

startServiceWorker();

const hydrateReactDOM = () => {
    ReactDOM.hydrate(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>,
        document.getElementById("root"),
    );
};
console.log("process.env");
console.log(process.env);
// на heroku некорректный домен, поэтому serverAuthMiddleware там не будет работать
if (process.env.deploy === "heroku") {
    const auth = async () => {
        return store.dispatch(getUser());
    };
    auth()
        .catch((e: Error) =>{
            console.error(e);
        })
        .finally(() => {
            hydrateReactDOM();
        });
} else {
    hydrateReactDOM();
}


