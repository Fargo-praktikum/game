import devHosts from "../../configs/hosts.json";
import { Express } from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import https from "https";
import Loadable from "react-loadable";
import { findIP } from "./network";
import { makeStartLogsText } from "./startLogs";

interface Options {
    server: Express;
}


const APP_HOSTS = ["localhost"];
const { PORT = 5000, NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";


if (isDev) {
    const devLocalIP = findIP();
    if (devLocalIP) {
        APP_HOSTS.push(devLocalIP);
    }
}


export const startApp = ({ server }: Options): void => {
    Loadable.preloadAll().then(async () => {
        if (isDev) {
            const key = readFileSync(resolve("server", "devCert","key.pem"));
            const cert = readFileSync(resolve("server", "devCert","cert.pem"));

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
