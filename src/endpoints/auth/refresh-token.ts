import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import createHttpError from "http-errors";
import {createToken} from "@/utils/auth";
import {authMiddleware} from "@/middlewares/authentication";
import {pick} from "lodash";


export const refreshEndpoint = defaultEndpointsFactory
    .addMiddleware(authMiddleware)
    .build({
    shortDescription: "Refresh the access token",
    description: "If already authenticated, this endpoint will send a new access token.",
    method: "post", // or methods: ["get", "post", ...]
    input: z.object({
    }),
    output: z.object({
        token: z.string()
    }),
    handler: async ({  options: { user}, logger: _log }) => {
        if (!user) {
            throw createHttpError(404, 'User not found');
        }
        // should fetch the user from db and create a new token
        // And add the blacklist or updated the refresh token in db
        const updatedUser = pick(user, ["name", "email", "role", "phone"])
        return { token: createToken(updatedUser)};
    },
});
