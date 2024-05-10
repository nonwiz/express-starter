import { Routing } from "express-zod-api";
import {helloEndpoints} from "../endpoints/hello";

export const routing: Routing = {
    v1: {
        hello: helloEndpoints,
    },
};
