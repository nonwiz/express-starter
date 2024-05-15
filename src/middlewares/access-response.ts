import { z } from "zod";
import { createMiddleware } from "express-zod-api";

export const responseMiddleware = createMiddleware({
    input: z.object({}),
    middleware: async ({ response}) => {
        return { response };
    },
});
