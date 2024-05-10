import { createServer } from "express-zod-api";
import {config} from "./config";
import {routing} from "./routes";

createServer(config, routing);
