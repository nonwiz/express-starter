import helmet from "helmet";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import {attachRouting} from "express-zod-api";
import {routing} from "@/routes";

export const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json);
export const { logger } = attachRouting({
    app,
    cors: true,
    startupLogo: false,
    logger: { level: "debug", color: true }}, routing);
