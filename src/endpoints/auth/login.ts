import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import {users} from "@/db/user";
import createHttpError from "http-errors";
import {cca, createToken} from "@/utils/auth";
import {env} from "@/config";

export const loginEndpoint = defaultEndpointsFactory.build({
    shortDescription: "Login",
    description: "Login with email and password, you will get the token.",
    method: "post", // or methods: ["get", "post", ...]
    input: z.object({
        email: z.string({message: "Email is required."}).email("Should be a valid email address"),
        password: z.string({message: "Password is required."}),
    }),
    output: z.object({
        token: z.string()
    }),
    handler: async ({ input: { email }, options, logger }) => {
        const user = users.find(user => user.email === email);
        if (!user) {
            throw createHttpError(404, 'User not found');
        }
        return { token: createToken(user)};
    },
});

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

