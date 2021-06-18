import devHosts from "../../configs/hosts.json";
import { Express } from "express";
import { readFileSync } from "fs";
import https from "https";
// import { homedir } from "os";
import { resolve } from "path";
import Loadable from "react-loadable";

import { findIP } from "./network";
import { makeStartLogsText } from "./startLogs";

interface Options {
    server: Express;
}

const APP_HOSTS = ["localhost"];
const { PORT = 9000, NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";


if (isDev) {
    const devLocalIP = findIP();
    if (devLocalIP) {
        APP_HOSTS.push(devLocalIP);
    }
}


export const startApp = ({ server }: Options): void => {
    Loadable.preloadAll().then(() => {
        if (isDev) {
            const key = readFileSync(resolve("server", "devCert", "key.pem"), "utf8");
            const cert = readFileSync(resolve("server", "devCert", "cert.pem"), "utf8");

            https
                .createServer({ key: key, cert: cert }, server)
                .listen(PORT, "0.0.0.0" as any, () => {
                    console.log(makeStartLogsText(
                        APP_HOSTS.concat(...devHosts.map(({ host }) => host)),
                        "https",
                        PORT,
                    ));
                });
            return;
        }

        server.listen(PORT, () => {
            console.log(makeStartLogsText(APP_HOSTS, "http", PORT));
        });
    });
};
