import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { Provider } from "react-redux";
import "./global.scss";
import { setOnline } from "./store/appStateReducer";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { getUser } from "./store/authReducer";


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


const isDev = process.env.NODE_ENV === "development";
const isHttps = process.env.HTTP_PROTOCOL === "https";
// на heroku некорректный домен, поэтому serverAuthMiddlewares там не будут работать
if (isDev && !isHttps) {
    console.log("запрос за пользователем с клиента");
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
    console.log("просто отрисовка страницы");
    hydrateReactDOM();
}





