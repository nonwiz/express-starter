import { z } from "zod";
import createHttpError, {HttpError} from "http-errors";
import { createMiddleware } from "express-zod-api";
import {users} from "../db/user";
import {decodeToken, verifyToken} from "@/utils/auth";
import {User} from "@/interfaces/user";

export const authMiddleware = createMiddleware({
    security: {
        and: [
            { type: "header", name: "token" },
        ],
    },
    input: z.object({
    }),
    middleware: async ({ input, request, logger }) => {
        const { token } = request.headers;
        logger.debug("Checking token validity.");
        if (!verifyToken(token as string)) {
            throw createHttpError(403, "Not valid token.")
        }
        const user = decodeToken(token as string) as User;
        if (!user) {
            throw createHttpError(401, "Cannot decode this token.");
        }
        // if (request.headers.token !== user.token) {
        //     throw createHttpError(401, "Invalid token");
        // }
        return { user };
    },
});
