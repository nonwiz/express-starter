import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import {authMiddleware} from "@/middlewares/authentication";

export const helloWithAuthEndpoints = defaultEndpointsFactory
    .addMiddleware(authMiddleware)
    .build({
        shortDescription: "Protected route - example",
        description: "You can't access this endpoint without valid Bearer token in Header - authorization.",
        method: "get", // or methods: ["get", "post", ...]
        input: z.object({
        }),
        output: z.object({
            greetings: z.string().toUpperCase(),
        }),
        handler: async ({ input: { }, options, logger }) => {
            const name = options.user.name as string;
            logger.debug("Options:", options); // middlewares provide options
            return { greetings: `Hello, ${name || "World"}. Happy coding!` };
        },
    });

export const helloEndpoints = defaultEndpointsFactory
    .build({
        shortDescription: "Protected route - example",
        description: "You can't access this endpoint without valid Bearer token in Header - authorization.",
        method: "get", // or methods: ["get", "post", ...]
        input: z.object({
            name: z.string()
        }),
        output: z.object({
            greetings: z.string().toUpperCase(),
        }),
        handler: async ({ input: { name }, options, logger }) => {
            logger.debug("Options:", options); // middlewares provide options
            return { greetings: `Hello, ${name || "World"}. Happy coding!` };
        },
});
