import {createConfig} from "express-zod-api";
import yaml from "yaml";
import { readFileSync } from "node:fs";
import ui from "swagger-ui-express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {env} from "@/config/env";
import {isUrlValid} from "@/utils/routing";

const documentation = yaml.parse(
    readFileSync(env.DOC_PATH, "utf-8"),
);
export const config = createConfig({
    startupLogo: false,
    server: {
        listen: env.PORT, // port, UNIX socket or options
        beforeRouting: ({ app}) => {
            app.options('*', (req, res) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                res.sendStatus(200);
            });
            app.use(helmet());
            app.use(cookieParser())
            app.get("/", (_, res) => res.json({status: 200}));
            app.use("/docs", ui.serve, ui.setup(documentation));
            app.use((req, res, next) => {
                if (!isUrlValid(req.url)) {
                    res.status(404).json({status: "error", error: {message: "Page not found."}});
                    return;
                }
                next();
            });
        },
    },
    cors: true,
    logger: { level: "debug", color: true },
});
