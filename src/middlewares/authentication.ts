import { z } from "zod";
import createHttpError from "http-errors";
import { createMiddleware } from "express-zod-api";
import {decodeToken, verifyToken} from "@/utils/auth";
import {User} from "@/interfaces/user";


const createAuthMiddleware = (role?: 'manager' | 'admin') => createMiddleware({
    security: {
        and: [
            { type: 'header', name: 'token' },
        ],
    },
    input: z.object({}),
    middleware: async ({ request, logger }) => {
        const { token } = request.headers;
        logger.debug('Checking token validity.');

        if (!verifyToken(token as string)) {
            throw createHttpError(403, 'Invalid token.');
        }

        const user = decodeToken(token as string) as User;
        if (!user) {
            throw createHttpError(401, 'Cannot decode this token.');
        }

        if (role && user.role !== role) {
            throw createHttpError(403, `Access denied. Required role: ${role}`);
        }

        return { user };
    },
});

export const authMiddleware = createAuthMiddleware();
export const managerAuthMiddleware = createAuthMiddleware('manager');
export const adminAuthMiddleware = createAuthMiddleware('admin');
