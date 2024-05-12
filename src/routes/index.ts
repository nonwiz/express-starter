import {Routing, ServeStatic} from "express-zod-api";
import {helloEndpoints, helloWithAuthEndpoints} from "@/endpoints/hello";
import { join } from "node:path";
import {loginEndpoint} from "@/endpoints/auth/login";

export const routing: Routing = {
    v1: {
        hello: helloEndpoints,
        auth: {
            login: loginEndpoint,
            hello: helloWithAuthEndpoints
        }
    },
    public: new ServeStatic(join("documentation", "assets"), {
        dotfiles: "deny",
        index: false,
        redirect: false,
    }),
};
