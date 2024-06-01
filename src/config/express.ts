import {createConfig} from "express-zod-api";
import yaml from "yaml";
import { readFileSync } from "node:fs";
import ui from "swagger-ui-express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import {env} from "@/config/env";
import {isUrlValid} from "@/utils/routing";

const documentation = yaml.parse(
    readFileSync(env.DOC_PATH, "utf-8"),
);

const corsOptions = {
    origin: 'https://next-riot-chi.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
    credentials: true
};

export const config = createConfig({
    startupLogo: false,
    server: {
        listen: env.PORT, // port, UNIX socket or options
        beforeRouting: ({ app}) => {
            app.use(cors(corsOptions));
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
