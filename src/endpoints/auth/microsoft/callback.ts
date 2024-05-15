import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import createHttpError from "http-errors";
import {cca, createToken} from "@/utils/auth";
import {env} from "@/config";

export const microsoftAuthCallbackEndpoint = defaultEndpointsFactory.build({
    shortDescription: "Microsoft token callback",
    description: "Callback to get user token from Azure Issuer",
    method: "get",
    input: z.object({
        code: z.string()
    }),
    output: z.object({
        token: z.string()
    }),
    handler: async ({ input: { code }, logger }) => {
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
        return {token: createToken(user)};
    }
})

