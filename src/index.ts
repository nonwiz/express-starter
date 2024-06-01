import { createServer } from "express-zod-api";
import {config} from "./config";
import {routing} from "./routes";

export default createServer(config, routing);
