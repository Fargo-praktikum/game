import React from "react";
import { renderToString } from "react-dom/server";
import { Request, Response } from "express";
import { StaticRouter, StaticRouterContext } from "react-router";
import { Provider } from "react-redux";
import App from "../../src/components/App/App";
import { escapeObject } from "../../src/utils/escapeObject";
import { createStore } from "../../src/store/store";
import { setUser } from "../../src/store/authReducer";

export default (req: Request, res: Response) => {

    const location = req.baseUrl;
    const context: StaticRouterContext = {};

    const store = createStore();

    if (res.locals["user"]) {
        store.dispatch(setUser(res.locals["user"]));
    }

    const jsx = (
        <React.StrictMode>
            <Provider store={store}>
                <StaticRouter context={context} location={location}>
                    <App />
                </StaticRouter>
            </Provider>
        </React.StrictMode>
    );

    const reactHtml = renderToString(jsx);
    const reduxState = store.getState();

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    res.status(context.statusCode || 200).send(
        getHtml(reactHtml, reduxState)
    );
};

function getHtml(reactHtml: string, reduxState = {}) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
            <title>Game</title>
            <link href="/static/app-bundle.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script>
                window.__INITIAL_STATE__ = ${escapeObject(JSON.stringify(reduxState)) }
            </script>
            <script src="/static/app-bundle.js"></script>
        </body>
        </html>
    `;
}
