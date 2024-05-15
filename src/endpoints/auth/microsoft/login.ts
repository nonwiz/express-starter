import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import {authCodeUrlParameters, cca} from "@/utils/auth";
import {env} from "@/config";

export const loginWithMicrosoftEndpoint = defaultEndpointsFactory
    .use(async (_request, response, _next) => {
        response.redirect(await cca.getAuthCodeUrl(authCodeUrlParameters));
    })
    .build({
        shortDescription: "Login with microsoft auth",
        description: "When user hits this endpoint, it would redirect user to sign in the url.",
        method: "get",
        input: z.object({}),
        output: z.object({}),
        handler: async () => {
            return {}
        }
    });

export const getLoginURLWithMicrosoftEndpoint = defaultEndpointsFactory
    .build({
        shortDescription: "Get microsoft login url",
        description: "Return microsoft login url",
        method: "get",
        input: z.object({}),
        output: z.object({
            url: z.string(),
            callbackUrl: z.string(),
        }),
        handler: async () => {
            return { url: await cca.getAuthCodeUrl(authCodeUrlParameters), callbackUrl: env.MS_REDIRECT_URI }
        }
    });

