import {Routing, ServeStatic} from "express-zod-api";
import {helloEndpoints, helloWithAuthEndpoints} from "@/endpoints/hello";
import { join } from "node:path";
import {loginEndpoint, microsoftAuthCallbackEndpoint} from "@/endpoints/auth/login";
import {refreshEndpoint} from "@/endpoints/auth/refresh-token";

export const routing: Routing = {
    v1: {
        hello: helloEndpoints,
        auth: {
            login: loginEndpoint,
            hello: helloWithAuthEndpoints,
            "refresh-token": refreshEndpoint,
            microsoft: {
                callback: microsoftAuthCallbackEndpoint
            }
        }
    },
    public: new ServeStatic(join("documentation", "assets"), {
        dotfiles: "deny",
        index: false,
        redirect: false,
    }),
};
