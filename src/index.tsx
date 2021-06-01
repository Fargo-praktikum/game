import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App";
import { Provider } from "react-redux";
import store from "./store/store";
import "./global.scss";
import { getUser } from "./store/authReducer";
import { setOnline } from "./store/appStateReducer";
import { BrowserRouter } from "react-router-dom";

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
