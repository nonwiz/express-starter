import {Routing, ServeStatic} from "express-zod-api";
import {helloWithAuthEndpoints} from "@/endpoints/hello";
import { join } from "node:path";
import {loginEndpoint} from "@/endpoints/auth/login";
import {refreshEndpoint} from "@/endpoints/auth/refresh-token";
import {microsoftAuthCallbackWithRedirectEndpoint} from "@/endpoints/auth/microsoft/callback";
import {getLoginURLWithMicrosoftEndpoint, loginWithMicrosoftEndpoint} from "@/endpoints/auth/microsoft/login";
import {meEndpoint} from "@/endpoints/auth/me";

export const routing: Routing = {
    v1: {
        auth: {
            login: loginEndpoint,
            me: meEndpoint,
            hello: helloWithAuthEndpoints,
            "refresh-token": refreshEndpoint,
            microsoft: {
                login: loginWithMicrosoftEndpoint,
                "login-url": getLoginURLWithMicrosoftEndpoint,
                callback: microsoftAuthCallbackWithRedirectEndpoint,
            }
        }
    },
    public: new ServeStatic(join("documentation", "assets"), {
        dotfiles: "deny",
        index: false,
        redirect: false,
    }),
};
