import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import createHttpError from "http-errors";
import {cca, createToken} from "@/utils/auth";
import {env} from "@/config";

export const microsoftAuthCallbackWithRedirectEndpoint = defaultEndpointsFactory
    .use(async (request, response, _next) => {
        const code = request.query.code;
        if (!code) {
            throw createHttpError(403, 'Please try to sign in again via /auth/microsoft');
        }
        const tokenRequest = {
            scopes: ["profile"],
            code: code,
            redirectUri: env.MS_REDIRECT_URI,
        };
        const userInfo = await cca.acquireTokenByCode(tokenRequest);
        if (!userInfo.account) {
            throw createHttpError(403, 'Please try to sign in again via /auth/microsoft');
        }
        const user = {
            name: userInfo.account.name ?? "",
            email: userInfo.account.username ?? "",
        }
        response.redirect(env.MS_REDIRECT_FE_URL + `?token=${createToken(user)}`);
    })
    .build({
        shortDescription: "Callback for microsoft login",
        description: "After logging successfully, this endpoint will redirect to user with ?token=validToken",
        method: "get",
        input: z.object({}),
        output: z.object({}),
        handler: async () => {
            return {}
        }
    });

