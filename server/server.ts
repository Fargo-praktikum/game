import path from "path";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import router from "./routing/router";
import helmet from "helmet";
const server = express();

// TODO автор, по мануалу которого сделан SSR, рекомендует использовать это только для dev вурсии
// а в prod юзать для этого nginx
server
    .use(helmet())
    .use(
        helmet.contentSecurityPolicy({
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "default-src": ["'self'", "https://local.ya-praktikum.tech", "https://ya-praktikum.tech", "https://fargo-cards-5.ya-praktikum.tech", "https://fonts.googleapis.com/", "https://fonts.gstatic.com"],
                "connect-src": ["'self'", "https://local.ya-praktikum.tech", "https://ya-praktikum.tech"],
                "img-src": ["'self'", "https://local.ya-praktikum.tech", "https://fargo-cards-5.ya-praktikum.tech", "*.googleapis.com", "data:" ],
                "script-src": ["'unsafe-inline'", "'self'", "https://fargo-cards-5.ya-praktikum.tech", "https://cdnjs.cloudflare.com"],
                "style-src": ["'unsafe-inline'", "'self'", "fonts.googleapis.com"],
                "font-src": ["'self'", "fonts.googleapis.com", "data:", "fonts.gstatic.com"],
            },
        })
    )
    .use(cookieParser())
    .use(compression())
    .use(express.static(path.resolve(__dirname, "../dist")))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(router);

export { server };
