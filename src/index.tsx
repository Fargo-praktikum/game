import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { setOnline } from "./store/appStateReducer";
import { BrowserRouter } from "react-router-dom";
import { createStore, TRootState } from "./store/store";

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

// TODO выглядит костыльно, но пока не знаю, как победить этот момент
// при передаче с сервера даты превращаются в строку
preloadedState?.forum.comments.forEach((comment) => {
    comment.createdAt = new Date(Date.parse(comment.createdAt as any));
});

preloadedState?.forum.topics.forEach((topic) => {
    topic.createdAt = new Date(Date.parse(topic.createdAt as any));
});
//

const store = createStore(preloadedState);

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

