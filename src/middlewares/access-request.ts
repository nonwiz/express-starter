import { z } from "zod";
import { createMiddleware } from "express-zod-api";

export const requestMiddleware = createMiddleware({
    input: z.object({}),
    middleware: async ({ request}) => {
        return { request };
    },
});
