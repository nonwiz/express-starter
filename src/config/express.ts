import helmet from "helmet";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import {attachRouting} from "express-zod-api";
import {routing} from "@/routes";
import compression from "compression";

export const app = express();

app.use(compression());
app.use(helmet());
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(200);
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
export const { logger } = attachRouting({
    app,
    compression: true,
    cors: true,
    startupLogo: false,
    logger: { level: "debug", color: true }}, routing);
