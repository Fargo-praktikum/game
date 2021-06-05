import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App";
import { Provider } from "react-redux";
import { storeWithInitState, TRootState } from "./store/store";
import "./global.scss";
import { getUser } from "./store/authReducer";
import { setOnline } from "./store/appStateReducer";
import { BrowserRouter } from "react-router-dom";

// global redeclared types
declare global {
    interface Window {
        __INITIAL_STATE__?: TRootState;
    }
}

const preloadedState = window.__INITIAL_STATE__ as TRootState;
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

const auth = async () => {
    return store.dispatch(getUser());
};



auth()
    .catch((e: Error) =>{
        console.error(e);
    })
    .finally(() => {
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
    });
